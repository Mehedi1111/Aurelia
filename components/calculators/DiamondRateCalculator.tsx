'use client'

import { useState } from 'react'
import CalculatorGrid from './CalculatorGrid'

const SHAPES = ['Round','Princess','Emerald','Oval','Cushion','Pear','Marquise','Radiant','Asscher','Heart']
const COLORS = ['D','E','F','G','H','I','J','K','L','M']
const CLARITIES = ['FL','IF','VVS1','VVS2','VS1','VS2','SI1','SI2','I1','I2']

const SHAPE_MUL: Record<string,number> = { Round:1.0,Princess:0.85,Emerald:0.80,Oval:0.92,Cushion:0.87,Pear:0.83,Marquise:0.76,Radiant:0.86,Asscher:0.79,Heart:0.76 }
const COLOR_MUL: Record<string,number> = { D:1.0,E:0.96,F:0.92,G:0.87,H:0.81,I:0.73,J:0.65,K:0.55,L:0.47,M:0.40 }
const CLARITY_MUL: Record<string,number> = { FL:1.18,IF:1.12,VVS1:1.06,VVS2:1.0,VS1:0.94,VS2:0.87,SI1:0.77,SI2:0.67,I1:0.50,I2:0.36 }

const TREND_DATA: Record<string, number> = { natural: 3.2, lab: -5.8 }

const FAQ = [
  { q: 'What is a "fair price" for a diamond?', a: 'A fair price is the expected market price for a diamond with specific characteristics. It considers the 4Cs and current supply and demand — not what you might find at a mall jeweler (typically 30–50% above market).' },
  { q: 'Why do lab-grown diamonds cost less?', a: 'Lab-grown diamonds are created in weeks using CVD or HPHT technology vs. millions of years in the earth. They have identical physical properties but are more abundant, driving prices 70–80% below natural diamonds.' },
  { q: 'How does diamond shape affect price?', a: 'Round brilliant diamonds command a premium due to cutting waste (nearly 50% of the rough is lost). Fancy shapes like oval, emerald, and cushion are 15–25% less expensive on average.' },
  { q: 'Should I buy online or in-store?', a: 'Online retailers like Blue Nile and James Allen typically offer 20–40% lower prices than brick-and-mortar stores because of lower overhead, while offering GIA-certified diamonds with high-resolution imaging.' },
]

export default function DiamondRateCalculator() {
  const [origin, setOrigin] = useState('natural')
  const [shape, setShape] = useState('Round')
  const [carat, setCarat] = useState(1.0)
  const [color, setColor] = useState('G')
  const [clarity, setClarity] = useState('VS2')
  const [result, setResult] = useState<{ fair:number; low:number; high:number; perCarat:number; trend:number } | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  function calculate() {
    const base = origin === 'natural' ? 5200 : 1600
    const caratFactor = Math.pow(carat, 1.9)
    const perCarat = Math.round(base * caratFactor * SHAPE_MUL[shape] * COLOR_MUL[color] * CLARITY_MUL[clarity])
    const fair = Math.round(perCarat * carat)
    setResult({ fair, low: Math.round(fair * 0.88), high: Math.round(fair * 1.14), perCarat, trend: TREND_DATA[origin] })
  }

  const fmt = (n: number) => '$' + n.toLocaleString()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Diamond Origin</label>
            <div className="grid grid-cols-2 gap-2">
              {[['natural','Natural Diamond'],['lab','Lab-Grown Diamond']].map(([val,lbl]) => (
                <button key={val} onClick={() => { setOrigin(val); setResult(null) }}
                  className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${origin===val?'bg-dark text-white border-dark':'border-border text-text-muted hover:border-accent hover:text-accent'}`}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>

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
            <input type="range" min="0.25" max="5" step="0.05" value={carat}
              onChange={e => { setCarat(parseFloat(e.target.value)); setResult(null) }}
              className="w-full accent-accent h-2 rounded-full" />
            <div className="flex justify-between text-[10px] text-text-subtle mt-1"><span>0.25</span><span>5.00 ct</span></div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Color Grade</label>
            <select value={color} onChange={e => { setColor(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {COLORS.map(c => <option key={c} value={c}>{c} {c<='F'?'(Colorless)':c<='J'?'(Near Colorless)':'(Faint)'}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Clarity Grade</label>
            <select value={clarity} onChange={e => { setClarity(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {CLARITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button onClick={calculate}
          className="mt-6 w-full bg-dark text-white font-medium py-3.5 rounded-xl hover:bg-accent transition-colors text-sm tracking-wide">
          Get Fair Price Estimate
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-surface border border-border rounded-2xl p-6 sm:p-8 animate-fade-in">
          <p className="text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-4">Market Price Analysis</p>

          <div className="bg-dark rounded-xl p-5 text-center mb-4">
            <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">Fair Market Price</p>
            <p className="font-serif text-white text-3xl mb-1">{fmt(result.fair)}</p>
            <p className="text-white/50 text-xs">Range: {fmt(result.low)} — {fmt(result.high)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1">Per Carat</p>
              <p className="font-serif text-dark text-xl">{fmt(result.perCarat)}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1">30-Day Trend</p>
              <p className={`font-serif text-xl ${result.trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {result.trend >= 0 ? '▲' : '▼'} {Math.abs(result.trend)}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://www.bluenile.com/diamond-search?a_aid=66fc3592af524&a_cid=55e51e63"
              target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="flex items-center justify-between bg-dark text-white text-sm font-medium px-5 py-3.5 rounded-xl hover:bg-accent transition-colors">
              <span>Shop Blue Nile</span>
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <a href="https://www.jamesallen.com/loose-diamonds/all-diamonds/?a_aid=66fc3592af524&a_cid=dfef9309"
              target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="flex items-center justify-between border border-border text-dark text-sm font-medium px-5 py-3.5 rounded-xl hover:border-accent hover:text-accent transition-colors">
              <span>Shop James Allen</span>
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-xl text-dark mb-4">Frequently Asked Questions</h2>
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

      <CalculatorGrid current="/diamond-rate-calculator/" />
    </div>
  )
}
