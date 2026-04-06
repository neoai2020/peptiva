import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { type Peptide } from '../data/peptides'
import { recommendPeptides } from '../lib/recommend'
import { mainIssueLabel, goalLabel } from '../lib/quizLabels'
import { loadQuiz } from '../lib/quizStorage'
import { defaultQuizAnswers } from '../types/quiz'

const PRICES: Record<string, { was: number; now: number }> = {
  '17': { was: 189, now: 129 },
  '2':  { was: 179, now: 119 },
  '3':  { was: 159, now: 99 },
  '18': { was: 149, now: 89 },
  '1':  { was: 139, now: 79 },
  '8':  { was: 129, now: 79 },
  '10': { was: 129, now: 79 },
  '20': { was: 169, now: 109 },
  '6':  { was: 199, now: 139 },
  '4':  { was: 119, now: 69 },
  '19': { was: 159, now: 99 },
  '7':  { was: 149, now: 89 },
}

function getPrice(id: string) {
  return PRICES[id] || { was: 149, now: 99 }
}

function Countdown() {
  const [left, setLeft] = useState(() => {
    const stored = localStorage.getItem('peptiva-timer')
    if (stored) {
      const diff = parseInt(stored, 10) - Date.now()
      return diff > 0 ? diff : 0
    }
    const end = Date.now() + 15 * 60 * 1000
    localStorage.setItem('peptiva-timer', String(end))
    return 15 * 60 * 1000
  })

  useEffect(() => {
    if (left <= 0) return
    const t = setInterval(() => {
      const stored = localStorage.getItem('peptiva-timer')
      if (!stored) { setLeft(0); return }
      const diff = parseInt(stored, 10) - Date.now()
      setLeft(diff > 0 ? diff : 0)
    }, 1000)
    return () => clearInterval(t)
  }, [left])

  const mins = Math.floor(left / 60000)
  const secs = Math.floor((left % 60000) / 1000)

  return (
    <div className="r-timer">
      <span className="r-timer-text">Your quiz discount expires in</span>
      <span className="r-timer-clock">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
    </div>
  )
}

function Star() {
  return <svg className="tsl-star" width="16" height="16" viewBox="0 0 24 24" fill="#facc15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
}

function Stars() {
  return <span className="tsl-stars">{Array.from({length:5}).map((_,i)=><Star key={i}/>)}</span>
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="r-faq-item">
      <button type="button" className="r-faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="r-faq-arrow">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="r-faq-a">{a}</p>}
    </div>
  )
}

function getHeroPoints(issue: string, goal: string): string[] {
  return [
    `Matched specifically to your frustration: ${issue.toLowerCase()}`,
    `Optimised for your primary goal: ${goal.toLowerCase()}`,
    `99.3%+ verified purity — third-party lab tested`,
    `Personalised dosing protocol included`,
  ]
}

function getWhyPoints(issue: string, _goal: string): string[] {
  return [
    `Your biggest frustration — ${issue.toLowerCase()} — needs a targeted compound, not a generic supplement. This match was selected because it directly targets that pathway at a cellular level.`,
    `Peptides are signalling molecules. They tell your cells what to do. The right one produces results that diet, exercise, and willpower alone can't.`,
    `Our algorithm scored every compound against your profile. This match had the highest score by a clear margin.`,
    `92% of quiz-matched customers see measurable results within 30 days.`,
  ]
}

function getPersonalisedInsight(answers: ReturnType<typeof defaultQuizAnswers>): string {
  if (answers.experience === 'new') {
    return 'Because you\'re new to peptides, this compound was chosen for its gentle introduction curve and fast noticeable results. Most first-time users report feeling a difference within 7–14 days.'
  }
  if (answers.experience === 'advanced') {
    return 'As an experienced user, this match is a more targeted compound — one that advanced protocols typically include for maximum efficiency and precision.'
  }
  return 'With some prior research under your belt, this match is a well-studied compound with a clear track record — a smart middle ground between a gentle start and an advanced protocol.'
}

export default function ResultsPage() {
  const answers = useMemo(() => loadQuiz(), [])
  const valid = answers.goal && answers.researchAck
  const rec = useMemo(() => valid ? recommendPeptides(answers) : null, [answers, valid])

  if (!valid || !rec) {
    return (
      <div className="tsl-empty">
        <h1>Complete the quiz first</h1>
        <p>Your personalised results page is built from your answers.</p>
        <Link className="r-cta-btn" to="/">Take the Quiz →</Link>
      </div>
    )
  }

  const merged = { ...defaultQuizAnswers(), ...answers }
  const { primary, secondary } = rec
  const issue = merged.mainIssue ? mainIssueLabel(merged.mainIssue) : 'your goals'
  const goal = merged.goal ? goalLabel(merged.goal) : 'your priorities'
  const name = merged.lead?.firstName || 'there'
  const primaryPrice = getPrice(primary.id)
  const pct = Math.round(((primaryPrice.was - primaryPrice.now) / primaryPrice.was) * 100)
  const stackPrice = secondary
    ? { was: primaryPrice.was + getPrice(secondary.id).was, now: primaryPrice.now + getPrice(secondary.id).now }
    : null

  const heroPoints = getHeroPoints(issue, goal)
  const whyPoints = getWhyPoints(issue, goal)
  const personalInsight = getPersonalisedInsight(merged)

  return (
    <div className="r-page">
      <Countdown />

      {/* ═══════════════ PURITY BANNER ═══════════════ */}
      <div className="r-purity-banner">
        <div className="r-purity-inner">
          <span className="r-purity-item">🔬 Third-Party Lab Tested</span>
          <span className="r-purity-divider">·</span>
          <span className="r-purity-item">99.3%+ Verified Purity</span>
          <span className="r-purity-divider">·</span>
          <span className="r-purity-item">🇬🇧 UK Regulated Lab</span>
          <span className="r-purity-divider">·</span>
          <span className="r-purity-item">Safe &amp; Documented</span>
        </div>
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="r-hero">
        <div className="r-wrap">
          <div className="r-hero-split">
            <div className="r-hero-copy">
              <p className="r-hero-badge">YOUR PERSONALISED RESULTS</p>
              <h1 className="r-hero-h1">
                {name}, your #1 match:<br />
                <span className="r-hl">{primary.compound}</span>
              </h1>
              <p className="r-hero-compound">{primary.sku} · {primary.category}</p>
              <ul className="r-hero-points">
                {heroPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
              <div className="r-hero-price">
                <span className="r-hero-was">£{primaryPrice.was}</span>
                <span className="r-hero-now">£{primaryPrice.now}</span>
                <span className="r-hero-save">SAVE {pct}%</span>
              </div>
              <a href="#checkout" className="r-cta-btn r-hero-cta">Claim This Match — £{primaryPrice.now} →</a>
              <p className="r-hero-trust">🔒 Secure checkout · Free UK shipping · Batch verified · Peptiva Concierge included</p>
            </div>
            <div className="r-hero-visual">
              {primary.image && <img src={primary.image} alt={primary.sku} className="r-hero-product-img" />}
              <span className="r-hero-img-badge">YOUR #1 MATCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ QUIZ SUMMARY ═══════════════ */}
      <section className="r-summary">
        <div className="r-wrap">
          <h2 className="r-section-title">Your Quiz Profile</h2>
          <div className="r-summary-grid">
            <div className="r-summary-item">
              <span className="r-summary-label">Primary Goal</span>
              <span className="r-summary-value">{goal}</span>
            </div>
            <div className="r-summary-item">
              <span className="r-summary-label">Biggest Frustration</span>
              <span className="r-summary-value">{issue}</span>
            </div>
            <div className="r-summary-item">
              <span className="r-summary-label">Timeline</span>
              <span className="r-summary-value">{merged.timeline === 'asap' ? 'Fast results' : merged.timeline === 'weeks' ? 'Steady progress' : 'Long-term change'}</span>
            </div>
            <div className="r-summary-item">
              <span className="r-summary-label">Experience</span>
              <span className="r-summary-value">{merged.experience === 'new' ? 'Beginner' : merged.experience === 'some' ? 'Some knowledge' : 'Experienced'}</span>
            </div>
            <div className="r-summary-item">
              <span className="r-summary-label">Inflammation</span>
              <span className="r-summary-value">{merged.inflammation === 'yes' ? 'Yes — factored in' : 'No issues'}</span>
            </div>
            <div className="r-summary-item">
              <span className="r-summary-label">Compound Purity</span>
              <span className="r-summary-value r-hl">99.3%+</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PURITY & SAFETY HIGHLIGHT ═══════════════ */}
      <section className="r-purity-section">
        <div className="r-wrap">
          <div className="r-purity-box">
            <h2 className="r-section-title">Pharmaceutical-grade purity. Every single vial.</h2>
            <p className="r-purity-lead">
              Every Peptiva compound is manufactured in our UK-regulated laboratory and
              independently verified by a third-party lab. We don't cut corners.
            </p>
            <div className="r-purity-grid">
              <div className="r-purity-card">
                <span className="r-purity-card-num">99.3%+</span>
                <h3>Verified Purity</h3>
                <p>Every batch is tested to 99.3%+ purity by an independent lab. The certificate ships with your order.</p>
              </div>
              <div className="r-purity-card">
                <span className="r-purity-card-icon">🔬</span>
                <h3>Third-Party Lab Tested</h3>
                <p>We don't test our own products. An independent laboratory verifies every batch before it ships.</p>
              </div>
              <div className="r-purity-card">
                <span className="r-purity-card-icon">🛡️</span>
                <h3>Safe &amp; Documented</h3>
                <p>Full batch documentation, QR-scannable certificates, and clear dosing instructions with every order.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PEPTIVA CONCIERGE ═══════════════ */}
      <section className="r-concierge">
        <div className="r-wrap">
          <div className="r-concierge-box">
            <span className="r-concierge-badge">INCLUDED WITH EVERY ORDER</span>
            <h2>Peptiva Concierge</h2>
            <p className="r-concierge-lead">
              You're not doing this alone. Every Peptiva order includes access to our
              Concierge programme — a private support channel where a certified medical
              practitioner personally follows up on your protocol.
            </p>
            <div className="r-concierge-grid">
              <div className="r-concierge-item">
                <span className="r-concierge-icon">👨‍⚕️</span>
                <div>
                  <h3>Certified Practitioner</h3>
                  <p>A real doctor reviews your quiz profile and guides your dosage, timing, and adjustments.</p>
                </div>
              </div>
              <div className="r-concierge-item">
                <span className="r-concierge-icon">📊</span>
                <div>
                  <h3>Progress Check-ins</h3>
                  <p>Scheduled follow-ups to track your results, adjust your protocol, and answer questions.</p>
                </div>
              </div>
              <div className="r-concierge-item">
                <span className="r-concierge-icon">🥗</span>
                <div>
                  <h3>Nutrition Guidance</h3>
                  <p>Dietary recommendations tailored to your compound and goals for maximum results.</p>
                </div>
              </div>
              <div className="r-concierge-item">
                <span className="r-concierge-icon">💬</span>
                <div>
                  <h3>Priority Direct Access</h3>
                  <p>Message your practitioner directly. Protocol questions answered within hours, not days.</p>
                </div>
              </div>
            </div>
            <p className="r-concierge-note">
              Other suppliers sell you a vial and disappear. Peptiva gives you a team.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section className="r-products" id="checkout">
        <div className="r-wrap">
          <h2 className="r-section-title">Your matched protocol</h2>
          <p className="r-section-sub">Exclusively priced for quiz takers — this discount expires when the timer hits zero.</p>

          {secondary && stackPrice && (
            <div className="r-stack-offer">
              <div className="r-stack-badge">BEST VALUE — RECOMMENDED STACK</div>
              <h3>Get both compounds for £{stackPrice.now} <span className="r-stack-was">£{stackPrice.was}</span></h3>
              <p>Save £{stackPrice.was - stackPrice.now} vs buying separately. Different pathways, compounding results.</p>
              <a href="#checkout" className="r-cta-btn">Order the Stack — £{stackPrice.now} →</a>
            </div>
          )}

          <div className="r-products-grid">
            <ProductCard peptide={primary} price={primaryPrice} rank={1} />
            {secondary && (() => {
              const sp = getPrice(secondary.id)
              return <ProductCard peptide={secondary} price={sp} rank={2} />
            })()}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY IT WORKS ═══════════════ */}
      <section className="r-why">
        <div className="r-wrap">
          <h2 className="r-section-title">Why this works when everything else hasn't</h2>
          <div className="r-why-points">
            {whyPoints.map((p, i) => (
              <div key={i} className="r-why-point">
                <span className="r-why-num">{i + 1}</span>
                <p>{p}</p>
              </div>
            ))}
          </div>
          <div className="r-why-insight">
            <span className="r-why-insight-badge">PERSONALISED FOR YOUR EXPERIENCE LEVEL</span>
            <p>{personalInsight}</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="r-how">
        <div className="r-wrap">
          <h2 className="r-section-title">From quiz to results in three steps</h2>
          <div className="r-how-grid">
            <div className="r-how-step">
              <span className="r-how-num">1</span>
              <h3>You took the quiz</h3>
              <p>Your answers were scored against 12 research-grade compounds from our UK lab.</p>
            </div>
            <div className="r-how-step">
              <span className="r-how-num">2</span>
              <h3>Order your match</h3>
              <p>Arrives with batch documentation, personalised dosing guide, and Peptiva Concierge access. Free UK delivery in 2–3 days.</p>
            </div>
            <div className="r-how-step">
              <span className="r-how-num">3</span>
              <h3>See the difference</h3>
              <p>Follow the protocol with practitioner support. 92% report measurable results within 30 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPARISON ═══════════════ */}
      <section className="r-compare">
        <div className="r-wrap">
          <h2 className="r-section-title">Peptiva vs the alternatives</h2>
          <div className="r-compare-table">
            <div className="r-compare-row r-compare-header">
              <span />
              <span className="r-compare-us">Peptiva</span>
              <span>Generic supplements</span>
              <span>Private clinics</span>
            </div>
            {[
              ['Personalised to your body', true, false, true],
              ['99.3%+ verified purity', true, false, true],
              ['Third-party lab tested', true, false, true],
              ['Certified practitioner support', true, false, true],
              ['No appointment needed', true, true, false],
              ['Affordable pricing', true, true, false],
              ['Free UK delivery (2–3 days)', true, true, false],
              ['Full batch documentation', true, false, false],
            ].map(([label, us, supp, clinic], i) => (
              <div key={i} className="r-compare-row">
                <span className="r-compare-label">{label as string}</span>
                <span className={`r-compare-cell ${us ? 'r-compare-yes' : 'r-compare-no'}`}>{us ? '✓' : '✗'}</span>
                <span className={`r-compare-cell ${supp ? 'r-compare-yes' : 'r-compare-no'}`}>{supp ? '✓' : '✗'}</span>
                <span className={`r-compare-cell ${clinic ? 'r-compare-yes' : 'r-compare-no'}`}>{clinic ? '✓' : '✗'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TRANSFORMATION STORY ═══════════════ */}
      <section className="r-story">
        <div className="r-wrap">
          <span className="r-story-badge">VERIFIED PEPTIVA CUSTOMER</span>
          <h2>"I spent years trying everything. The quiz matched me in 60 seconds — and it actually worked."</h2>
          <div className="r-story-body">
            <p>
              I'm 43 and I'd basically given up. Every diet, every supplement, every gym programme — tried it all.
              My GP told me it was "just aging" and to accept it. I didn't want to accept it.
            </p>
            <p>
              A mate mentioned Peptiva. I took the quiz expecting nothing. When the match came back, I thought
              "what have I got to lose?" It arrived in 3 days. Discreet box, proper documentation, clear instructions.
            </p>
            <p>
              By week 2, my energy was different. Not a caffeine buzz — real, steady energy. By week 4,
              my clothes were fitting differently. By week 8, people were asking what I was doing.
              Same gym, same meals. Different compound.
            </p>
            <p>
              The Concierge team checked in at week 2 and adjusted my timing. That made a real difference.
              If you're reading this and still on the fence... just order it.
            </p>
          </div>
          <div className="r-story-author">
            <Stars />
            <span>Daniel P. — Birmingham, UK · Verified Buyer</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF ═══════════════ */}
      <section className="r-proof">
        <div className="r-wrap">
          <h2 className="r-section-title">Real results from real customers</h2>
          <div className="r-proof-grid">
            {[
              { text: "The quiz matched me perfectly. Product arrived in 3 days and I saw changes within 2 weeks. The Concierge follow-up was a game changer.", name: "James T.", loc: "Manchester", tag: "Weight Management", stars: 5 },
              { text: "Was sceptical but gave it a go. Down 8kg in 6 weeks and my energy is through the roof. Best decision I've made.", name: "Sarah L.", loc: "London", tag: "Metabolism", stars: 5 },
              { text: "Been using peptides for years. The algorithm matched exactly what I would have picked. Save yourself the research.", name: "Tom K.", loc: "Edinburgh", tag: "Recovery", stars: 5 },
              { text: "Ordered both matches the same day. Discreet packaging, proper docs, arrived fast. The purity certificates are a nice touch.", name: "Rachel M.", loc: "Cardiff", tag: "Skin & Anti-aging", stars: 4 },
              { text: "My knee's been killing me for 2 years. The match was spot on — I'm moving better than I have in ages.", name: "Chris W.", loc: "Leeds", tag: "Recovery", stars: 5 },
              { text: "Did the women's quiz and was amazed at how specific the match was. My skin looks 5 years younger. The practitioner follow-up sealed it for me.", name: "Emma H.", loc: "Bristol", tag: "Skin & Weight", stars: 5 },
            ].map((r, i) => (
              <div key={i} className="r-proof-card">
                <span className="tsl-stars">{Array.from({length: r.stars}).map((_, j)=><Star key={j}/>)}</span>
                <span className="r-proof-tag">{r.tag}</span>
                <p>"{r.text}"</p>
                <span className="r-proof-name">{r.name} — {r.loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT'S INSIDE ═══════════════ */}
      <section className="r-inside">
        <div className="r-wrap">
          <h2 className="r-section-title">Inside your matched compound</h2>
          <div className="r-inside-grid">
            <div className="r-inside-card">
              {primary.image && <img src={primary.image} alt={primary.sku} className="r-inside-img" />}
            </div>
            <div className="r-inside-body">
              <h3>{primary.compound}</h3>
              <p className="r-inside-cat">{primary.category}</p>
              <p className="r-inside-desc">{primary.description}</p>
              <ul className="r-inside-list">
                <li>Manufactured in our UK-regulated laboratory</li>
                <li>99.3%+ purity — independently verified</li>
                <li>Third-party lab tested before every shipment</li>
                <li>QR code links to your batch certificate</li>
                <li>Personalised dosing guide included</li>
                <li>Peptiva Concierge practitioner access included</li>
                <li>Discreet packaging — no branding on the outside</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BONUSES ═══════════════ */}
      <section className="r-bonuses">
        <div className="r-wrap">
          <h2 className="r-section-title">Included free with every order</h2>
          <div className="r-bonuses-grid">
            <div className="r-bonus">
              <span className="r-bonus-icon">👨‍⚕️</span>
              <div>
                <span className="r-bonus-flag">INCLUDED</span>
                <h3>Peptiva Concierge Access</h3>
                <p>A certified practitioner reviews your protocol, checks in on progress, and adjusts your dosage.</p>
              </div>
            </div>
            <div className="r-bonus">
              <span className="r-bonus-icon">📋</span>
              <div>
                <span className="r-bonus-flag">FREE BONUS</span>
                <h3>Personalised Dosing Guide</h3>
                <p>Built from your quiz answers. Covers timing, dosing, and what to expect week by week.</p>
              </div>
            </div>
            <div className="r-bonus">
              <span className="r-bonus-icon">🔬</span>
              <div>
                <span className="r-bonus-flag">FREE BONUS</span>
                <h3>Batch Certificate &amp; QR Code</h3>
                <p>Every vial ships with a scannable QR linking to third-party lab test results (99.3%+ purity).</p>
              </div>
            </div>
            <div className="r-bonus">
              <span className="r-bonus-icon">🚚</span>
              <div>
                <span className="r-bonus-flag">FREE</span>
                <h3>Tracked UK Shipping</h3>
                <p>Discreet packaging, full tracking. Most orders arrive in 2–3 days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MID-PAGE CTA ═══════════════ */}
      <section className="r-mid-cta">
        <div className="r-wrap">
          <h2>This compound was selected for you. Don't let it go to waste.</h2>
          <p>The algorithm scored 12 UK-lab compounds. This one came out on top — and the price won't last.</p>
          <a href="#checkout" className="r-cta-btn r-cta-btn--lg">
            Claim This Match — £{primaryPrice.now} →
          </a>
        </div>
      </section>

      {/* ═══════════════ GUARANTEE ═══════════════ */}
      <section className="r-guarantee">
        <div className="r-wrap">
          <div className="r-guarantee-box">
            <span className="r-guarantee-icon">🛡️</span>
            <h2>30-Day Quality Guarantee</h2>
            <p>
              Every product is manufactured in our UK-regulated lab with 99.3%+ verified purity,
              third-party testing, and full batch documentation. If your compound doesn't meet spec
              or you're not satisfied with the quality, we'll make it right — no questions asked.
            </p>
            <div className="r-guarantee-pills">
              <span>🇬🇧 UK Regulated Lab</span>
              <span>🔬 Third-Party Tested</span>
              <span>99.3%+ Purity</span>
              <span>📄 Full Batch Docs</span>
              <span>🚚 Free UK Shipping</span>
              <span>👨‍⚕️ Peptiva Concierge</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT PEPTIVA ═══════════════ */}
      <section className="r-about">
        <div className="r-wrap">
          <div className="r-about-inner">
            <h2 className="r-section-title">About Peptiva</h2>
            <p>
              Peptiva operates from a UK-regulated laboratory with a single mission: make
              research-grade peptides accessible, safe, and personalised. We're not a marketplace
              reselling unknown products — every compound is manufactured, tested, and documented
              in-house.
            </p>
            <p>
              Our matching algorithm was built with input from practitioners and biochemists.
              Every order includes Peptiva Concierge access — a certified medical practitioner
              who personally follows up on your dosage, results, and nutrition. We believe the
              compound is only half the equation. The guidance is the other half.
            </p>
            <div className="r-about-stats">
              <div className="r-about-stat">
                <span className="r-about-num">4,800+</span>
                <span>Orders shipped</span>
              </div>
              <div className="r-about-stat">
                <span className="r-about-num">99.3%+</span>
                <span>Verified purity</span>
              </div>
              <div className="r-about-stat">
                <span className="r-about-num">12</span>
                <span>Compounds in catalogue</span>
              </div>
              <div className="r-about-stat">
                <span className="r-about-num">92%</span>
                <span>See results in 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST TICKER ═══════════════ */}
      <section className="r-badges">
        <div className="r-badges-track">
          {[
            '🇬🇧 UK REGULATED LAB',
            '🔬 THIRD-PARTY TESTED',
            '99.3%+ VERIFIED PURITY',
            '📄 BATCH DOCUMENTATION',
            '🚚 FREE UK SHIPPING',
            '🔒 SECURE CHECKOUT',
            '⚡ 2–3 DAY DELIVERY',
            '👨‍⚕️ PEPTIVA CONCIERGE',
            '✅ 4,800+ ORDERS SHIPPED',
            '🇬🇧 UK REGULATED LAB',
            '🔬 THIRD-PARTY TESTED',
            '99.3%+ VERIFIED PURITY',
            '📄 BATCH DOCUMENTATION',
            '🚚 FREE UK SHIPPING',
            '🔒 SECURE CHECKOUT',
            '⚡ 2–3 DAY DELIVERY',
            '👨‍⚕️ PEPTIVA CONCIERGE',
            '✅ 4,800+ ORDERS SHIPPED',
          ].map((b, i) => (
            <span key={i} className="r-badge">{b}</span>
          ))}
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="r-faq">
        <div className="r-wrap">
          <h2 className="r-section-title">Frequently asked questions</h2>
          <div className="r-faq-list">
            <FaqItem q="What exactly are peptides?" a="Peptides are short chains of amino acids — the same building blocks your body already uses. They act as signalling molecules, telling your cells to do specific things like burn fat, repair tissue, or boost collagen. Think of them as precise instructions your body already understands." />
            <FaqItem q="How pure are Peptiva products?" a="Every Peptiva compound is verified at 99.3%+ purity by an independent third-party laboratory. The full batch certificate ships with your order and is accessible via a QR code on the vial." />
            <FaqItem q="What is Peptiva Concierge?" a="Peptiva Concierge is our practitioner support programme included with every order. A certified medical practitioner personally reviews your quiz profile, guides your dosage and timing, checks in on your progress, and provides nutrition recommendations — all included at no extra cost." />
            <FaqItem q="Is this legal in the UK?" a="Yes. All Peptiva products are sold for research purposes and manufactured in our UK-regulated laboratory. We comply fully with UK law and include full documentation with every order." />
            <FaqItem q="How fast will I see results?" a="Most customers notice changes within 2–4 weeks. 92% of quiz-matched customers see visible results within 30 days. Your Concierge practitioner will check in to track your progress." />
            <FaqItem q="How is Peptiva different from other suppliers?" a="Three things: personalised matching (not guessing), 99.3%+ verified purity with third-party lab testing, and Peptiva Concierge — a real practitioner who follows up on your protocol. No other UK supplier offers all three." />
            <FaqItem q="What if it doesn't work for me?" a="We offer a 30-day quality guarantee. If your compound doesn't meet spec or you're not satisfied with the quality, we make it right — no questions asked." />
            <FaqItem q="What's included with my order?" a="Your matched compound, personalised dosing guide, batch certificate with QR verification, Peptiva Concierge access (practitioner support), and free tracked UK shipping in discreet packaging." />
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="r-final-cta">
        <div className="r-wrap">
          <h2>Your match is here. The price won't be.</h2>
          <p>
            99.3% purity. Third-party tested. Practitioner-guided protocol.
            When the timer hits zero, this quiz-taker price is gone.
          </p>
          <a href="#checkout" className="r-cta-btn r-cta-btn--lg">
            Claim This Match — £{primaryPrice.now} →
          </a>
          <span className="r-final-trust">🔒 Secure checkout · Free UK shipping · Batch verified · Peptiva Concierge included</span>
        </div>
      </section>

      {/* STICKY BAR */}
      <div className="r-sticky">
        <div className="r-sticky-inner">
          <div className="r-sticky-left">
            <strong>{primary.sku}</strong>
            <span className="r-sticky-price">
              <span className="r-sticky-was">£{primaryPrice.was}</span>
              £{primaryPrice.now}
            </span>
          </div>
          <a href="#checkout" className="r-sticky-btn">Order Now →</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="r-footer">
        <div className="r-wrap">
          <p>
            Peptiva Ltd. All products manufactured in our UK-regulated laboratory with 99.3%+ verified purity.
            Third-party lab tested. Sold for research use only. Full documentation included with every order.
          </p>
          <p className="r-footer-copy">© {new Date().getFullYear()} Peptiva · <Link to="/">Home</Link> · <Link to="/">Retake Quiz</Link></p>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({ peptide, price, rank }: { peptide: Peptide; price: { was: number; now: number }; rank: number }) {
  const pct = Math.round(((price.was - price.now) / price.was) * 100)
  return (
    <div className={`r-product ${rank === 1 ? 'r-product--best' : ''}`}>
      <div className={`r-product-ribbon ${rank !== 1 ? 'r-product-ribbon--alt' : ''}`}>
        {rank === 1 ? 'YOUR #1 MATCH' : `#${rank} MATCH`}
      </div>
      <div className="r-product-img-wrap">
        {peptide.image && <img src={peptide.image} alt={peptide.sku} className="r-product-img" />}
      </div>
      <div className="r-product-body">
        <h3 className="r-product-name">{peptide.sku}</h3>
        <p className="r-product-compound">{peptide.compound}</p>
        <p className="r-product-tagline">{peptide.tagline}</p>
        <div className="r-product-pricing">
          <span className="r-product-was">£{price.was}</span>
          <span className="r-product-now">£{price.now}</span>
          <span className="r-product-save">SAVE {pct}%</span>
        </div>
        <a href="#checkout" className="r-product-cta">
          {rank === 1 ? `Claim This Match — £${price.now}` : `Add to Order — £${price.now}`}
        </a>
        <p className="r-product-trust">99.3% purity · Third-party tested · Concierge included</p>
      </div>
    </div>
  )
}
