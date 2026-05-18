'use client'

import { useState } from 'react'
import Image from 'next/image'

type Choice = 'lab' | 'natural' | null

interface DiamondOption {
  id: 'A' | 'B'
  src: string
  alt: string
  href: string
  isLab: boolean
}

const DIAMONDS: DiamondOption[] = [
  {
    id: 'A',
    src: 'https://moissanitebyaurelia.com/wp-content/uploads/2026/05/1.51-ct-d-color-vvs1-clarity-excellent-cut-lab-diamond.png',
    alt: 'Diamond A — 1.51ct D VVS1 Ideal Cut',
    href: 'https://www.bluenile.com/diamond-details/26648713?a_aid=66fc3592af524&a_cid=55e51e63&chan=quiz',
    isLab: true,
  },
  {
    id: 'B',
    src: 'https://moissanitebyaurelia.com/wp-content/uploads/2026/05/1.51-ct-d-color-vvs1-clarity-excellent-cut-natural-diamond.png',
    alt: 'Diamond B — 1.51ct D VVS1 Ideal Cut',
    href: 'https://www.bluenile.com/diamond-details/28847414?a_aid=66fc3592af524&a_cid=55e51e63&chan=quiz',
    isLab: false,
  },
]

export default function DiamondIQQuiz() {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (id: 'A' | 'B') => {
    if (revealed) return
    setSelected(id)
  }

  const handleReveal = () => {
    if (!selected) return
    setRevealed(true)
  }

  const handleReset = () => {
    setSelected(null)
    setRevealed(false)
  }

  const selectedDiamond = DIAMONDS.find(d => d.id === selected)
  const wasCorrect = selectedDiamond?.isLab === false // "correct" = picked the natural

  return (
    <div className="rounded-2xl overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-[#111111] px-6 py-7 text-center">
        <p className="text-[#d19b8a] text-[11px] uppercase tracking-widest font-medium mb-3">Diamond IQ Test</p>
        <h3 className="font-serif text-white text-xl sm:text-2xl leading-snug mb-3">
          Natural or Lab-Grown?
        </h3>
        <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
          Both are <strong className="text-white/90">GIA Certified · 1.51ct · D Color · VVS1 · Ideal Cut.</strong> One is natural, one is lab-grown. Can you tell them apart?
        </p>
      </div>

      {/* Diamonds */}
      <div className="bg-[#0a0a0a] px-4 sm:px-10 py-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-10 max-w-lg mx-auto">
          {DIAMONDS.map(diamond => {
            const isSelected = selected === diamond.id
            const isRevealedCorrect = revealed && !diamond.isLab
            const isRevealedLab = revealed && diamond.isLab
            const isPicked = revealed && selected === diamond.id

            return (
              <div key={diamond.id} className="flex flex-col items-center gap-3">
                <button
                  onClick={() => handleSelect(diamond.id)}
                  disabled={revealed}
                  className={`relative w-full aspect-square rounded-full overflow-hidden border-4 transition-all duration-300 ${
                    revealed
                      ? diamond.isLab
                        ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                        : 'border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                      : isSelected
                        ? 'border-[#d19b8a] shadow-[0_0_20px_rgba(209,155,138,0.5)] scale-105'
                        : 'border-white/10 hover:border-[#d19b8a]/60 hover:scale-[1.02]'
                  } ${!revealed ? 'cursor-pointer' : 'cursor-default'}`}
                  aria-label={`Select Diamond ${diamond.id}`}
                >
                  <Image
                    src={diamond.src}
                    alt={diamond.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, 200px"
                    unoptimized
                  />

                  {/* Overlay when revealed */}
                  {revealed && (
                    <div className={`absolute inset-0 flex items-end justify-center pb-3 ${
                      diamond.isLab ? 'bg-cyan-900/40' : 'bg-yellow-900/30'
                    }`}>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        diamond.isLab
                          ? 'bg-cyan-400 text-black'
                          : 'bg-yellow-400 text-black'
                      }`}>
                        {diamond.isLab ? '🔬 Lab-Grown' : '⛏️ Natural'}
                      </span>
                    </div>
                  )}
                </button>

                {/* Label */}
                <div className="text-center">
                  <p className="text-white/70 text-xs font-medium mb-0.5">Diamond {diamond.id}</p>
                  {!revealed ? (
                    <p className="text-white/30 text-[11px]">1.51ct · D · VVS1</p>
                  ) : (
                    <p className={`text-sm font-bold ${diamond.isLab ? 'text-cyan-400' : 'text-yellow-400'}`}>
                      {diamond.isLab ? '$1,970' : '$16,240'}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Description */}
        {!revealed && (
          <p className="text-white/40 text-xs text-center mt-6 leading-relaxed max-w-sm mx-auto">
            Tap the diamond you think is <span className="text-yellow-400/80">natural</span>.
            The other is <span className="text-cyan-400/80">lab-grown</span>.
          </p>
        )}

        {/* CTA area */}
        <div className="mt-7 flex flex-col items-center gap-3">
          {!revealed ? (
            <button
              onClick={handleReveal}
              disabled={!selected}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                selected
                  ? 'bg-[#d19b8a] text-white hover:bg-[#b8826f] shadow-[0_4px_20px_rgba(209,155,138,0.4)]'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {selected ? 'Reveal Answer →' : 'Select a Diamond First'}
            </button>
          ) : (
            <div className="text-center space-y-5 w-full max-w-sm">
              {/* Result */}
              <div className="bg-white/5 rounded-xl px-5 py-4">
                <p className={`font-serif text-lg mb-1 ${wasCorrect ? 'text-yellow-400' : 'text-cyan-400'}`}>
                  {wasCorrect ? '⛏️ You chose Natural!' : '🔬 You chose Lab-Grown!'}
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Identical in every way — D color, VVS1 clarity, ideal cut. Yet one costs{' '}
                  <span className="text-yellow-400 font-semibold">$16,240</span> and the other{' '}
                  <span className="text-cyan-400 font-semibold">$1,970</span>. The only difference is origin.
                </p>
              </div>

              {/* Shop CTAs */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.bluenile.com/diamond-details/26648713?a_aid=66fc3592af524&a_cid=55e51e63&chan=quiz"
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="flex flex-col items-center border border-cyan-400/40 hover:bg-cyan-400/10 text-white rounded-xl px-3 py-3 transition-colors text-center"
                >
                  <span className="text-cyan-400 text-[11px] font-semibold uppercase tracking-wider mb-1">Lab-Grown</span>
                  <span className="text-white text-sm font-bold">$1,970</span>
                  <span className="text-white/40 text-[10px] mt-1">Shop at Blue Nile →</span>
                </a>
                <a
                  href="https://www.bluenile.com/diamond-details/28847414?a_aid=66fc3592af524&a_cid=55e51e63&chan=quiz"
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="flex flex-col items-center border border-yellow-400/40 hover:bg-yellow-400/10 text-white rounded-xl px-3 py-3 transition-colors text-center"
                >
                  <span className="text-yellow-400 text-[11px] font-semibold uppercase tracking-wider mb-1">Natural</span>
                  <span className="text-white text-sm font-bold">$16,240</span>
                  <span className="text-white/40 text-[10px] mt-1">Shop at Blue Nile →</span>
                </a>
              </div>

              <button
                onClick={handleReset}
                className="text-white/30 hover:text-white/60 text-xs transition-colors underline underline-offset-2"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
