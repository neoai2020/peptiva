import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="brand-mark">Peptiva</span>
        <span className="uk-pill">🇬🇧 UK · GBP · Regulated Lab</span>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-inner">
          <p className="landing-eyebrow">Personalised Peptide Matching</p>
          <h1 className="landing-h1">
            Finally fix what diet, exercise &amp; willpower can't
            <br /><em>— in 60 seconds</em>
          </h1>
          <p className="landing-lead">
            Take a short quiz. Our algorithm matches you to 1–2 research-grade
            peptides from a UK-regulated lab — personalised to your body, goals,
            and frustrations. Backed by 99.3% purity and third-party lab testing.
          </p>

          <div className="landing-gender-pick">
            <Link className="landing-gender-card" to="/quiz/men">
              <div className="landing-gender-icon">🧬</div>
              <span className="landing-gender-label">I'm a Man</span>
              <span className="landing-gender-sub">Start the Men's Quiz →</span>
            </Link>
            <Link className="landing-gender-card" to="/quiz/women">
              <div className="landing-gender-icon">✨</div>
              <span className="landing-gender-label">I'm a Woman</span>
              <span className="landing-gender-sub">Start the Women's Quiz →</span>
            </Link>
          </div>

          <p className="landing-trust">🔒 Private · No email required · Takes 60 seconds</p>
        </div>
      </section>

      <section className="landing-how">
        <div className="landing-how-inner">
          <h2 className="landing-how-title">How it works</h2>
          <div className="landing-how-grid">
            <div className="landing-how-step">
              <span className="landing-how-num">1</span>
              <h3>Take the quiz</h3>
              <p>Answer a few honest questions about your body, goals, and frustrations.</p>
            </div>
            <div className="landing-how-step">
              <span className="landing-how-num">2</span>
              <h3>Get your match</h3>
              <p>Our algorithm scores 12 UK-lab compounds and finds your #1 match.</p>
            </div>
            <div className="landing-how-step">
              <span className="landing-how-num">3</span>
              <h3>See results</h3>
              <p>92% of matched customers see measurable changes within 30 days.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-proof-strip">
        <div className="landing-proof-inner">
          <div className="landing-proof-item">
            <span className="landing-proof-num">4,800+</span>
            <span className="landing-proof-label">Orders shipped</span>
          </div>
          <div className="landing-proof-divider" />
          <div className="landing-proof-item">
            <span className="landing-proof-num">99.3%</span>
            <span className="landing-proof-label">Purity verified</span>
          </div>
          <div className="landing-proof-divider" />
          <div className="landing-proof-item">
            <span className="landing-proof-num">92%</span>
            <span className="landing-proof-label">See results in 30 days</span>
          </div>
          <div className="landing-proof-divider" />
          <div className="landing-proof-item">
            <span className="landing-proof-num">2–3 day</span>
            <span className="landing-proof-label">Free UK delivery</span>
          </div>
        </div>
      </section>
    </div>
  )
}
