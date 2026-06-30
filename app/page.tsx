'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Course, Event, SiteContent } from '@/lib/types'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Courses from '@/components/Courses'
import Credentials from '@/components/Credentials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [{ data: coursesData }, { data: eventsData }, { data: contentData }] = await Promise.all([
        supabase.from('courses').select('*').eq('active', true).order('created_at'),
        supabase.from('events').select('*').eq('active', true).order('date'),
        supabase.from('site_content').select('*'),
      ])
      setCourses(coursesData || [])
      setEvents(eventsData || [])
      const contentMap: Record<string, string> = {}
      ;(contentData || []).forEach((item: SiteContent) => { contentMap[item.key] = item.value })
      setContent(contentMap)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--light-text)', fontStyle: 'italic' }}>Loading...</p>
    </div>
  )

  return (
    <>
      <Nav />
      <Hero tagline={content.hero_tagline} />
      <About bioMain={content.bio_main} bioSecondary={content.bio_secondary} quote={content.quote} />
      <Courses courses={courses} events={events} />
      <Credentials />
      <Contact />
      <Footer />
    </>
  )
}
