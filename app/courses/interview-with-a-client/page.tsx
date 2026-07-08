import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Interview With a Client | North Hand Institute of Massage Education',
  description:
    'A 3 CE hour home-study course for Licensed Massage Therapists on client acquisition and retention — from the first phone call to lasting client relationships. Coming soon from North Hand Institute.',
  openGraph: {
    title: 'Interview With a Client: A Therapist\u2019s Guide to Client Acquisition',
    description:
      'A 3 CE hour home-study course for Licensed Massage Therapists on client acquisition and retention. Coming soon.',
    type: 'website',
  },
}

const objectives = [
  'Identify the five primary goals of an initial client phone consultation and describe how each contributes to booking and retention.',
  'Demonstrate how to respond to a client\u2019s specific technique request by validating it and offering a professional recommendation.',
  'Explain the rationale for requiring a credit card at booking and describe how to present a cancellation policy that reinforces professionalism.',
  'Describe how to conduct an in-person intake interview that builds rapport and establishes the therapist as the client\u2019s practitioner.',
  'Formulate effective follow-up questions that elicit clinically relevant information a standard intake form does not capture.',
  'Explain how questions about a client\u2019s occupation, leisure activities, and self-care habits inform treatment planning.',
  'Demonstrate how to obtain a client\u2019s permission to contact another treating practitioner during the intake.',
  'Describe the process for contacting a client\u2019s other healthcare providers to coordinate complementary care.',
  'Identify strategies for building professional referral relationships with other healthcare practitioners.',
  'Describe effective methods for requesting online reviews and referrals during client checkout.',
  'Explain how to manage a client\u2019s post-treatment expectations to support retention and rebooking.',
]

const modules = [
  {
    n: '01',
    title: 'First Contact: The Phone Call',
    body: 'The five goals of every first call, handling technique requests, and the credit-card-and-cancellation-policy conversation that frames you as a professional.',
  },
  {
    n: '02',
    title: 'The Intake Interview',
    body: 'Rapport-building questions, the work/leisure/self-care framework, the follow-up question skill, and securing permission to contact other providers.',
  },
  {
    n: '03',
    title: 'Collaborative Care',
    body: 'Why coordinating with a client\u2019s other practitioners should be the new norm \u2014 and exactly how to make that call.',
  },
  {
    n: '04',
    title: 'Practitioner Networking',
    body: 'Mapping your local referral ecosystem, introducing yourself, and turning contacts into lasting referral partners.',
  },
  {
    n: '05',
    title: 'The Checkout & Client Retention',
    body: 'Managing post-treatment expectations, the rebooking conversation, and asking for reviews and referrals the right way.',
  },
]

export default function InterviewWithAClientPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* Simple top bar with a route back to the main site */}
      <div
        style={{
          borderBottom: '1px solid rgba(92,61,30,0.15)',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              textDecoration: 'none',
            }}
          >
            &larr; North Hand Institute
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          backgroundColor: 'var(--navy)',
          color: 'var(--cream)',
          padding: '4.5rem 1.5rem 4rem',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--persimmon)',
              color: '#fff',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              marginBottom: '1.5rem',
            }}
          >
            Coming Soon
          </div>

          <h1
            className="font-display"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 600, lineHeight: 1.08, margin: 0 }}
          >
            Interview With a Client
          </h1>
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--parchment)',
              marginTop: '0.75rem',
            }}
          >
            A Therapist&rsquo;s Guide to Client Acquisition
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '2rem',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: '0.9rem',
            }}
          >
            <span style={pillStyle}>3 CE Hours</span>
            <span style={pillStyle}>Online &middot; Self-Paced Home Study</span>
            <span style={pillStyle}>$40</span>
          </div>
        </div>
      </section>

      {/* Intro / description */}
      <section style={{ padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Most continuing education teaches you how to work on the body. This course teaches you
            how to build the practice around it.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)' }}>
            <em>Interview With a Client</em> walks through every stage of the client relationship &mdash;
            the first phone call, the in-person intake, coordinating with a client&rsquo;s other
            healthcare providers, building a professional referral network, and the checkout
            conversation that turns a first-time client into a regular. Through annotated,
            real-world script examples, you&rsquo;ll learn practical communication strategies that
            establish you as the client&rsquo;s trusted practitioner and keep your schedule full.
          </p>
        </div>
      </section>

      {/* What you'll learn — modules */}
      <section style={{ padding: '0 1.5rem 3.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2
            className="font-display"
            style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '1.75rem' }}
          >
            What the Course Covers
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {modules.map((m) => (
              <div
                key={m.n}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                  backgroundColor: '#fff',
                  border: '1px solid rgba(92,61,30,0.12)',
                  borderRadius: '10px',
                  padding: '1.4rem 1.5rem',
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    color: 'var(--persimmon)',
                    lineHeight: 1,
                    minWidth: '2.2rem',
                  }}
                >
                  {m.n}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      color: 'var(--navy)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {m.title}
                  </h3>
                  <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--light-text)' }}>
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning objectives */}
      <section style={{ padding: '0 1.5rem 3.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2
            className="font-display"
            style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.75rem' }}
          >
            Learning Objectives
          </h2>
          <p style={{ fontSize: '0.98rem', color: 'var(--light-text)', marginBottom: '1.5rem' }}>
            Upon completion of this course, the participant will be able to:
          </p>
          <ol style={{ listStyle: 'none', counterReset: 'obj', padding: 0, display: 'grid', gap: '0.9rem' }}>
            {objectives.map((o, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: '0.9rem',
                  alignItems: 'flex-start',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                <span
                  className="font-display"
                  style={{
                    color: 'var(--persimmon)',
                    fontWeight: 600,
                    minWidth: '1.5rem',
                    fontSize: '1.05rem',
                  }}
                >
                  {i + 1}.
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Coming soon / CTA block */}
      <section style={{ padding: '0 1.5rem 4.5rem' }}>
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            backgroundColor: 'var(--parchment)',
            border: '1px solid rgba(92,61,30,0.15)',
            borderRadius: '12px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <h2
            className="font-display"
            style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.75rem' }}
          >
            Enrollment Opens Soon
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: 'var(--brown)', marginBottom: '1.75rem' }}>
            This course is pending NCBTMB approval and will be available for enrollment shortly.
            Check back soon, or reach out through the main site to be notified when it goes live.
          </p>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--light-text)',
              color: '#fff',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              padding: '0.85rem 2rem',
              borderRadius: '8px',
              cursor: 'default',
            }}
          >
            Enroll &mdash; Coming Soon
          </span>
          {/* When the course is live, replace the span above with the Vagaro link:
          <a
            href="REPLACE_WITH_VAGARO_URL"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--persimmon)',
              color: '#fff',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              padding: '0.85rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Enroll Now &mdash; $40
          </a>
          */}
        </div>
      </section>

      {/* Credential footer line */}
      <footer
        style={{
          backgroundColor: 'var(--navy)',
          color: 'var(--parchment)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: '0.85rem',
          lineHeight: 1.6,
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          North Hand Institute of Massage Education is approved by the National Certification Board
          for Therapeutic Massage &amp; Bodywork (NCBTMB) as a Continuing Education Approved Provider,
          AP #1003193.
        </div>
      </footer>
    </main>
  )
}

const pillStyle: React.CSSProperties = {
  backgroundColor: 'rgba(245,237,216,0.14)',
  border: '1px solid rgba(245,237,216,0.3)',
  borderRadius: '999px',
  padding: '0.4rem 1rem',
}
