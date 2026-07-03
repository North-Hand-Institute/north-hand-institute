'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Courses', 'Credentials', 'Contact']

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        background: 'rgba(26,38,64,0.98)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(184,149,106,0.3)',
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 600, color: '#f5edd8', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.2 }}>
            North Hand
            <span style={{ display: 'block', fontWeight: 300, fontSize: '0.62rem', letterSpacing: '0.15em', color: '#b8956a', fontFamily: 'Jost, sans-serif' }}>
              Institute of Massage Education
            </span>
          </div>
        </a>

        {/* Desktop links + cross-link, grouped together */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
            {links.map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} style={{
                  textDecoration: 'none', color: 'rgba(245,237,216,0.75)',
                  fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c9572a')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,237,216,0.75)')}
                >{item}</a>
              </li>
            ))}
          </ul>
          <a href="https://michaelcorcoranlmt.com" target="_blank" rel="noopener noreferrer" style={{
            textDecoration: 'none', color: '#b8956a',
            fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            border: '1px solid rgba(184,149,106,0.4)', padding: '0.5rem 1rem',
            whiteSpace: 'nowrap',
          }}>
            Massage Practice ↗
          </a>
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', flexDirection: 'column', gap: '5px', background: 'none',
          border: 'none', cursor: 'pointer', padding: '4px',
        }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 24, height: 2, background: '#f5edd8', transition: 'all 0.3s',
              transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'opacity: 0') : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="nav-mobile-menu" style={{
        display: menuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 99,
        background: 'rgba(26,38,64,0.98)',
        borderBottom: '1px solid rgba(184,149,106,0.3)',
        padding: '1rem 0',
      }}>
        {links.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '0.9rem 2rem', textDecoration: 'none',
              color: 'rgba(245,237,216,0.85)', fontSize: '0.8rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              borderBottom: '1px solid rgba(184,149,106,0.1)',
            }}
          >{item}</a>
        ))}
        <a href="https://michaelcorcoranlmt.com" target="_blank" rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          style={{
            padding: '0.9rem 2rem', textDecoration: 'none',
            color: '#b8956a', fontSize: '0.8rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}
        >
          Massage Practice ↗
        </a>
      </div>
    </>
  )
}
