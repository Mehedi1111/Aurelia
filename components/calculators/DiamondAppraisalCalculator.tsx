'use client'

import { useState } from 'react'
import CalculatorGrid from './CalculatorGrid'

const SHAPES = ['Round','Princess','Emerald','Oval','Cushion','Pear','Marquise','Radiant','Asscher','Heart']
const COLORS = ['D','E','F','G','H','I','J','K','L','M']
const CLARITIES = ['FL','IF','VVS1','VVS2','VS1','VS2','SI1','SI2','I1','I2']
const CUTS = ['Excellent','Very Good','Good','Fair']
const CONDITIONS = ['Excellent','Very Good','Good','Fair']

const SHAPE_MUL: Record<string,number> = { Round:1.0,Princess:0.85,Emerald:0.80,Oval:0.92,Cushion:0.87,Pear:0.83,Marquise:0.76,Radiant:0.86,Asscher:0.79,Heart:0.76 }
const COLOR_MUL: Record<string,number> = { D:1.0,E:0.96,F:0.92,G:0.87,H:0.81,I:0.73,J:0.65,K:0.55,L:0.47,M:0.40 }
const CLARITY_MUL: Record<string,number> = { FL:1.18,IF:1.12,VVS1:1.06,VVS2:1.0,VS1:0.94,VS2:0.87,SI1:0.77,SI2:0.67,I1:0.50,I2:0.36 }
const CUT_MUL: Record<string,number> = { Excellent:1.0,'Very Good':0.90,Good:0.76,Fair:0.60 }
const COND_MUL: Record<string,number> = { Excellent:1.0,'Very Good':0.93,Good:0.79,Fair:0.62 }

function basePerCarat(origin: string, carat: number): number {
  const base = origin === 'natural' ? 5200 : 1600
  const caratFactor = Math.pow(carat, 1.9)
  return base * caratFactor
}

interface State {
  origin: string; shape: string; carat: number; color: string
  clarity: string; cut: string; condition: string
}

const FAQ = [
  { q: 'What is a diamond appraisal?', a: 'A diamond appraisal is a professional assessment of a diamond\'s value based on the 4Cs (cut, color, clarity, carat) and current market conditions. It differs from the purchase price — appraisals are typically higher and used for insurance purposes.' },
  { q: 'Why is appraisal value higher than purchase price?', a: 'Appraisal values are set at retail replacement cost, which is typically 20–50% higher than what you paid. This ensures your insurance policy covers the full cost of replacing the item.' },
  { q: 'How accurate is this calculator?', a: 'This calculator provides an estimate based on average market data. Actual appraisal values can vary based on local market conditions, the appraiser, and specific diamond characteristics not captured here.' },
  { q: 'Should I get a certified appraisal?', a: 'Yes — for insurance or resale, always get an appraisal from a GIA-certified gemologist. This calculator is a starting estimate only.' },
]

export default function DiamondAppraisalCalculator() {
  const [state, setState] = useState<State>({ origin:'natural',shape:'Round',carat:1.0,color:'G',clarity:'VS2',cut:'Excellent',condition:'Excellent' })
  const [result, setResult] = useState<{ value:number; insurance:number; resale:number } | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  function set(k: keyof State, v: string | number) {
    setState(s => ({ ...s, [k]: v }))
    setResult(null)
  }

  function calculate() {
    const bpc = basePerCarat(state.origin, state.carat)
    const value = Math.round(bpc * state.carat * SHAPE_MUL[state.shape] * COLOR_MUL[state.color] * CLARITY_MUL[state.clarity] * CUT_MUL[state.cut] * COND_MUL[state.condition])
    setResult({ value, insurance: Math.round(value * 1.52), resale: Math.round(value * 0.42) })
  }

  const fmt = (n: number) => '$' + n.toLocaleString()

  return (
    <div className="max-w-3xl mx-auto">
      {/* Calculator card */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Origin */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Diamond Origin</label>
            <div className="grid grid-cols-2 gap-2">
              {['natural','lab'].map(o => (
                <button key={o} onClick={() => set('origin', o)}
                  className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${state.origin===o ? 'bg-dark text-white border-dark' : 'border-border text-text-muted hover:border-accent hover:text-accent'}`}>
                  {o === 'natural' ? 'Natural Diamond' : 'Lab-Grown Diamond'}
                </button>
              ))}
            </div>
          </div>

          {/* Shape */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Shape</label>
            <select value={state.shape} onChange={e => set('shape', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {SHAPES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Carat */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">
              Carat Weight — <span className="text-accent font-semibold">{state.carat.toFixed(2)} ct</span>
            </label>
            <input type="range" min="0.25" max="5" step="0.05" value={state.carat}
              onChange={e => set('carat', parseFloat(e.target.value))}
              className="w-full accent-accent h-2 rounded-full" />
            <div className="flex justify-between text-[10px] text-text-subtle mt-1"><span>0.25 ct</span><span>5.00 ct</span></div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Color Grade</label>
            <select value={state.color} onChange={e => set('color', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {COLORS.map(c => <option key={c} value={c}>{c} {c<='F'?'(Colorless)':c<='J'?'(Near Colorless)':'(Faint)'}</option>)}
            </select>
          </div>

          {/* Clarity */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Clarity Grade</label>
            <select value={state.clarity} onChange={e => set('clarity', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {CLARITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Cut */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Cut Grade</label>
            <select value={state.cut} onChange={e => set('cut', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {CUTS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Condition</label>
            <select value={state.condition} onChange={e => set('condition', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {CONDITIONS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

        </div>

        <button onClick={calculate}
          className="mt-6 w-full bg-dark text-white font-medium py-3.5 rounded-xl hover:bg-accent transition-colors text-sm tracking-wide">
          Calculate Appraisal Value
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 bg-surface border border-border rounded-2xl p-6 sm:p-8 animate-fade-in">
          <p className="text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-4">Your Estimated Appraisal</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-dark rounded-xl p-5 text-center">
              <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1.5">Market Value</p>
              <p className="font-serif text-white text-2xl">{fmt(result.value)}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1.5">Insurance Value</p>
              <p className="font-serif text-dark text-2xl">{fmt(result.insurance)}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1.5">Resale Estimate</p>
              <p className="font-serif text-accent text-2xl">{fmt(result.resale)}</p>
            </div>
          </div>
          <p className="text-xs text-text-subtle mb-5 leading-relaxed">
            Estimates are based on average market data. For an official appraisal, consult a GIA-certified gemologist. Insurance value reflects typical retail replacement cost.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://www.bluenile.com/diamond-search?a_aid=66fc3592af524&a_cid=55e51e63"
              target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="flex items-center justify-between gap-2 bg-dark text-white text-sm font-medium px-5 py-3.5 rounded-xl hover:bg-accent transition-colors">
              <span>Shop Blue Nile</span>
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <a href="https://www.jamesallen.com/loose-diamonds/all-diamonds/?a_aid=66fc3592af524&a_cid=dfef9309"
              target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="flex items-center justify-between gap-2 border border-border text-dark text-sm font-medium px-5 py-3.5 rounded-xl hover:border-accent hover:text-accent transition-colors">
              <span>Shop James Allen</span>
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      )}

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="font-serif text-xl text-dark mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-dark hover:bg-surface transition-colors">
                <span>{item.q}</span>
                <svg className={`w-4 h-4 text-text-muted shrink-0 ml-3 transition-transform ${open===i?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {open === i && <div className="px-5 pb-4 text-sm text-text-muted leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <CalculatorGrid current="/diamond-appraisal-calculator/" />
    </div>
  )
}
