export default function Hero({ tagline }: { tagline?: string }) {
  return (
    <>
      <style>{`
        .hero-grid {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .hero-right-img {
          width: 85%;
          max-width: 480px;
          opacity: 0.82;
          mix-blend-mode: multiply;
          filter: sepia(15%) contrast(1.05);
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .hero-left {
            padding: 6rem 1.5rem 3rem !important;
            order: 2;
          }
          .hero-right {
            order: 1;
            min-height: 60vw !important;
          }
          .hero-right-img {
            width: 90% !important;
          }
          .hero-title {
            font-size: 2.4rem !important;
          }
          .hero-sub {
            font-size: 0.88rem !important;
          }
          .hero-badge {
            width: 75px !important;
            bottom: 1rem !important;
            right: 1rem !important;
          }
        }
      `}</style>

      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Left */}
        <div className="hero-left" style={{ background: '#1a2640', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 4rem 6rem 5rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9572a', marginBottom: '1.5rem', fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
            NCBTMB Approved Provider · Continuing Education
          </p>
          <h1 className="hero-title" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 4vw, 4.5rem)', fontWeight: 300, lineHeight: 1.05, color: '#f5edd8', marginBottom: '1rem' }}>
            Advancing the<br />
            <em style={{ fontStyle: 'italic', color: '#b8956a' }}>Art & Science</em><br />
            of Massage
          </h1>
          <div style={{ width: 60, height: 2, background: '#c9572a', margin: '1.8rem 0' }} />
          <p className="hero-sub" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,237,216,0.72)', maxWidth: 380 }}>
            {tagline || 'Professional continuing education for Licensed Massage Therapists — rooted in meridian-based tradition, adapted for the modern treatment table.'}
          </p>
          <a href="#courses" style={{
            display: 'inline-block', marginTop: '2.5rem', padding: '0.9rem 2.4rem',
            background: '#c9572a', color: '#f5edd8', textDecoration: 'none',
            fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
            alignSelf: 'flex-start',
          }}>
            Explore Courses
          </a>
        </div>

        {/* Right */}
        <div className="hero-right" style={{ position: 'relative', overflow: 'hidden', background: '#e8d8b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/North_Hand_Logo.png" alt="North Hand Institute" className="hero-right-img" />
          <img src="/ncbtmb-badge.jpg" alt="NCBTMB Approved Provider" className="hero-badge" style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', width: 100, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }} />
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: '#1a2640', padding: '0.85rem 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 25s linear infinite' }}>
          {Array(2).fill(null).map((_, i) => (
            <span key={i}>
              {['Meridian-Based Bodywork', 'Shiatsu Tablework', 'NCBTMB Approved', 'Licensed Massage Therapists', 'Continuing Education', 'Upper Body Techniques', 'Supine Protocols'].map((t, j) => (
                <span key={j}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b8956a', margin: '0 2rem' }}>{t}</span>
                  <span style={{ color: '#c9572a' }}>◆</span>
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
