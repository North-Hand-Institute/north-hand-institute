export default function Hero({ tagline }: { tagline?: string }) {
  return (
    <>
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', overflow: 'hidden' }}>
        {/* Left */}
        <div style={{ background: 'var(--navy)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 4rem 6rem 5rem', position: 'relative' }}>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--persimmon)', marginBottom: '1.5rem', fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
            NCBTMB Approved Provider · Continuing Education
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--cream)', marginBottom: '1rem' }}>
            Advancing the<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Art & Science</em><br />
            of Massage
          </h1>
          <div style={{ width: 60, height: 2, background: 'var(--persimmon)', margin: '1.8rem 0' }} />
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,237,216,0.72)', maxWidth: 380 }}>
            {tagline || 'Professional continuing education for Licensed Massage Therapists — rooted in meridian-based tradition, adapted for the modern treatment table.'}
          </p>
          <a href="#courses" style={{
            display: 'inline-block', marginTop: '2.8rem', padding: '0.9rem 2.4rem',
            background: 'var(--persimmon)', color: 'var(--cream)', textDecoration: 'none',
            fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
            transition: 'background 0.3s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#b84a20')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--persimmon)')}
          >
            Explore Courses
          </a>
        </div>

        {/* Right */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--parchment)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/North Hand Logo.png" alt="Vitruvian anatomical study" style={{ width: '85%', maxWidth: 480, opacity: 0.82, mixBlendMode: 'multiply', filter: 'sepia(15%) contrast(1.05)' }} />
          <img src="/ncbtmb-badge.jpg" alt="NCBTMB Approved Provider" style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', width: 100, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }} />
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: 'var(--navy)', padding: '0.85rem 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 25s linear infinite' }}>
          {Array(2).fill(null).map((_, i) => (
            <span key={i}>
              {['Meridian-Based Bodywork', 'Shiatsu Tablework', 'NCBTMB Approved', 'Licensed Massage Therapists', 'Continuing Education', 'Upper Body Techniques', 'Supine Protocols'].map((t, j) => (
                <span key={j}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', margin: '0 2.5rem' }}>{t}</span>
                  <span style={{ color: 'var(--persimmon)', margin: '0 0.5rem' }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </>
  )
}
