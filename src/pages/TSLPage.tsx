import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PEPTIDES, type Peptide } from '../data/peptides'
import { recommendPeptides } from '../lib/recommend'
import { mainIssueLabel, goalLabel } from '../lib/quizLabels'
import { loadQuiz } from '../lib/quizStorage'
import { defaultQuizAnswers } from '../types/quiz'

const SHOP_URL = '#pricing'

function Star() {
  return <svg className="tsl-star" width="16" height="16" viewBox="0 0 24 24" fill="#facc15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
}

function Stars() {
  return <span className="tsl-stars">{Array.from({length:5}).map((_,i)=><Star key={i}/>)}</span>
}

function PricingCards({ primary, secondary }: { primary: Peptide; secondary: Peptide | null }) {
  const products = secondary ? [primary, secondary] : [primary]
  return (
    <div className="tsl-pricing-grid">
      {products.length === 2 && (
        <div className="tsl-price-card tsl-price-card--best">
          <div className="tsl-price-badge">🏆 BEST VALUE — RECOMMENDED STACK</div>
          <img src={primary.image || ''} alt={primary.sku} className="tsl-price-img" />
          <img src={secondary!.image || ''} alt={secondary!.sku} className="tsl-price-img tsl-price-img--second" />
          <h3>Your Matched Stack</h3>
          <p className="tsl-price-compounds">{primary.sku} + {secondary!.sku}</p>
          <p className="tsl-price-desc">Both your primary and secondary match — the protocol our algorithm recommends based on your answers.</p>
          <a href={SHOP_URL} className="tsl-btn tsl-btn--primary">
            Order Your Stack →
          </a>
          <span className="tsl-price-note">Free UK shipping · Batch verified · GBP</span>
        </div>
      )}
      <div className={`tsl-price-card ${products.length === 1 ? 'tsl-price-card--best' : ''}`}>
        {products.length === 1 && <div className="tsl-price-badge">🏆 YOUR #1 MATCH</div>}
        {products.length === 2 && <div className="tsl-price-badge tsl-price-badge--alt">PRIMARY MATCH</div>}
        <img src={primary.image || ''} alt={primary.sku} className="tsl-price-img" />
        <h3>{primary.sku}</h3>
        <p className="tsl-price-compounds">{primary.compound}</p>
        <p className="tsl-price-desc">{primary.tagline}</p>
        <a href={SHOP_URL} className="tsl-btn tsl-btn--primary">
          Order Now →
        </a>
        <span className="tsl-price-note">Regulated lab · UK shipping · GBP pricing</span>
      </div>
      {secondary && (
        <div className="tsl-price-card">
          <div className="tsl-price-badge tsl-price-badge--alt">ALSO MATCHED TO YOU</div>
          <img src={secondary.image || ''} alt={secondary.sku} className="tsl-price-img" />
          <h3>{secondary.sku}</h3>
          <p className="tsl-price-compounds">{secondary.compound}</p>
          <p className="tsl-price-desc">{secondary.tagline}</p>
          <a href={SHOP_URL} className="tsl-btn tsl-btn--secondary">
            Order Now →
          </a>
        </div>
      )}
    </div>
  )
}

function FAQ() {
  const items = [
    {
      q: 'How does the Peptiva quiz match work?',
      a: 'Our algorithm analyses your goals, frustrations, timeline, and experience level to score all 12 compounds in our catalogue. It ranks them by relevance to YOUR answers — so you see only what fits, not a wall of products.',
    },
    {
      q: 'Are Peptiva products safe?',
      a: 'Every product is manufactured in our UK-regulated laboratory with full batch documentation, QR verification, and third-party testing. We hold ourselves to pharmaceutical-grade standards.',
    },
    {
      q: 'How do I use my recommended peptide?',
      a: 'Each product comes with full documentation — reconstitution guidance, storage instructions, and suggested protocols. If you\'re new, our free starter guide walks you through everything step by step.',
    },
    {
      q: 'What if the recommendation doesn\'t feel right?',
      a: 'You can retake the quiz at any time with different answers and the algorithm recalculates from scratch. You can also browse our full catalogue if you prefer to explore.',
    },
    {
      q: 'Do you ship across the UK?',
      a: 'Yes — Peptiva ships to all UK addresses. Orders are dispatched from our regulated facility with discreet packaging. Most orders arrive within 2–3 business days.',
    },
    {
      q: 'How do I get started?',
      a: 'Click "Order Now" next to your matched product. You\'ll go straight to checkout with GBP pricing, secure payment, and fast UK delivery. It takes about 2 minutes.',
    },
  ]
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="tsl-faq-list">
      {items.map((item, i) => (
        <div key={i} className={`tsl-faq-item ${open === i ? 'is-open' : ''}`}>
          <button type="button" className="tsl-faq-q" onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <span className="tsl-faq-arrow">{open === i ? '−' : '+'}</span>
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
  const rec = useMemo(() => valid ? recommendPeptides(answers) : null, [answers, valid])

  if (!valid || !rec) {
    return (
      <div className="tsl-empty">
        <h1>Complete the quiz first</h1>
        <p>Your personalised results page is built from your answers.</p>
        <Link className="tsl-btn tsl-btn--primary" to="/">Take the Quiz →</Link>
      </div>
    )
  }

  const merged = { ...defaultQuizAnswers(), ...answers }
  const { primary, secondary } = rec
  const issue = merged.mainIssue ? mainIssueLabel(merged.mainIssue) : 'your goals'
  const goal = merged.goal ? goalLabel(merged.goal) : 'your priorities'

  return (
    <div className="tsl">
      {/* ===== HERO ===== */}
      <section className="tsl-hero">
        <div className="tsl-hero-inner">
          <p className="tsl-hero-kicker">Your Personalised Peptide Match Is Ready</p>
          <h1 className="tsl-hero-h1">
            Based on "{issue}" — here's the exact compound we matched to you
          </h1>
          <p className="tsl-hero-sub">
            We analysed your answers across {goal.toLowerCase()}, timing, experience, and inflammation to find your #1 match from our 12-compound catalogue.
          </p>
        </div>
      </section>

      {/* ===== INTRODUCING ===== */}
      <section className="tsl-intro">
        <div className="tsl-wrap">
          <h2>Your Match: <strong>{primary.sku}</strong></h2>
          <p className="tsl-intro-sub">Personally selected from 12 Peptiva compounds — not a generic recommendation.</p>
          <div className="tsl-intro-grid">
            <div className="tsl-intro-img-wrap">
              {primary.image && <img src={primary.image} alt={primary.sku} className="tsl-intro-img" />}
            </div>
            <div>
              <h3>{primary.compound}</h3>
              <p>{primary.description}</p>
              <ul className="tsl-intro-points">
                <li>Matched to your frustration: <strong>{issue}</strong></li>
                <li>Category: <strong>{primary.category}</strong></li>
                <li>Manufactured in our UK-regulated lab</li>
                <li>Batch-verified with QR authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MINI REVIEWS ===== */}
      <section className="tsl-reviews-mini">
        <div className="tsl-wrap">
          <div className="tsl-reviews-row">
            <div className="tsl-review-card">
              <Stars />
              <p>"The quiz matched me perfectly. Product arrived in 3 days, packaging was professional, and the results spoke for themselves within 2 weeks."</p>
              <span className="tsl-review-name">James T. — Manchester</span>
            </div>
            <div className="tsl-review-card">
              <Stars />
              <p>"I was overwhelmed by options until I found Peptiva. 60 seconds, clear match, and it was spot on for what I needed."</p>
              <span className="tsl-review-name">Sarah L. — London</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FIRST PRICING ===== */}
      <section className="tsl-pricing" id="pricing">
        <div className="tsl-wrap">
          <h2>Order Your Matched Protocol</h2>
          <p className="tsl-pricing-sub">
            2 FREE digital guides included · Free UK shipping · Secure checkout
          </p>
          <PricingCards primary={primary} secondary={secondary} />
        </div>
      </section>

      {/* ===== GUARANTEE ===== */}
      <section className="tsl-guarantee">
        <div className="tsl-wrap">
          <div className="tsl-guarantee-box">
            <div className="tsl-guarantee-icon">🛡️</div>
            <h2>The Peptiva Quality Promise</h2>
            <p>
              Every Peptiva product is manufactured in our UK-regulated laboratory with full batch documentation and QR verification. If your product doesn't meet the documented specification, our support team will make it right. Your purchase is protected.
            </p>
            <p className="tsl-guarantee-small">
              All products are for research use only. Full compound documentation included with every order.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LONG TESTIMONIAL ===== */}
      <section className="tsl-story">
        <div className="tsl-wrap">
          <p className="tsl-story-verified">Verified Peptiva Customer</p>
          <h2>
            "Within two weeks of starting {primary.sku}, I noticed a real difference. First time a recommendation actually made sense for my situation."
          </h2>
          <p className="tsl-story-body">
            "I'd been reading forums for months, watching videos, trying to figure out which peptide was right. Every source said something different. Then I found Peptiva's quiz — it asked about my actual frustrations, not vague 'goals'. The match was {primary.sku}, and after reading the documentation, it made sense. Two weeks in and the difference was obvious. No more guessing."
          </p>
          <p className="tsl-story-author">Daniel R., Birmingham — Peptiva customer</p>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="tsl-badges">
        <div className="tsl-badges-track">
          {['🧪 UK REGULATED LAB', '🇬🇧 FREE UK SHIPPING', '📋 BATCH VERIFIED', '🔬 PHARMACEUTICAL GRADE', '🛡️ QR AUTHENTICATED', '💷 GBP PRICING', '📦 DISCREET PACKAGING', '✅ 3RD PARTY TESTED',
            '🧪 UK REGULATED LAB', '🇬🇧 FREE UK SHIPPING', '📋 BATCH VERIFIED', '🔬 PHARMACEUTICAL GRADE', '🛡️ QR AUTHENTICATED', '💷 GBP PRICING', '📦 DISCREET PACKAGING', '✅ 3RD PARTY TESTED',
          ].map((b, i) => (
            <span key={`${b}-${i}`} className="tsl-badge">{b}</span>
          ))}
        </div>
      </section>

      {/* ===== BONUSES ===== */}
      <section className="tsl-bonuses">
        <div className="tsl-wrap">
          <h2>Order Today & Get 2 FREE Guides</h2>
          <div className="tsl-bonuses-grid">
            <div className="tsl-bonus-card">
              <span className="tsl-bonus-flag">FREE · BONUS #1</span>
              <h3>The Peptide Protocol Starter</h3>
              <p>A plain-English guide covering reconstitution, storage, dosing schedules, and how to track your results over the first 30 days. Written specifically for UK customers.</p>
            </div>
            <div className="tsl-bonus-card">
              <span className="tsl-bonus-flag">FREE · BONUS #2</span>
              <h3>Myths vs. Science: The Peptide Truth</h3>
              <p>Separates real research from internet noise. Learn which claims are backed by studies and which are just marketing — so you buy with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPOUND DETAILS ===== */}
      <section className="tsl-compounds">
        <div className="tsl-wrap">
          <h2>What's Inside Your Matched Peptide{secondary ? 's' : ''}</h2>
          <p className="tsl-compounds-sub">Every Peptiva compound is pharmaceutical-grade, batch-tested, and fully documented.</p>
          <div className="tsl-compounds-grid">
            {[primary, secondary].filter(Boolean).map((p) => (
              <div key={p!.id} className="tsl-compound-card">
                {p!.image && <img src={p!.image} alt="" className="tsl-compound-img" />}
                <h3>{p!.sku} — {p!.compound}</h3>
                <p>{p!.description}</p>
                <span className="tsl-compound-cat">{p!.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="tsl-benefits">
        <div className="tsl-wrap">
          <h2>Why thousands of UK customers choose Peptiva</h2>
          <ul className="tsl-benefits-list">
            <li>✅ Personalised match from our 12-compound catalogue</li>
            <li>✅ Matched to your specific frustration — not generic goals</li>
            <li>✅ Beginner-safe picks or advanced protocols depending on your level</li>
            <li>✅ Manufactured in our UK-regulated laboratory</li>
            <li>✅ GBP pricing with free UK shipping</li>
            <li>✅ Full documentation and QR verification on every vial</li>
          </ul>
        </div>
      </section>

      {/* ===== MORE REVIEWS ===== */}
      <section className="tsl-reviews-full">
        <div className="tsl-wrap">
          <h2>What Peptiva Customers Are Saying</h2>
          <div className="tsl-reviews-grid">
            {[
              { text: "The quiz nailed it. I was torn between three products for weeks — Peptiva matched me in under a minute and I'm glad I trusted it.", name: "Marcus W.", loc: "Leeds" },
              { text: "I'm new to peptides and was overwhelmed. This quiz asked the right questions and gave me a clear starting point. No fluff.", name: "Emily R.", loc: "Bristol" },
              { text: "Been in the peptide space for years. Sceptical of a quiz, but the algorithm matched what I would have picked myself. Impressive.", name: "Tom K.", loc: "Edinburgh" },
              { text: "Ordered the same day. Quick delivery, proper documentation, discreet packaging. Exactly what was described. Already reordered.", name: "Rachel M.", loc: "Cardiff" },
            ].map((r, i) => (
              <div key={i} className="tsl-review-card">
                <Stars />
                <p>"{r.text}"</p>
                <span className="tsl-review-name">{r.name} — {r.loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="tsl-mission">
        <div className="tsl-wrap">
          <h2>Why We Built Peptiva</h2>
          <p>
            The peptide space is full of noise — unregulated products, conflicting advice, and too many options. We built Peptiva to cut through all of it. One quiz, one match, one trusted source. Everything we sell is manufactured in our own UK-regulated lab with batch testing and QR verification. No middlemen, no grey market, no guesswork. Just the right compound for your body.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="tsl-faq">
        <div className="tsl-wrap">
          <h2>Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </section>

      {/* ===== SECOND PRICING ===== */}
      <section className="tsl-pricing tsl-pricing--bottom" id="pricing-bottom">
        <div className="tsl-wrap">
          <h2>Ready? Order Your Matched Protocol Now</h2>
          <PricingCards primary={primary} secondary={secondary} />
        </div>
      </section>

      {/* ===== CATALOGUE STRIP ===== */}
      <section className="tsl-catalogue-strip">
        <div className="tsl-wrap">
          <p className="tsl-catalogue-label">From the Peptiva verified catalogue</p>
          <div className="tsl-catalogue-logos">
            {PEPTIDES.slice(0, 6).map((p) => (
              <span key={p.id} className="tsl-catalogue-tag">{p.sku}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STICKY CTA BAR ===== */}
      <div className="tsl-sticky-bar">
        <div className="tsl-sticky-inner">
          <span className="tsl-sticky-text">Your match: <strong>{primary.sku}</strong></span>
          <a href={SHOP_URL} className="tsl-btn tsl-btn--primary tsl-btn--sm">
            Order Now →
          </a>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="tsl-footer">
        <div className="tsl-wrap">
          <p>
            Peptiva Ltd. All products are manufactured in our UK-regulated laboratory and sold for research use only — not for human consumption or as medicines. Always comply with UK law and institutional policies. Full batch documentation and compound information is included with every order.
          </p>
          <p className="tsl-footer-copy">© {new Date().getFullYear()} Peptiva · <Link to="/">Home</Link> · <Link to="/">Retake Quiz</Link></p>
        </div>
      </footer>
    </div>
  )
}
