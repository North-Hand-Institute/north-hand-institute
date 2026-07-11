'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { COURSE } from '@/lib/course-config'
import {
  QUIZ_QUESTIONS,
  PASS_THRESHOLD_PERCENT,
  TOTAL_QUESTIONS,
} from '@/lib/quiz-data'
import { supabase } from '@/lib/supabase'

type Stage = 'intro' | 'quiz' | 'result'

type Result = {
  score: number
  percent: number
  passed: boolean
}

export default function Quiz() {
  const [stage, setStage] = useState<Stage>('intro')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<Result | null>(null)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [formError, setFormError] = useState('')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const nameValid = name.trim().length >= 2
  const allAnswered = QUIZ_QUESTIONS.every((q) => answers[q.id] !== undefined)
  const answeredCount = Object.keys(answers).length

  const grouped = useMemo(() => {
    const map = new Map<number, { title: string; qs: typeof QUIZ_QUESTIONS }>()
    for (const q of QUIZ_QUESTIONS) {
      if (!map.has(q.module)) map.set(q.module, { title: q.moduleTitle, qs: [] })
      map.get(q.module)!.qs.push(q)
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0])
  }, [])

  const startQuiz = () => {
    setFormError('')
    if (!nameValid) {
      setFormError('Please enter your full name.')
      return
    }
    if (!emailValid) {
      setFormError('Please enter a valid email address.')
      return
    }
    setStage('quiz')
  }

  const selectAnswer = (qId: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }))
  }

  const submitQuiz = async () => {
    if (!allAnswered) return
    let score = 0
    for (const q of QUIZ_QUESTIONS) {
      if (answers[q.id] === q.answerIndex) score++
    }
    const percent = Math.round((score / TOTAL_QUESTIONS) * 100)
    const passed = percent >= PASS_THRESHOLD_PERCENT
    const res = { score, percent, passed }
    setResult(res)
    setStage('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Save to Supabase (best-effort; failure doesn't block the result display).
    setSaveState('saving')
    try {
      const { error } = await supabase.from('quiz_results').insert({
        course_slug: COURSE.slug,
        student_name: name.trim(),
        student_email: email.trim().toLowerCase(),
        score,
        total: TOTAL_QUESTIONS,
        percent,
        passed,
      })
      setSaveState(error ? 'error' : 'saved')
    } catch {
      setSaveState('error')
    }
  }

  const retake = () => {
    setAnswers({})
    setResult(null)
    setSaveState('idle')
    setStage('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ─────────────────────────────────────────── INTRO
  if (stage === 'intro') {
    return (
      <Shell>
        <h1 className="font-display" style={h1Style}>
          Final Assessment
        </h1>
        <p style={leadStyle}>
          This assessment has {TOTAL_QUESTIONS} multiple-choice questions covering all six modules.
          Select the best answer for each. You need {PASS_THRESHOLD_PERCENT}% or higher (
          {Math.ceil((PASS_THRESHOLD_PERCENT / 100) * TOTAL_QUESTIONS)} of {TOTAL_QUESTIONS}) to pass
          and earn your {COURSE.ceHours} CE hours.
        </p>

        <div style={cardStyle}>
          <label style={labelStyle} htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name as it should appear on your certificate"
            style={inputStyle}
            autoComplete="name"
          />

          <label style={{ ...labelStyle, marginTop: '1.1rem' }} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={inputStyle}
            autoComplete="email"
          />

          {formError && (
            <p style={{ color: 'var(--persimmon)', fontSize: '0.85rem', margin: '0.8rem 0 0' }}>
              {formError}
            </p>
          )}

          <button onClick={startQuiz} style={{ ...primaryBtn, marginTop: '1.4rem', width: '100%' }}>
            Begin Assessment &rarr;
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--light-text)', marginTop: '1rem', textAlign: 'center' }}>
          Your name and email are recorded with your score so your completion can be verified.
        </p>
      </Shell>
    )
  }

  // ─────────────────────────────────────────── QUIZ
  if (stage === 'quiz') {
    return (
      <Shell>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
          <h1 className="font-display" style={{ ...h1Style, marginBottom: 0 }}>
            Final Assessment
          </h1>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: 'var(--light-text)', whiteSpace: 'nowrap' }}>
            {answeredCount} / {TOTAL_QUESTIONS} answered
          </span>
        </div>

        {grouped.map(([modNum, { title, qs }]) => (
          <div key={modNum} style={{ marginTop: '2rem' }}>
            <h2
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--persimmon)',
                margin: '0 0 0.75rem',
              }}
            >
              Module {modNum} — {title}
            </h2>

            {qs.map((q) => (
              <div key={q.id} style={qBlock}>
                <p style={{ fontWeight: 600, color: 'var(--navy)', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
                  {q.id}. {q.prompt}
                </p>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {q.options.map((opt, idx) => {
                    const selected = answers[q.id] === idx
                    return (
                      <button
                        key={idx}
                        onClick={() => selectAnswer(q.id, idx)}
                        style={{
                          display: 'flex',
                          gap: '0.7rem',
                          alignItems: 'flex-start',
                          textAlign: 'left',
                          padding: '0.7rem 0.9rem',
                          borderRadius: '8px',
                          border: `1px solid ${selected ? 'var(--persimmon)' : 'rgba(92,61,30,0.18)'}`,
                          backgroundColor: selected ? 'rgba(201,87,42,0.08)' : '#fff',
                          cursor: 'pointer',
                          fontFamily: "'Jost', sans-serif",
                          fontSize: '0.92rem',
                          color: 'var(--text)',
                          lineHeight: 1.45,
                        }}
                      >
                        <span
                          style={{
                            flexShrink: 0,
                            width: '1.4rem',
                            height: '1.4rem',
                            borderRadius: '50%',
                            border: `2px solid ${selected ? 'var(--persimmon)' : 'rgba(92,61,30,0.3)'}`,
                            backgroundColor: selected ? 'var(--persimmon)' : 'transparent',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            marginTop: '0.05rem',
                          }}
                        >
                          {selected ? '\u2713' : String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          {!allAnswered && (
            <p style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.8rem' }}>
              Answer all {TOTAL_QUESTIONS} questions to submit ({TOTAL_QUESTIONS - answeredCount} remaining).
            </p>
          )}
          <button
            onClick={submitQuiz}
            disabled={!allAnswered}
            style={{
              ...primaryBtn,
              opacity: allAnswered ? 1 : 0.4,
              cursor: allAnswered ? 'pointer' : 'default',
              padding: '0.9rem 2.5rem',
            }}
          >
            Submit Assessment
          </button>
        </div>
      </Shell>
    )
  }

  // ─────────────────────────────────────────── RESULT
  const passed = result?.passed
  return (
    <Shell>
      <div
        style={{
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          borderRadius: '14px',
          backgroundColor: passed ? 'var(--parchment)' : '#fff',
          border: `1px solid ${passed ? 'var(--persimmon)' : 'rgba(92,61,30,0.2)'}`,
        }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--light-text)',
            margin: '0 0 0.5rem',
          }}
        >
          {passed ? 'Congratulations' : 'Not quite'}
        </p>
        <p className="font-display" style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--navy)', margin: '0 0 0.25rem', lineHeight: 1 }}>
          {result?.percent}%
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--brown)', margin: '0 0 1.25rem' }}>
          You answered {result?.score} of {TOTAL_QUESTIONS} correctly.
        </p>

        {passed ? (
          <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--navy)', maxWidth: '440px', margin: '0 auto' }}>
            You passed the assessment and have earned {COURSE.ceHours} CE hours for{' '}
            <em>{COURSE.title}</em>. Your certificate will be issued to <strong>{email.trim()}</strong>.
          </p>
        ) : (
          <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--navy)', maxWidth: '440px', margin: '0 auto' }}>
            A score of {PASS_THRESHOLD_PERCENT}% is required to pass. Review the modules and try again
            whenever you\u2019re ready \u2014 there\u2019s no penalty for retaking.
          </p>
        )}

        {/* Save status (subtle) */}
        <p style={{ fontSize: '0.78rem', color: 'var(--light-text)', marginTop: '1.5rem' }}>
          {saveState === 'saving' && 'Recording your result\u2026'}
          {saveState === 'saved' && 'Your result has been recorded.'}
          {saveState === 'error' &&
            'Your score is shown above, but we couldn\u2019t record it automatically. Please contact North Hand Institute to confirm your completion.'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <Link href={`/courses/${COURSE.slug}`} style={secondaryBtn}>
          Back to Modules
        </Link>
        {!passed && (
          <button onClick={retake} style={primaryBtn}>
            Retake Assessment
          </button>
        )}
      </div>
    </Shell>
  )
}

// ── Layout shell ──
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <div style={{ borderBottom: '1px solid rgba(92,61,30,0.15)', padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link
            href={`/courses/${COURSE.slug}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              textDecoration: 'none',
            }}
          >
            &larr; All Modules
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem 1.5rem' }}>{children}</div>
    </main>
  )
}

// ── Shared styles ──
const h1Style: React.CSSProperties = {
  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
  fontWeight: 600,
  color: 'var(--navy)',
  margin: '0 0 1rem',
}
const leadStyle: React.CSSProperties = {
  fontSize: '1.02rem',
  lineHeight: 1.65,
  color: 'var(--brown)',
  margin: '0 0 1.75rem',
}
const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  border: '1px solid rgba(92,61,30,0.15)',
  borderRadius: '12px',
  padding: '1.75rem',
}
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.85rem',
  fontWeight: 500,
  color: 'var(--navy)',
  marginBottom: '0.4rem',
}
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.9rem',
  borderRadius: '8px',
  border: '1px solid rgba(92,61,30,0.25)',
  fontSize: '0.95rem',
  fontFamily: "'Jost', sans-serif",
  color: 'var(--text)',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
}
const qBlock: React.CSSProperties = {
  backgroundColor: '#fff',
  border: '1px solid rgba(92,61,30,0.12)',
  borderRadius: '10px',
  padding: '1.25rem',
  marginBottom: '0.9rem',
}
const primaryBtn: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.95rem',
  fontWeight: 500,
  padding: '0.8rem 1.75rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: 'var(--persimmon)',
  color: '#fff',
  cursor: 'pointer',
  textDecoration: 'none',
}
const secondaryBtn: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.95rem',
  fontWeight: 500,
  padding: '0.8rem 1.75rem',
  borderRadius: '8px',
  border: '1px solid var(--navy)',
  backgroundColor: '#fff',
  color: 'var(--navy)',
  cursor: 'pointer',
  textDecoration: 'none',
}
