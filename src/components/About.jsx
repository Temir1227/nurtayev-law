import { GraduationCap, MapPin, Globe, CheckCircle } from 'lucide-react'

const credentials = [
  { icon: GraduationCap, label: 'J.D., Boston University School of Law', sub: 'Concentration in International Law' },
  { icon: CheckCircle, label: 'Licensed in Massachusetts & New York', sub: 'Bar Admissions' },
  { icon: MapPin, label: 'Boston, MA', sub: 'Primary Office · Remote consultations available' },
  { icon: Globe, label: 'Born in Almaty, Kazakhstan', sub: 'Deep understanding of the immigrant journey' },
]

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <div>
          <div className="about-portrait">
            <span className="portrait-initials">DN</span>
            <div className="portrait-badge">
              <strong>Daniyar Nurtayev</strong>
              <p>Attorney at Law · Est. 2010</p>
            </div>
          </div>
        </div>

        <div className="about-content">
          <span className="section-label">About the Attorney</span>
          <h2>A Personal Understanding of the Immigration Journey</h2>

          <p className="about-bio">
            Attorney Daniyar Nurtayev founded Nurtayev Law with a singular mission:
            to provide every client with the same dedicated, thorough representation
            he would want for his own family. Having immigrated from Kazakhstan himself,
            Daniyar brings a deeply personal understanding to every case — not just
            the legal complexity, but the human stakes involved.
          </p>

          <p className="about-bio" style={{ marginTop: '0', marginBottom: '28px' }}>
            Over 14 years of practice, he has successfully represented clients across
            the full spectrum of immigration law — from complex employment visa petitions
            and family reunification cases to asylum applications and removal defense.
            His trilingual capabilities allow him to serve clients from Eastern Europe,
            Central Asia, and beyond without the barrier of language.
          </p>

          <div className="credentials-list">
            {credentials.map(c => (
              <div key={c.label} className="credential-item">
                <c.icon size={16} className="cred-icon" />
                <div>
                  <strong>{c.label}</strong>
                  <span style={{ display: 'block', fontSize: '13px', marginTop: '1px' }}>{c.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-h)' }}>
            Languages
          </div>
          <div className="lang-chips">
            <span className="lang-chip">🇺🇸 English</span>
            <span className="lang-chip">🇷🇺 Русский</span>
            <span className="lang-chip">🇰🇿 Қазақша</span>
          </div>
        </div>
      </div>
    </section>
  )
}
