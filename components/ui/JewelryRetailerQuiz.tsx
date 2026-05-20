'use client'

import { useState } from 'react'

const RETAILERS = {
  bluenile:      { name: 'Blue Nile',         link: 'https://www.bluenile.com/?a_aid=66fc3592af524&a_cid=55e51e63&chan=home',          review: 'https://moissanitebyaurelia.com/blue-nile-reviews-2024/' },
  jamesallen:    { name: 'James Allen',        link: 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309&chan=home',        review: 'https://moissanitebyaurelia.com/james-allen-review/' },
  charlescolvard:{ name: 'Charles & Colvard', link: 'https://charlesandcolvard.sjv.io/xLZ4gR',                                        review: 'https://moissanitebyaurelia.com/charles-and-colvard-reviews/' },
  gemsny:        { name: 'GemsNY',             link: 'https://gemsny.sjv.io/Z6zEmk',                                                   review: '' },
  taylorhart:    { name: 'Taylor & Hart',      link: 'https://taylorhart.pxf.io/GKox6E',                                               review: 'https://moissanitebyaurelia.com/taylor-and-hart-review/' },
  mintlilly:     { name: 'Mint & Lilly',       link: 'https://imp.i300907.net/qzvom5',                                                 review: '' },
  larson:        { name: 'Larson Jewelers',    link: 'https://larson-jewelers.sjv.io/qznKKY',                                          review: '' },
  mindfulsouls:  { name: 'Mindful Souls',      link: 'https://mindfulsouls.sjv.io/POgnkQ',                                             review: '' },
  amazon:        { name: 'Amazon',             link: 'https://amzn.to/4pHo6jl',                                                        review: '' },
} as const

type Key = keyof typeof RETAILERS
type Retailer = { name: string; link: string; review: string }

const STEPS = [
  {
    type: 'intro' as const,
  },
  {
    type: 'q' as const,
    step: 1,
    question: 'Which stone type is most important to you?',
    answers: [
      { text: 'Natural Diamond — classic, high-value, lasting legacy.', value: 'NATURAL' },
      { text: 'Lab Diamond — ethical sourcing and full traceability.', value: 'LAB' },
      { text: 'Moissanite — maximum brilliance and size for a great price.', value: 'MOISSANITE' },
      { text: 'Colored Gemstone — sapphire, ruby, emerald, or custom.', value: 'GEMSTONE' },
    ],
  },
  {
    type: 'q' as const,
    step: 2,
    question: 'What gives you the most confidence buying fine jewelry online?',
    answers: [
      { text: '360° Inspection Technology — rotate and inspect my exact stone.', value: 'TECH' },
      { text: 'Massive GIA-Certified Inventory — largest selection in one place.', value: 'INVENTORY' },
      { text: 'Expert Guidance — a designer walks me through a bespoke creation.', value: 'CUSTOM' },
    ],
  },
  {
    type: 'q' as const,
    step: 3,
    question: 'How do you define value in a significant jewelry purchase?',
    answers: [
      { text: 'Max Quality — I\'ll invest more for the absolute best cut and clarity.', value: 'LUXURY' },
      { text: 'Affordable & Accessible — best price for a beautiful, meaningful piece.', value: 'VALUE' },
      { text: 'Longevity — durable materials like tungsten or titanium built to last.', value: 'DURABLE' },
    ],
  },
  {
    type: 'q' as const,
    step: 4,
    question: 'Which word best describes your personal aesthetic?',
    answers: [
      { text: 'Timeless — classic round settings, enduring tradition.', value: 'CLASSIC' },
      { text: 'Modern — sleek lines, hidden halos, geometric shapes.', value: 'MODERN' },
      { text: 'Sentimental — engravings, birthstones, and custom names.', value: 'SENTIMENTAL' },
      { text: 'Bold — statement pieces, large colored gems, unusual shapes.', value: 'BOLD' },
    ],
  },
  {
    type: 'q' as const,
    step: 5,
    question: 'What is the primary purpose of this purchase?',
    answers: [
      { text: 'High-Value Milestone — engagement ring, anniversary, or custom investment.', value: 'MILESTONE' },
      { text: 'Everyday Accent — simple earrings, stackable bands, or a sentimental necklace.', value: 'EVERYDAY' },
      { text: 'Symbolic & Spiritual — zodiac, crystal energy, or birthstone jewelry.', value: 'SPIRITUAL' },
    ],
  },
  {
    type: 'q' as const,
    step: 6,
    question: 'If your ideal retailer had a personality, which would it be?',
    answers: [
      { text: 'The Reliable Engineer — data, certification, and flawless execution.', value: 'DATA' },
      { text: 'The Bespoke Artist — unique vision and custom creation.', value: 'ARTIST' },
      { text: 'The Tech Guru — immersive viewing and digital confidence.', value: 'TECH' },
      { text: 'The Value Curator — the best items at the greatest prices.', value: 'VALUE' },
    ],
  },
  {
    type: 'q' as const,
    step: 7,
    question: 'What is your top priority for the finished piece?',
    answers: [
      { text: 'Maximum Sparkle — pavé, halo, or radiant settings.', value: 'SPARKLE' },
      { text: 'Unique Design — non-traditional cuts and one-of-a-kind settings.', value: 'UNIQUE' },
      { text: 'Utter Simplicity — solitaire or minimalist band.', value: 'SIMPLE' },
      { text: 'Ultimate Quality — precision craftsmanship above all else.', value: 'QUALITY' },
    ],
  },
]

type Responses = Partial<Record<number, string>>

function calcResult(r: Responses): { persona: string; retailers: Retailer[] } {
  const r1 = r[1], r2 = r[2], r3 = r[3], r5 = r[5], r6 = r[6]
  let persona = ''
  let keys: Key[] = []

  if (r1 === 'NATURAL' || r1 === 'LAB') {
    if (r2 === 'TECH' || r6 === 'TECH') {
      keys = ['jamesallen', 'bluenile', 'charlescolvard']
      persona = 'The Digital Connoisseur'
    } else if (r2 === 'INVENTORY' || r6 === 'DATA') {
      keys = ['bluenile', 'jamesallen', 'taylorhart']
      persona = 'The Certified Investment Buyer'
    } else {
      keys = ['taylorhart', 'bluenile', 'gemsny']
      persona = 'The Bespoke Design Architect'
    }
  } else if (r1 === 'MOISSANITE') {
    keys = ['charlescolvard', 'jamesallen', 'bluenile']
    persona = 'The Brilliant Value Seeker'
  } else if (r1 === 'GEMSTONE') {
    keys = ['gemsny', 'taylorhart', 'bluenile']
    persona = 'The Vibrant Collector'
  }

  if (r3 === 'VALUE' || r5 === 'EVERYDAY') {
    keys = ['amazon', 'mintlilly', 'jamesallen']
    persona = persona || 'The Everyday Stylist'
  }
  if (r3 === 'DURABLE') {
    keys = ['larson', 'bluenile', 'jamesallen']
    persona = persona || 'The Durable Band Buyer'
  }
  if (r5 === 'SPIRITUAL') {
    keys = ['mindfulsouls', 'amazon', 'mintlilly']
    persona = persona || 'The Mindful Shopper'
  }

  if (!keys.length) {
    keys = ['bluenile', 'jamesallen', 'amazon']
    persona = 'The Balanced Explorer'
  }

  const retailers = keys.slice(0, 3).map(k => RETAILERS[k])
  return { persona, retailers }
}

export default function JewelryRetailerQuiz() {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState<Responses>({})
  const [done, setDone] = useState(false)

  const total = STEPS.length - 1
  const progress = step === 0 ? 0 : Math.round((step / total) * 100)
  const current = STEPS[step]
  const selected = current.type === 'q' ? responses[current.step] : undefined
  const canNext = current.type === 'intro' || !!selected

  function choose(stepNum: number, val: string) {
    setResponses(p => ({ ...p, [stepNum]: val }))
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      setDone(true)
    }
  }

  function back() {
    if (step > 0) setStep(s => s - 1)
  }

  function reset() {
    setStep(0)
    setResponses({})
    setDone(false)
  }

  if (done) {
    const { persona, retailers } = calcResult(responses)
    return (
      <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-widest text-accent font-medium mb-2">Your Retailer Match</p>
          <h2 className="font-serif text-3xl text-dark mb-4">Your Jewelry Persona</h2>
          <div className="inline-block border-2 border-accent/30 rounded-xl px-8 py-3 bg-white">
            <p className="font-serif text-2xl text-dark">{persona}</p>
          </div>
          <p className="text-text-muted text-sm mt-4 max-w-md mx-auto">
            Based on your answers, these are your top 3 matched retailers:
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {retailers.map((r, i) => (
            <div key={r.name} className="flex items-center justify-between border border-border rounded-xl p-4 bg-white">
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-widest ${i === 0 ? 'text-accent' : 'text-text-muted'}`}>
                  {i === 0 ? '★ Best Match' : `Choice ${i + 1}`}
                </p>
                <p className="font-serif text-lg text-dark">{r.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <a href={r.link} target="_blank" rel="sponsored noopener noreferrer"
                  className="bg-dark text-white rounded-xl px-4 py-2 text-xs font-semibold hover:bg-accent transition-colors">
                  Shop Now →
                </a>
                {r.review && (
                  <a href={r.review} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-text-muted hover:text-accent transition-colors hidden sm:block">
                    Read Review →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-text-subtle mb-4">Affiliate links — we may earn a commission at no extra cost to you</p>
        <div className="text-center">
          <button onClick={reset}
            className="text-xs text-text-muted border border-border rounded-full px-6 py-2.5 hover:bg-surface transition-colors">
            ← Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  if (current.type === 'intro') {
    return (
      <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
        <div className="mb-4">
          <div className="h-1 bg-border rounded-full" />
          <p className="text-[11px] text-text-muted mt-1.5 text-right">Step 0 of 7</p>
        </div>
        <div className="text-center py-4">
          <p className="text-[11px] uppercase tracking-widest text-accent font-medium mb-3">Free Retailer Quiz</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-dark mb-4 leading-tight text-balance">
            Find Your Perfect Jewelry Retailer
          </h2>
          <p className="text-text-muted text-base max-w-md mx-auto mb-8 leading-relaxed">
            Answer 7 questions and get instantly matched with the top 3 jewelers for your style, stone preference, and budget.
          </p>
          <div className="bg-white rounded-xl border border-border p-6 max-w-sm mx-auto text-left mb-8">
            <p className="font-medium text-dark text-sm mb-3">This quiz reveals:</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {['Your ideal stone type (Diamond, Moissanite, Gemstone)', 'The retailer with the best buying experience for you', 'How to maximize quality for your budget'].map(t => (
                <li key={t} className="flex gap-2"><span className="text-accent shrink-0">→</span>{t}</li>
              ))}
            </ul>
          </div>
          <button onClick={next}
            className="bg-dark text-white rounded-xl px-10 py-4 text-sm font-semibold hover:bg-accent transition-colors">
            Start Matchmaking →
          </button>
        </div>
      </div>
    )
  }

  const q = current as Extract<(typeof STEPS)[number], { type: 'q' }>

  return (
    <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
      <div className="mb-6">
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div className="h-1 bg-accent rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[11px] text-text-muted mt-1.5 text-right">Step {q.step} of 7</p>
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-3">Question {q.step}</p>
      <h2 className="font-serif text-xl sm:text-2xl text-dark mb-6 leading-snug">{q.question}</h2>

      <div className="flex flex-col gap-3 mb-8">
        {q.answers.map(a => (
          <button
            key={a.value}
            onClick={() => choose(q.step, a.value)}
            className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm leading-snug transition-all ${
              selected === a.value
                ? 'border-accent bg-white text-dark font-medium shadow-sm'
                : 'border-border bg-white text-text-muted hover:border-accent/40 hover:bg-surface'
            }`}
          >
            {a.text}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={back}
          className={`text-xs text-text-muted border border-border rounded-full px-5 py-2 hover:bg-white transition-colors ${step === 0 ? 'invisible' : ''}`}>
          ← Back
        </button>
        <button onClick={next} disabled={!canNext}
          className="bg-dark text-white rounded-xl px-8 py-3 text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {step === STEPS.length - 1 ? 'See My Results →' : 'Next Step →'}
        </button>
      </div>
    </div>
  )
}
