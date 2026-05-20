'use client'

import { useState, lazy, Suspense } from 'react'

const ChatPanel = lazy(() => import('./ChatPanel'))

export default function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [everOpened, setEverOpened] = useState(false)

  function openChat() {
    setEverOpened(true)
    setOpen(true)
  }

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={openChat}
          aria-label="Search Aurelia jewelry guides"
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
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <span
            aria-hidden
            className="absolute right-16 bg-dark text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Search guides
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
