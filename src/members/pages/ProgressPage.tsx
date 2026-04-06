import { useState } from 'react'
import { getInitialWeightData, getInitialWaterData } from '../data/memberData'
import { useAuth } from '../context/AuthContext'

function daysSince(dateStr: string) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

export default function ProgressPage() {
  const { user } = useAuth()
  const [weights, setWeights] = useState(getInitialWeightData)
  const [water] = useState(getInitialWaterData)
  const [newWeight, setNewWeight] = useState('')
  const [activeTab, setActiveTab] = useState<'weight' | 'measurements' | 'photos'>('weight')
  const [measurements, setMeasurements] = useState({
    chest: 102,
    waist: 92,
    hips: 98,
    arms: 36,
    thighs: 58,
  })
  const [editingMeasure, setEditingMeasure] = useState(false)

  const startWeight = weights[0]?.weight ?? 0
  const currentWeight = weights[weights.length - 1]?.weight ?? 0
  const totalChange = Math.round((startWeight - currentWeight) * 10) / 10
  const minW = Math.min(...weights.map(w => w.weight))
  const maxW = Math.max(...weights.map(w => w.weight))
  const range = maxW - minW || 1
  const daysOnProtocol = user ? daysSince(user.joinDate) : 0
  const avgWaterPerDay = water.length > 0 ? Math.round(water.reduce((s, w) => s + w.glasses, 0) / water.length * 10) / 10 : 0

  const addWeight = () => {
    const val = parseFloat(newWeight)
    if (isNaN(val) || val < 30 || val > 300) return
    const today = new Date().toISOString().split('T')[0]
    setWeights(prev => {
      const filtered = prev.filter(w => w.date !== today)
      return [...filtered, { date: today, weight: val }].sort((a, b) => a.date.localeCompare(b.date))
    })
    setNewWeight('')
  }

  return (
    <div className="m-progress">
      <div className="m-page-header">
        <h2>Progress</h2>
        <p>Track your journey and see how far you've come</p>
      </div>

      {/* OVERVIEW STATS */}
      <section className="m-progress-stats">
        <div className="m-pstat">
          <span className="m-pstat-val" style={{ color: totalChange > 0 ? 'var(--accent)' : 'var(--danger)' }}>
            {totalChange > 0 ? '-' : '+'}{Math.abs(totalChange)} kg
          </span>
          <span className="m-pstat-label">Total change</span>
        </div>
        <div className="m-pstat">
          <span className="m-pstat-val">{currentWeight} kg</span>
          <span className="m-pstat-label">Current weight</span>
        </div>
        <div className="m-pstat">
          <span className="m-pstat-val">{daysOnProtocol}</span>
          <span className="m-pstat-label">Days active</span>
        </div>
        <div className="m-pstat">
          <span className="m-pstat-val">{avgWaterPerDay}</span>
          <span className="m-pstat-label">Avg water/day</span>
        </div>
      </section>

      {/* TABS */}
      <div className="m-plan-tabs">
        <button type="button" className={`m-plan-tab ${activeTab === 'weight' ? 'm-plan-tab--active' : ''}`} onClick={() => setActiveTab('weight')}>Weight</button>
        <button type="button" className={`m-plan-tab ${activeTab === 'measurements' ? 'm-plan-tab--active' : ''}`} onClick={() => setActiveTab('measurements')}>Measurements</button>
        <button type="button" className={`m-plan-tab ${activeTab === 'photos' ? 'm-plan-tab--active' : ''}`} onClick={() => setActiveTab('photos')}>Progress Photos</button>
      </div>

      {activeTab === 'weight' && (
        <>
          {/* WEIGHT CHART */}
          <section className="m-weight-chart">
            <h3 className="m-section-label">Weight Over Time</h3>
            <div className="m-chart-container">
              <div className="m-chart-y-axis">
                <span>{maxW.toFixed(1)}</span>
                <span>{((maxW + minW) / 2).toFixed(1)}</span>
                <span>{minW.toFixed(1)}</span>
              </div>
              <div className="m-chart-area">
                <svg viewBox={`0 0 ${weights.length * 50} 200`} className="m-chart-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={weights.map((w, i) => {
                      const x = i * 50 + 25
                      const y = 200 - ((w.weight - minW) / range) * 180 - 10
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                    }).join(' ') + ` L ${(weights.length - 1) * 50 + 25} 200 L 25 200 Z`}
                    fill="url(#chartGrad)"
                  />
                  <polyline
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="2.5"
                    points={weights.map((w, i) => {
                      const x = i * 50 + 25
                      const y = 200 - ((w.weight - minW) / range) * 180 - 10
                      return `${x},${y}`
                    }).join(' ')}
                  />
                  {weights.map((w, i) => {
                    const x = i * 50 + 25
                    const y = 200 - ((w.weight - minW) / range) * 180 - 10
                    return <circle key={i} cx={x} cy={y} r="4" fill="var(--brand)" stroke="var(--bg)" strokeWidth="2" />
                  })}
                </svg>
                <div className="m-chart-x-labels">
                  {weights.filter((_, i) => i % 3 === 0 || i === weights.length - 1).map((w, i) => (
                    <span key={i}>{new Date(w.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* LOG WEIGHT */}
          <section className="m-weight-log">
            <h3 className="m-section-label">Log Today's Weight</h3>
            <div className="m-weight-form">
              <input
                type="number"
                step="0.1"
                className="m-auth-input"
                placeholder="e.g. 86.5"
                value={newWeight}
                onChange={e => setNewWeight(e.target.value)}
              />
              <span className="m-weight-unit">kg</span>
              <button type="button" className="m-btn-sm m-btn-sm--brand" onClick={addWeight}>Log Weight</button>
            </div>
          </section>

          {/* WEIGHT LOG TABLE */}
          <section className="m-weight-table">
            <h3 className="m-section-label">History</h3>
            <div className="m-table-wrap">
              <table className="m-table">
                <thead>
                  <tr><th>Date</th><th>Weight</th><th>Change</th></tr>
                </thead>
                <tbody>
                  {[...weights].reverse().slice(0, 14).map((w, i, arr) => {
                    const prev = arr[i + 1]
                    const change = prev ? Math.round((w.weight - prev.weight) * 10) / 10 : 0
                    return (
                      <tr key={w.date}>
                        <td>{new Date(w.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</td>
                        <td><strong>{w.weight} kg</strong></td>
                        <td style={{ color: change <= 0 ? 'var(--accent)' : 'var(--danger)' }}>
                          {change === 0 ? '—' : `${change > 0 ? '+' : ''}${change} kg`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {activeTab === 'measurements' && (
        <section className="m-measurements">
          <h3 className="m-section-label">Body Measurements (cm)</h3>
          <div className="m-measure-grid">
            {Object.entries(measurements).map(([key, val]) => (
              <div key={key} className="m-measure-card">
                <span className="m-measure-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                {editingMeasure ? (
                  <input
                    type="number"
                    className="m-measure-input"
                    value={val}
                    onChange={e => setMeasurements(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }))}
                  />
                ) : (
                  <span className="m-measure-val">{val} cm</span>
                )}
              </div>
            ))}
          </div>
          <button type="button" className="m-btn-outline" onClick={() => setEditingMeasure(!editingMeasure)}>
            {editingMeasure ? 'Save Measurements' : 'Update Measurements'}
          </button>
        </section>
      )}

      {activeTab === 'photos' && (
        <section className="m-photos">
          <h3 className="m-section-label">Progress Photos</h3>
          <p className="m-photos-intro">Take consistent photos every 2 weeks. Same lighting, same angle, same time of day. Front, side, and back views.</p>
          <div className="m-photos-grid">
            <div className="m-photo-slot">
              <div className="m-photo-placeholder">
                <span>📸</span>
                <span>Day 1</span>
              </div>
            </div>
            <div className="m-photo-slot">
              <div className="m-photo-placeholder">
                <span>📸</span>
                <span>Week 2</span>
              </div>
            </div>
            <div className="m-photo-slot">
              <div className="m-photo-placeholder m-photo-placeholder--next">
                <span>+</span>
                <span>Add Photo</span>
              </div>
            </div>
          </div>
          <p className="m-photos-tip">Photos are stored locally on your device only. We never upload or access your photos.</p>
        </section>
      )}
    </div>
  )
}
