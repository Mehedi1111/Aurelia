'use client'

import { useState } from 'react'
import CalculatorGrid from './CalculatorGrid'

const ORIGINS  = [{ v:'cultured', l:'Cultured Pearl' },{ v:'natural', l:'Natural Pearl' }]
const TYPES    = [{ v:'freshwater', l:'Freshwater' },{ v:'akoya', l:'Akoya' },{ v:'south_sea', l:'South Sea' },{ v:'tahitian', l:'Tahitian' }]
const LUSTERS  = [{ v:'high', l:'High (mirror-like)' },{ v:'medium', l:'Medium' },{ v:'low', l:'Low (chalky)' }]
const PSHAPES  = [{ v:'round', l:'Round' },{ v:'near_round', l:'Near-Round' },{ v:'oval', l:'Oval' },{ v:'baroque', l:'Baroque' }]
const SURFACES = [{ v:'flawless', l:'Flawless / Clean' },{ v:'minor', l:'Minor Blemishes' },{ v:'moderate', l:'Moderate Blemishes' },{ v:'heavy', l:'Heavy Blemishes' }]

// Base price per mm diameter
const TYPE_BASE: Record<string,number> = { freshwater:8, akoya:35, south_sea:120, tahitian:80 }
const ORIGIN_MUL: Record<string,number> = { cultured:1.0, natural:8.0 }
const LUSTER_MUL: Record<string,number> = { high:1.4, medium:1.0, low:0.6 }
const SHAPE_MUL:  Record<string,number> = { round:1.4, near_round:1.1, oval:0.9, baroque:0.65 }
const SURFACE_MUL:Record<string,number> = { flawless:1.3, minor:1.0, moderate:0.75, heavy:0.50 }

const FAQ = [
  { q: 'What makes a pearl valuable?', a: 'The five key value factors are: (1) luster — the sharpness and depth of reflections; (2) surface quality — fewer blemishes = higher value; (3) shape — rounder is rarer and worth more; (4) size — larger pearls are exponentially rarer; (5) origin — natural pearls from wild oysters are 5–10x more valuable than cultured.' },
  { q: 'Are freshwater pearls worth buying?', a: 'Freshwater pearls offer exceptional value. A strand of high-quality freshwater pearls can cost $200–800 vs. $2,000–10,000+ for equivalent Akoya or South Sea. Modern freshwater pearls from China have dramatically improved luster and often rival saltwater pearls to the untrained eye.' },
  { q: 'What is the most valuable pearl type?', a: 'South Sea pearls (grown in Pinctada maxima oysters in Australia, Philippines, and Indonesia) are the most valuable cultured type. At 10–20mm and gold or white colors, a single strand can fetch $10,000–100,000. Natural pearls from the Persian Gulf are rarer still.' },
  { q: 'How can I tell if a pearl is real?', a: 'The tooth test: real pearls feel slightly gritty when rubbed against your teeth; fake pearls (glass or plastic) feel smooth. Real pearls are cool to the touch initially and warm quickly. Drilled holes in genuine pearls show thin nacre layers; imitations show a solid bead.' },
]

export default function PearlValueCalculator() {
  const [origin, setOrigin]   = useState('cultured')
  const [type, setType]       = useState('akoya')
  const [sizeMM, setSizeMM]   = useState(8)
  const [luster, setLuster]   = useState('high')
  const [shape, setShape]     = useState('round')
  const [surface, setSurface] = useState('minor')
  const [result, setResult]   = useState<number | null>(null)
  const [open, setOpen]       = useState<number | null>(null)

  function calculate() {
    const base = TYPE_BASE[type] * sizeMM * sizeMM
    const val = Math.round(base * ORIGIN_MUL[origin] * LUSTER_MUL[luster] * SHAPE_MUL[shape] * SURFACE_MUL[surface])
    setResult(val)
  }

  const fmt = (n: number) => '$' + n.toLocaleString()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Pearl Origin</label>
            <div className="grid grid-cols-2 gap-2">
              {ORIGINS.map(o => (
                <button key={o.v} onClick={() => { setOrigin(o.v); setResult(null) }}
                  className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${origin===o.v?'bg-dark text-white border-dark':'border-border text-text-muted hover:border-accent hover:text-accent'}`}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Pearl Type</label>
            <select value={type} onChange={e => { setType(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">
              Size — <span className="text-accent font-semibold">{sizeMM} mm</span>
            </label>
            <input type="range" min="4" max="20" step="0.5" value={sizeMM}
              onChange={e => { setSizeMM(parseFloat(e.target.value)); setResult(null) }}
              className="w-full accent-accent h-2 rounded-full" />
            <div className="flex justify-between text-[10px] text-text-subtle mt-1">
              <span>4 mm (small)</span><span>12 mm (large)</span><span>20 mm (rare)</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Luster</label>
            <select value={luster} onChange={e => { setLuster(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {LUSTERS.map(l => <option key={l.v} value={l.v}>{l.l}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Shape</label>
            <select value={shape} onChange={e => { setShape(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {PSHAPES.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2">Surface Quality</label>
            <select value={surface} onChange={e => { setSurface(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-bg focus:outline-none focus:border-accent">
              {SURFACES.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
            </select>
          </div>
        </div>

        <button onClick={calculate}
          className="mt-6 w-full bg-dark text-white font-medium py-3.5 rounded-xl hover:bg-accent transition-colors text-sm tracking-wide">
          Estimate Pearl Value
        </button>
      </div>

      {result !== null && (
        <div className="mt-6 bg-surface border border-border rounded-2xl p-6 sm:p-8 animate-fade-in">
          <p className="text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-4">Estimated Pearl Value</p>

          <div className="bg-dark rounded-xl p-6 text-center mb-5">
            <p className="text-white/60 text-[11px] uppercase tracking-widest mb-2">Single Pearl — Retail Value</p>
            <p className="font-serif text-white text-4xl">{fmt(result)}</p>
            <p className="text-white/40 text-xs mt-2">
              Range: {fmt(Math.round(result * 0.75))} — {fmt(Math.round(result * 1.40))}
            </p>
          </div>

          <p className="text-xs text-text-subtle mb-5 leading-relaxed">
            Estimates reflect single loose pearl retail values. Finished jewelry (strands, pendants, earrings) will be significantly higher due to setting, labor, and brand. Natural pearl values can vary enormously based on provenance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://www.jamesallen.com/fine-jewelry/pearl-jewelry/?a_aid=66fc3592af524&a_cid=dfef9309"
              target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="flex items-center justify-between bg-dark text-white text-sm font-medium px-5 py-3.5 rounded-xl hover:bg-accent transition-colors">
              <span>Shop Pearl Jewelry at JA</span>
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <a href="https://www.bluenile.com/jewelry/pearl-jewelry?a_aid=66fc3592af524&a_cid=55e51e63"
              target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="flex items-center justify-between border border-border text-dark text-sm font-medium px-5 py-3.5 rounded-xl hover:border-accent hover:text-accent transition-colors">
              <span>Shop Pearl Jewelry at Blue Nile</span>
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-xl text-dark mb-4">Pearl Value — Common Questions</h2>
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

      <CalculatorGrid current="/pearl-value-calculator/" />
    </div>
  )
}
