import { Scale, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale size={15} color="white" />
            </div>
            <span className="footer-logo-text">Nurtayev <em>Law</em></span>
          </div>
          <p>
            Dedicated immigration counsel for individuals, families, and businesses.
            Serving clients in English, Russian, and Kazakh.
          </p>
        </div>

        <div className="footer-col">
          <h4>Practice Areas</h4>
          <ul>
            <li><a href="#services">Family Immigration</a></li>
            <li><a href="#services">Employment Visas</a></li>
            <li><a href="#services">Green Card</a></li>
            <li><a href="#services">Citizenship</a></li>
            <li><a href="#services">Asylum</a></li>
            <li><a href="#services">Removal Defense</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Firm</h4>
          <ul>
            <li><a href="#about">About Daniyar</a></li>
            <li><a href="#process">Our Process</a></li>
            <li><a href="#reviews">Client Reviews</a></li>
            <li><a href="#contact">Free Consultation</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="tel:+16175550147">
                <Phone size={13} /> (617) 555-0147
              </a>
            </li>
            <li>
              <a href="mailto:info@nurtayevlaw.com">
                <Mail size={13} /> info@nurtayevlaw.com
              </a>
            </li>
            <li>
              <span>
                <MapPin size={13} /> Boston, MA
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Nurtayev Law PLLC · All rights reserved.</p>
        <p className="footer-disclaimer">
          Attorney advertising. Prior results do not guarantee a similar outcome.
          This website is for informational purposes only and does not constitute legal advice.
        </p>
      </div>
    </footer>
  )
}
