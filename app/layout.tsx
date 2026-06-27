import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'North Hand Institute for Massage Education',
  description: 'NCBTMB Approved continuing education for Licensed Massage Therapists. Meridian-based bodywork for the modern treatment table.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
