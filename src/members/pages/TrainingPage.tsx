import { useState, useMemo } from 'react'
import { type Workout, type Exercise } from '../data/memberData'
import { useAuth } from '../context/AuthContext'
import { generateWorkoutPlan } from '../data/planEngine'

function ExerciseRow({ ex, idx }: { ex: Exercise; idx: number }) {
  const [done, setDone] = useState(false)
  return (
    <div className={`m-exercise-row ${done ? 'm-exercise-row--done' : ''}`} onClick={() => setDone(!done)}>
      <span className="m-exercise-num">{idx + 1}</span>
      <div className="m-exercise-info">
        <span className="m-exercise-name">{ex.name}</span>
        <span className="m-exercise-detail">{ex.sets} × {ex.reps} · Rest {ex.rest}</span>
        {ex.notes && <span className="m-exercise-notes">{ex.notes}</span>}
      </div>
      <span className="m-exercise-check">{done ? '✓' : ''}</span>
    </div>
  )
}

function WorkoutCard({ workout, expanded, onToggle }: { workout: Workout; expanded: boolean; onToggle: () => void }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const isToday = workout.day === today

  return (
    <div className={`m-workout-card ${isToday ? 'm-workout-card--today' : ''} ${expanded ? 'm-workout-card--expanded' : ''}`}>
      <button type="button" className="m-workout-header" onClick={onToggle}>
        <div className="m-workout-header-left">
          {isToday && <span className="m-today-badge">TODAY</span>}
          <h4>{workout.name}</h4>
          <span className="m-workout-meta">{workout.day} · {workout.duration} · {workout.focus}</span>
        </div>
        <span className="m-workout-toggle">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && (
        <div className="m-workout-body">
          <div className="m-workout-summary">
            <span>🏋️ {workout.exercises.length} exercises</span>
            <span>⏱️ {workout.duration}</span>
            <span>🎯 {workout.focus}</span>
          </div>
          <div className="m-exercises-list">
            {workout.exercises.map((ex, i) => (
              <ExerciseRow key={i} ex={ex} idx={i} />
            ))}
          </div>
          <button type="button" className="m-workout-complete-btn">Complete Workout ✓</button>
        </div>
      )}
    </div>
  )
}

export default function TrainingPage() {
  const { user } = useAuth()
  const profile = user!.profile!
  const workouts = useMemo(() => generateWorkoutPlan(profile), [profile])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [workoutHistory] = useState([
    { date: 'Yesterday', name: 'Push Day', duration: '48 min' },
    { date: '2 days ago', name: 'Pull Day', duration: '45 min' },
    { date: '4 days ago', name: 'Legs', duration: '52 min' },
  ])

  const expLabel = profile.trainingExp === 'beginner' ? 'Beginner' : profile.trainingExp === 'advanced' ? 'Advanced' : 'Intermediate'

  return (
    <div className="m-training">
      <div className="m-page-header">
        <h2>Training</h2>
        <p>Your {profile.trainingDays}-day {expLabel.toLowerCase()} programme — built for your goals</p>
      </div>

      {/* PLAN SUMMARY */}
      <section className="m-targets-bar">
        <div className="m-target-pill">🏋️ {profile.trainingDays} days/week</div>
        <div className="m-target-pill">📊 {expLabel} level</div>
        <div className="m-target-pill">🎯 {profile.goal === 'lose' ? 'Fat Loss' : profile.goal === 'gain' ? 'Muscle Gain' : 'Maintenance'}</div>
        {profile.injuries && <div className="m-target-pill m-target-pill--warn">⚠️ {profile.injuries}</div>}
      </section>

      {/* WEEKLY OVERVIEW */}
      <section className="m-week-overview">
        <h3 className="m-section-label">This Week</h3>
        <div className="m-week-days">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => {
            const fullDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]
            const workout = workouts.find(w => w.day === fullDay)
            const today = new Date().getDay()
            const dayIdx = i === 6 ? 0 : i + 1
            const isToday = today === dayIdx
            return (
              <div key={d} className={`m-week-day ${workout ? 'm-week-day--active' : ''} ${isToday ? 'm-week-day--today' : ''}`}>
                <span className="m-week-day-name">{d}</span>
                <span className="m-week-day-dot">{workout ? '●' : '○'}</span>
                {workout && <span className="m-week-day-label">{workout.focus.split(',')[0].split(' ')[0]}</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* WORKOUTS */}
      <section className="m-workouts-section">
        <h3 className="m-section-label">Your Workouts</h3>
        <div className="m-workouts-list">
          {workouts.map(w => (
            <WorkoutCard
              key={w.id}
              workout={w}
              expanded={expandedId === w.id}
              onToggle={() => setExpandedId(expandedId === w.id ? null : w.id)}
            />
          ))}
        </div>
      </section>

      {/* HISTORY */}
      <section className="m-workout-history">
        <h3 className="m-section-label">Recent Workouts</h3>
        <div className="m-history-list">
          {workoutHistory.map((h, i) => (
            <div key={i} className="m-history-item">
              <div className="m-history-icon">✓</div>
              <div>
                <span className="m-history-name">{h.name}</span>
                <span className="m-history-meta">{h.date} · {h.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIPS — personalised */}
      <section className="m-training-tips">
        <h3 className="m-section-label">Training Tips</h3>
        <div className="m-tips-grid">
          {profile.trainingExp === 'beginner' && (
            <div className="m-tip-card">
              <span className="m-tip-icon">🌱</span>
              <h4>Focus on Form</h4>
              <p>As a beginner, perfect form trumps heavy weight. Master each movement pattern before adding load. Film yourself to check.</p>
            </div>
          )}
          {profile.trainingExp === 'advanced' && (
            <div className="m-tip-card">
              <span className="m-tip-icon">📊</span>
              <h4>Periodisation</h4>
              <p>With your experience, vary intensity weekly. Heavy week → moderate → deload. This prevents plateaus and manages fatigue.</p>
            </div>
          )}
          <div className="m-tip-card">
            <span className="m-tip-icon">🎯</span>
            <h4>Progressive Overload</h4>
            <p>Add 1–2 reps per set or 2.5kg per week. Small jumps compound to massive strength gains over your {user?.plan === '3-month' ? '90' : '30'}-day protocol.</p>
          </div>
          <div className="m-tip-card">
            <span className="m-tip-icon">⏱️</span>
            <h4>Rest Periods</h4>
            <p>Stick to prescribed rest times. 60–90s for hypertrophy, 2–3min for strength. Use a timer — most people rest too long.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
