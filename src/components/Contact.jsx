import { useState } from 'react'
import { Phone, Mail, MapPin, Globe, Clock } from 'lucide-react'

const details = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(617) 555-0147',
    href: 'tel:+16175550147',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@nurtayevlaw.com',
    href: 'mailto:info@nurtayevlaw.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: '1 Federal St, Suite 1900, Boston, MA 02110',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Fri: 9am – 6pm · Consultations by appointment',
  },
  {
    icon: Globe,
    label: 'Languages',
    value: 'English · Русский · Қазақша',
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="contact-info">
          <span className="section-label">Get in Touch</span>
          <h2>Begin Your Immigration Journey</h2>
          <p className="contact-lead">
            Every case is unique. Schedule a free consultation and let us
            evaluate your situation, explain your options, and outline a
            clear path forward — with no obligation.
          </p>

          <div className="contact-details">
            {details.map(d => (
              <div key={d.label} className="contact-detail">
                <div className="detail-icon">
                  <d.icon size={17} />
                </div>
                <div>
                  <strong>{d.label}</strong>
                  {d.href
                    ? <a href={d.href}><span>{d.value}</span></a>
                    : <span>{d.value}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ marginBottom: '8px' }}>Message Received</h3>
              <p style={{ color: 'var(--text)', fontSize: '15px' }}>
                Thank you for reaching out. Attorney Nurtayev will contact you
                within one business day to schedule your free consultation.
              </p>
            </div>
          ) : (
            <>
              <p className="form-title">Free Consultation Request</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input id="fname" type="text" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input id="lname" type="text" placeholder="Doe" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" placeholder="john@email.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" type="tel" placeholder="(617) 000-0000" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="case-type">Immigration Matter</label>
                  <select id="case-type" required>
                    <option value="">Select a category...</option>
                    <option>Family-Based Immigration</option>
                    <option>Employment Visa (H-1B, L-1, O-1)</option>
                    <option>Green Card / Permanent Residence</option>
                    <option>Citizenship & Naturalization</option>
                    <option>Asylum & Humanitarian Relief</option>
                    <option>Removal Defense</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Brief Description</label>
                  <textarea
                    id="message"
                    placeholder="Please briefly describe your situation and what you are hoping to achieve..."
                    required
                  />
                </div>

                <button type="submit" className="btn-primary form-submit">
                  Request Free Consultation →
                </button>

                <p style={{ fontSize: '12px', color: 'var(--text)', marginTop: '12px', textAlign: 'center', opacity: 0.7 }}>
                  Confidential · No obligation · Response within 1 business day
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
