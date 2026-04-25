import { Star } from 'lucide-react'
import { RatingInteraction } from '@/components/ui/emoji-rating'

const reviews = [
  {
    initials: 'MS',
    name: 'Maria S.',
    caseType: 'Spousal Green Card',
    rating: 5,
    text: '"Daniyar helped my family reunite after three years apart. His attention to detail and constant communication made an incredibly stressful process feel manageable. We got approval on the first try."',
  },
  {
    initials: 'RP',
    name: 'Rajesh P.',
    caseType: 'H-1B Visa',
    rating: 5,
    text: '"My H-1B petition was approved without an RFE. Daniyar is professional, deeply knowledgeable, and always available to answer questions. I\'ve referred three colleagues to him since."',
  },
  {
    initials: 'AM',
    name: 'Aisha M.',
    caseType: 'Asylum Case',
    rating: 5,
    text: '"I was facing removal and had no idea what to do. Daniyar was calm, thorough, and fought for my case at every hearing. I received asylum. I will be forever grateful for his dedication."',
  },
]

function Stars({ count }) {
  return (
    <div className="review-stars">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={15} fill="currentColor" />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="section-inner">
        <div className="reviews-header">
          <div>
            <span className="section-label">Testimonials</span>
            <h2>What Clients Say</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-h)' }}>5.0</span>
            <span style={{ fontSize: '13px', color: 'var(--text)' }}>· 80+ Google reviews</span>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map(r => (
            <div key={r.name} className="review-card">
              <Stars count={r.rating} />
              <p className="review-text">{r.text}</p>
              <div className="review-author">
                <div className="author-avatar">{r.initials}</div>
                <div>
                  <p className="author-name">{r.name}</p>
                  <p className="author-case">{r.caseType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rating-cta">
          <p className="rating-cta-label">Share Your Experience</p>
          <h3>How was your experience with Nurtayev Law?</h3>
          <RatingInteraction />
        </div>
      </div>
    </section>
  )
}
