import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getInitialDoseData, type DoseEntry } from '../data/memberData'

function daysSince(dateStr: string) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

export default function ProtocolPage() {
  const { user } = useAuth()
  const [doses, setDoses] = useState<DoseEntry[]>(getInitialDoseData)
  const [showGuide, setShowGuide] = useState(false)

  const daysOnProtocol = user ? daysSince(user.joinDate) : 0
  const totalDays = user?.plan === '3-month' ? 90 : 30
  const progressPct = Math.min((daysOnProtocol / totalDays) * 100, 100)
  const dosesTaken = doses.filter(d => d.taken).length
  const compliance = doses.length > 0 ? Math.round((dosesTaken / doses.length) * 100) : 0

  const today = new Date().toISOString().split('T')[0]
  const todayDose = doses.find(d => d.date === today)

  const logDose = () => {
    const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    setDoses(prev => {
      const existing = prev.find(d => d.date === today)
      if (existing) {
        return prev.map(d => d.date === today ? { ...d, taken: true, time: now } : d)
      }
      return [...prev, { date: today, taken: true, time: now }]
    })
  }

  const phase = daysOnProtocol <= 7 ? 'Loading' : daysOnProtocol <= 21 ? 'Building' : 'Maintenance'

  return (
    <div className="m-protocol">
      <div className="m-page-header">
        <h2>Protocol</h2>
        <p>Your {user?.compound} dosing schedule and compound information</p>
      </div>

      {/* PROTOCOL STATUS */}
      <section className="m-protocol-status">
        <div className="m-protocol-ring-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--brand)" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - progressPct / 100)}`}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div className="m-protocol-ring-inner">
            <span className="m-protocol-ring-day">Day {daysOnProtocol}</span>
            <span className="m-protocol-ring-total">of {totalDays}</span>
          </div>
        </div>
        <div className="m-protocol-info">
          <div className="m-protocol-compound">
            <span className="m-protocol-sku">{user?.compound}</span>
            <span className="m-protocol-plan">{user?.plan === '3-month' ? '90-Day Protocol' : '30-Day Protocol'}</span>
          </div>
          <div className="m-protocol-meta-grid">
            <div className="m-protocol-meta">
              <span className="m-protocol-meta-label">Phase</span>
              <span className="m-protocol-meta-val">{phase}</span>
            </div>
            <div className="m-protocol-meta">
              <span className="m-protocol-meta-label">Compliance</span>
              <span className="m-protocol-meta-val" style={{ color: compliance >= 90 ? 'var(--accent)' : 'var(--gold)' }}>{compliance}%</span>
            </div>
            <div className="m-protocol-meta">
              <span className="m-protocol-meta-label">Next Dose</span>
              <span className="m-protocol-meta-val">{todayDose?.taken ? 'Done today ✓' : 'Today'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* LOG TODAY'S DOSE */}
      <section className="m-dose-log">
        <div className={`m-dose-card ${todayDose?.taken ? 'm-dose-card--done' : ''}`}>
          <div className="m-dose-card-left">
            <span className="m-dose-icon">{todayDose?.taken ? '✅' : '💉'}</span>
            <div>
              <h4>{todayDose?.taken ? 'Dose Logged' : 'Log Today\'s Dose'}</h4>
              <p>{todayDose?.taken ? `Taken at ${todayDose.time}` : 'Tap the button after administering your dose'}</p>
            </div>
          </div>
          {!todayDose?.taken && (
            <button type="button" className="m-dose-btn" onClick={logDose}>
              Log Dose ✓
            </button>
          )}
        </div>
      </section>

      {/* DOSE CALENDAR */}
      <section className="m-dose-calendar">
        <h3 className="m-section-label">Dose History (Last 14 Days)</h3>
        <div className="m-dose-grid">
          {doses.map((d, i) => (
            <div
              key={i}
              className={`m-dose-day ${d.taken ? 'm-dose-day--taken' : 'm-dose-day--missed'} ${d.date === today ? 'm-dose-day--today' : ''}`}
              title={`${d.date}: ${d.taken ? `Taken at ${d.time}` : 'Missed'}`}
            >
              <span className="m-dose-day-label">
                {new Date(d.date).toLocaleDateString('en-GB', { weekday: 'narrow' })}
              </span>
              <span className="m-dose-day-icon">{d.taken ? '✓' : '✗'}</span>
              <span className="m-dose-day-date">
                {new Date(d.date).getDate()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DOSING GUIDE */}
      <section className="m-dosing-guide">
        <button type="button" className="m-guide-toggle" onClick={() => setShowGuide(!showGuide)}>
          <span>📋 Personalised Dosing Guide</span>
          <span>{showGuide ? '−' : '+'}</span>
        </button>
        {showGuide && (
          <div className="m-guide-body">
            <div className="m-guide-phase">
              <h4>Phase 1: Loading (Days 1–7)</h4>
              <p>Start at the lowest effective dose. This lets your body recognise the signalling molecules without overwhelming it. Inject subcutaneously in the abdomen or thigh. Rotate sites daily.</p>
            </div>
            <div className="m-guide-phase">
              <h4>Phase 2: Building (Days 8–21)</h4>
              <p>Gradually increase to your target dose as per your personalised schedule. Most users begin noticing effects during this phase — energy shifts, appetite changes, or improved recovery depending on compound.</p>
            </div>
            <div className="m-guide-phase">
              <h4>Phase 3: Maintenance (Day 22+)</h4>
              <p>Maintain your target dose for the remainder of the protocol. This is where compounding effects deliver the strongest results. Do not increase dose beyond what's prescribed.</p>
            </div>
            <div className="m-guide-important">
              <strong>Important:</strong> Store reconstituted vials at 2–8°C. Use within 28 days of reconstitution. If you miss a dose, take it as soon as you remember — do not double up. Contact our team if you have questions.
            </div>
          </div>
        )}
      </section>

      {/* STORAGE & SAFETY */}
      <section className="m-protocol-safety">
        <h3 className="m-section-label">Storage & Safety</h3>
        <div className="m-safety-grid">
          <div className="m-safety-item">
            <span className="m-safety-icon">🧊</span>
            <h4>Refrigerate at 2–8°C</h4>
            <p>Once reconstituted, keep your vial in the fridge. Do not freeze.</p>
          </div>
          <div className="m-safety-item">
            <span className="m-safety-icon">🔄</span>
            <h4>Rotate Injection Sites</h4>
            <p>Alternate between abdomen, thigh, and upper arm. Keep 1 inch between points.</p>
          </div>
          <div className="m-safety-item">
            <span className="m-safety-icon">🧴</span>
            <h4>Clean Before Injection</h4>
            <p>Swab the injection site and vial top with alcohol. Let dry before proceeding.</p>
          </div>
          <div className="m-safety-item">
            <span className="m-safety-icon">📅</span>
            <h4>Use Within 28 Days</h4>
            <p>Reconstituted peptides remain stable for 28 days when stored properly.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
