import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PEPTIDES, type Peptide } from '../data/peptides'
import { recommendPeptides } from '../lib/recommend'
import { benefitHeadline, getExperienceLevel, goalLabel, pillarDetailSummary } from '../lib/quizLabels'
import { loadQuiz } from '../lib/quizStorage'
import { defaultQuizAnswers } from '../types/quiz'
import { getCompoundCopy } from '../lib/compoundCopy'

const SHOP_URL = '#pricing'

const FROM_GBP: Record<string, number> = {
  '17': 129, '2': 119, '3': 99, '18': 89, '1': 79,
  '8': 79, '10': 79, '20': 109,
  '6': 139, '4': 69, '19': 99, '7': 89,
}

function fromGbp(id: string) { return FROM_GBP[id] ?? 99 }

function Star() {
  return (
    <svg className="tsl-star" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  )
}

function Stars() {
  return <span className="tsl-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</span>
}

function PricingCards({ primary, secondary, isBeginner }: { primary: Peptide; secondary: Peptide | null; isBeginner: boolean }) {
  const products = secondary ? [primary, secondary] : [primary]
  const p1 = fromGbp(primary.id)
  const p2 = secondary ? fromGbp(secondary.id) : null

  return (
    <div className="tsl-offer-grid">
      {products.length === 2 && (
        <article className="tsl-offer tsl-offer--featured">
          <div className="tsl-offer-ribbon">Best value</div>
          <div className="tsl-offer-media">
            <img src={primary.image || ''} alt="" className="tsl-offer-img" />
            <img src={secondary!.image || ''} alt="" className="tsl-offer-img tsl-offer-img--second" />
          </div>
          <p className="tsl-offer-label">Matched stack — maximum results</p>
          <h3 className="tsl-offer-title">{primary.sku} + {secondary!.sku}</h3>
          <p className="tsl-offer-sub">Two complementary products working through different pathways</p>
          <p className="tsl-offer-desc">
            {isBeginner
              ? 'Your primary and secondary picks working together. Different mechanisms, compounding benefits. Practitioner guidance included for both.'
              : 'The combination our scoring ranks highest for your profile. Complementary pathways — not duplicate mechanisms.'}
          </p>
          <p className="tsl-offer-price">
            <span className="tsl-offer-price-from">From</span>
            <span className="tsl-offer-price-num">£{p1 + (p2 ?? 0)}</span>
            <span className="tsl-offer-price-unit">combined · quiz rate</span>
          </p>
          <ul className="tsl-offer-list">
            <li>👨‍⚕️ Practitioner support for both</li>
            <li>🚚 Free UK shipping</li>
            <li>🛡️ 30-day quality guarantee</li>
          </ul>
          <a href={SHOP_URL} className="tsl-cta tsl-cta--solid">Get Your Stack</a>
        </article>
      )}
      <article className={`tsl-offer ${products.length === 1 ? 'tsl-offer--featured' : ''}`}>
        {products.length === 1 && <div className="tsl-offer-ribbon">Your #1 match</div>}
        {products.length === 2 && <div className="tsl-offer-ribbon tsl-offer-ribbon--muted">Primary match</div>}
        {primary.image && <img src={primary.image} alt="" className="tsl-offer-img tsl-offer-img--solo" />}
        <p className="tsl-offer-label">Single protocol</p>
        <h3 className="tsl-offer-title">{primary.sku}</h3>
        <p className="tsl-offer-sub">{primary.tagline}</p>
        <p className="tsl-offer-price">
          <span className="tsl-offer-price-from">From</span>
          <span className="tsl-offer-price-num">£{p1}</span>
          <span className="tsl-offer-price-unit">/ month · quiz rate</span>
        </p>
        <ul className="tsl-offer-list">
          <li>👨‍⚕️ Practitioner support included</li>
          <li>🚚 Free UK shipping</li>
          <li>🛡️ 30-day quality guarantee</li>
        </ul>
        <a href={SHOP_URL} className="tsl-cta tsl-cta--solid">Get {primary.sku}</a>
      </article>
      {secondary && (
        <article className="tsl-offer">
          <div className="tsl-offer-ribbon tsl-offer-ribbon--muted">Also matched</div>
          {secondary.image && <img src={secondary.image} alt="" className="tsl-offer-img tsl-offer-img--solo" />}
          <p className="tsl-offer-label">Secondary pick</p>
          <h3 className="tsl-offer-title">{secondary.sku}</h3>
          <p className="tsl-offer-sub">{secondary.tagline}</p>
          <p className="tsl-offer-price">
            <span className="tsl-offer-price-from">From</span>
            <span className="tsl-offer-price-num">£{p2}</span>
            <span className="tsl-offer-price-unit">/ month · quiz rate</span>
          </p>
          <ul className="tsl-offer-list">
            <li>👨‍⚕️ Same practitioner support</li>
            <li>🚚 Free UK shipping</li>
            <li>🛡️ 30-day quality guarantee</li>
          </ul>
          <a href={SHOP_URL} className="tsl-cta tsl-cta--outline">Get {secondary.sku}</a>
        </article>
      )}
    </div>
  )
}

function FAQ({ isBeginner }: { isBeginner: boolean }) {
  const items = [
    ...(isBeginner ? [{
      q: 'I\'m completely new. Is this safe?',
      a: 'Yes. Every product is manufactured in a UK-regulated lab, tested by an independent third party, and reviewed by a practitioner. We include clear dosing instructions and a 30-day quality guarantee. You\'re never on your own.',
    }] : []),
    {
      q: 'How does the quiz matching work?',
      a: `Your answers are scored against ${PEPTIDES.length} products in our verified catalogue. The algorithm ranks only within your chosen category, using your specific challenge, energy levels, goals, and experience. The highest-scoring match becomes your recommendation.`,
    },
    {
      q: 'What\'s included with my order?',
      a: 'Your matched product, a personalised dosing protocol from a practitioner, batch certificate with QR verification, Peptiva Concierge access, and free tracked UK shipping in discreet packaging.',
    },
    {
      q: 'What if I\'m not happy with the results?',
      a: 'We offer a 30-day quality guarantee. If your product doesn\'t meet specification or you\'re not satisfied, we make it right — no questions asked. You can also retake the quiz anytime for a different match.',
    },
    {
      q: 'How fast will I see results?',
      a: '92% of quiz-matched customers report measurable results within 30 days. Most notice initial changes within 2–4 weeks. Your practitioner checks in to track your progress and adjust if needed.',
    },
    {
      q: 'Do you ship across the UK?',
      a: 'Yes — free tracked shipping to all UK addresses from our regulated facility. Discreet packaging. Most orders arrive within 2–3 business days.',
    },
  ]
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="tsl-faq-list">
      {items.map((item, i) => (
        <div key={i} className={`tsl-faq-item ${open === i ? 'is-open' : ''}`}>
          <button type="button" className="tsl-faq-q" onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <span className="tsl-faq-arrow" aria-hidden>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className="tsl-faq-a">{item.a}</p>}
        </div>
      ))}
    </div>
  )
}

export default function TSLPage() {
  const answers = useMemo(() => loadQuiz(), [])
  const valid = answers.goal && answers.researchAck
  const rec = useMemo(() => (valid ? recommendPeptides(answers) : null), [answers, valid])

  if (!valid || !rec) {
    return (
      <div className="tsl tsl--fridays tsl-empty">
        <h1>Complete the quiz first</h1>
        <p>Your personalised results page is built from your answers.</p>
        <Link className="tsl-cta tsl-cta--solid" to="/">Take the quiz</Link>
      </div>
    )
  }

  const merged = { ...defaultQuizAnswers(), ...answers }
  const { primary, secondary } = rec
  const level = getExperienceLevel(merged)
  const isBeginner = level === 'beginner'
  const detail = pillarDetailSummary(merged)
  const goal = merged.goal ? goalLabel(merged.goal) : 'your priorities'
  const headline = benefitHeadline(merged)
  const copy = getCompoundCopy(primary.id, level)

  const compareRows = [
    { label: 'Personalised quiz matching', us: true, them: false },
    { label: '99.3%+ verified purity', us: true, them: false },
    { label: 'Third-party lab tested', us: true, them: false },
    { label: 'Practitioner support included', us: true, them: false },
    { label: 'Transparent pricing', us: true, them: false },
    { label: '30-day quality guarantee', us: true, them: false },
  ]

  return (
    <div className="tsl tsl--fridays">
      <a className="tsl-skip" href="#pricing">Skip to plans</a>

      <div className="tsl-promo" role="region" aria-label="Offer">
        <div className="tsl-promo-inner">
          <span className="tsl-promo-lead">
            <strong>Quiz-taker pricing</strong> — your matched protocol at our lowest rate. Practitioner support included.
          </span>
          <span className="tsl-promo-meta">Free UK shipping · 30-day guarantee · No memberships</span>
        </div>
      </div>

      <header className="tsl-head">
        <div className="tsl-head-inner">
          <Link to="/" className="tsl-logo">Peptiva</Link>
          <nav className="tsl-head-nav" aria-label="Sales page">
            <a href="#match">Your match</a>
            <a href="#pricing">Plans</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="tsl-head-cta" href="#pricing">Get started</a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="tsl-hero" aria-labelledby="tsl-hero-title">
        <div className="tsl-wrap tsl-hero-wrap">
          <div className="tsl-hero-grid">
            <div>
              <p className="tsl-hero-eyebrow">YOUR PERSONALISED MATCH IS READY</p>
              <h1 id="tsl-hero-title" className="tsl-hero-title">{headline}</h1>
              <p className="tsl-hero-lead">
                {isBeginner
                  ? `We found your #1 match: ${primary.sku}. It's specifically chosen for ${detail.toLowerCase()} — and comes with practitioner guidance so you're never on your own.`
                  : `Your #1 match is ${primary.sku} — scored highest for ${detail.toLowerCase()} across ${goal.toLowerCase()}. Quiz-taker pricing locked in.`
                }
              </p>
              <div className="tsl-hero-trust">
                <Stars />
                <span className="tsl-hero-trust-text">4.6 average · thousands of UK orders · practitioner-backed</span>
              </div>
              <ul className="tsl-advantage">
                <li>✅ {primary.sku} matched to your specific {goal.toLowerCase()} goals</li>
                <li>👨‍⚕️ A real practitioner reviews and personalises your protocol</li>
                <li>🛡️ 30-day quality guarantee — not happy? We make it right</li>
                {isBeginner
                  ? <li>📖 Beginner-friendly guide with clear, simple instructions</li>
                  : <li>📋 Full batch documentation — QR-verified, traceable</li>
                }
              </ul>
              <a className="tsl-cta tsl-cta--solid tsl-cta--large" href="#pricing">
                Get {primary.sku} — From £{fromGbp(primary.id)}/mo
              </a>
            </div>
            <div className="tsl-hero-aside" aria-hidden>
              <div className="tsl-visual-pair">
                <div className="tsl-visual-card">
                  <span className="tsl-visual-label">Before</span>
                  <div className="tsl-visual-ph tsl-visual-ph--a" />
                  <span className="tsl-visual-cap">Overwhelmed by options</span>
                </div>
                <div className="tsl-visual-card tsl-visual-card--accent">
                  <span className="tsl-visual-label">After</span>
                  <div className="tsl-visual-ph tsl-visual-ph--b" />
                  <span className="tsl-visual-cap">One clear, practitioner-backed plan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="tsl-trust-bar">
        <div className="tsl-wrap tsl-trust-bar-inner">
          <Stars />
          <span>{isBeginner ? 'Trusted by thousands of UK customers — beginners and experts alike' : 'Trusted by researchers and serious self-experimenters across the UK'}</span>
        </div>
      </div>

      {/* ── YOUR MATCH ── */}
      <section className="tsl-block" id="match">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">
            {isBeginner ? `Here's why ${primary.sku} is perfect for you` : `Your match: ${primary.sku}`}
          </h2>
          <p className="tsl-lead">
            {isBeginner
              ? 'We matched this to your specific answers — not a generic recommendation. Here\'s what it does and why it\'s right for you.'
              : `Scored highest within ${goal.toLowerCase()} for your profile. Here's the breakdown.`
            }
          </p>
          <div className="tsl-split">
            <div className="tsl-split-media">
              {primary.image && <img src={primary.image} alt={primary.sku} />}
            </div>
            <div className="tsl-split-copy">
              <h3 className="tsl-h3">{isBeginner ? 'What it does' : primary.sku}</h3>
              <p>{copy.whyMatched}</p>
              <ul className="tsl-checklist">
                <li>Matched to: <strong>{detail}</strong></li>
                <li>Category: <strong>{primary.category}</strong></li>
                <li>🇬🇧 UK-regulated laboratory</li>
                <li>🔬 99.3%+ independently verified purity</li>
                <li>👨‍⚕️ Practitioner-reviewed protocol</li>
                <li>🛡️ 30-day quality guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="tsl-block tsl-block--muted">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">{isBeginner ? 'What happens when you start' : 'What to expect'}</h2>
          <p className="tsl-lead">{copy.expect}</p>
          <div className="tsl-sig-grid">
            <article className="tsl-sig">
              <div className="tsl-sig-badge">Week 1–2</div>
              <h3 className="tsl-sig-title">{isBeginner ? 'You\'ll start noticing changes' : 'Initial response'}</h3>
              <p className="tsl-sig-desc">Most customers feel the first effects within the first two weeks. Your practitioner checks in to make sure everything&apos;s on track.</p>
            </article>
            <article className="tsl-sig tsl-sig--best">
              <div className="tsl-sig-badge tsl-sig-badge--dark">Week 3–6</div>
              <h3 className="tsl-sig-title">{isBeginner ? 'Real, visible progress' : 'Measurable changes'}</h3>
              <p className="tsl-sig-desc">This is where most customers see significant, measurable results. 92% report clear progress by day 30.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="tsl-block" id="reviews">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">Real people, real results</h2>
          <div className="tsl-review-row">
            <figure className="tsl-quote">
              <Stars />
              <blockquote>"I was sceptical — but this actually worked. Saw real changes in 2 weeks. The practitioner check-in made me feel completely safe."</blockquote>
              <figcaption>James T. — Manchester</figcaption>
            </figure>
            <figure className="tsl-quote">
              <Stars />
              <blockquote>"Completely new to peptides. Peptiva made it simple — clear quiz, clear match, clear instructions. Down a clothing size in 6 weeks."</blockquote>
              <figcaption>Sarah L. — London</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="tsl-block tsl-block--muted" id="pricing">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">
            {isBeginner ? 'Get started — everything included' : 'Order your matched protocol'}
          </h2>
          <p className="tsl-lead">
            {isBeginner
              ? 'Your product + practitioner support + dosing guide + 30-day guarantee. Free UK shipping.'
              : 'Quiz-taker pricing · Practitioner support included · Free UK shipping · 30-day guarantee'
            }
          </p>
          <PricingCards primary={primary} secondary={secondary} isBeginner={isBeginner} />
        </div>
      </section>

      {/* ── SAFETY PROMISE ── */}
      <section className="tsl-block">
        <div className="tsl-wrap">
          <div className="tsl-promise">
            <h2 className="tsl-h2">
              {isBeginner ? 'Your safety comes first. Always.' : 'The Peptiva quality promise'}
            </h2>
            <p>
              {isBeginner
                ? 'We know you might be trying this for the first time — so we\'ve built every safety measure in. UK-regulated manufacturing. Independent third-party lab testing. A real practitioner who reviews your profile and guides your dosing. And a 30-day quality guarantee in case anything doesn\'t meet your expectations.'
                : 'Every product is manufactured in our UK-regulated laboratory with batch documentation and QR verification. Independently tested. Practitioner-reviewed. If something doesn\'t meet specification, we make it right.'
              }
            </p>
            <p className="tsl-promise-small">
              All products for research use only. Full documentation ships with every order.
            </p>
          </div>
        </div>
      </section>

      {/* ── CUSTOMER STORY ── */}
      <section className="tsl-block tsl-block--muted">
        <div className="tsl-wrap tsl-narrow">
          <p className="tsl-overline">Verified customer</p>
          <h2 className="tsl-story-title">
            "Within two weeks of starting {primary.sku}, the difference was obvious. First time a recommendation actually matched how I live."
          </h2>
          <p className="tsl-story-body">
            "I'd been reading forums for months, overwhelmed by options. Peptiva's quiz asked the right questions and gave me one clear answer. The practitioner check-in made me feel safe. Two weeks in and I stopped second-guessing."
          </p>
          <p className="tsl-story-by">Daniel R., Birmingham</p>
        </div>
      </section>

      {/* ── TRUST PILLS ── */}
      <section className="tsl-block" aria-label="Trust points">
        <div className="tsl-wrap">
          <ul className="tsl-pills">
            {[
              '🇬🇧 UK regulated lab',
              '🚚 Free UK shipping',
              '🔬 99.3%+ purity',
              '👨‍⚕️ Practitioner-backed',
              '🛡️ 30-day guarantee',
              '📦 Discreet packaging',
              '🔒 Third-party tested',
            ].map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FREE GUIDES ── */}
      <section className="tsl-block">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">Order today and get two free guides</h2>
          <div className="tsl-bonus-row">
            <article className="tsl-bonus">
              <span className="tsl-bonus-tag">Free · Bonus one</span>
              <h3 className="tsl-h3">{isBeginner ? 'The complete beginner\'s guide' : 'The protocol starter guide'}</h3>
              <p>{isBeginner
                ? 'Everything you need to know in plain English. Storage, dosing, what to expect, and when to contact your practitioner. Written for people who\'ve never done this before.'
                : 'Reconstitution, storage, dosing schedules, and how to track your first thirty days. Written for UK customers.'
              }</p>
            </article>
            <article className="tsl-bonus">
              <span className="tsl-bonus-tag">Free · Bonus two</span>
              <h3 className="tsl-h3">Myths vs. science</h3>
              <p>Separates published research from internet noise so you can proceed with confidence.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── COMPOUND DETAILS ── */}
      <section className="tsl-block tsl-block--muted">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">{isBeginner ? 'What\'s inside your match' : `Inside ${primary.sku}`}</h2>
          <p className="tsl-lead">
            {isBeginner
              ? 'Pharmaceutical-grade. UK manufactured. Practitioner-reviewed. Fully documented.'
              : 'Batch-tested, fully documented, practitioner-reviewed.'
            }
          </p>
          <div className="tsl-card-grid">
            {[primary, secondary].filter(Boolean).map((p) => (
              <article key={p!.id} className="tsl-card">
                {p!.image && <img src={p!.image} alt="" className="tsl-card-img" />}
                <div className="tsl-card-body">
                  <h3 className="tsl-h3">{p!.sku}</h3>
                  <p>{p!.tagline}</p>
                  <span className="tsl-card-cat">{p!.category}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PEPTIVA ── */}
      <section className="tsl-block">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">{isBeginner ? 'Why thousands trust Peptiva' : 'Why UK customers choose Peptiva'}</h2>
          <ul className="tsl-benefits">
            <li>Personalised match from a {PEPTIDES.length}-product verified catalogue</li>
            <li>Matched to your specific challenge — not generic goals</li>
            <li>{isBeginner ? 'Beginner-safe with practitioner guidance' : 'Beginner-safe or advanced picks based on your level'}</li>
            <li>Manufactured in our own UK-regulated laboratory</li>
            <li>A real practitioner reviews every protocol — included free</li>
            <li>30-day quality guarantee · Free UK shipping · Discreet packaging</li>
          </ul>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="tsl-block tsl-block--muted" id="compare">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">{isBeginner ? 'Why Peptiva is different (and safer)' : 'Peptiva vs. grey-market resellers'}</h2>
          <p className="tsl-lead">{isBeginner ? 'Not all peptide suppliers are equal. Here\'s what sets us apart.' : 'Same internet — different standard of evidence.'}</p>
          <div className="tsl-table-wrap">
            <table className="tsl-table">
              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">Peptiva</th>
                  <th scope="col">Typical online sellers</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.us ? <span className="tsl-yes">✓ Included</span> : '—'}</td>
                    <td>{row.them ? <span className="tsl-yes">Sometimes</span> : <span className="tsl-no">Rarely</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── MORE REVIEWS ── */}
      <section className="tsl-block">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">More from our customers</h2>
          <div className="tsl-review-grid">
            {[
              { text: 'The quiz nailed it. I was torn between three products for weeks — Peptiva matched me in under a minute. The practitioner follow-up sealed it.', name: 'Marcus W.', loc: 'Leeds' },
              { text: 'Completely new to peptides. Peptiva made it feel safe and simple. Clear match, clear guide, clear results.', name: 'Emily R.', loc: 'Bristol' },
              { text: 'Sceptical of a quiz, but the result matched what I would have picked after years of research. Save yourself the time.', name: 'Tom K.', loc: 'Edinburgh' },
              { text: 'Quick delivery, proper documentation, discreet packaging. The practitioner check-in was a nice touch. Already reordered.', name: 'Rachel M.', loc: 'Cardiff' },
            ].map((r) => (
              <figure key={r.name} className="tsl-quote tsl-quote--compact">
                <Stars />
                <blockquote>"{r.text}"</blockquote>
                <figcaption>{r.name} — {r.loc}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WE BUILT THIS ── */}
      <section className="tsl-block tsl-block--muted">
        <div className="tsl-wrap tsl-narrow">
          <h2 className="tsl-h2">Why we built Peptiva</h2>
          <p className="tsl-mission">
            {isBeginner
              ? 'The wellness space is overwhelming — especially if you\'re new. Too many products, too much jargon, no one to guide you. We built Peptiva to change that: one simple quiz, one clear match, one practitioner who has your back. UK-manufactured, third-party tested, fully documented. No guesswork. No risk.'
              : 'The peptide space is noisy — unregulated products, conflicting advice, too many options. We built Peptiva to cut through it: one quiz, one verified shortlist, one lab we control. Batch testing and QR verification on everything we ship. Practitioner-reviewed protocols. No middlemen, no guesswork.'
            }
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="tsl-block" id="faq">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">{isBeginner ? 'Got questions? We\'ve got answers.' : 'Frequently asked questions'}</h2>
          <FAQ isBeginner={isBeginner} />
        </div>
      </section>

      {/* ── BOTTOM PRICING ── */}
      <section className="tsl-block tsl-block--muted" id="pricing-bottom">
        <div className="tsl-wrap">
          <h2 className="tsl-h2">{isBeginner ? 'Ready to start your journey?' : 'Ready to order?'}</h2>
          <PricingCards primary={primary} secondary={secondary} isBeginner={isBeginner} />
        </div>
      </section>

      {/* ── CATALOGUE STRIP ── */}
      <section className="tsl-strip">
        <div className="tsl-wrap">
          <p className="tsl-strip-label">From the verified catalogue</p>
          <div className="tsl-strip-tags">
            {PEPTIDES.slice(0, 8).map((p) => (
              <span key={p.id}>{p.sku}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY BAR ── */}
      <div className="tsl-sticky">
        <div className="tsl-sticky-inner">
          <span>Your match: <strong>{primary.sku}</strong> — £{fromGbp(primary.id)}/mo</span>
          <a href={SHOP_URL} className="tsl-cta tsl-cta--solid tsl-cta--small">Get Started</a>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="tsl-foot">
        <div className="tsl-wrap">
          <p>
            Peptiva Ltd. Products manufactured in our UK-regulated laboratory. 99.3%+ verified purity. Third-party lab tested. Practitioner-reviewed protocols. Sold for research use only.
          </p>
          <p className="tsl-foot-meta">
            © {new Date().getFullYear()} Peptiva · <Link to="/">Home</Link> · <Link to="/">Retake quiz</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
