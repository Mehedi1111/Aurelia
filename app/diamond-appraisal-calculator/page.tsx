import type { Metadata } from 'next'
import DiamondAppraisalCalculator from '@/components/calculators/DiamondAppraisalCalculator'

export const metadata: Metadata = {
  title: 'Diamond Appraisal Calculator — Estimate Your Diamond\'s Value | Moissanite by Aurelia',
  description: 'Free diamond appraisal calculator. Enter your diamond\'s 4Cs (carat, color, clarity, cut) and get an instant estimated market, insurance, and resale value.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/diamond-appraisal-calculator/' },
  openGraph: {
    title: 'Diamond Appraisal Calculator — What Is My Diamond Worth?',
    description: 'Instantly estimate your diamond\'s market value, insurance replacement cost, and resale value based on the 4Cs.',
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a diamond appraisal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A diamond appraisal is a professional assessment of a diamond\'s value based on the 4Cs (cut, color, clarity, carat) and current market conditions. Appraisals are typically 20–50% higher than purchase price and are used primarily for insurance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is this diamond appraisal calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator provides an estimate based on average market data and pricing formulas. For an official appraisal used for insurance or legal purposes, consult a GIA-certified gemologist.',
      },
    },
  ],
}

export default function DiamondAppraisalCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Diamond Appraisal Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Enter your diamond&apos;s characteristics to get an instant estimate of market value, insurance replacement cost, and resale value — no appointment needed.
          </p>
        </header>

        <DiamondAppraisalCalculator />
      </div>
    </>
  )
}
