import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PEPTIDES, type Peptide, recommendedDoseIndex } from '../data/peptides'
import { recommendPeptides } from '../lib/recommend'
import { benefitHeadline, benefitSubline, getExperienceLevel, pillarDetailSummary, goalLabel } from '../lib/quizLabels'
import { loadQuiz } from '../lib/quizStorage'
import { defaultQuizAnswers } from '../types/quiz'
import { getCompoundCopy } from '../lib/compoundCopy'

function getPrice(peptide: Peptide, level: 'beginner' | 'intermediate' | 'advanced' = 'intermediate') {
  const idx = recommendedDoseIndex(peptide, level)
  const dose = peptide.doses[idx] || peptide.doses[0]
  return { now: dose.price, label: dose.label }
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`fp-faq-item ${open ? 'fp-faq-item--open' : ''}`}>
      <button type="button" className="fp-faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <svg className="fp-faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && <div className="fp-faq-a">{a}</div>}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="fp-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
}

function StarIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
}

function Stars({ count = 5 }: { count?: number }) {
  return <span className="fp-stars">{Array.from({ length: count }).map((_, i) => <StarIcon key={i} />)}</span>
}

export default function ResultsPage() {
  const answers = useMemo(() => loadQuiz(), [])
  const valid = answers.goal && answers.researchAck
  const rec = useMemo(() => valid ? recommendPeptides(answers) : null, [answers, valid])

  if (!valid || !rec) {
    return (
      <div className="fp-empty">
        <h1>Complete the quiz first</h1>
        <p>Your personalised results page is built from your answers.</p>
        <Link className="fp-btn" to="/">Take the Quiz</Link>
      </div>
    )
  }

  const merged = { ...defaultQuizAnswers(), ...answers }
  const { primary, secondary } = rec
  const level = getExperienceLevel(merged)
  const isBeginner = level === 'beginner'
  const detail = pillarDetailSummary(merged)
  const goal = merged.goal ? goalLabel(merged.goal) : 'your priorities'
  const name = merged.lead?.firstName || 'there'
  const primaryPrice = getPrice(primary, level)
  const copy = getCompoundCopy(primary.id, level)

  const headline = benefitHeadline(merged)
  const subline = benefitSubline(merged, primary.sku, primaryPrice.now)

  return (
    <div className="fp">
      {/* ── PROMO BAR ── */}
      <div className="fp-promo">
        <span className="fp-promo-inner">
          <strong>QUIZ-TAKER PRICING:</strong> Exclusive rates today. Free UK shipping. A practitioner reviews your protocol.
        </span>
      </div>

      {/* ── HEADER ── */}
      <header className="fp-header">
        <div className="fp-container fp-header-inner">
          <Link to="/" className="fp-logo">Peptiva</Link>
          <nav className="fp-nav">
            <a href="#plans">Plans</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#plans" className="fp-header-cta">Claim My Match</a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="fp-hero">
        <div className="fp-container fp-hero-grid">
          <div className="fp-hero-content">
            <p className="fp-hero-eyebrow">YOUR PERSONALISED MATCH IS READY</p>
            <h1 className="fp-hero-title">{headline}</h1>
            <h2 className="fp-hero-subtitle">{subline}</h2>
            <p className="fp-hero-desc">
              {name !== 'there' ? `${name}, we` : 'We'} analysed your answers and matched you with <strong>{primary.sku}</strong> — specifically chosen for <em>{detail.toLowerCase()}</em>.
              {isBeginner
                ? ' This is a safe, well-studied option with practitioner guidance included at no extra cost.'
                : ' Quiz-taker pricing locked in — practitioner support included.'}
            </p>

            <ul className="fp-hero-advantages">
              <li><CheckIcon /> <strong>Your match: {primary.sku}</strong> — from £{primaryPrice.now}</li>
              <li><CheckIcon /> <strong>99.3%+ verified purity</strong> — independently lab tested</li>
              <li><CheckIcon /> <strong>Practitioner support included</strong> — a real person guides your protocol</li>
              {isBeginner
                ? <li><CheckIcon /> <strong>Beginner-friendly</strong> — clear instructions, gentle start, full support</li>
                : <li><CheckIcon /> <strong>Full batch documentation</strong> — QR-verified, traceable, auditable</li>
              }
              <li><CheckIcon /> <strong>30-day quality guarantee</strong> — not happy? We make it right</li>
            </ul>

            <a href="#plans" className="fp-btn fp-hero-cta-btn">Claim My Match — £{primaryPrice.now}</a>
          </div>
          <div className="fp-hero-visual">
            <div className="fp-hero-img-pair">
              <div className="fp-hero-img-card">
                {primary.image && <img src={primary.image} alt={primary.sku} className="fp-hero-photo" />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAFETY BAR ── */}
      <section className="fp-trust">
        <div className="fp-container">
          <h2 className="fp-trust-title">
            {isBeginner ? 'Your safety is our #1 priority' : 'Pharmaceutical-grade. Practitioner-backed. UK regulated.'}
          </h2>
          <p className="fp-trust-sub">
            {isBeginner
              ? 'New to this? That\'s exactly who we built Peptiva for. Every order comes with practitioner guidance, clear dosing instructions, and a 30-day quality guarantee.'
              : 'One transparent price. Everything included. No hidden fees, no memberships, no surprises.'
            }
          </p>
          <div className="fp-trust-tags">
            <span>🔬 Third-party lab tested</span>
            <span>👨‍⚕️ Practitioner reviewed</span>
            <span>🇬🇧 UK regulated lab</span>
            <span>🛡️ 30-day guarantee</span>
          </div>
        </div>
      </section>

      {/* ── WHY THIS MATCH ── */}
      <section className="fp-why">
        <div className="fp-container">
          <h2 className="fp-section-title">
            {isBeginner ? `Why ${primary.sku} is perfect for you` : `Why ${primary.sku} scored highest for your profile`}
          </h2>
          <div className="fp-why-grid">
            <div className="fp-why-card">
              <h3>{isBeginner ? 'Why this is your match' : 'Why it was matched'}</h3>
              <p>{copy.whyMatched}</p>
            </div>
            <div className="fp-why-card">
              <h3>{isBeginner ? 'How it helps you' : 'How it works'}</h3>
              <p>{copy.mechanism}</p>
            </div>
            <div className="fp-why-card">
              <h3>What to expect</h3>
              <p>{copy.expect}</p>
            </div>
          </div>
          <div className="fp-why-ideal">
            <h3>Ideal for:</h3>
            <div className="fp-why-tags">
              {copy.idealFor.map((tag, i) => <span key={i} className="fp-tag">{tag}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE PLANS ── */}
      <section className="fp-plans" id="plans">
        <div className="fp-container">
          <h2 className="fp-section-title">
            {isBeginner ? 'Everything you need to get started' : 'Choose your plan'}
          </h2>
          <p className="fp-section-sub">
            {isBeginner
              ? 'Your matched product + practitioner support + dosing guide + batch documentation. All included.'
              : `Product + Concierge + Documentation. No memberships. Category: ${goal}.`
            }
          </p>

          <div className="fp-plans-grid">
            <PlanCard peptide={primary} rank={1} isBeginner={isBeginner} level={level} />
            {secondary && <PlanCard peptide={secondary} rank={2} isBeginner={isBeginner} level={level} />}
          </div>

          {secondary && (
            <div className="fp-stack-banner">
              <div className="fp-stack-inner">
                <div>
                  <h3>Get even better results with both</h3>
                  <p>These two work through different pathways — complementary, not overlapping. Together, they deliver compounding results.</p>
                </div>
                <a href="#plans" className="fp-btn fp-btn--outline">View Stack Pricing</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section className="fp-stories" id="reviews">
        <div className="fp-container">
          <h2 className="fp-section-title">Real people. Real results.</h2>
          <div className="fp-ba-grid">
            {[
              { name: 'James T.', loc: 'Manchester', weeks: 4, caption: 'Visible change in 4 weeks' },
              { name: 'Sarah L.', loc: 'London', weeks: 6, caption: 'Down a clothing size in 6 weeks' },
              { name: 'Chris W.', loc: 'Leeds', weeks: 3, caption: 'Back to training in 3 weeks' },
              { name: 'Emily R.', loc: 'Bristol', weeks: 5, caption: 'Noticeable results by week 5' },
              { name: 'Tom K.', loc: 'Edinburgh', weeks: 4, caption: 'Measurable progress in 4 weeks' },
              { name: 'Rachel M.', loc: 'Cardiff', weeks: 6, caption: 'Significant change at 6 weeks' },
              { name: 'Daniel R.', loc: 'Birmingham', weeks: 3, caption: 'Clear difference by week 3' },
              { name: 'Marcus W.', loc: 'Leeds', weeks: 5, caption: 'Real results within 5 weeks' },
            ].map((t, i) => (
              <div key={i} className="fp-ba-card">
                <div className="fp-ba-pair">
                  <div className="fp-ba-img fp-ba-img--before"><span>Before</span></div>
                  <div className="fp-ba-img fp-ba-img--after"><span>After · {t.weeks} wks</span></div>
                </div>
                <p className="fp-ba-caption">{t.caption}</p>
                <span className="fp-ba-name">{t.name} — {t.loc}</span>
              </div>
            ))}
          </div>
          <div className="fp-reviews-grid">
            {[
              { text: "I was sceptical — another quiz, another product. But this actually matched what I needed. Saw real changes in 2 weeks. The practitioner check-in sealed it for me.", name: "James T.", loc: "Manchester", stars: 5 },
              { text: "Down a full clothing size in 6 weeks. My energy is through the roof. Wish I'd found this sooner instead of wasting money on supplements that didn't work.", name: "Sarah L.", loc: "London", stars: 5 },
              { text: "I've used peptides for years. Peptiva's algorithm matched exactly what I would have picked myself. Save yourself months of research.", name: "Tom K.", loc: "Edinburgh", stars: 5 },
              { text: "My knee had been killing me for 2 years. The match was spot on — I'm back to training 4 days a week. Life-changing.", name: "Chris W.", loc: "Leeds", stars: 5 },
              { text: "Arrived in 3 days, discreet packaging. The practitioner check-in was reassuring. Already reordered for my second month.", name: "Rachel M.", loc: "Cardiff", stars: 5 },
              { text: "Completely new to peptides. Peptiva made it simple — clear quiz, clear match, clear instructions. Feeling great after just 3 weeks.", name: "Emily R.", loc: "Bristol", stars: 5 },
              { text: "The quiz nailed it. I was torn between three products for weeks — Peptiva matched me in under a minute. Couldn't be happier.", name: "Marcus W.", loc: "Leeds", stars: 5 },
              { text: "First time a recommendation actually matched how I live. Two weeks in and I stopped second-guessing. Brilliant service.", name: "Daniel R.", loc: "Birmingham", stars: 5 },
            ].map((r, i) => (
              <div key={i} className="fp-review-card">
                <Stars count={r.stars} />
                <p className="fp-review-text">"{r.text}"</p>
                <span className="fp-review-author">{r.name} — {r.loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="fp-how">
        <div className="fp-container">
          <h2 className="fp-section-title">
            {isBeginner ? 'How it works (it\'s simple)' : 'From quiz to results in 4 steps'}
          </h2>
          <div className="fp-how-grid">
            <div className="fp-how-step">
              <span className="fp-how-num">01</span>
              <h3>Take the Quiz</h3>
              <p>60 seconds. Your answers are scored against {PEPTIDES.length} research-grade products to find your best match.</p>
            </div>
            <div className="fp-how-step">
              <span className="fp-how-num">02</span>
              <h3>Get Your Match</h3>
              <p>Our algorithm identifies the product that best fits your specific goals, challenges, and experience level.</p>
            </div>
            <div className="fp-how-step">
              <span className="fp-how-num">03</span>
              <h3>A Practitioner Reviews It</h3>
              <p>A real practitioner reviews your profile and personalises your dosing protocol. Included free with every order.</p>
            </div>
            <div className="fp-how-step">
              <span className="fp-how-num">04</span>
              <h3>See the Difference</h3>
              <p>92% of quiz-matched customers report results within 30 days. Your practitioner checks in to track progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAFETY & QUALITY ── */}
      <section className="fp-quality">
        <div className="fp-container">
          <div className="fp-quality-box">
            <h2>Your Safety &amp; Quality Promise</h2>
            <p>
              {isBeginner
                ? 'We know this might be new for you — so we\'ve built every safety measure in. Your product is made in a UK-regulated lab, tested by an independent third party, and reviewed by a practitioner before it reaches you. If anything doesn\'t meet your expectations, our 30-day guarantee has you covered.'
                : 'Every product is manufactured in our UK-regulated laboratory and independently verified by a third-party lab. Every vial ships with batch documentation, QR-scannable verification, and clear dosing instructions. A practitioner reviews your protocol — included at no extra cost.'
              }
            </p>
            <div className="fp-quality-grid">
              <div className="fp-quality-item">
                <strong>99.3%+</strong>
                <span>Verified Purity</span>
              </div>
              <div className="fp-quality-item">
                <strong>Third-Party</strong>
                <span>Lab Tested</span>
              </div>
              <div className="fp-quality-item">
                <strong>Practitioner</strong>
                <span>Reviewed</span>
              </div>
              <div className="fp-quality-item">
                <strong>30-Day</strong>
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="fp-compare">
        <div className="fp-container">
          <h2 className="fp-section-title">Why Peptiva vs. the alternatives?</h2>
          <p className="fp-section-sub">
            {isBeginner
              ? 'We\'re not like random online sellers. Here\'s what makes Peptiva different — and safer.'
              : 'Same category, different standard of evidence and support.'
            }
          </p>
          <div className="fp-compare-table">
            <div className="fp-compare-row fp-compare-header">
              <span></span>
              <span className="fp-compare-us">Peptiva</span>
              <span>Generic Suppliers</span>
              <span>Private Clinics</span>
            </div>
            {[
              ['Personalised Quiz Matching', true, false, false],
              ['99.3%+ Verified Purity', true, false, true],
              ['Third-Party Lab Tested', true, false, true],
              ['Practitioner Support Included', true, false, true],
              ['No Appointment Needed', true, true, false],
              ['Transparent Pricing (no surprises)', true, false, false],
              ['Free UK Shipping', true, true, false],
              ['30-Day Quality Guarantee', true, false, false],
            ].map(([label, us, supp, clinic], i) => (
              <div key={i} className="fp-compare-row">
                <span className="fp-compare-label">{label as string}</span>
                <span className={`fp-compare-cell ${us ? 'fp-yes' : 'fp-no'}`}>{us ? '✓' : '—'}</span>
                <span className={`fp-compare-cell ${supp ? 'fp-yes' : 'fp-no'}`}>{supp ? '✓' : '—'}</span>
                <span className={`fp-compare-cell ${clinic ? 'fp-yes' : 'fp-no'}`}>{clinic ? '✓' : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="fp-faq" id="faq">
        <div className="fp-container">
          <h2 className="fp-section-title">{isBeginner ? 'Got questions? We\'ve got answers.' : 'Frequently asked questions'}</h2>
          <div className="fp-faq-list">
            {isBeginner && (
              <FaqItem q="I'm completely new to this. Is it safe?" a="Absolutely. Every product is manufactured in a UK-regulated laboratory and tested by an independent third-party lab. A real practitioner reviews your quiz profile and guides your dosing — included free. And if you're not happy, our 30-day quality guarantee means zero risk." />
            )}
            <FaqItem q="What exactly are peptides?" a="Peptides are short chains of amino acids — the same building blocks your body already uses. They act as signalling molecules, telling your cells to perform specific functions like burn fat, repair tissue, or boost collagen. Think of them as precise instructions your body already understands." />
            <FaqItem q="What's included with my order?" a="Your matched product, personalised dosing guide from a practitioner, batch certificate with QR verification, Peptiva Concierge access (practitioner support), and free tracked UK shipping in discreet packaging." />
            <FaqItem q="What is Peptiva Concierge?" a="It's our practitioner support programme — included free with every order. A certified practitioner reviews your quiz profile, personalises your dosing, checks in on your progress, and answers your questions. Like having a personal guide throughout your journey." />
            <FaqItem q="How fast will I see results?" a="Most customers notice changes within 2–4 weeks. 92% of quiz-matched customers report measurable results within 30 days. Your practitioner will check in to make sure you're on track." />
            <FaqItem q="What if it doesn't work for me?" a="We offer a 30-day quality guarantee. If your product doesn't meet specification or you're not satisfied with the quality, we make it right — no questions asked. You can also retake the quiz anytime." />
            <FaqItem q="Is this legal in the UK?" a="Yes. All Peptiva products are manufactured in our UK-regulated laboratory. We comply fully with UK regulations and include full documentation with every order." />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="fp-cta-section">
        <div className="fp-container">
          <h2>
            {isBeginner
              ? 'Ready to start? Your match, your practitioner, your results.'
              : `Your match is locked in. Claim quiz-taker pricing before it expires.`
            }
          </h2>
          <p>
            {isBeginner
              ? `${primary.sku} + Practitioner guidance + Dosing protocol + 30-day guarantee. Everything you need for £${primaryPrice.now}.`
              : `${primary.sku} + Concierge support + Full documentation. No memberships. Free UK shipping.`
            }
          </p>
          <a href="#plans" className="fp-btn fp-btn--light">Claim My Match — £{primaryPrice.now}</a>
        </div>
      </section>

      {/* ── STICKY BAR ── */}
      <div className="fp-sticky">
        <div className="fp-container fp-sticky-inner">
          <div className="fp-sticky-left">
            <strong>{primary.sku}</strong>
            <span className="fp-sticky-pricing">
              <span className="fp-sticky-now">From £{primaryPrice.now}</span>
            </span>
          </div>
          <a href="#plans" className="fp-btn fp-btn--sm">Claim My Match</a>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="fp-footer">
        <div className="fp-container fp-footer-inner">
          <div className="fp-footer-brand">
            <span className="fp-footer-logo">Peptiva</span>
            <p>All products manufactured in our UK-regulated laboratory. 99.3%+ verified purity. Third-party lab tested. Practitioner-reviewed protocols.</p>
          </div>
          <div className="fp-footer-links">
            <Link to="/">Home</Link>
            <Link to="/">Retake Quiz</Link>
            <a href="#plans">Plans</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="fp-footer-copy">
            © {new Date().getFullYear()} Peptiva Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function PlanCard({ peptide, rank, isBeginner, level }: { peptide: Peptide; rank: number; isBeginner: boolean; level: 'beginner' | 'intermediate' | 'advanced' }) {
  const recIdx = recommendedDoseIndex(peptide, level)
  const [selectedDose, setSelectedDose] = useState(recIdx)
  const dose = peptide.doses[selectedDose] || peptide.doses[0]

  return (
    <div className={`fp-plan ${rank === 1 ? 'fp-plan--primary' : ''}`}>
      {rank === 1 && <div className="fp-plan-ribbon">Your #1 Match</div>}
      <div className="fp-plan-img">
        {peptide.image && <img src={peptide.image} alt={peptide.sku} />}
      </div>
      <div className="fp-plan-body">
        <h3 className="fp-plan-name">{peptide.sku}</h3>
        <p className="fp-plan-compound">{peptide.tagline}</p>
        {peptide.doses.length > 1 && (
          <div className="fp-dose-selector">
            {peptide.doses.map((d, i) => (
              <button
                key={d.mg}
                type="button"
                className={`fp-dose-btn ${i === selectedDose ? 'fp-dose-btn--active' : ''}`}
                onClick={() => setSelectedDose(i)}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}
        <div className="fp-plan-pricing">
          <span className="fp-plan-now">£{dose.price}</span>
          {peptide.doses.length > 1 && <span className="fp-plan-dose-label">{dose.label}</span>}
        </div>
        <div className="fp-plan-features">
          <div><CheckIcon /> Practitioner support included (£0)</div>
          <div><CheckIcon /> 99.3%+ verified purity</div>
          <div><CheckIcon /> Personalised dosing protocol</div>
          <div><CheckIcon /> Free UK shipping</div>
          {isBeginner
            ? <div><CheckIcon /> Beginner-friendly starter guide</div>
            : <div><CheckIcon /> Full batch documentation</div>
          }
          <div><CheckIcon /> 30-day quality guarantee</div>
        </div>
        <a href="#plans" className="fp-btn fp-plan-cta">
          {rank === 1 ? `Get ${peptide.sku} — £${dose.price}` : `Add ${peptide.sku}`}
        </a>
      </div>
    </div>
  )
}
