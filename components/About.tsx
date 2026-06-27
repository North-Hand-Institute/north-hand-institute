export default function About({ bioMain, bioSecondary, quote }: { bioMain?: string; bioSecondary?: string; quote?: string }) {
  return (
    <section id="about" style={{ padding: '6rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', background: 'var(--cream)' }}>
      <div>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--persimmon)', marginBottom: '1rem', fontWeight: 500 }}>About the Instructor</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15, color: 'var(--navy)' }}>
          Michael Corcoran, <em style={{ fontStyle: 'italic', color: 'var(--brown)' }}>LMT</em>
        </h2>
        <p style={{ marginTop: '2rem', fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--light-text)', maxWidth: 480 }}>
          {bioMain || 'For over twelve years, Michael Corcoran has been refining the practice of adapting meridian-based massage for the treatment table.'}
        </p>
        <p style={{ marginTop: '1.2rem', fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--light-text)', maxWidth: 480 }}>
          {bioSecondary || 'His clients consistently report profound results, and that effectiveness is what drives him to share this work with fellow therapists.'}
        </p>
      </div>

      <div style={{ position: 'relative', padding: '3rem', background: 'var(--navy)', color: 'var(--cream)' }}>
        <div style={{ position: 'absolute', top: '-0.5rem', left: '2rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '8rem', color: 'var(--persimmon)', opacity: 0.25, lineHeight: 1 }}>"</div>
        <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.6, color: 'var(--cream)' }}>
          {quote || 'The body speaks in patterns. Learning to listen — through meridian, muscle, and bone — transforms what we can offer our clients.'}
        </blockquote>
        <cite style={{ display: 'block', marginTop: '1.5rem', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontStyle: 'normal', fontFamily: 'Jost, sans-serif' }}>
          — Michael Corcoran, LMT · Founder, North Hand Institute
        </cite>
      </div>
    </section>
  )
}
