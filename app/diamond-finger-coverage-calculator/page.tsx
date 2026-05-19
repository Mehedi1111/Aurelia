import type { Metadata } from 'next'
import DiamondFingerCoverageCalculator from '@/components/calculators/DiamondFingerCoverageCalculator'

export const metadata: Metadata = {
  title: 'Diamond Finger Coverage Calculator — How Much Finger Will It Cover? | Moissanite by Aurelia',
  description: 'See exactly how much of your finger a diamond will cover. Enter shape, carat, and ring size to get finger coverage percentage and visual presence estimate.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/diamond-finger-coverage-calculator/' },
  openGraph: {
    title: 'Diamond Finger Coverage Calculator',
    description: 'Calculate what percentage of your finger a diamond covers. Find the perfect balance of visual presence for your ring size and diamond shape.',
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the ideal finger coverage for an engagement ring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ideal finger coverage is typically 50–65%. This provides substantial visual presence without looking oversized or unbalanced. Elongated shapes like oval and marquise achieve higher coverage with less carat weight.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which diamond shape gives the best finger coverage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Marquise diamonds offer the highest finger coverage per carat because of their elongated shape. Oval and pear diamonds are close behind and are among the most popular choices for maximizing visual presence.',
      },
    },
  ],
}

export default function DiamondFingerCoverageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Diamond Finger Coverage Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            How much of your finger will your diamond cover? Enter your ring size, shape, and carat weight to see the exact coverage percentage.
          </p>
        </header>

        <DiamondFingerCoverageCalculator />
      </div>
    </>
  )
}
