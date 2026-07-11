import type { Metadata } from 'next'
import { COURSE } from '@/lib/course-config'
import CourseLanding from './CourseLanding'

export const metadata: Metadata = {
  title: `${COURSE.title} | North Hand Institute of Massage Education`,
  description: `A ${COURSE.ceHours} CE hour home-study course for Licensed Massage Therapists on client acquisition and retention.`,
  // Keep the whole course unlisted while it's in testing / pending approval.
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CourseLanding />
}
