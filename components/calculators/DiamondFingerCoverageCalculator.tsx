'use client'

import { useState } from 'react'
import CalculatorGrid from './CalculatorGrid'

const SHAPES = ['Round','Oval','Emerald','Cushion','Princess','Pear','Marquise','Radiant','Asscher','Heart']
const RING_SIZES = ['4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9']

// Face-up diameter in mm per shape per carat (approximate)
function faceUpMM(shape: string, carat: number): number {
  const base = Math.pow(carat, 0.5) * 6.5
  const mul: Record<string,number> = { Round:1.0,Oval:1.3,Emerald:1.05,Cushion:0.98,Princess:0.95,Pear:1.2,Marquise:1.6,Radiant:1.0,Asscher:0.97,Heart:1.1 }
  return base * (mul[shape] ?? 1.0)
}

// Finger width at ring position in mm
function fingerWidthMM(ringSize: number): number {
  return 13 + (ringSize - 4) * 0.8
}

const JEWELER_URLS: Record<string,string> = {
  'blue_nile': 'https://www.bluenile.com/diamond-search?a_aid=66fc3592af524&a_cid=55e51e63',
  'james_allen': 'https://www.jamesallen.com/loose-diamonds/all-diamonds/?a_aid=66fc3592af524&a_cid=dfef9309',
}
const JEWELER_LABELS: Record<string,string> = {
  'blue_nile': 'Blue Nile',
  'james_allen': 'James Allen',
}

const FAQ = [
  { q: 'What is finger coverage percentage?', a: 'Finger coverage is how much of your visible finger width is covered by the center stone or ring design when viewed from above. Higher coverage = more visual presence. A 60–70% coverage is considered ideal — dramatic without looking oversized.' },
  { q: 'Which diamond shape gives the most finger coverage?', a: 'Marquise and pear shapes provide the most finger coverage for a given carat weight, because their elongated designs span more finger width. Oval is close behind and is currently the most popular elongated shape.' },
  { q: 'Does a bigger ring size mean a stone covers less?', a: 'Yes. On a larger finger, the same stone covers a smaller percentage of the finger width. This is why many people with larger ring sizes opt for slightly larger diamonds or elongated shapes to achieve the same visual impact.' },
  { q: 'What coverage percentage should I aim for?', a: 'Coverage of 50–65% is considered the sweet spot — the stone looks substantial but proportional. Under 40% can appear delicate; over 75% can look oversized. Elongated shapes at 50% cover more visually due to their length.' },
]

export default function DiamondFingerCoverageCalculator() {
  const [shape, setShape] = useState('Round')
  const [carat, setCarat] = useState(1.0)
  const [ringSize, setRingSize] = useState('6')
  const [jeweler, setJeweler] = useState('blue_nile')
  const [result, setResult] = useState<{ coverage: number; faceMM: number; fingerMM: number } | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  function calculate() {
    const size = parseFloat(ringSize)
    const faceMM = faceUpMM(shape, carat)
    const fingerMM = fingerWidthMM(size)
    const coverage = Math.min(100, Math.round((faceMM / fingerMM) * 100))
    setResult({ coverage, faceMM: Math.round(faceMM * 10) / 10, fingerMM: Math.round(fingerMM * 10) / 10 })
  }

  const coverageColor = (c: number) =>
    c < 40 ? 'text-blue-500' : c < 65 ? 'text-green-600' : c < 80 ? 'text-amber-500' : 'text-red-500'

  const coverageLabel = (c: number) =>
    c < 40 ? 'Delicate' : c < 55 ? 'Balanced' : c < 70 ? 'Substantial' : 'Bold Statement'

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Diamond Shape</label>
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

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Ring Size (US)</label>
            <select value={ringSize} onChange={e => { setRingSize(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {RING_SIZES.map(s => <option key={s}>Size {s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Preferred Jeweler</label>
            <select value={jeweler} onChange={e => setJeweler(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              <option value="blue_nile">Blue Nile</option>
              <option value="james_allen">James Allen</option>
            </select>
          </div>
        </div>

        <button onClick={calculate}
          className="mt-6 w-full bg-dark text-white font-medium py-3.5 rounded-xl hover:bg-accent transition-colors text-sm tracking-wide">
          Calculate Finger Coverage
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-surface border border-border rounded-2xl p-6 sm:p-8 animate-fade-in">
          <p className="text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-4">Coverage Analysis</p>

          <div className="flex flex-col items-center mb-6">
            <p className={`font-serif text-6xl font-normal mb-1 ${coverageColor(result.coverage)}`}>{result.coverage}%</p>
            <p className="text-sm font-medium text-dark mb-1">{coverageLabel(result.coverage)}</p>
            <p className="text-xs text-text-subtle">Finger Coverage</p>

            {/* Bar */}
            <div className="w-full mt-5 bg-border rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, result.coverage)}%`, backgroundColor: result.coverage < 40 ? '#3b82f6' : result.coverage < 65 ? '#16a34a' : result.coverage < 80 ? '#f59e0b' : '#ef4444' }}
              />
            </div>
            <div className="flex justify-between w-full text-[10px] text-text-subtle mt-1">
              <span>Delicate</span><span>Balanced</span><span>Bold</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5 text-center">
            <div className="bg-card border border-border rounded-xl p-3">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1">Stone Face-Up</p>
              <p className="font-serif text-dark text-lg">{result.faceMM} mm</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3">
              <p className="text-text-subtle text-[11px] uppercase tracking-widest mb-1">Finger Width</p>
              <p className="font-serif text-dark text-lg">{result.fingerMM} mm</p>
            </div>
          </div>

          <a href={JEWELER_URLS[jeweler]}
            target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="flex items-center justify-between bg-dark text-white text-sm font-medium px-5 py-3.5 rounded-xl hover:bg-accent transition-colors w-full">
            <span>Shop {shape} Diamonds at {JEWELER_LABELS[jeweler]}</span>
            <svg className="w-4 h-4 opacity-70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
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

      <CalculatorGrid current="/diamond-finger-coverage-calculator/" />
    </div>
  )
}
