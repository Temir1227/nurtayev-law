import { ArrowRight, Phone } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div>
          <div className="hero-pill">
            <span>⚖️</span>
            Immigration Attorney · Licensed in MA & NY
          </div>

          <h1 className="hero-title">
            Your Path to <span>Permanent Residence</span> Starts Here
          </h1>

          <p className="hero-desc">
            Attorney Daniyar Nurtayev provides dedicated, results-driven immigration
            counsel to individuals, families, and businesses navigating the U.S.
            immigration system — in English, Russian, and Kazakh.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-hero-primary">
              Schedule Free Consultation <ArrowRight size={16} />
            </a>
            <a href="tel:+16175550147" className="btn-hero-outline">
              <Phone size={15} /> (617) 555-0147
            </a>
          </div>

          <div className="hero-langs">
            <span>🇺🇸 English</span>
            <span>🇷🇺 Русский</span>
            <span>🇰🇿 Қазақша</span>
          </div>
        </div>

        <div className="attorney-card">
          <div className="attorney-monogram">DN</div>
          <p className="attorney-name">Daniyar Nurtayev</p>
          <p className="attorney-title">Attorney at Law</p>
          <div className="attorney-stats">
            <div className="stat-item">
              <span className="stat-num">500+</span>
              <span className="stat-lbl">Cases</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">14+</span>
              <span className="stat-lbl">Years</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">5★</span>
              <span className="stat-lbl">Rated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
