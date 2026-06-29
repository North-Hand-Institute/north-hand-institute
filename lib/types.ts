export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  audience: string
  format: string
  ce_hours: number
  active: boolean
  created_at: string
}

export interface Event {
  id: string
  course_id: string
  location_name: string
  location_city: string
  location_state: string
  date: string
  price: number
  spots_total: number
  spots_remaining: number
  notes: string
  booking_url: string
  active: boolean
  created_at: string
}

export interface SiteContent {
  id: string
  key: string
  value: string
}
