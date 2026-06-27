export function Credentials() {
  return (
    <section id="credentials" style={{ background: 'var(--navy)', padding: '6rem 5rem', textAlign: 'center' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem', fontWeight: 500 }}>Accreditation</p>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15, color: 'var(--cream)', margin: '0 auto 3rem', maxWidth: 500 }}>
        Board-Approved <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Continuing Education</em>
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
        <img src="/ncbtmb-badge.jpg" alt="NCBTMB Approved Provider" style={{ width: 140, filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.3))' }} />
        <div style={{ maxWidth: 380, textAlign: 'left' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400, color: 'var(--cream)', marginBottom: '0.8rem' }}>NCBTMB Approved Provider</h3>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(245,237,216,0.65)' }}>
            North Hand Institute is a proud Approved Provider of the National Certification Board for Therapeutic Massage & Bodywork (AP #1003193). All courses qualify for NCBTMB continuing education hours, supporting your professional licensure requirements.
          </p>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  function handleSubmit() {
    const name = (document.getElementById('name') as HTMLInputElement)?.value
    const email = (document.getElementById('email') as HTMLInputElement)?.value
    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value
    if (!name || !email || !message) { alert('Please fill in all fields.'); return }
    const subject = encodeURIComponent('Course Inquiry from ' + name)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:michaelcorcoranlmt@gmail.com?subject=${subject}&body=${body}`
  }

  const inputStyle: React.CSSProperties = {
    background: 'white', border: '1px solid rgba(92,61,30,0.2)', padding: '0.85rem 1rem',
    fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: 'var(--text)', outline: 'none', width: '100%',
  }

  return (
    <section id="contact" style={{ padding: '6rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', background: 'var(--cream)' }}>
      <div>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--persimmon)', marginBottom: '1rem', fontWeight: 500 }}>Get in Touch</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 300, lineHeight: 1.15, color: 'var(--navy)' }}>
          Questions? <em style={{ fontStyle: 'italic', color: 'var(--brown)' }}>Let's Talk.</em>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2.5rem' }}>
          {[['Email', 'michaelcorcoranlmt@gmail.com', 'mailto:michaelcorcoranlmt@gmail.com'], ['Phone', '(518) 330-7272', 'tel:5183307272'], ['Instructor', 'Michael Corcoran, LMT', '']].map(([label, val, href]) => (
            <div key={label}>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--persimmon)', fontWeight: 500, marginBottom: '0.3rem' }}>{label}</div>
              {href ? <a href={href} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: 'var(--navy)', textDecoration: 'none' }}>{val}</a>
                : <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: 'var(--navy)' }}>{val}</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingTop: '3.5rem' }}>
        {[['name', 'Your Name', 'text', 'Jane Smith, LMT'], ['email', 'Email Address', 'email', 'you@example.com']].map(([id, label, type, ph]) => (
          <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor={id} style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--light-text)' }}>{label}</label>
            <input id={id} type={type} placeholder={ph} style={inputStyle} />
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="message" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--light-text)' }}>Message</label>
          <textarea id="message" rows={4} placeholder="Tell us about your interest in the course..." style={{ ...inputStyle, resize: 'none' }} />
        </div>
        <button onClick={handleSubmit} style={{
          padding: '1rem 2.4rem', background: 'var(--persimmon)', color: 'white', border: 'none',
          fontFamily: 'Jost, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start', transition: 'background 0.3s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = '#b84a20')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--persimmon)')}
        >
          Send Message
        </button>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{
      background: 'var(--navy)', padding: '2.5rem 5rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      borderTop: '1px solid rgba(184,149,106,0.2)',
    }}>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 600, color: 'var(--cream)', letterSpacing: '0.06em' }}>
        North Hand Institute for Massage Education
      </div>
      <div style={{ fontSize: '0.7rem', color: 'rgba(245,237,216,0.4)', letterSpacing: '0.08em' }}>
        © {new Date().getFullYear()} Michael Corcoran, LMT · AP #1003193
      </div>
      <a href="mailto:michaelcorcoranlmt@gmail.com" style={{ fontSize: '0.75rem', color: 'var(--gold)', textDecoration: 'none', letterSpacing: '0.08em' }}>
        michaelcorcoranlmt@gmail.com
      </a>
    </footer>
  )
}

export default Credentials
