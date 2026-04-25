import { CalendarDays, ClipboardList, FileText, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: CalendarDays,
    title: 'Free Consultation',
    desc: 'Schedule a 30-minute call to discuss your situation, goals, and initial eligibility at no charge.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Case Assessment',
    desc: 'We conduct a thorough review of your documents, history, and options to build the strongest possible strategy.',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Document Preparation',
    desc: 'Our team meticulously prepares and reviews every form, letter, and supporting document before filing.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Filing & Resolution',
    desc: 'We handle all submissions, monitor your case status, and keep you informed every step of the way.',
  },
]

export default function Process() {
  return (
    <section className="process-section" id="process">
      <div className="section-inner">
        <div className="process-header">
          <span className="section-label">How We Work</span>
          <h2>A Clear, Transparent Process</h2>
          <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.7' }}>
            Immigration law is complex — our process is not. We keep you
            informed and confident at every milestone.
          </p>
        </div>

        <div className="process-grid">
          {steps.map(step => (
            <div key={step.number} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">
                <step.icon size={24} />
              </div>
              <p className="step-title">{step.title}</p>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
