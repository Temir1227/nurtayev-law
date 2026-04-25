import { Users, Briefcase, CreditCard, Flag, Shield, Scale } from 'lucide-react'

const services = [
  {
    icon: Users,
    title: 'Family-Based Immigration',
    desc: 'Reunite with loved ones through spousal visas, family petitions, K-1 fiancé visas, and adjustment of status. We guide every step.',
  },
  {
    icon: Briefcase,
    title: 'Employment Visas',
    desc: 'H-1B, L-1, O-1, TN, and E-2 visas for professionals and businesses. Expert preparation to maximize your approval chances.',
  },
  {
    icon: CreditCard,
    title: 'Green Card & Permanent Residence',
    desc: 'Navigate the path to a Green Card through employment, family, or investment-based categories with experienced counsel.',
  },
  {
    icon: Flag,
    title: 'Citizenship & Naturalization',
    desc: 'From N-400 application preparation to interview coaching — we help you achieve U.S. citizenship with confidence.',
  },
  {
    icon: Shield,
    title: 'Asylum & Humanitarian Relief',
    desc: 'Compassionate, thorough representation for individuals fleeing persecution. We handle affirmative and defensive asylum cases.',
  },
  {
    icon: Scale,
    title: 'Removal Defense',
    desc: 'Aggressive representation in immigration court. We fight deportation orders and pursue every legal avenue to protect your status.',
  },
]

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-inner">
        <div className="services-header">
          <span className="section-label">Practice Areas</span>
          <h2>Comprehensive Immigration Services</h2>
          <p style={{ color: 'var(--text)', fontSize: '16px', lineHeight: '1.7' }}>
            From visa applications to citizenship, Nurtayev Law handles every stage
            of the immigration process with precision and dedication.
          </p>
        </div>

        <div className="services-grid">
          {services.map(s => (
            <div key={s.title} className="service-card">
              <div className="service-icon">
                <s.icon size={22} />
              </div>
              <p className="service-title">{s.title}</p>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
