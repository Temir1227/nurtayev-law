import { ShieldCheck, Award, Users, Clock } from 'lucide-react'

const items = [
  { icon: ShieldCheck, label: 'ABA Member', sub: 'American Bar Association' },
  { icon: Award, label: '500+ Cases Won', sub: 'Across all visa categories' },
  { icon: Users, label: '3 Languages', sub: 'English · Russian · Kazakh' },
  { icon: Clock, label: '14+ Years', sub: 'Immigration practice' },
]

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-inner">
        {items.map((item, i) => (
          <>
            <div key={item.label} className="trust-item">
              <item.icon size={18} className="trust-icon" />
              <div>
                <strong>{item.label}</strong>
                <span style={{ display: 'block', fontSize: '12px', opacity: 0.7 }}>{item.sub}</span>
              </div>
            </div>
            {i < items.length - 1 && <div key={`div-${i}`} className="trust-divider" />}
          </>
        ))}
      </div>
    </div>
  )
}
