'use client'

import { useState, useEffect, useRef, lazy, Suspense } from 'react'

const ChatPanel = lazy(() => import('./ChatPanel'))

// Two-note ascending chime — C5 → G5
function playChime() {
  try {
    const ctx = new AudioContext()
    const notes = [
      { freq: 523.25, start: 0,    duration: 0.5 },
      { freq: 783.99, start: 0.13, duration: 0.65 },
    ]
    notes.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, ctx.currentTime + start)
      gain.gain.linearRampToValueAtTime(0.13, ctx.currentTime + start + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration)
      osc.start(ctx.currentTime + start)
      osc.stop(ctx.currentTime + start + duration)
    })
  } catch {
    // AudioContext unavailable — silent fail
  }
}

export default function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [everOpened, setEverOpened] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const chimePlayed = useRef(false)
  const loadTime = useRef(Date.now())

  // Show notification badge after 4s
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 4000)
    return () => clearTimeout(t)
  }, [])

  // Play chime 3s after page load — fires on first user interaction
  // (browsers require a gesture before AudioContext can play)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    function tryChime() {
      if (chimePlayed.current) return
      const elapsed = Date.now() - loadTime.current
      const remaining = Math.max(0, 3000 - elapsed)
      timer = setTimeout(() => {
        if (!chimePlayed.current) {
          chimePlayed.current = true
          playChime()
        }
      }, remaining)
    }

    document.addEventListener('mousemove', tryChime, { once: true })
    document.addEventListener('scroll',    tryChime, { once: true })
    document.addEventListener('touchstart',tryChime, { once: true })
    document.addEventListener('click',     tryChime, { once: true })

    return () => {
      document.removeEventListener('mousemove', tryChime)
      document.removeEventListener('scroll',    tryChime)
      document.removeEventListener('touchstart',tryChime)
      document.removeEventListener('click',     tryChime)
      if (timer) clearTimeout(timer)
    }
  }, [])

  function openChat() {
    setEverOpened(true)
    setShowBadge(false)
    setOpen(true)
    // Play if it hasn't fired yet (e.g. user clicked instantly)
    if (!chimePlayed.current) {
      chimePlayed.current = true
      playChime()
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={openChat}
          aria-label="Ask Aurelia jewelry guide assistant"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-dark rounded-full shadow-lg flex items-center justify-center hover:bg-accent transition-colors duration-200 group"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-3 3v-3z"
            />
          </svg>

          {showBadge && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-accent" />
            </span>
          )}

          <span
            aria-hidden
            className="absolute right-16 bg-dark text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Ask Aurelia
          </span>
        </button>
      )}

      {everOpened && (
        <Suspense fallback={null}>
          {open && <ChatPanel onClose={() => setOpen(false)} />}
        </Suspense>
      )}
    </>
  )
}
