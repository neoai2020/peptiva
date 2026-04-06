import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, type UserProfile } from '../context/AuthContext'
import { getProfileSummary } from '../data/planEngine'

const STEPS = ['Basics', 'Body', 'Goals', 'Training', 'Review']

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="ob-steps">
      {STEPS.map((label, i) => (
        <div key={label} className={`ob-step ${i < current ? 'ob-step--done' : ''} ${i === current ? 'ob-step--active' : ''}`}>
          <span className="ob-step-dot">{i < current ? '✓' : i + 1}</span>
          <span className="ob-step-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

function OptionGrid({ options, value, onChange }: { options: { id: string; icon: string; label: string; sub?: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="ob-options">
      {options.map(o => (
        <button
          key={o.id}
          type="button"
          className={`ob-option ${value === o.id ? 'ob-option--active' : ''}`}
          onClick={() => onChange(o.id)}
        >
          <span className="ob-option-icon">{o.icon}</span>
          <span className="ob-option-label">{o.label}</span>
          {o.sub && <span className="ob-option-sub">{o.sub}</span>}
        </button>
      ))}
    </div>
  )
}

export default function OnboardingPage() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<UserProfile>({
    gender: 'male',
    age: 30,
    heightCm: 175,
    weightKg: 85,
    goalWeightKg: 78,
    activityLevel: 'moderate',
    goal: 'lose',
    dietPref: 'any',
    trainingExp: 'intermediate',
    trainingDays: 4,
    injuries: '',
  })

  const set = <K extends keyof UserProfile>(key: K, val: UserProfile[K]) =>
    setForm(prev => ({ ...prev, [key]: val }))

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const finish = () => {
    updateUser({ profile: form })
    navigate('/members')
  }

  const summary = getProfileSummary(form)

  return (
    <div className="ob-page">
      <div className="ob-card">
        <div className="ob-header">
          <span className="ob-logo">⬡</span>
          <h1>Let's personalise your plan</h1>
          <p>We'll use this to build your custom nutrition, training, and protocol plan.</p>
        </div>

        <StepIndicator current={step} />

        <div className="ob-body">
          {/* STEP 0: Basics */}
          {step === 0 && (
            <div className="ob-section">
              <h2>About you</h2>
              <div className="ob-field">
                <label className="ob-label">Gender</label>
                <OptionGrid
                  options={[
                    { id: 'male', icon: '♂️', label: 'Male' },
                    { id: 'female', icon: '♀️', label: 'Female' },
                  ]}
                  value={form.gender}
                  onChange={v => set('gender', v as UserProfile['gender'])}
                />
              </div>
              <div className="ob-field">
                <label className="ob-label">Age</label>
                <div className="ob-slider-row">
                  <input type="range" min={16} max={80} value={form.age} onChange={e => set('age', +e.target.value)} className="ob-range" />
                  <span className="ob-range-val">{form.age} years</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Body */}
          {step === 1 && (
            <div className="ob-section">
              <h2>Your body</h2>
              <div className="ob-field">
                <label className="ob-label">Height</label>
                <div className="ob-slider-row">
                  <input type="range" min={140} max={210} value={form.heightCm} onChange={e => set('heightCm', +e.target.value)} className="ob-range" />
                  <span className="ob-range-val">{form.heightCm} cm <span className="ob-range-alt">({Math.floor(form.heightCm / 30.48)}'{Math.round((form.heightCm / 2.54) % 12)}")</span></span>
                </div>
              </div>
              <div className="ob-field">
                <label className="ob-label">Current Weight</label>
                <div className="ob-slider-row">
                  <input type="range" min={40} max={180} step={0.5} value={form.weightKg} onChange={e => set('weightKg', +e.target.value)} className="ob-range" />
                  <span className="ob-range-val">{form.weightKg} kg <span className="ob-range-alt">({Math.round(form.weightKg * 2.205)} lbs)</span></span>
                </div>
              </div>
              <div className="ob-field">
                <label className="ob-label">Goal Weight</label>
                <div className="ob-slider-row">
                  <input type="range" min={40} max={180} step={0.5} value={form.goalWeightKg} onChange={e => set('goalWeightKg', +e.target.value)} className="ob-range" />
                  <span className="ob-range-val">{form.goalWeightKg} kg <span className="ob-range-alt">({Math.round(form.goalWeightKg * 2.205)} lbs)</span></span>
                </div>
              </div>
              <div className="ob-field">
                <label className="ob-label">Activity Level</label>
                <OptionGrid
                  options={[
                    { id: 'sedentary', icon: '🪑', label: 'Sedentary', sub: 'Desk job, little exercise' },
                    { id: 'light', icon: '🚶', label: 'Light', sub: '1–2 days/week' },
                    { id: 'moderate', icon: '🏃', label: 'Moderate', sub: '3–4 days/week' },
                    { id: 'active', icon: '💪', label: 'Active', sub: '5–6 days/week' },
                    { id: 'very-active', icon: '🏋️', label: 'Very Active', sub: 'Intense daily training' },
                  ]}
                  value={form.activityLevel}
                  onChange={v => set('activityLevel', v as UserProfile['activityLevel'])}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Goals */}
          {step === 2 && (
            <div className="ob-section">
              <h2>Your goals</h2>
              <div className="ob-field">
                <label className="ob-label">Primary Goal</label>
                <OptionGrid
                  options={[
                    { id: 'lose', icon: '🔥', label: 'Lose Fat', sub: 'Cut body fat, lean out' },
                    { id: 'maintain', icon: '⚖️', label: 'Maintain', sub: 'Recomposition, stay lean' },
                    { id: 'gain', icon: '💪', label: 'Build Muscle', sub: 'Lean bulk, gain strength' },
                  ]}
                  value={form.goal}
                  onChange={v => set('goal', v as UserProfile['goal'])}
                />
              </div>
              <div className="ob-field">
                <label className="ob-label">Dietary Preference</label>
                <OptionGrid
                  options={[
                    { id: 'any', icon: '🍽️', label: 'Flexible', sub: 'No restrictions' },
                    { id: 'high-protein', icon: '🥩', label: 'High Protein', sub: 'Prioritise protein intake' },
                    { id: 'low-carb', icon: '🥑', label: 'Low Carb', sub: 'Higher fat, fewer carbs' },
                    { id: 'balanced', icon: '⚖️', label: 'Balanced', sub: 'Even macro split' },
                  ]}
                  value={form.dietPref}
                  onChange={v => set('dietPref', v as UserProfile['dietPref'])}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Training */}
          {step === 3 && (
            <div className="ob-section">
              <h2>Training experience</h2>
              <div className="ob-field">
                <label className="ob-label">Experience Level</label>
                <OptionGrid
                  options={[
                    { id: 'beginner', icon: '🌱', label: 'Beginner', sub: 'New to resistance training' },
                    { id: 'intermediate', icon: '📈', label: 'Intermediate', sub: '1–3 years consistent' },
                    { id: 'advanced', icon: '🏆', label: 'Advanced', sub: '3+ years, knows compounds' },
                  ]}
                  value={form.trainingExp}
                  onChange={v => set('trainingExp', v as UserProfile['trainingExp'])}
                />
              </div>
              <div className="ob-field">
                <label className="ob-label">How many days can you train per week?</label>
                <div className="ob-slider-row">
                  <input type="range" min={2} max={6} value={form.trainingDays} onChange={e => set('trainingDays', +e.target.value)} className="ob-range" />
                  <span className="ob-range-val">{form.trainingDays} days/week</span>
                </div>
              </div>
              <div className="ob-field">
                <label className="ob-label">Any injuries or limitations? (optional)</label>
                <input
                  type="text"
                  className="m-auth-input"
                  placeholder="e.g. Bad left knee, shoulder impingement..."
                  value={form.injuries}
                  onChange={e => set('injuries', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div className="ob-section">
              <h2>Your personalised plan</h2>
              <p className="ob-review-sub">Based on your inputs, here's what we've calculated for you:</p>

              <div className="ob-review-grid">
                <div className="ob-review-card">
                  <span className="ob-review-label">BMI</span>
                  <span className="ob-review-val">{summary.bmi}</span>
                </div>
                <div className="ob-review-card">
                  <span className="ob-review-label">Maintenance (TDEE)</span>
                  <span className="ob-review-val">{summary.tdee} cal</span>
                </div>
                <div className="ob-review-card ob-review-card--hl">
                  <span className="ob-review-label">Your Daily Target</span>
                  <span className="ob-review-val ob-review-val--brand">{summary.target} cal</span>
                </div>
                <div className="ob-review-card">
                  <span className="ob-review-label">Protein</span>
                  <span className="ob-review-val">{summary.macros.protein}g</span>
                </div>
                <div className="ob-review-card">
                  <span className="ob-review-label">Carbs</span>
                  <span className="ob-review-val">{summary.macros.carbs}g</span>
                </div>
                <div className="ob-review-card">
                  <span className="ob-review-label">Fat</span>
                  <span className="ob-review-val">{summary.macros.fat}g</span>
                </div>
              </div>

              <div className="ob-review-summary">
                <div className="ob-review-row">
                  <span>Goal</span>
                  <strong>{form.goal === 'lose' ? 'Fat Loss' : form.goal === 'gain' ? 'Muscle Gain' : 'Maintenance'}</strong>
                </div>
                <div className="ob-review-row">
                  <span>Current → Target</span>
                  <strong>{form.weightKg} kg → {form.goalWeightKg} kg</strong>
                </div>
                <div className="ob-review-row">
                  <span>Training</span>
                  <strong>{form.trainingDays} days/week · {form.trainingExp}</strong>
                </div>
                <div className="ob-review-row">
                  <span>Diet Style</span>
                  <strong>{form.dietPref === 'any' ? 'Flexible' : form.dietPref === 'high-protein' ? 'High Protein' : form.dietPref === 'low-carb' ? 'Low Carb' : 'Balanced'}</strong>
                </div>
                <div className="ob-review-row">
                  <span>Compound</span>
                  <strong>{user?.compound}</strong>
                </div>
              </div>

              <div className="ob-review-note">
                Your meal plans, macro targets, and workout programme will all be built from these numbers.
                You can update your profile anytime from Settings.
              </div>
            </div>
          )}
        </div>

        <div className="ob-footer">
          {step > 0 && (
            <button type="button" className="ob-back-btn" onClick={back}>← Back</button>
          )}
          <div className="ob-footer-spacer" />
          {step < STEPS.length - 1 ? (
            <button type="button" className="ob-next-btn" onClick={next}>Next →</button>
          ) : (
            <button type="button" className="ob-finish-btn" onClick={finish}>Build My Plan →</button>
          )}
        </div>
      </div>
    </div>
  )
}
