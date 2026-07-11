import type { Metadata } from 'next'
import { COURSE } from '@/lib/course-config'
import Quiz from './Quiz'

export const metadata: Metadata = {
  title: `Final Assessment | ${COURSE.title}`,
  robots: { index: false, follow: false },
}

export default function QuizPage() {
  return <Quiz />
}
