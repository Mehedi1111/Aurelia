'use client'

import { useState } from 'react'
import CalculatorGrid from './CalculatorGrid'

const SHAPES = ['Round','Princess','Emerald','Oval','Cushion','Pear','Marquise','Radiant','Asscher','Heart']
const COLORS = ['D','E','F','G','H','I','J','K','L','M']
const CLARITIES = ['FL','IF','VVS1','VVS2','VS1','VS2','SI1','SI2','I1','I2']
const CUTS = ['Excellent','Very Good','Good','Fair']

const SHAPE_MUL: Record<string,number> = { Round:1.0,Princess:0.85,Emerald:0.80,Oval:0.92,Cushion:0.87,Pear:0.83,Marquise:0.76,Radiant:0.86,Asscher:0.79,Heart:0.76 }
const COLOR_MUL: Record<string,number> = { D:1.0,E:0.96,F:0.92,G:0.87,H:0.81,I:0.73,J:0.65,K:0.55,L:0.47,M:0.40 }
const CLARITY_MUL: Record<string,number> = { FL:1.18,IF:1.12,VVS1:1.06,VVS2:1.0,VS1:0.94,VS2:0.87,SI1:0.77,SI2:0.67,I1:0.50,I2:0.36 }
const CUT_MUL: Record<string,number> = { Excellent:1.0,'Very Good':0.90,Good:0.76,Fair:0.60 }

const RESALE_FACTOR: Record<string,{ cash:number; trade:number }> = {
  natural:   { cash: 0.35, trade: 0.52 },
  lab:       { cash: 0.18, trade: 0.30 },
  moissanite:{ cash: 0.28, trade: 0.42 },
}
const BASE_PRICE: Record<string,number> = { natural:5200, lab:1600, moissanite:400 }

const FAQ = [
  { q: 'How much of my diamond\'s value will I recover when selling?', a: 'On average, natural diamonds resell for 25–50% of their retail purchase price. Lab-grown diamonds currently resell for 10–25% due to rapidly falling production costs. Moissanite typically fetches 20–40% of retail.' },
  { q: 'What\'s the difference between a cash offer and trade-in value?', a: 'A cash offer is what you\'d receive selling directly to a diamond buyer or pawn shop. A trade-in value is the credit you\'d receive at a jeweler toward a new purchase — typically 30–50% higher than cash.' },
  { q: 'Where can I get the best resale value?', a: 'For the best value: (1) Diamond upgrade programs at Blue Nile or James Allen give full credit toward a new purchase; (2) Online platforms like I Do Now I Don\'t or Worthy often beat pawn shops by 2–3x.' },
  { q: 'Does certification affect resale value?', a: 'Yes significantly. GIA-certified diamonds command 15–25% higher resale prices than uncertified stones because buyers trust the independent grading. Always buy certified if you might resell.' },
]

export default function DiamondResaleCalculator() {
  const [type, setType] = useState('natural')
  const [shape, setShape] = useState('Round')
  const [carat, setCarat] = useState(1.0)
  const [color, setColor] = useState('G')
  const [clarity, setClarity] = useState('VS2')
  const [cut, setCut] = useState('Excellent')
  const [result, setResult] = useState<{ retail:number; cash:number; trade:number } | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  function calculate() {
    const base = BASE_PRICE[type]
    const cf = Math.pow(carat, 1.9)
    const retail = Math.round(base * cf * carat * SHAPE_MUL[shape] * COLOR_MUL[color] * CLARITY_MUL[clarity] * (type === 'moissanite' ? 1 : CUT_MUL[cut]))
    const f = RESALE_FACTOR[type]
    setResult({ retail, cash: Math.round(retail * f.cash), trade: Math.round(retail * f.trade) })
  }

  const fmt = (n: number) => '$' + n.toLocaleString()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Stone Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[['natural','Natural Diamond'],['lab','Lab-Grown'],['moissanite','Moissanite']].map(([val,lbl]) => (
                <button key={val} onClick={() => { setType(val); setResult(null) }}
                  className={`py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-all ${type===val?'bg-dark text-white border-dark':'border-border text-text-muted hover:border-accent hover:text-accent'}`}>
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
              {COLORS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Clarity Grade</label>
            <select value={clarity} onChange={e => { setClarity(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {CLARITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {type !== 'moissanite' && (
            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Cut Grade</label>
              <select value={cut} onChange={e => { setCut(e.target.value); setResult(null) }}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
                {CUTS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}
        </div>

        <button onClick={calculate}
          className="mt-6 w-full bg-dark text-white font-medium py-3.5 rounded-xl hover:bg-accent transition-colors text-sm tracking-wide">
          Calculate Resale Value
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-surface border border-border rounded-2xl p-6 sm:p-8 animate-fade-in">
          <p className="text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-4">Resale Value Breakdown</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1">Est. Retail Value</p>
              <p className="font-serif text-dark text-xl">{fmt(result.retail)}</p>
            </div>
            <div className="bg-dark rounded-xl p-4 text-center">
              <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">Cash Offer</p>
              <p className="font-serif text-white text-xl">{fmt(result.cash)}</p>
            </div>
            <div className="bg-card border border-accent/30 rounded-xl p-4 text-center">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1">Trade-In Credit</p>
              <p className="font-serif text-accent text-xl">{fmt(result.trade)}</p>
            </div>
          </div>

          <div className="bg-accent-light border border-accent/20 rounded-xl p-4 mb-5 text-sm text-dark">
            <strong>Best option:</strong> Use a retailer upgrade program to get{' '}
            <strong>{fmt(result.trade)}</strong> in credit — {Math.round((result.trade/result.cash-1)*100)}% more than a cash sale.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://www.bluenile.com/services/diamond-upgrade-program?a_aid=66fc3592af524&a_cid=55e51e63&chan=calculator"
              target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="flex items-center justify-between bg-dark text-white text-sm font-medium px-5 py-3.5 rounded-xl hover:bg-accent transition-colors">
              <span>Blue Nile Upgrade Program</span>
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <a href="https://www.jamesallen.com/guarantee/lifetime-upgrade/?a_aid=66fc3592af524&a_cid=dfef9309&chan=calculator"
              target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="flex items-center justify-between border border-border text-dark text-sm font-medium px-5 py-3.5 rounded-xl hover:border-accent hover:text-accent transition-colors">
              <span>James Allen Upgrade Program</span>
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

      <CalculatorGrid current="/diamond-resale-price-calculator/" />
    </div>
  )
}
