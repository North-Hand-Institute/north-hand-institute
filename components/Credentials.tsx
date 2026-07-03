'use client'

export function Credentials() {
  return (
    <>
      <style>{`
        .credentials-section { padding: 6rem 5rem; }
        .credentials-inner { display: flex; justify-content: center; align-items: center; gap: 4rem; flex-wrap: wrap; }
        .credential-text { max-width: 480px; text-align: left; }
        .credential-block + .credential-block { margin-top: 2.5rem; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        .contact-form-col { padding-top: 3.5rem; }
        @media (max-width: 768px) {
          .credentials-section { padding: 3.5rem 1.5rem !important; }
          .credentials-inner { gap: 2rem !important; }
          .credential-text { text-align: center !important; }
          .contact-section { padding: 3.5rem 1.5rem !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .contact-form-col { padding-top: 0 !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 0.75rem !important; }
        }
      `}</style>
      <section id="credentials" className="credentials-section" style={{ background: '#1a2640', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8956a', marginBottom: '1rem', fontWeight: 500 }}>Accreditation</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15, color: '#f5edd8', margin: '0 auto 3rem', maxWidth: 500 }}>
          Board-Approved <em style={{ fontStyle: 'italic', color: '#b8956a' }}>Continuing Education</em>
        </h2>
        <div className="credentials-inner">
          <img src="/ncbtmb-badge.jpg" alt="NCBTMB Approved Provider" style={{ width: 130, filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.3))' }} />
          <div className="credential-text">
            <div className="credential-block">
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400, color: '#f5edd8', marginBottom: '0.8rem' }}>New York State Sponsor</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(245,237,216,0.65)' }}>
                Michael Corcoran is approved as a sponsor of continuing education for Massage Therapists by the New York State Education Department, Office of Professions. Unless otherwise noted, all of the current Continuing Education classes satisfy CE Hours for New York State Licensed LMT&rsquo;s.
              </p>
            </div>
            <div className="credential-block">
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400, color: '#f5edd8', marginBottom: '0.8rem' }}>NCBTMB Approved Provider</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(245,237,216,0.65)' }}>
                In addition, Michael Corcoran is approved by the National Certification Board for Therapeutic Massage & Bodywork (NCBTMB) as a continuing education approved provider. Unless otherwise noted, all of the current Continuing Education classes satisfy CE Hours for LMT&rsquo;s with National Licensure. (AP #1003193)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
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
    window.location.href = `mailto:info@northhandinstitute.org?subject=${subject}&body=${body}`
  }

  const inputStyle: React.CSSProperties = {
    background: 'white', border: '1px solid rgba(92,61,30,0.2)', padding: '0.85rem 1rem',
    fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: '#2a1f14', outline: 'none', width: '100%',
  }

  return (
    <section id="contact" className="contact-section" style={{ padding: '6rem 5rem', background: '#f5edd8' }}>
      <div className="contact-grid">
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9572a', marginBottom: '1rem', fontWeight: 500 }}>Get in Touch</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 300, lineHeight: 1.15, color: '#1a2640' }}>
            Questions? <em style={{ fontStyle: 'italic', color: '#5c3d1e' }}>Let's Talk.</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2.5rem' }}>
            {[['Email', 'info@northhandinstitute.org', 'mailto:info@northhandinstitute.org'], ['Phone', '(518) 330-7272', 'tel:5183307272'], ['Instructor', 'Michael Corcoran, LMT', '']].map(([label, val, href]) => (
              <div key={label}>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9572a', fontWeight: 500, marginBottom: '0.3rem' }}>{label}</div>
                {href ? <a href={href} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#1a2640', textDecoration: 'none' }}>{val}</a>
                  : <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#1a2640' }}>{val}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[['name', 'Your Name', 'text', 'Jane Smith, LMT'], ['email', 'Email Address', 'email', 'you@example.com']].map(([id, label, type, ph]) => (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor={id} style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a6a58' }}>{label}</label>
              <input id={id} type={type} placeholder={ph} style={inputStyle} />
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="message" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a6a58' }}>Message</label>
            <textarea id="message" rows={4} placeholder="Tell us about your interest in the course..." style={{ ...inputStyle, resize: 'none' }} />
          </div>
          <button onClick={handleSubmit} style={{
            padding: '1rem 2.4rem', background: '#c9572a', color: 'white', border: 'none',
            fontFamily: 'Jost, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start',
          }}>Send Message</button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ background: '#1a2640', padding: '2.5rem 3rem', borderTop: '1px solid rgba(184,149,106,0.2)' }}>
      <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 600, color: '#f5edd8', letterSpacing: '0.06em' }}>
          North Hand Institute of Massage Education
        </div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(245,237,216,0.4)', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} Michael Corcoran, LMT · AP #1003193
        </div>
        <a href="mailto:info@northhandinstitute.org" style={{ fontSize: '0.75rem', color: '#b8956a', textDecoration: 'none' }}>
         info@northhandinstitute.org
        </a>
        <a href="https://michaelcorcoranlmt.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#b8956a', textDecoration: 'none' }}>
  Visit My Massage Practice ↗
</a>
      </div>
    </footer>
  )
}

export default Credentials
