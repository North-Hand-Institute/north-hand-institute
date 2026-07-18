export default function About({ bioMain, bioSecondary, quote }: { bioMain?: string; bioSecondary?: string; quote?: string }) {
  return (
    <>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-section {
            padding: 3.5rem 1.5rem !important;
          }
        }
      `}</style>
      <section id="about" className="about-section" style={{ padding: '6rem 5rem', background: '#f5edd8' }}>
        <div className="about-grid">
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9572a', marginBottom: '1rem', fontWeight: 500 }}>About the Instructor</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15, color: '#1a2640' }}>
              Michael Corcoran, <em style={{ fontStyle: 'italic', color: '#5c3d1e' }}>LMT</em>
            </h2>
            <p style={{ marginTop: '2rem', fontSize: '0.95rem', lineHeight: 1.9, color: '#7a6a58' }}>
              {bioMain || 'For over twelve years, Michael Corcoran has been refining the practice of adapting meridian-based massage for the treatment table.'}
            </p>
            <p style={{ marginTop: '1.2rem', fontSize: '0.95rem', lineHeight: 1.9, color: '#7a6a58' }}>
              {bioSecondary || 'His clients consistently report profound results, and that effectiveness is what drives him to share this work with fellow therapists.'}
            </p>
          </div>

          <div style={{ position: 'relative', padding: '3rem', background: '#1a2640' }}>
            <div style={{ position: 'absolute', top: '-0.5rem', left: '2rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '8rem', color: '#c9572a', opacity: 0.25, lineHeight: 1 }}>"</div>
            <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.6, color: '#f5edd8' }}>
              {quote || 'The body speaks in patterns. Learning to listen — through meridian, muscle, fascia, and bone — transforms what we can offer our clients.'}
            </blockquote>
            <cite style={{ display: 'block', marginTop: '1.5rem', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b8956a', fontStyle: 'normal', fontFamily: 'Jost, sans-serif' }}>
              — Michael Corcoran, LMT · Founder, North Hand Institute
            </cite>
          </div>
        </div>
      </section>
    </>
  )
}
