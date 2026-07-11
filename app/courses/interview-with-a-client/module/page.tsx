import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { COURSE, MODULES, getModule } from '@/lib/course-config'
import SlideViewer from './SlideViewer'

// Pre-generate the six module routes at build time.
export function generateStaticParams() {
  return MODULES.map((m) => ({ n: String(m.n) }))
}

type Params = { params: Promise<{ n: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { n } = await params
  const mod = getModule(Number(n))
  if (!mod) return { title: 'Module not found' }
  return {
    title: `Module ${mod.n}: ${mod.title} | ${COURSE.title}`,
    robots: { index: false, follow: false }, // keep the course private during testing
  }
}

export default async function ModulePage({ params }: Params) {
  const { n } = await params
  const moduleN = Number(n)
  const mod = getModule(moduleN)

  if (!mod || !Number.isInteger(moduleN)) {
    notFound()
  }

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <SlideViewer module={mod} />
    </main>
  )
}
