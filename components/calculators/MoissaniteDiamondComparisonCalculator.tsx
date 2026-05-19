'use client'

import { useState } from 'react'
import CalculatorGrid from './CalculatorGrid'

const SHAPES = ['Round','Oval','Cushion','Princess','Emerald','Pear','Radiant','Marquise']
const COLORS = [
  { value: 'colorless',    label: 'Colorless (D–F)' },
  { value: 'near',         label: 'Near Colorless (G–I)' },
  { value: 'faint',        label: 'Faint (J–K)' },
]
const CLARITIES = [
  { value: 'eye_clean',    label: 'Eye Clean (VS2+)' },
  { value: 'slightly',     label: 'Slightly Included (SI1)' },
  { value: 'visible',      label: 'Included (I1)' },
]

const SHAPE_MUL: Record<string,number> = { Round:1.0,Oval:0.92,Cushion:0.87,Princess:0.85,Emerald:0.80,Pear:0.83,Radiant:0.86,Marquise:0.76 }
const COLOR_DIAMOND: Record<string,number> = { colorless:1.0,near:0.84,faint:0.65 }
const CLARITY_DIAMOND: Record<string,number> = { eye_clean:1.0,slightly:0.77,visible:0.50 }
const COLOR_MOI: Record<string,number> = { colorless:1.0,near:0.92,faint:0.85 }
const CLARITY_MOI: Record<string,number> = { eye_clean:1.0,slightly:0.95,visible:0.90 }

const FAQ = [
  { q: 'Is moissanite a fake diamond?', a: 'No — moissanite (silicon carbide) is a distinct gemstone, not a fake diamond. It has different chemical composition, higher refractive index (more sparkle), and different optical properties. It\'s not a diamond simulant in the sense of being inferior — it\'s a different stone with its own merits.' },
  { q: 'How much cheaper is moissanite vs diamond?', a: 'Moissanite is typically 85–95% less expensive than natural diamonds of similar size. For a 1-carat round stone: a natural diamond averages $5,000–7,000; a high-quality moissanite runs $300–600. Lab diamonds fall in between at $1,000–2,500.' },
  { q: 'Can you tell the difference between moissanite and diamond?', a: 'In normal viewing conditions, most people cannot distinguish them. Gemologists use thermal conductivity testers — moissanite has slightly different thermal properties. Visually, moissanite shows more rainbow fire (birefringence) which some love and others find artificial.' },
  { q: 'Does moissanite hold its value?', a: 'Neither natural moissanite nor lab diamonds retain value the way investors hope. Moissanite resells for 20–40% of retail; natural diamonds for 30–50%. If value retention matters, natural diamonds still lead the market.' },
  { q: 'Which shape maximizes savings with moissanite?', a: 'All shapes save significantly, but round brilliant moissanite offers the greatest absolute dollar savings since round natural diamonds command the highest premium. For a 2ct round, you could save $12,000+ by choosing moissanite.' },
]

export default function MoissaniteDiamondComparisonCalculator() {
  const [shape, setShape] = useState('Round')
  const [carat, setCarat] = useState(1.0)
  const [color, setColor] = useState('near')
  const [clarity, setClarity] = useState('eye_clean')
  const [result, setResult] = useState<{ diamond:number; moi:number; savings:number } | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  function calculate() {
    const cf = Math.pow(carat, 1.9)
    const diamond = Math.round(5200 * cf * carat * SHAPE_MUL[shape] * COLOR_DIAMOND[color] * CLARITY_DIAMOND[clarity])
    const moi = Math.round(380 * Math.pow(carat, 1.4) * SHAPE_MUL[shape] * COLOR_MOI[color] * CLARITY_MOI[clarity])
    setResult({ diamond, moi, savings: diamond - moi })
  }

  const fmt = (n: number) => '$' + n.toLocaleString()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Shape</label>
            <select value={shape} onChange={e => { setShape(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {SHAPES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">
              Carat — <span className="text-accent font-semibold">{carat.toFixed(2)} ct</span>
            </label>
            <input type="range" min="0.25" max="4" step="0.05" value={carat}
              onChange={e => { setCarat(parseFloat(e.target.value)); setResult(null) }}
              className="w-full accent-accent h-2 rounded-full" />
            <div className="flex justify-between text-[10px] text-text-subtle mt-1"><span>0.25</span><span>4.00 ct</span></div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Color</label>
            <select value={color} onChange={e => { setColor(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Clarity</label>
            <select value={clarity} onChange={e => { setClarity(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {CLARITIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <button onClick={calculate}
          className="mt-6 w-full bg-dark text-white font-medium py-3.5 rounded-xl hover:bg-accent transition-colors text-sm tracking-wide">
          Compare Prices
        </button>
      </div>

      {result && (
        <div className="mt-6 animate-fade-in">
          {/* Savings banner */}
          <div className="bg-dark rounded-2xl p-5 text-center mb-4">
            <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">You Could Save</p>
            <p className="font-serif text-white text-4xl mb-1">{fmt(result.savings)}</p>
            <p className="text-white/50 text-xs">by choosing moissanite over a natural diamond</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Diamond */}
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <p className="text-[11px] uppercase tracking-widest text-text-subtle mb-2">Natural Diamond</p>
              <p className="font-serif text-dark text-2xl mb-3">{fmt(result.diamond)}</p>
              <a href="https://www.bluenile.com/diamond-search?a_aid=66fc3592af524&a_cid=55e51e63"
                target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="block text-xs font-medium text-accent hover:text-accent-dark transition-colors">
                Shop Blue Nile →
              </a>
              <a href="https://www.jamesallen.com/loose-diamonds/all-diamonds/?a_aid=66fc3592af524&a_cid=dfef9309"
                target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="block text-xs font-medium text-accent hover:text-accent-dark transition-colors mt-1">
                Shop James Allen →
              </a>
            </div>

            {/* Moissanite */}
            <div className="bg-accent-light border border-accent/30 rounded-2xl p-5 text-center">
              <p className="text-[11px] uppercase tracking-widest text-text-subtle mb-2">Moissanite</p>
              <p className="font-serif text-dark text-2xl mb-3">{fmt(result.moi)}</p>
              <a href="https://www.jamesallen.com/gemstones/moissanite/?a_aid=66fc3592af524&a_cid=dfef9309"
                target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="block text-xs font-medium text-accent hover:text-accent-dark transition-colors">
                Shop JA Moissanite →
              </a>
              <a href="https://amzn.to/4jvMlNv"
                target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="block text-xs font-medium text-accent hover:text-accent-dark transition-colors mt-1">
                Shop Amazon →
              </a>
            </div>
          </div>

          <p className="text-xs text-text-subtle text-center leading-relaxed">
            Diamond prices reflect average GIA-certified retail market prices. Moissanite prices reflect premium Charles & Colvard-equivalent quality. Actual prices vary by retailer.
          </p>
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-xl text-dark mb-4">Moissanite vs Diamond — Common Questions</h2>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open===i?null:i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-dark hover:bg-surface transition-colors">
                <span>{item.q}</span>
                <svg className={`w-4 h-4 text-text-muted shrink-0 ml-3 transition-transform ${open===i?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {open===i && <div className="px-5 pb-4 text-sm text-text-muted leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <CalculatorGrid current="/moissanite-vs-diamond-price-calculator/" />
    </div>
  )
}
