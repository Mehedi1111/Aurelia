'use client'

import { useState } from 'react'
import Image from 'next/image'

type PriceStyle = 'gold' | 'cyan' | 'silver' | 'green'

const priceHex: Record<PriceStyle, string> = {
  gold: '#FFD700',
  cyan: '#00E6E6',
  silver: '#C0C0C0',
  green: '#00ff88',
}

export interface GemOption {
  imgSrc: string
  imgAlt: string
  label: string
  price: string
  priceStyle: PriceStyle
  correct: boolean
}

export interface GemCTA {
  label: string
  href: string
  primary: boolean
}

interface Props {
  title: string
  description: React.ReactNode
  correctMessage: React.ReactNode
  incorrectMessage: React.ReactNode
  options: [GemOption, GemOption]
  ctas: [GemCTA, GemCTA]
  imageShape?: 'circle' | 'rounded'
}

export default function GemIQQuiz({
  title,
  description,
  correctMessage,
  incorrectMessage,
  options,
  ctas,
  imageShape = 'circle',
}: Props) {
  const [chosen, setChosen] = useState<0 | 1 | null>(null)
  const revealed = chosen !== null
  const isCorrect = chosen !== null && options[chosen].correct

  function pick(i: 0 | 1) {
    if (!revealed) setChosen(i)
  }

  return (
    <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 sm:p-12 text-center">
      <h3 className="font-serif text-2xl sm:text-4xl text-white mb-8 leading-tight">{title}</h3>

      <div className="flex justify-center gap-6 sm:gap-20 mb-8">
        {options.map((opt, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4" style={{ width: '42%', maxWidth: 280 }}>
            <button
              onClick={() => pick(idx as 0 | 1)}
              disabled={revealed}
              className="w-full focus:outline-none group"
              aria-label={`Select option ${idx + 1}`}
            >
              <div className={`relative w-full aspect-square transition-transform duration-300 ${!revealed ? 'group-hover:scale-105' : ''}`}>
                <Image
                  src={opt.imgSrc}
                  alt={opt.imgAlt}
                  fill
                  sizes="(max-width: 640px) 42vw, 280px"
                  unoptimized
                  className={`object-cover transition-all duration-300 ${
                    imageShape === 'circle' ? 'rounded-full' : 'rounded-xl'
                  } ${revealed && chosen !== idx ? 'opacity-40' : ''} ${
                    revealed && chosen === idx ? 'ring-4 ring-accent' : !revealed ? 'group-hover:ring-2 group-hover:ring-white/30' : ''
                  }`}
                />
              </div>
            </button>

            {revealed ? (
              <p className="text-sm font-semibold leading-snug" style={{ color: priceHex[opt.priceStyle] }}>
                {opt.label}
                <br />
                <span className="text-xl font-bold">{opt.price}</span>
              </p>
            ) : (
              <button
                onClick={() => pick(idx as 0 | 1)}
                className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-accent hover:text-white transition-colors"
              >
                Select
              </button>
            )}
          </div>
        ))}
      </div>

      {!revealed ? (
        <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      ) : (
        <div>
          <p className="text-white text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
            {isCorrect ? correctMessage : incorrectMessage}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {ctas.map((cta, i) => (
              <a
                key={i}
                href={cta.href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                style={{ backgroundColor: cta.primary ? '#FFD700' : '#00E6E6', color: '#000' }}
                className="inline-block px-6 py-3 rounded-full text-sm font-bold transition-all hover:bg-white hover:shadow-lg"
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
