'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  COURSE,
  MODULES,
  TOTAL_MODULES,
  slidePath,
  PROGRESS_STORAGE_KEY,
  type ModuleInfo,
} from '@/lib/course-config'

type Props = {
  module: ModuleInfo
}

export default function SlideViewer({ module }: Props) {
  const { n: moduleN, title, slideCount } = module
  const [current, setCurrent] = useState(1) // 1-indexed slide number
  const [completed, setCompleted] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const atStart = current <= 1
  const atEnd = current >= slideCount
  const onLastSlide = current === slideCount

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, slideCount))
  }, [slideCount])

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 1))
  }, [])

  // ── Keyboard navigation ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goNext()
      } else if (e.key === 'ArrowLeft') {
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  // ── Mark this module complete when the user reaches the last slide ──
  useEffect(() => {
    if (onLastSlide && !completed) {
      setCompleted(true)
      try {
        const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
        const done: number[] = raw ? JSON.parse(raw) : []
        if (!done.includes(moduleN)) {
          done.push(moduleN)
          window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(done))
        }
      } catch {
        // localStorage unavailable (private mode etc.) — progress simply
        // won't persist; the course still works this session.
      }
    }
  }, [onLastSlide, completed, moduleN])

  // ── Touch / swipe navigation ──
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    // Only treat as a horizontal swipe if it's clearly horizontal and long enough
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const nextModule = MODULES.find((m) => m.n === moduleN + 1)
  const isLastModule = moduleN === TOTAL_MODULES

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Breadcrumb / module label */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <Link
          href={`/courses/${COURSE.slug}`}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--navy)',
            textDecoration: 'none',
          }}
        >
          &larr; All Modules
        </Link>
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--light-text)',
          }}
        >
          Module {moduleN} of {TOTAL_MODULES}
        </span>
      </div>

      {/* Module title */}
      <h1
        className="font-display"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
          fontWeight: 600,
          color: 'var(--navy)',
          lineHeight: 1.15,
          margin: '0 0 1rem',
        }}
      >
        {title}
      </h1>

      {/* Slide stage */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          backgroundColor: 'var(--navy)',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(26,38,64,0.18)',
          userSelect: 'none',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slidePath(moduleN, current)}
          alt={`Module ${moduleN}, slide ${current} of ${slideCount}`}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          draggable={false}
        />

        {/* Left tap zone (previous) */}
        <button
          aria-label="Previous slide"
          onClick={goPrev}
          disabled={atStart}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '15%',
            border: 'none',
            background: 'transparent',
            cursor: atStart ? 'default' : 'pointer',
          }}
        />
        {/* Right tap zone (next) */}
        <button
          aria-label="Next slide"
          onClick={goNext}
          disabled={atEnd}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '15%',
            border: 'none',
            background: 'transparent',
            cursor: atEnd ? 'default' : 'pointer',
          }}
        />
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: '4px',
          backgroundColor: 'var(--parchment)',
          borderRadius: '999px',
          marginTop: '0.9rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${(current / slideCount) * 100}%`,
            backgroundColor: 'var(--persimmon)',
            transition: 'width 0.2s ease',
          }}
        />
      </div>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          gap: '1rem',
        }}
      >
        <button
          onClick={goPrev}
          disabled={atStart}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 500,
            padding: '0.65rem 1.4rem',
            borderRadius: '8px',
            border: '1px solid var(--navy)',
            backgroundColor: atStart ? 'transparent' : '#fff',
            color: atStart ? 'var(--light-text)' : 'var(--navy)',
            opacity: atStart ? 0.4 : 1,
            cursor: atStart ? 'default' : 'pointer',
          }}
        >
          &larr; Previous
        </button>

        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.9rem',
            color: 'var(--light-text)',
            whiteSpace: 'nowrap',
          }}
        >
          Slide {current} of {slideCount}
        </span>

        <button
          onClick={goNext}
          disabled={atEnd}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 500,
            padding: '0.65rem 1.4rem',
            borderRadius: '8px',
            border: '1px solid var(--persimmon)',
            backgroundColor: atEnd ? 'transparent' : 'var(--persimmon)',
            color: atEnd ? 'var(--light-text)' : '#fff',
            opacity: atEnd ? 0.4 : 1,
            cursor: atEnd ? 'default' : 'pointer',
          }}
        >
          Next &rarr;
        </button>
      </div>

      {/* Navigation help */}
      <p
        style={{
          textAlign: 'center',
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.78rem',
          color: 'var(--light-text)',
          marginTop: '0.75rem',
        }}
      >
        Use the arrow keys, swipe, or tap the sides of the slide to navigate.
      </p>

      {/* End-of-module panel */}
      {completed && (
        <div
          style={{
            marginTop: '2rem',
            backgroundColor: 'var(--parchment)',
            border: '1px solid rgba(92,61,30,0.15)',
            borderRadius: '12px',
            padding: '1.75rem',
            textAlign: 'center',
          }}
        >
          <p
            className="font-display"
            style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--navy)', margin: '0 0 0.5rem' }}
          >
            Module {moduleN} complete
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--brown)', margin: '0 0 1.4rem' }}>
            {isLastModule
              ? 'You\u2019ve finished all six modules. You\u2019re ready to take the final assessment.'
              : 'Nicely done. Continue to the next module when you\u2019re ready.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/courses/${COURSE.slug}`}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0.7rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid var(--navy)',
                backgroundColor: '#fff',
                color: 'var(--navy)',
                textDecoration: 'none',
              }}
            >
              Back to All Modules
            </Link>
            {isLastModule ? (
              <Link
                href={`/courses/${COURSE.slug}/quiz`}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '0.7rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid var(--persimmon)',
                  backgroundColor: 'var(--persimmon)',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                Take the Final Assessment &rarr;
              </Link>
            ) : (
              nextModule && (
                <Link
                  href={`/courses/${COURSE.slug}/module/${nextModule.n}`}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    padding: '0.7rem 1.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--persimmon)',
                    backgroundColor: 'var(--persimmon)',
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  Next: Module {nextModule.n} &rarr;
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
