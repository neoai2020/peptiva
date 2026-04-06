import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getInitialWeightData, getInitialWaterData, getInitialDoseData } from '../data/memberData'
import { calcMacros, generateMealPlan, generateWorkoutPlan } from '../data/planEngine'

function daysSince(dateStr: string) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

function StatCard({ icon, label, value, sub, accent }: { icon: string; label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="m-stat-card">
      <span className="m-stat-icon">{icon}</span>
      <div>
        <span className="m-stat-label">{label}</span>
        <span className="m-stat-value" style={accent ? { color: accent } : undefined}>{value}</span>
        {sub && <span className="m-stat-sub">{sub}</span>}
      </div>
    </div>
  )
}

function QuickAction({ icon, label, to }: { icon: string; label: string; to: string }) {
  return (
    <Link to={to} className="m-quick-action">
      <span className="m-quick-icon">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const profile = user!.profile!
  const macros = useMemo(() => calcMacros(profile), [profile])
  const mealPlan = useMemo(() => generateMealPlan(profile), [profile])
  const workouts = useMemo(() => generateWorkoutPlan(profile), [profile])
  const [weights] = useState(getInitialWeightData)
  const [water] = useState(getInitialWaterData)
  const [doses] = useState(getInitialDoseData)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('Good morning')
    else if (h < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const daysOnProtocol = user ? daysSince(user.joinDate) : 0
  const startWeight = weights[0]?.weight ?? 0
  const currentWeight = weights[weights.length - 1]?.weight ?? 0
  const weightChange = Math.round((startWeight - currentWeight) * 10) / 10
  const todayWater = water[water.length - 1]?.glasses ?? 0
  const dosesTaken = doses.filter(d => d.taken).length
  const dosesTotal = doses.length
  const compliance = dosesTotal > 0 ? Math.round((dosesTaken / dosesTotal) * 100) : 0
  const streak = (() => {
    let s = 0
    for (let i = doses.length - 2; i >= 0; i--) {
      if (doses[i].taken) s++; else break
    }
    return s
  })()
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todayWorkout = workouts.find(w => w.day === todayName)
  const goalLabel = profile.goal === 'lose' ? 'Fat Loss' : profile.goal === 'gain' ? 'Muscle Gain' : 'Maintenance'

  return (
    <div className="m-dashboard">
      {/* HERO GREETING */}
      <section className="m-dash-hero">
        <div>
          <h2 className="m-dash-greeting">{greeting}, {user?.firstName}</h2>
          <p className="m-dash-sub">Day <strong>{daysOnProtocol}</strong> of your {user?.compound} protocol. You're doing great.</p>
        </div>
        <div className="m-dash-streak">
          <span className="m-dash-streak-num">{streak}</span>
          <span className="m-dash-streak-label">day streak</span>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="m-dash-stats">
        <StatCard icon="🎯" label="Daily Target" value={`${macros.calories} cal`} sub={`${goalLabel} plan`} accent="var(--brand)" />
        <StatCard icon="⚖️" label="Weight" value={`${currentWeight} kg`} sub={weightChange > 0 ? `↓ ${weightChange} kg` : 'Tracking'} accent="var(--accent)" />
        <StatCard icon="💉" label="Compliance" value={`${compliance}%`} sub={`${dosesTaken}/${dosesTotal} doses`} accent={compliance >= 90 ? 'var(--accent)' : 'var(--gold)'} />
        <StatCard icon="💧" label="Water Today" value={`${todayWater} glasses`} sub={todayWater >= 8 ? 'On target' : `${8 - todayWater} more to go`} />
      </section>

      {/* QUICK ACTIONS */}
      <section className="m-dash-actions">
        <h3 className="m-section-label">Quick Actions</h3>
        <div className="m-quick-grid">
          <QuickAction icon="💉" label="Log Today's Dose" to="/members/protocol" />
          <QuickAction icon="🥗" label="View Meal Plan" to="/members/nutrition" />
          <QuickAction icon="💪" label="Today's Workout" to="/members/training" />
          <QuickAction icon="⚖️" label="Log Weight" to="/members/progress" />
          <QuickAction icon="💧" label="Log Water" to="/members/progress" />
          <QuickAction icon="💬" label="Chat with Expert" to="/members/support" />
        </div>
      </section>

      {/* TODAY'S SCHEDULE — personalised */}
      <section className="m-dash-schedule">
        <h3 className="m-section-label">Today's Schedule</h3>
        <div className="m-schedule-list">
          <div className={`m-schedule-item ${doses[doses.length - 1]?.taken ? 'm-schedule-item--done' : ''}`}>
            <span className="m-schedule-time">8:00 AM</span>
            <span className="m-schedule-dot" />
            <div>
              <span className="m-schedule-title">Protocol Dose — {user?.compound}</span>
              <span className="m-schedule-status">{doses[doses.length - 1]?.taken ? '✓ Completed' : 'Pending'}</span>
            </div>
          </div>
          {mealPlan.meals.slice(0, 3).map((meal, i) => (
            <div key={i} className="m-schedule-item">
              <span className="m-schedule-time">{meal.time}</span>
              <span className="m-schedule-dot" />
              <div>
                <span className="m-schedule-title">{meal.name} — {meal.items[0]}</span>
                <span className="m-schedule-status">{meal.calories} cal · {meal.protein}g protein</span>
              </div>
            </div>
          ))}
          {todayWorkout && (
            <div className="m-schedule-item">
              <span className="m-schedule-time">3:00 PM</span>
              <span className="m-schedule-dot" />
              <div>
                <span className="m-schedule-title">Workout — {todayWorkout.name}</span>
                <span className="m-schedule-status">{todayWorkout.duration} · {todayWorkout.exercises.length} exercises</span>
              </div>
            </div>
          )}
          {mealPlan.meals.length > 3 && (
            <div className="m-schedule-item">
              <span className="m-schedule-time">{mealPlan.meals[mealPlan.meals.length - 1].time}</span>
              <span className="m-schedule-dot" />
              <div>
                <span className="m-schedule-title">{mealPlan.meals[mealPlan.meals.length - 1].name} — {mealPlan.meals[mealPlan.meals.length - 1].items[0]}</span>
                <span className="m-schedule-status">{mealPlan.meals[mealPlan.meals.length - 1].calories} cal · {mealPlan.meals[mealPlan.meals.length - 1].protein}g protein</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MINI WEIGHT CHART */}
      <section className="m-dash-chart">
        <h3 className="m-section-label">Weight Trend (14 days)</h3>
        <div className="m-mini-chart">
          {weights.map((w, i) => {
            const min = Math.min(...weights.map(x => x.weight))
            const max = Math.max(...weights.map(x => x.weight))
            const range = max - min || 1
            const pct = ((w.weight - min) / range) * 100
            return (
              <div key={i} className="m-mini-bar-wrap" title={`${w.date}: ${w.weight} kg`}>
                <div className="m-mini-bar" style={{ height: `${20 + pct * 0.6}%` }} />
                {i === weights.length - 1 && <span className="m-mini-label">{w.weight}</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* TIPS */}
      <section className="m-dash-tips">
        <h3 className="m-section-label">Daily Tips</h3>
        <div className="m-tips-grid">
          <div className="m-tip-card">
            <span className="m-tip-icon">💡</span>
            <p>Drink a full glass of water before each meal — it supports both hydration and satiety, especially on GLP-1 protocols.</p>
          </div>
          <div className="m-tip-card">
            <span className="m-tip-icon">🎯</span>
            <p>Aim for 30g+ protein at every meal. This protects lean mass while your body composition shifts.</p>
          </div>
          <div className="m-tip-card">
            <span className="m-tip-icon">😴</span>
            <p>Sleep is when your body does most of its repair work. Target 7–9 hours and keep a consistent schedule.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
