import { useState } from 'react'
import { Scale, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#process', label: 'Process' },
    { href: '#reviews', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a href="#" className="logo-link">
          <div className="logo-mark">
            <Scale size={16} />
          </div>
          <span className="logo-text">Nurtayev <em>Law</em></span>
        </a>

        <nav className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <a href="#contact" className="btn-primary nav-cta">Free Consultation</a>

        <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="nav-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setOpen(false)}>
            Free Consultation
          </a>
        </nav>
      )}
    </header>
  )
}
