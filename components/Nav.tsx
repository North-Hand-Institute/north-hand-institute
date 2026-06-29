'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.2rem 3rem',
      background: scrolled ? 'rgba(26,38,64,0.98)' : 'rgba(26,38,64,0.96)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(184,149,106,0.3)',
      transition: 'background 0.3s',
    }}>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--cream)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.2 }}>
        North Hand
        <span style={{ display: 'block', fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'Jost, sans-serif' }}>
          Institute of Massage Education
        </span>
      </div>
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {['About', 'Courses', 'Credentials', 'Contact'].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{
              textDecoration: 'none', color: 'rgba(245,237,216,0.75)',
              fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--persimmon)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,237,216,0.75)')}
            >{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
