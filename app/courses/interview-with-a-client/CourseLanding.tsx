'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  COURSE,
  MODULES,
  TOTAL_MODULES,
  PROGRESS_STORAGE_KEY,
} from '@/lib/course-config'

export default function CourseLanding() {
  const [done, setDone] = useState<number[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
      setDone(raw ? JSON.parse(raw) : [])
    } catch {
      setDone([])
    }
    setLoaded(true)
  }, [])

  const allComplete = MODULES.every((m) => done.includes(m.n))
  const completedCount = done.length

  const resetProgress = () => {
    try {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY)
    } catch {}
    setDone([])
  }

  return (
    <main style={{ backgroundColor: 'var(--cream)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(92,61,30,0.15)', padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Jost', sans-serif",
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

      {/* Header */}
      <section style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 600, lineHeight: 1.1, margin: 0 }}
          >
            {COURSE.title}
          </h1>
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--parchment)', marginTop: '0.5rem' }}
          >
            {COURSE.subtitle}
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.5rem', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }}>
            <span style={pill}>{COURSE.ceHours} CE Hours</span>
            <span style={pill}>6 Modules</span>
            <span style={pill}>Self-Paced</span>
          </div>
        </div>
      </section>

      {/* Progress summary */}
      <section style={{ padding: '2rem 1.5rem 0.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
            <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--navy)', margin: 0 }}>
              Course Modules
            </h2>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: 'var(--light-text)' }}>
              {loaded ? `${completedCount} of ${TOTAL_MODULES} complete` : '\u00A0'}
            </span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'var(--parchment)', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: loaded ? `${(completedCount / TOTAL_MODULES) * 100}%` : '0%',
                backgroundColor: 'var(--persimmon)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </section>

      {/* Module list */}
      <section style={{ padding: '1.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gap: '0.9rem' }}>
          {MODULES.map((m) => {
            const isDone = done.includes(m.n)
            return (
              <Link
                key={m.n}
                href={`/courses/${COURSE.slug}/module/${m.n}`}
                style={{
                  display: 'flex',
                  gap: '1.1rem',
                  alignItems: 'flex-start',
                  backgroundColor: '#fff',
                  border: `1px solid ${isDone ? 'var(--persimmon)' : 'rgba(92,61,30,0.12)'}`,
                  borderRadius: '10px',
                  padding: '1.25rem 1.4rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Number / check badge */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '2.4rem',
                    height: '2.4rem',
                    borderRadius: '50%',
                    backgroundColor: isDone ? 'var(--persimmon)' : 'var(--parchment)',
                    color: isDone ? '#fff' : 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                  aria-hidden
                >
                  {isDone ? '\u2713' : m.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '1.05rem', color: 'var(--navy)', margin: 0 }}>
                      Module {m.n}: {m.title}
                    </h3>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: isDone ? 'var(--persimmon)' : 'var(--light-text)', whiteSpace: 'nowrap' }}>
                      {loaded && isDone ? 'Completed' : `${m.slideCount} slides`}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--light-text)', margin: '0.35rem 0 0' }}>
                    {m.blurb}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Final assessment block */}
      <section style={{ padding: '0 1.5rem 3.5rem' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: allComplete ? 'var(--parchment)' : 'transparent',
            border: `1px solid ${allComplete ? 'var(--persimmon)' : 'rgba(92,61,30,0.15)'}`,
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--navy)', margin: '0 0 0.5rem' }}>
            Final Assessment
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--brown)', margin: '0 0 1.4rem' }}>
            {allComplete
              ? `You\u2019ve completed all six modules. Pass the 15-question assessment with a score of ${COURSE.passThresholdPercent}% or higher to earn your ${COURSE.ceHours} CE hours.`
              : 'Complete all six modules above to unlock the final assessment.'}
          </p>
          {allComplete ? (
            <Link
              href={`/courses/${COURSE.slug}/quiz`}
              style={{
                display: 'inline-block',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '0.85rem 2rem',
                borderRadius: '8px',
                backgroundColor: 'var(--persimmon)',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              Start the Assessment &rarr;
            </Link>
          ) : (
            <span
              style={{
                display: 'inline-block',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '0.85rem 2rem',
                borderRadius: '8px',
                backgroundColor: 'var(--parchment)',
                color: 'var(--light-text)',
                cursor: 'default',
              }}
            >
              Assessment Locked
            </span>
          )}
        </div>

        {/* Testing-phase reset control */}
        {loaded && completedCount > 0 && (
          <div style={{ maxWidth: '900px', margin: '1rem auto 0', textAlign: 'center' }}>
            <button
              onClick={resetProgress}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.78rem',
                color: 'var(--light-text)',
                background: 'none',
                border: 'none',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Reset my progress
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

const pill: React.CSSProperties = {
  backgroundColor: 'rgba(245,237,216,0.14)',
  border: '1px solid rgba(245,237,216,0.3)',
  borderRadius: '999px',
  padding: '0.35rem 0.9rem',
}
