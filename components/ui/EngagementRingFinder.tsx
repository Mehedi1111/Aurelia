'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Retailer {
  name: string
  tagline: string
  href: string
  reviewHref?: string
  strengths: string[]
}

const RETAILERS: Record<string, Retailer> = {
  jamesallen: {
    name: 'James Allen',
    tagline: 'Best for visual inspection — 360° HD on every diamond',
    href: 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309&chan=home',
    reviewHref: '/james-allen-review/',
    strengths: ['360° HD diamond video', 'GIA & IGI certified', 'Lab-grown + natural', 'Lifetime warranty'],
  },
  bluenile: {
    name: 'Blue Nile',
    tagline: 'Largest certified diamond inventory — trusted since 1999',
    href: 'https://www.bluenile.com/',
    reviewHref: '/category/blue-nile-jewelry-reviews-guide/',
    strengths: ['100,000+ GIA diamonds', '30-day free returns', 'Price match', 'Phone consultants'],
  },
  rarecarat: {
    name: 'Rare Carat',
    tagline: 'AI price comparison across 100+ vendors',
    href: 'https://www.rarecarat.com/',
    reviewHref: '/category/diamond-review/',
    strengths: ['Aggregates 100+ vendors', 'AI grading analysis', 'Free gemologist check', 'Spot undervalued stones'],
  },
  charlescolvard: {
    name: 'Charles & Colvard',
    tagline: 'Original moissanite — best quality & lifetime warranty',
    href: 'https://www.charlesandcolvard.com/',
    reviewHref: '/charles-and-colvard-discount-code/',
    strengths: ['Forever One & Caydia', 'Lifetime warranty on stones', 'Best moissanite quality', '60–80% vs diamond'],
  },
  taylorhart: {
    name: 'Taylor & Hart',
    tagline: 'Fully bespoke custom engagement ring design',
    href: 'https://taylorandhart.com/',
    strengths: ['Full custom design', 'Dedicated designer', 'Ethical sourcing', 'Unique one-of-a-kind'],
  },
  gemsny: {
    name: 'GemsNY',
    tagline: 'GIA-certified colored gemstones at wholesale prices',
    href: 'https://www.gemsny.com/',
    strengths: ['Sapphires, rubies, emeralds', 'GIA certified', 'Wholesale pricing', 'Large inventory'],
  },
  brilliantearth: {
    name: 'Brilliant Earth',
    tagline: 'Lab-grown diamonds with sustainability certification',
    href: 'https://www.brilliantearth.com/',
    strengths: ['Ethically sourced', 'Lab-grown + natural', 'IGI & GIA certified', 'Sustainability focus'],
  },
}

type StoneCategory = 'diamond-natural' | 'diamond-lab' | 'moissanite' | 'colored'
type Priority = 'visualize' | 'price' | 'custom' | 'ethical'
type Budget = 'under2k' | '2k-5k' | '5k-15k' | 'over15k'

interface Answers {
  stone?: StoneCategory
  priority?: Priority
  budget?: Budget
}

function getResults(a: Answers): string[] {
  const { stone, priority, budget } = a
  if (stone === 'moissanite') return ['charlescolvard', 'jamesallen', 'bluenile']
  if (stone === 'colored') return ['gemsny', 'bluenile', 'jamesallen']
  if (priority === 'custom') return ['taylorhart', 'jamesallen', 'bluenile']
  if (priority === 'ethical') return ['brilliantearth', 'jamesallen', 'bluenile']
  if (stone === 'diamond-lab') {
    if (priority === 'price' || budget === 'under2k' || budget === '2k-5k') return ['rarecarat', 'jamesallen', 'brilliantearth']
    return ['jamesallen', 'bluenile', 'brilliantearth']
  }
  // natural diamond
  if (priority === 'price' || budget === 'under2k') return ['rarecarat', 'bluenile', 'jamesallen']
  if (priority === 'visualize') return ['jamesallen', 'bluenile', 'rarecarat']
  if (budget === 'over15k') return ['jamesallen', 'bluenile', 'rarecarat']
  return ['jamesallen', 'bluenile', 'rarecarat']
}

const STEPS = [
  {
    id: 'stone',
    question: 'What type of center stone are you looking for?',
    subtitle: 'This shapes everything — quality grading, pricing, and which retailers have the best selection.',
    options: [
      { value: 'diamond-natural', label: 'Natural Diamond', desc: 'GIA-certified. Best for heirloom & investment value.' },
      { value: 'diamond-lab', label: 'Lab-Grown Diamond', desc: 'IGI-certified. Same look, 60–80% less. Best value for size.' },
      { value: 'moissanite', label: 'Moissanite', desc: 'Brilliant & durable. Fraction of diamond cost.' },
      { value: 'colored', label: 'Colored Gemstone', desc: 'Sapphire, ruby, emerald — unique and often undervalued.' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you when buying?',
    subtitle: 'Pick the factor that would most influence your final decision.',
    options: [
      { value: 'visualize', label: 'Seeing it before I buy', desc: 'I want to inspect the exact stone online before committing.' },
      { value: 'price', label: 'Getting the best price', desc: 'I want to find the best value for a given quality grade.' },
      { value: 'custom', label: 'Custom / unique design', desc: 'I want a ring designed specifically for us.' },
      { value: 'ethical', label: 'Ethical sourcing', desc: 'Sustainability and sourcing transparency matter to me.' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your total ring budget?',
    subtitle: 'Including setting and stone. Helps narrow to retailers that serve your price range well.',
    options: [
      { value: 'under2k', label: 'Under $2,000', desc: 'Lab-grown diamonds and moissanite shine at this budget.' },
      { value: '2k-5k', label: '$2,000–$5,000', desc: 'Good 1ct lab-grown or 0.7ct natural diamond range.' },
      { value: '5k-15k', label: '$5,000–$15,000', desc: 'Quality natural diamonds and larger lab-grown options.' },
      { value: 'over15k', label: 'Over $15,000', desc: '2ct+ natural diamond territory. Rare Carat helps find value.' },
    ],
  },
]

export default function EngagementRingFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)

  const currentStep = STEPS[step]

  function choose(value: string) {
    const newAnswers = { ...answers, [currentStep.id]: value as StoneCategory & Priority & Budget }
    setAnswers(newAnswers)
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      setDone(true)
    }
  }

  function reset() {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  const results = done ? getResults(answers) : []

  if (done) {
    return (
      <div className="bg-surface border-2 border-accent/25 rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="font-serif text-2xl text-dark mb-2">Your Best Matches</h3>
          <p className="text-text-muted text-sm">Based on your answers, these retailers are your strongest fits.</p>
        </div>
        <div className="space-y-4 mb-6">
          {results.map((key, i) => {
            const r = RETAILERS[key]
            return (
              <div key={key} className="bg-white border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-dark text-white flex items-center justify-center text-xs font-medium shrink-0">
                        {i + 1}
                      </span>
                      <p className="font-serif text-lg text-dark">{r.name}</p>
                    </div>
                    <p className="text-text-muted text-xs ml-8">{r.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4 ml-8">
                  {r.strengths.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 text-[10px] text-text-muted bg-surface border border-border rounded-full px-2.5 py-1">
                      <svg className="w-2.5 h-2.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 ml-8">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="flex-1 text-center bg-dark text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-accent transition-colors duration-200"
                  >
                    Shop {r.name} →
                  </a>
                  {r.reviewHref && (
                    <Link href={r.reviewHref} className="px-4 text-center bg-surface border border-border rounded-xl py-2.5 text-sm text-text-muted hover:text-accent hover:border-accent transition-colors duration-200">
                      Review
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <button onClick={reset} className="w-full text-center text-sm text-text-muted hover:text-accent transition-colors py-2">
          ← Start Over
        </button>
        <p className="text-center text-[10px] text-text-subtle mt-2">Shop links are affiliate — no extra cost to you</p>
      </div>
    )
  }

  return (
    <div className="bg-surface border-2 border-accent/25 rounded-2xl p-6 sm:p-8">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-accent' : 'bg-border'}`}
          />
        ))}
      </div>
      <p className="text-[11px] text-text-subtle uppercase tracking-widest mb-4">Question {step + 1} of {STEPS.length}</p>
      <h3 className="font-serif text-xl sm:text-2xl text-dark mb-2">{currentStep.question}</h3>
      <p className="text-text-muted text-sm mb-6">{currentStep.subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentStep.options.map(opt => (
          <button
            key={opt.value}
            onClick={() => choose(opt.value)}
            className="text-left bg-white border-2 border-border hover:border-accent hover:bg-accent/5 rounded-xl p-4 transition-colors duration-150 group"
          >
            <p className="font-medium text-dark text-sm mb-1 group-hover:text-accent transition-colors">{opt.label}</p>
            <p className="text-text-muted text-xs leading-relaxed">{opt.desc}</p>
          </button>
        ))}
      </div>
      {step > 0 && (
        <button onClick={() => setStep(s => s - 1)} className="mt-4 text-sm text-text-muted hover:text-accent transition-colors">
          ← Back
        </button>
      )}
    </div>
  )
}
