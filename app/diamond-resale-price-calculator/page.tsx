import type { Metadata } from 'next'
import DiamondResaleCalculator from '@/components/calculators/DiamondResaleCalculator'

export const metadata: Metadata = {
  title: 'Diamond Resale Price Calculator — What Is My Diamond Worth? | Moissanite by Aurelia',
  description: 'Calculate how much you can get for your diamond. Get instant cash offer and trade-in value estimates for natural diamonds, lab-grown diamonds, and moissanite.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/diamond-resale-price-calculator/' },
  openGraph: {
    title: 'Diamond Resale Value Calculator — Cash Offer vs Trade-In',
    description: 'Find out how much your diamond is worth to sell. Compare cash offers vs. trade-in credit at Blue Nile and James Allen upgrade programs.',
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much can I get for my diamond when selling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Natural diamonds typically resell for 25–50% of retail purchase price. Lab-grown diamonds resell for 10–25%. Moissanite resells for 20–40%. Using a retailer trade-in program typically yields 30–50% more credit than a direct cash sale.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it better to sell my diamond or trade it in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trade-in programs at retailers like Blue Nile and James Allen typically offer 30–50% more value than cash sales, but only as credit toward a new purchase. If you want to upgrade your diamond, trade-in is almost always the better financial choice.',
      },
    },
  ],
}

export default function DiamondResalePriceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Diamond Resale Price Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Find out how much your diamond is worth — get instant cash offer and trade-in estimates, and see which option earns you more.
          </p>
        </header>

        <DiamondResaleCalculator />
      </div>
    </>
  )
}
