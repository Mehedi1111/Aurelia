'use client'

import { useState } from 'react'
import CalculatorGrid from './CalculatorGrid'

const SHAPES = ['Round','Oval','Cushion','Princess','Emerald','Pear','Radiant','Marquise','Heart','Asscher']

// Tiered pricing tables per retailer (shape multiplier applied to round price)
// Prices per carat by carat bracket
function ccPrice(carat: number): number {
  if (carat <= 0.5)  return 220 * carat
  if (carat <= 1.0)  return 350 * carat
  if (carat <= 1.5)  return 480 * carat
  if (carat <= 2.0)  return 600 * carat
  if (carat <= 3.0)  return 750 * carat
  return 900 * carat
}

function jaPrice(carat: number): number {
  if (carat <= 0.5)  return 280 * carat
  if (carat <= 1.0)  return 420 * carat
  if (carat <= 1.5)  return 560 * carat
  if (carat <= 2.0)  return 700 * carat
  if (carat <= 3.0)  return 880 * carat
  return 1050 * carat
}

function amazonPrice(carat: number): number {
  if (carat <= 0.5)  return 160 * carat
  if (carat <= 1.0)  return 260 * carat
  if (carat <= 1.5)  return 370 * carat
  if (carat <= 2.0)  return 490 * carat
  if (carat <= 3.0)  return 640 * carat
  return 800 * carat
}

const SHAPE_MUL: Record<string,number> = { Round:1.0,Oval:0.93,Cushion:0.89,Princess:0.87,Emerald:0.83,Pear:0.85,Radiant:0.88,Marquise:0.80,Heart:0.82,Asscher:0.84 }

const FAQ = [
  { q: 'What is moissanite?', a: 'Moissanite is a gemstone composed of silicon carbide (SiC), first discovered in a meteorite crater by Henri Moissan in 1893. Natural moissanite is exceptionally rare; virtually all moissanite jewelry uses lab-created stones. It has a higher refractive index than diamond (2.65 vs 2.42), producing intense brilliance and fire.' },
  { q: 'Which moissanite brand is best?', a: 'Charles & Colvard (Forever One) is the original and most recognized brand, known for strict quality standards. James Allen sources high-quality moissanite from multiple suppliers. Amazon offers the widest price range — from budget options to premium brands — but quality varies significantly.' },
  { q: 'Does moissanite get cloudy over time?', a: 'Genuine moissanite does not get cloudy. It is extremely durable (9.25 on the Mohs scale vs 10 for diamond) and resistant to scratching and fogging. Any cloudiness in moissanite jewelry is typically from accumulated dirt, soap, or lotions — clean with warm soapy water.' },
  { q: 'What is the best carat size for moissanite?', a: 'The most popular sizes are 1.0–2.0 carats for solitaires. Because moissanite is significantly less expensive, many buyers opt for larger stones they couldn\'t afford in diamond. A 2.0 carat moissanite delivers incredible visual impact at a fraction of the cost of a comparable diamond.' },
]

export default function MoissanitePriceCalculator() {
  const [shape, setShape] = useState('Round')
  const [carat, setCarat] = useState(1.0)
  const [result, setResult] = useState<{ cc:number; ja:number; amz:number } | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  function calculate() {
    const m = SHAPE_MUL[shape] ?? 1.0
    setResult({
      cc:  Math.round(ccPrice(carat)     * m),
      ja:  Math.round(jaPrice(carat)     * m),
      amz: Math.round(amazonPrice(carat) * m),
    })
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
              Carat Weight — <span className="text-accent font-semibold">{carat.toFixed(2)} ct</span>
            </label>
            <input type="range" min="0.25" max="5" step="0.05" value={carat}
              onChange={e => { setCarat(parseFloat(e.target.value)); setResult(null) }}
              className="w-full accent-accent h-2 rounded-full" />
            <div className="flex justify-between text-[10px] text-text-subtle mt-1"><span>0.25</span><span>5.00 ct</span></div>
          </div>
        </div>

        <button onClick={calculate}
          className="mt-6 w-full bg-dark text-white font-medium py-3.5 rounded-xl hover:bg-accent transition-colors text-sm tracking-wide">
          Compare Prices
        </button>
      </div>

      {result && (
        <div className="mt-6 animate-fade-in">
          <p className="text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-4 text-center">
            Price Comparison — {carat.toFixed(2)} ct {shape} Moissanite
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            {/* Charles & Colvard */}
            <div className="bg-dark rounded-2xl p-5 text-center">
              <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">Charles &amp; Colvard</p>
              <p className="text-[10px] text-accent mb-2">Forever One™</p>
              <p className="font-serif text-white text-2xl mb-3">{fmt(result.cc)}</p>
              <a href="https://charlesandcolvard.sjv.io/bO6nRm"
                target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="block text-xs font-medium bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors">
                Shop Now →
              </a>
            </div>

            {/* James Allen */}
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1">James Allen</p>
              <p className="text-[10px] text-accent mb-2">360° HD View</p>
              <p className="font-serif text-dark text-2xl mb-3">{fmt(result.ja)}</p>
              <a href="https://www.jamesallen.com/gemstones/moissanite/?a_aid=66fc3592af524&a_cid=dfef9309"
                target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="block text-xs font-medium bg-dark hover:bg-accent text-white px-3 py-2 rounded-lg transition-colors">
                Shop Now →
              </a>
            </div>

            {/* Amazon */}
            <div className="bg-surface border border-border rounded-2xl p-5 text-center">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1">Amazon</p>
              <p className="text-[10px] text-accent mb-2">Best Budget Value</p>
              <p className="font-serif text-dark text-2xl mb-3">{fmt(result.amz)}</p>
              <a href="https://amzn.to/3RidRlu"
                target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="block text-xs font-medium bg-dark hover:bg-accent text-white px-3 py-2 rounded-lg transition-colors">
                Shop Now →
              </a>
            </div>
          </div>

          <p className="text-xs text-text-subtle text-center leading-relaxed">
            Prices are estimates based on typical market rates. Actual prices vary by specific stone quality, color grade (DEF vs GHI), and current promotions. Charles & Colvard prices reflect Forever One DEF colorless grade.
          </p>
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-xl text-dark mb-4">Moissanite Price — Common Questions</h2>
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

      <CalculatorGrid current="/moissanite-price-calculator/" />
    </div>
  )
}
