import type { Course, Event } from '@/lib/types'

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)
}

export default function Courses({ courses, events }: { courses: Course[]; events: Event[] }) {
  return (
    <section id="courses" style={{ padding: '6rem 5rem', background: 'var(--parchment)' }}>
      <div style={{ marginBottom: '3.5rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--persimmon)', marginBottom: '1rem', fontWeight: 500 }}>Current Offerings</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15, color: 'var(--navy)' }}>
          Continuing Education <em style={{ fontStyle: 'italic', color: 'var(--brown)' }}>Courses</em>
        </h2>
      </div>

      {courses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed rgba(92,61,30,0.25)' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--light-text)' }}>Courses coming soon. Check back shortly.</p>
        </div>
      )}

      {courses.map(course => {
        const courseEvents = events.filter(e => e.course_id === course.id)
        return (
          <div key={course.id} style={{ background: 'var(--cream)', border: '1px solid rgba(92,61,30,0.15)', marginBottom: '2rem', overflow: 'hidden', transition: 'box-shadow 0.3s' }}>
            <div style={{ padding: '3rem' }}>
              <span style={{ display: 'inline-block', background: 'var(--persimmon)', color: 'white', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.3rem 0.8rem', marginBottom: '1.2rem' }}>
                NCBTMB Approved · {course.ce_hours} CE Hours
              </span>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 400, lineHeight: 1.2, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                {course.title}
              </h3>
              {course.subtitle && (
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--brown)', marginBottom: '1.2rem' }}>{course.subtitle}</p>
              )}
              <p style={{ fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--light-text)', maxWidth: 680, marginBottom: '2rem' }}>{course.description}</p>

              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {[['Format', course.format], ['Audience', course.audience], ['CE Hours', String(course.ce_hours)]].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--persimmon)', fontWeight: 500, marginBottom: '0.2rem' }}>{label}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'var(--navy)' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div style={{ borderTop: '1px solid rgba(92,61,30,0.12)', background: 'rgba(26,38,64,0.03)' }}>
              <div style={{ padding: '1.5rem 3rem 0.5rem' }}>
                <p style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--navy)', fontWeight: 500 }}>Upcoming Dates</p>
              </div>
              {courseEvents.length === 0 ? (
                <div style={{ padding: '1.2rem 3rem 2rem' }}>
                  <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--light-text)', fontFamily: 'Cormorant Garamond, serif' }}>No upcoming dates scheduled. Contact us to express interest.</p>
                </div>
              ) : (
                courseEvents.map(event => (
                  <div key={event.id} style={{ padding: '1.2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(92,61,30,0.08)' }}>
                    <div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'var(--navy)', fontWeight: 400 }}>
                        {event.location_name} · {event.location_city}, {event.location_state}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--light-text)', marginTop: '0.2rem' }}>
                        {formatDate(event.date)}
                        {event.spots_remaining !== null && (
                          <span style={{ marginLeft: '1rem', color: event.spots_remaining <= 3 ? 'var(--persimmon)' : 'var(--light-text)' }}>
                            {event.spots_remaining <= 3 ? `⚡ Only ${event.spots_remaining} spots left` : `${event.spots_remaining} spots available`}
                          </span>
                        )}
                      </div>
                      {event.notes && <div style={{ fontSize: '0.78rem', color: 'var(--light-text)', marginTop: '0.2rem', fontStyle: 'italic' }}>{event.notes}</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'var(--navy)', lineHeight: 1 }}>{formatPrice(event.price)}</div>
                        <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--light-text)' }}>per person</div>
                      </div>
                      <a href={event.booking_url || '#contact'} target="_blank" rel="noopener noreferrer" style={{
  padding: '0.75rem 1.8rem', background: 'var(--persimmon)', color: 'white',
  textDecoration: 'none', fontSize: '0.68rem', letterSpacing: '0.18em',
  textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap',
  transition: 'background 0.3s',
}}
  onMouseEnter={e => (e.currentTarget.style.background = '#b84a20')}
  onMouseLeave={e => (e.currentTarget.style.background = 'var(--persimmon)')}
>
  Enroll
</a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )
      })}

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', border: '1px dashed rgba(92,61,30,0.25)' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--light-text)' }}>
          More courses are in development. Contact us to be notified of new offerings.
        </p>
      </div>
    </section>
  )
}
