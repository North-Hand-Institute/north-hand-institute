'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Course, Event } from '@/lib/types'

const ADMIN_PASSWORD = 'NorthHand2025!'

type Tab = 'content' | 'courses' | 'events'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab] = useState<Tab>('events')
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

  // Content
  const [bioMain, setBioMain] = useState('')
  const [bioSecondary, setBioSecondary] = useState('')
  const [heroTagline, setHeroTagline] = useState('')
  const [quote, setQuote] = useState('')

  // Courses
  const [courses, setCourses] = useState<Course[]>([])
  const [editCourse, setEditCourse] = useState<Partial<Course> | null>(null)

  // Events
  const [events, setEvents] = useState<Event[]>([])
  const [editEvent, setEditEvent] = useState<Partial<Event> | null>(null)

  function login() {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else { setPwError(true) }
  }

  async function loadData() {
    const [{ data: contentData }, { data: coursesData }, { data: eventsData }] = await Promise.all([
      supabase.from('site_content').select('*'),
      supabase.from('courses').select('*').order('created_at'),
      supabase.from('events').select('*').order('date'),
    ])
    contentData?.forEach((item: { key: string; value: string }) => {
      if (item.key === 'bio_main') setBioMain(item.value)
      if (item.key === 'bio_secondary') setBioSecondary(item.value)
      if (item.key === 'hero_tagline') setHeroTagline(item.value)
      if (item.key === 'quote') setQuote(item.value)
    })
    setCourses(coursesData || [])
    setEvents(eventsData || [])
  }

  useEffect(() => { if (authed) loadData() }, [authed])

  function showSaved() { setSavedMsg('Saved!'); setTimeout(() => setSavedMsg(''), 2500) }

  async function saveContent() {
    setSaving(true)
    await Promise.all([
      supabase.from('site_content').upsert({ key: 'bio_main', value: bioMain }),
      supabase.from('site_content').upsert({ key: 'bio_secondary', value: bioSecondary }),
      supabase.from('site_content').upsert({ key: 'hero_tagline', value: heroTagline }),
      supabase.from('site_content').upsert({ key: 'quote', value: quote }),
    ])
    setSaving(false); showSaved()
  }

  async function saveCourse() {
    if (!editCourse) return
    setSaving(true)
    if (editCourse.id) {
      await supabase.from('courses').update(editCourse).eq('id', editCourse.id)
    } else {
      await supabase.from('courses').insert(editCourse)
    }
    setSaving(false); setEditCourse(null); loadData(); showSaved()
  }

  async function deleteCourse(id: string) {
    if (!confirm('Delete this course and all its events?')) return
    await supabase.from('courses').delete().eq('id', id)
    loadData()
  }

  async function saveEvent() {
    if (!editEvent) return
    setSaving(true)
    if (editEvent.id) {
      await supabase.from('events').update(editEvent).eq('id', editEvent.id)
    } else {
      await supabase.from('events').insert(editEvent)
    }
    setSaving(false); setEditEvent(null); loadData(); showSaved()
  }

  async function deleteEvent(id: string) {
    if (!confirm('Delete this event?')) return
    await supabase.from('events').delete().eq('id', id)
    loadData()
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.7rem 1.5rem', border: 'none', background: active ? '#1a2640' : 'transparent',
    color: active ? '#f5edd8' : '#7a6a58', cursor: 'pointer', fontSize: '0.75rem',
    letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Jost, sans-serif',
    borderBottom: active ? '2px solid #c9572a' : '2px solid transparent', marginBottom: '-2px',
    transition: 'all 0.2s',
  })

  const s: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', background: '#f0ebe0', fontFamily: 'Jost, sans-serif' },
    header: { background: '#1a2640', padding: '1.2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#f5edd8', fontWeight: 400 },
    main: { maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem' },
    tabs: { display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', borderBottom: '2px solid rgba(92,61,30,0.15)', paddingBottom: '0' },
    card: { background: 'white', border: '1px solid rgba(92,61,30,0.12)', padding: '2rem', marginBottom: '1.5rem' },
    label: { display: 'block', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a6a58', marginBottom: '0.4rem' },
    input: { width: '100%', border: '1px solid rgba(92,61,30,0.2)', padding: '0.75rem 0.9rem', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: '#2a1f14', outline: 'none', background: '#faf8f4', marginBottom: '1rem' },
    textarea: { width: '100%', border: '1px solid rgba(92,61,30,0.2)', padding: '0.75rem 0.9rem', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: '#2a1f14', outline: 'none', background: '#faf8f4', marginBottom: '1rem', resize: 'vertical' as const },
    btn: { padding: '0.75rem 1.8rem', background: '#c9572a', color: 'white', border: 'none', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, cursor: 'pointer', fontWeight: 500 },
    btnGhost: { padding: '0.75rem 1.8rem', background: 'transparent', color: '#1a2640', border: '1px solid #1a2640', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, cursor: 'pointer' },
    btnDanger: { padding: '0.5rem 1rem', background: 'transparent', color: '#c9572a', border: '1px solid #c9572a', fontFamily: 'Jost, sans-serif', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer' },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid rgba(92,61,30,0.08)' },
    courseTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#1a2640' },
    meta: { fontSize: '0.78rem', color: '#7a6a58', marginTop: '0.2rem' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' },
  }

  // LOGIN SCREEN
  if (!authed) return (
    <div style={{ minHeight: '100vh', background: '#1a2640', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '3rem', width: 360 }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#1a2640', marginBottom: '0.5rem' }}>Admin Access</div>
        <div style={{ fontSize: '0.78rem', color: '#7a6a58', marginBottom: '2rem' }}>North Hand Institute</div>
        <label style={s.label}>Password</label>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
          style={{ ...s.input, border: pwError ? '1px solid #c9572a' : '1px solid rgba(92,61,30,0.2)' }} placeholder="Enter admin password" />
        {pwError && <p style={{ fontSize: '0.78rem', color: '#c9572a', marginBottom: '1rem' }}>Incorrect password.</p>}
        <button onClick={login} style={s.btn}>Sign In</button>
      </div>
    </div>
  )

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.headerTitle}>North Hand Institute · Admin</div>
        <a href="/" style={{ fontSize: '0.72rem', color: '#b8956a', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>← View Site</a>
      </div>

      <div style={s.main}>
        {savedMsg && <div style={{ background: '#1a2640', color: '#b8956a', padding: '0.75rem 1.2rem', marginBottom: '1.5rem', fontSize: '0.82rem', letterSpacing: '0.1em' }}>{savedMsg}</div>}

        <div style={s.tabs}>
          {(['events', 'courses', 'content'] as Tab[]).map(t => (
            <button key={t} style={tabStyle(tab === t)} onClick={() => setTab(t)}>
              {t === 'events' ? 'Upcoming Events' : t === 'courses' ? 'Courses' : 'Bio & Text'}
            </button>
          ))}
        </div>

        {/* EVENTS TAB */}
        {tab === 'events' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#1a2640', fontWeight: 300 }}>Upcoming Events</h2>
              <button style={s.btn} onClick={() => setEditEvent({ active: true, spots_remaining: 12, spots_total: 12 })}>+ Add Event</button>
            </div>

            {editEvent && (
              <div style={{ ...s.card, border: '2px solid #c9572a', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9572a', marginBottom: '1.5rem' }}>
                  {editEvent.id ? 'Edit Event' : 'New Event'}
                </div>
                <div style={s.grid2}>
                  <div>
                    <label style={s.label}>Course</label>
                    <select value={editEvent.course_id || ''} onChange={e => setEditEvent({ ...editEvent, course_id: e.target.value })} style={{ ...s.input }}>
                      <option value="">Select a course...</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={s.label}>Date</label>
                    <input type="date" value={editEvent.date || ''} onChange={e => setEditEvent({ ...editEvent, date: e.target.value })} style={s.input} />
                  </div>
                  <div>
                    <label style={s.label}>Venue / Host Name</label>
                    <input value={editEvent.location_name || ''} onChange={e => setEditEvent({ ...editEvent, location_name: e.target.value })} style={s.input} placeholder="Sol Spa" />
                  </div>
                  <div>
                    <label style={s.label}>City</label>
                    <input value={editEvent.location_city || ''} onChange={e => setEditEvent({ ...editEvent, location_city: e.target.value })} style={s.input} placeholder="Cape Cod" />
                  </div>
                  <div>
                    <label style={s.label}>State</label>
                    <input value={editEvent.location_state || ''} onChange={e => setEditEvent({ ...editEvent, location_state: e.target.value })} style={s.input} placeholder="MA" />
                  </div>
                  <div>
                    <label style={s.label}>Price ($)</label>
                    <input type="number" value={editEvent.price || ''} onChange={e => setEditEvent({ ...editEvent, price: parseFloat(e.target.value) })} style={s.input} placeholder="125" />
                  </div>
                  <div>
                    <label style={s.label}>Total Spots</label>
                    <input type="number" value={editEvent.spots_total || ''} onChange={e => setEditEvent({ ...editEvent, spots_total: parseInt(e.target.value) })} style={s.input} placeholder="12" />
                  </div>
                  <div>
                    <label style={s.label}>Spots Remaining</label>
                    <input type="number" value={editEvent.spots_remaining || ''} onChange={e => setEditEvent({ ...editEvent, spots_remaining: parseInt(e.target.value) })} style={s.input} placeholder="12" />
                  </div>
                </div>
                <label style={s.label}>Notes (optional)</label>
                <input value={editEvent.notes || ''} onChange={e => setEditEvent({ ...editEvent, notes: e.target.value })} style={s.input} placeholder="Hosted graciously by Sol Spa" />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button style={s.btn} onClick={saveEvent} disabled={saving}>{saving ? 'Saving...' : 'Save Event'}</button>
                  <button style={s.btnGhost} onClick={() => setEditEvent(null)}>Cancel</button>
                </div>
              </div>
            )}

            <div style={s.card}>
              {events.length === 0 && <p style={{ color: '#7a6a58', fontSize: '0.9rem', fontStyle: 'italic' }}>No events yet. Add your first one above.</p>}
              {events.map(event => {
                const course = courses.find(c => c.id === event.course_id)
                return (
                  <div key={event.id} style={s.row}>
                    <div>
                      <div style={s.courseTitle}>{event.location_name} · {event.location_city}, {event.location_state}</div>
                      <div style={s.meta}>{event.date} · {course?.title || 'Unknown course'} · ${event.price} · {event.spots_remaining} spots left</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button style={s.btnGhost} onClick={() => setEditEvent(event)}>Edit</button>
                      <button style={s.btnDanger} onClick={() => deleteEvent(event.id)}>Delete</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {tab === 'courses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#1a2640', fontWeight: 300 }}>Courses</h2>
              <button style={s.btn} onClick={() => setEditCourse({ active: true, audience: 'Licensed Massage Therapists', format: 'In-Person Intensive' })}>+ Add Course</button>
            </div>

            {editCourse && (
              <div style={{ ...s.card, border: '2px solid #c9572a', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9572a', marginBottom: '1.5rem' }}>
                  {editCourse.id ? 'Edit Course' : 'New Course'}
                </div>
                <label style={s.label}>Course Title</label>
                <input value={editCourse.title || ''} onChange={e => setEditCourse({ ...editCourse, title: e.target.value })} style={s.input} placeholder="Shiatsu Tablework Intensive" />
                <label style={s.label}>Subtitle</label>
                <input value={editCourse.subtitle || ''} onChange={e => setEditCourse({ ...editCourse, subtitle: e.target.value })} style={s.input} placeholder="Upper Body — Supine" />
                <label style={s.label}>Description</label>
                <textarea rows={5} value={editCourse.description || ''} onChange={e => setEditCourse({ ...editCourse, description: e.target.value })} style={s.textarea} />
                <div style={s.grid2}>
                  <div>
                    <label style={s.label}>CE Hours</label>
                    <input type="number" value={editCourse.ce_hours || ''} onChange={e => setEditCourse({ ...editCourse, ce_hours: parseInt(e.target.value) })} style={s.input} placeholder="5" />
                  </div>
                  <div>
                    <label style={s.label}>Format</label>
                    <input value={editCourse.format || ''} onChange={e => setEditCourse({ ...editCourse, format: e.target.value })} style={s.input} placeholder="In-Person Intensive" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button style={s.btn} onClick={saveCourse} disabled={saving}>{saving ? 'Saving...' : 'Save Course'}</button>
                  <button style={s.btnGhost} onClick={() => setEditCourse(null)}>Cancel</button>
                </div>
              </div>
            )}

            <div style={s.card}>
              {courses.length === 0 && <p style={{ color: '#7a6a58', fontSize: '0.9rem', fontStyle: 'italic' }}>No courses yet.</p>}
              {courses.map(course => (
                <div key={course.id} style={s.row}>
                  <div>
                    <div style={s.courseTitle}>{course.title}</div>
                    <div style={s.meta}>{course.subtitle} · {course.ce_hours} CE hours · {course.format}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button style={s.btnGhost} onClick={() => setEditCourse(course)}>Edit</button>
                    <button style={s.btnDanger} onClick={() => deleteCourse(course.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT TAB */}
        {tab === 'content' && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#1a2640', fontWeight: 300, marginBottom: '1.5rem' }}>Bio & Site Text</h2>
            <div style={s.card}>
              <label style={s.label}>Hero Tagline (below the main headline)</label>
              <textarea rows={3} value={heroTagline} onChange={e => setHeroTagline(e.target.value)} style={s.textarea} />

              <label style={s.label}>Bio — Main Paragraph</label>
              <textarea rows={4} value={bioMain} onChange={e => setBioMain(e.target.value)} style={s.textarea} />

              <label style={s.label}>Bio — Second Paragraph</label>
              <textarea rows={4} value={bioSecondary} onChange={e => setBioSecondary(e.target.value)} style={s.textarea} />

              <label style={s.label}>Pull Quote (displayed in the dark box)</label>
              <textarea rows={3} value={quote} onChange={e => setQuote(e.target.value)} style={s.textarea} />

              <button style={s.btn} onClick={saveContent} disabled={saving}>{saving ? 'Saving...' : 'Save All Text'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
