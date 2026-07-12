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
  const [fsSupported, setFsSupported] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const atStart = current <= 1
  const atEnd = current >= slideCount
  const onLastSlide = current === slideCount

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, slideCount))
  }, [slideCount])

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 1))
  }, [])

  // ── Detect real Fullscreen API support (not available on iOS Safari) ──
  useEffect(() => {
    setFsSupported(typeof document !== 'undefined' && !!document.fullscreenEnabled)
  }, [])

  // ── Keyboard navigation ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
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
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  // ── Optional true-fullscreen toggle (desktop / Android; no-op on iOS Safari) ──
  const toggleFullscreen = () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  const nextModule = MODULES.find((m) => m.n === moduleN + 1)
  const isLastModule = moduleN === TOTAL_MODULES

  // ─────────────────────────────────────────────────────────────
  // ACTIVE SLIDE VIEW
  // Fixed to the viewport, header/footer pinned, image fills the
  // remaining space. Nothing here ever requires scrolling, on any
  // device or orientation.
  // ─────────────────────────────────────────────────────────────
  if (!completed) {
    return (
      <div ref={containerRef} className="nhi-viewer-root">
        <style>{`
          .nhi-viewer-root {
            position: fixed;
            inset: 0;
            z-index: 1000;
            background-color: var(--navy);
            display: flex;
            flex-direction: column;
            height: 100vh;
            height: 100dvh;
          }
          .nhi-viewer-header {
            flex: 0 0 auto;
            padding: 0.6rem 0.9rem 0.4rem;
          }
          .nhi-viewer-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
          }
          .nhi-viewer-title-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 0.5rem;
            margin-top: 0.15rem;
          }
          .nhi-viewer-title {
            font-family: 'Jost', sans-serif;
            font-size: 0.85rem;
            color: var(--parchment);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .nhi-viewer-exit {
            font-family: 'Jost', sans-serif;
            font-size: 0.8rem;
            letter-spacing: 0.04em;
            color: var(--cream);
            text-decoration: none;
            white-space: nowrap;
          }
          .nhi-viewer-badge {
            font-family: 'Jost', sans-serif;
            font-size: 0.78rem;
            color: var(--parchment);
            white-space: nowrap;
          }
          .nhi-viewer-fs-btn {
            background: none;
            border: 1px solid rgba(245,237,216,0.4);
            color: var(--cream);
            border-radius: 6px;
            font-size: 0.72rem;
            padding: 0.25rem 0.55rem;
            cursor: pointer;
            font-family: 'Jost', sans-serif;
          }
          .nhi-viewer-progress {
            flex: 0 0 auto;
            height: 3px;
            background-color: rgba(245,237,216,0.15);
          }
          .nhi-viewer-progress-fill {
            height: 100%;
            background-color: var(--persimmon);
            transition: width 0.2s ease;
          }
          .nhi-viewer-stage {
            flex: 1 1 auto;
            min-height: 0;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--navy);
          }
          .nhi-viewer-stage img {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            display: block;
            user-select: none;
          }
          .nhi-viewer-tapzone {
            position: absolute;
            top: 0;
            height: 100%;
            width: 18%;
            border: none;
            background: transparent;
          }
          .nhi-viewer-footer {
            flex: 0 0 auto;
            display: flex;
            border-top: 1px solid rgba(245,237,216,0.15);
          }
          .nhi-viewer-nav-btn {
            flex: 1 1 50%;
            border: none;
            background-color: rgba(245,237,216,0.06);
            color: var(--cream);
            font-family: 'Jost', sans-serif;
            font-size: 0.95rem;
            font-weight: 500;
            padding: 0.9rem 0.5rem;
            cursor: pointer;
          }
          .nhi-viewer-nav-btn:disabled {
            opacity: 0.3;
            cursor: default;
          }
          .nhi-viewer-nav-btn + .nhi-viewer-nav-btn {
            border-left: 1px solid rgba(245,237,216,0.15);
          }
          .nhi-viewer-hint {
            text-align: center;
            font-family: 'Jost', sans-serif;
            font-size: 0.68rem;
            color: rgba(245,237,216,0.55);
            padding: 0.3rem 0 0.5rem;
          }
        `}</style>

        <div className="nhi-viewer-header">
          <div className="nhi-viewer-header-row">
            <Link href={`/courses/${COURSE.slug}`} className="nhi-viewer-exit">
              &larr; Exit to Modules
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="nhi-viewer-badge">
                Module {moduleN} of {TOTAL_MODULES}
              </span>
              {fsSupported && (
                <button
                  onClick={toggleFullscreen}
                  className="nhi-viewer-fs-btn"
                  aria-label="Toggle fullscreen"
                >
                  Fullscreen
                </button>
              )}
            </div>
          </div>
          <div className="nhi-viewer-title-row">
            <span className="nhi-viewer-title">{title}</span>
            <span className="nhi-viewer-badge">
              Slide {current} / {slideCount}
            </span>
          </div>
        </div>

        <div className="nhi-viewer-progress">
          <div
            className="nhi-viewer-progress-fill"
            style={{ width: `${(current / slideCount) * 100}%` }}
          />
        </div>

        <div className="nhi-viewer-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slidePath(moduleN, current)}
            alt={`Module ${moduleN}, slide ${current} of ${slideCount}`}
            draggable={false}
          />
          <button
            aria-label="Previous slide"
            onClick={goPrev}
            disabled={atStart}
            className="nhi-viewer-tapzone"
            style={{ left: 0 }}
          />
          <button
            aria-label="Next slide"
            onClick={goNext}
            disabled={atEnd}
            className="nhi-viewer-tapzone"
            style={{ right: 0 }}
          />
        </div>

        <div className="nhi-viewer-footer">
          <button onClick={goPrev} disabled={atStart} className="nhi-viewer-nav-btn">
            &larr; Previous
          </button>
          <button onClick={goNext} disabled={atEnd} className="nhi-viewer-nav-btn">
            Next &rarr;
          </button>
        </div>
        <p className="nhi-viewer-hint">Use arrow keys, swipe, or tap the buttons above to navigate.</p>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // MODULE COMPLETE SCREEN
  // A normal, calmly scrollable page — this one isn't a navigation
  // pain point, so it doesn't need the fixed-viewport treatment.
  // ─────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <p
          className="font-display"
          style={{ fontSize: '1.7rem', fontWeight: 600, color: 'var(--navy)', margin: '0 0 0.5rem' }}
        >
          Module {moduleN} complete
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--brown)', margin: '0 0 1.6rem' }}>
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
    </div>
  )
}
