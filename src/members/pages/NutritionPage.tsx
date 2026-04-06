import { useState, useMemo } from 'react'
import { type Meal } from '../data/memberData'
import { useAuth } from '../context/AuthContext'
import { generateMealPlan, calcMacros } from '../data/planEngine'

function MacroRing({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  const r = 32
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div className="m-macro-ring">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease' }} />
      </svg>
      <div className="m-macro-ring-text">
        <span className="m-macro-ring-val">{value}g</span>
        <span className="m-macro-ring-label">{label}</span>
      </div>
    </div>
  )
}

function MealCard({ meal, onLog }: { meal: Meal; onLog: (name: string) => void }) {
  const [logged, setLogged] = useState(false)
  return (
    <div className={`m-meal-card ${logged ? 'm-meal-card--logged' : ''}`}>
      <div className="m-meal-header">
        <div>
          <span className="m-meal-time">{meal.time}</span>
          <h4 className="m-meal-name">{meal.name}</h4>
        </div>
        <div className="m-meal-macros-mini">
          <span>{meal.calories} cal</span>
          <span>{meal.protein}g P</span>
        </div>
      </div>
      <ul className="m-meal-items">
        {meal.items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <div className="m-meal-footer">
        <div className="m-meal-macro-pills">
          <span className="m-pill m-pill--p">P {meal.protein}g</span>
          <span className="m-pill m-pill--c">C {meal.carbs}g</span>
          <span className="m-pill m-pill--f">F {meal.fat}g</span>
        </div>
        <button
          type="button"
          className={`m-meal-log-btn ${logged ? 'm-meal-log-btn--done' : ''}`}
          onClick={() => { setLogged(!logged); onLog(meal.name) }}
        >
          {logged ? '✓ Logged' : 'Log Meal'}
        </button>
      </div>
    </div>
  )
}

function WaterTracker() {
  const [glasses, setGlasses] = useState(5)
  const target = 8
  return (
    <div className="m-water-tracker">
      <div className="m-water-header">
        <h4>💧 Water Intake</h4>
        <span className="m-water-count">{glasses} / {target} glasses</span>
      </div>
      <div className="m-water-dots">
        {Array.from({ length: target }, (_, i) => (
          <button key={i} type="button" className={`m-water-dot ${i < glasses ? 'm-water-dot--filled' : ''}`} onClick={() => setGlasses(i + 1)}>
            💧
          </button>
        ))}
      </div>
      <div className="m-water-actions">
        <button type="button" className="m-btn-sm" onClick={() => setGlasses(g => Math.max(0, g - 1))}>−</button>
        <button type="button" className="m-btn-sm m-btn-sm--brand" onClick={() => setGlasses(g => Math.min(target + 4, g + 1))}>+ Add Glass</button>
      </div>
    </div>
  )
}

export default function NutritionPage() {
  const { user } = useAuth()
  const profile = user!.profile!
  const macros = useMemo(() => calcMacros(profile), [profile])
  const plan = useMemo(() => generateMealPlan(profile), [profile])

  const [loggedMeals, setLoggedMeals] = useState<string[]>([])
  const [showCustom, setShowCustom] = useState(false)
  const [customFood, setCustomFood] = useState('')
  const [customCal, setCustomCal] = useState('')

  const loggedCals = plan.meals.filter(m => loggedMeals.includes(m.name)).reduce((s, m) => s + m.calories, 0)
  const loggedProtein = plan.meals.filter(m => loggedMeals.includes(m.name)).reduce((s, m) => s + m.protein, 0)
  const loggedCarbs = plan.meals.filter(m => loggedMeals.includes(m.name)).reduce((s, m) => s + m.carbs, 0)
  const loggedFat = plan.meals.filter(m => loggedMeals.includes(m.name)).reduce((s, m) => s + m.fat, 0)

  const handleLog = (name: string) => {
    setLoggedMeals(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  const goalLabel = profile.goal === 'lose' ? 'Fat Loss' : profile.goal === 'gain' ? 'Muscle Gain' : 'Maintenance'

  return (
    <div className="m-nutrition">
      <div className="m-page-header">
        <h2>Nutrition</h2>
        <p>Your personalised {goalLabel.toLowerCase()} meal plan — built from your body stats</p>
      </div>

      {/* YOUR TARGETS */}
      <section className="m-targets-bar">
        <div className="m-target-pill">🎯 {macros.calories} cal/day</div>
        <div className="m-target-pill">🥩 {macros.protein}g protein</div>
        <div className="m-target-pill">🍚 {macros.carbs}g carbs</div>
        <div className="m-target-pill">🥑 {macros.fat}g fat</div>
        <div className="m-target-pill m-target-pill--muted">Based on {profile.weightKg}kg · {profile.activityLevel} · {goalLabel}</div>
      </section>

      {/* DAILY OVERVIEW */}
      <section className="m-daily-overview">
        <div className="m-cal-progress">
          <div className="m-cal-bar-bg">
            <div className="m-cal-bar-fill" style={{ width: `${Math.min((loggedCals / plan.calories) * 100, 100)}%` }} />
          </div>
          <div className="m-cal-nums">
            <span><strong>{loggedCals}</strong> eaten</span>
            <span>{plan.calories - loggedCals > 0 ? `${plan.calories - loggedCals} remaining` : 'Target hit!'}</span>
          </div>
        </div>
        <div className="m-macros-row">
          <MacroRing label="Protein" value={loggedProtein} max={macros.protein} color="var(--brand)" />
          <MacroRing label="Carbs" value={loggedCarbs} max={macros.carbs} color="var(--gold)" />
          <MacroRing label="Fat" value={loggedFat} max={macros.fat} color="var(--accent)" />
        </div>
      </section>

      {/* MEALS */}
      <section className="m-meals-section">
        <h3 className="m-section-label">Today's Meals — {plan.name}</h3>
        <div className="m-meals-list">
          {plan.meals.map((meal, i) => (
            <MealCard key={i} meal={meal} onLog={handleLog} />
          ))}
        </div>
      </section>

      {/* QUICK ADD */}
      <section className="m-quick-add">
        <button type="button" className="m-btn-outline" onClick={() => setShowCustom(!showCustom)}>
          {showCustom ? 'Cancel' : '+ Log Custom Food'}
        </button>
        {showCustom && (
          <div className="m-custom-form">
            <input className="m-auth-input" placeholder="Food name" value={customFood} onChange={e => setCustomFood(e.target.value)} />
            <input className="m-auth-input" placeholder="Calories" type="number" value={customCal} onChange={e => setCustomCal(e.target.value)} />
            <button type="button" className="m-btn-sm m-btn-sm--brand" onClick={() => { setCustomFood(''); setCustomCal(''); setShowCustom(false) }}>Add Entry</button>
          </div>
        )}
      </section>

      <WaterTracker />

      {/* NUTRITION TIPS — personalised */}
      <section className="m-nutrition-tips">
        <h3 className="m-section-label">Nutrition Tips for Your Profile</h3>
        <div className="m-tips-grid">
          <div className="m-tip-card">
            <span className="m-tip-icon">🥩</span>
            <h4>Your Protein Target: {macros.protein}g/day</h4>
            <p>That's {Math.round(macros.protein / profile.weightKg * 10) / 10}g per kg of bodyweight. Hit at least 30g per meal to maximise muscle protein synthesis.</p>
          </div>
          <div className="m-tip-card">
            <span className="m-tip-icon">🫗</span>
            <h4>Hydration: {Math.round(profile.weightKg * 0.033 * 10) / 10}L/day</h4>
            <p>Based on your weight of {profile.weightKg}kg, aim for ~{Math.round(profile.weightKg * 0.033 * 10) / 10} litres daily. More if training or on GLP-1 protocols.</p>
          </div>
          {profile.goal === 'lose' && (
            <div className="m-tip-card">
              <span className="m-tip-icon">📉</span>
              <h4>Deficit: ~{Math.round(macros.calories * 0.25)} cal below TDEE</h4>
              <p>Your plan creates a moderate 20% deficit. This rate supports ~0.5–1kg loss per week while preserving muscle.</p>
            </div>
          )}
          {profile.goal === 'gain' && (
            <div className="m-tip-card">
              <span className="m-tip-icon">📈</span>
              <h4>Surplus: ~{Math.round(macros.calories * 0.13)} cal above TDEE</h4>
              <p>A controlled 15% surplus promotes lean mass gain of ~0.25–0.5kg per week without excessive fat accumulation.</p>
            </div>
          )}
          <div className="m-tip-card">
            <span className="m-tip-icon">🕐</span>
            <h4>Meal Timing</h4>
            <p>Eat within 1 hour of waking. Space meals 3–4 hours apart. Have your largest meal post-workout for optimal partitioning.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
