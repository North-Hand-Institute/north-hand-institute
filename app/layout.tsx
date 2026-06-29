import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'North Hand Institute for Massage Education',
  description: 'NCBTMB Approved continuing education for Licensed Massage Therapists. Meridian-based bodywork for the modern treatment table.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
