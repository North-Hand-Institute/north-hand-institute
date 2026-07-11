// ─────────────────────────────────────────────────────────────
// Course configuration — single source of truth for the course.
// If you re-export a module deck with a different number of slides,
// update its `slideCount` here and nothing else needs to change.
// ─────────────────────────────────────────────────────────────

export const COURSE = {
  slug: 'interview-with-a-client',
  title: 'Interview With a Client',
  subtitle: 'A Therapist\u2019s Guide to Client Acquisition',
  ceHours: 3,
  price: 40,
  passThresholdPercent: 75, // NCBTMB: 75% required to pass
}

export type ModuleInfo = {
  n: number
  title: string
  blurb: string
  slideCount: number
}

export const MODULES: ModuleInfo[] = [
  {
    n: 1,
    title: 'First Contact: The Phone Call',
    blurb:
      'The five goals of every first call, handling technique requests, and the credit-card-and-cancellation-policy conversation that frames you as a professional.',
    slideCount: 15,
  },
  {
    n: 2,
    title: 'The Intake Interview',
    blurb:
      'Rapport-building questions, the work/leisure/self-care framework, the follow-up question skill, and securing permission to contact other providers.',
    slideCount: 21,
  },
  {
    n: 3,
    title: 'Creating a Multi-Sensory Experience',
    blurb:
      'Tailoring sound, scent, temperature, and ambiance to each client \u2014 and pivoting within reason to meet their preferences.',
    slideCount: 8,
  },
  {
    n: 4,
    title: 'Collaborative Care',
    blurb:
      'Why coordinating with a client\u2019s other practitioners should be the new norm \u2014 and exactly how to make that call.',
    slideCount: 12,
  },
  {
    n: 5,
    title: 'Practitioner Networking',
    blurb:
      'Mapping your local referral ecosystem, introducing yourself, and turning contacts into lasting referral partners.',
    slideCount: 11,
  },
  {
    n: 6,
    title: 'The Checkout & Client Retention',
    blurb:
      'Managing post-treatment expectations, the rebooking conversation, and asking for reviews and referrals the right way.',
    slideCount: 13,
  },
]

export const TOTAL_MODULES = MODULES.length

export function getModule(n: number): ModuleInfo | undefined {
  return MODULES.find((m) => m.n === n)
}

// Path to a given slide image in /public. Zero-padded to 2 digits.
export function slidePath(moduleN: number, slideN: number): string {
  const padded = String(slideN).padStart(2, '0')
  return `/courses/${COURSE.slug}/module-${moduleN}/slide-${padded}.jpg`
}

// localStorage key for tracking which modules the user has completed.
// (Testing-phase progress tracking only — not a substitute for real
// enrollment, which comes with the Option B account system later.)
export const PROGRESS_STORAGE_KEY = `nhi-progress-${COURSE.slug}`

export const PROVIDER = {
     name: 'North Hand Institute of Massage Education',
     instructor: 'Michael Corcoran, LMT',
     apNumber: 'NCBTMB Approved Provider AP #1003193',
   }
