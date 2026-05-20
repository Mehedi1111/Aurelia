'use client'

import { useState, lazy, Suspense } from 'react'

// Panel is loaded lazily — 0 KB until the user opens the chat
const ChatPanel = lazy(() => import('./ChatPanel'))

export default function ChatBubble() {
  const [open, setOpen] = useState(false)
  // Once loaded stays mounted so history persists across open/close
  const [everOpened, setEverOpened] = useState(false)

  function openChat() {
    setEverOpened(true)
    setOpen(true)
  }

  return (
    <>
      {/* Floating trigger — always visible, pure CSS, no JS cost */}
      {!open && (
        <button
          onClick={openChat}
          aria-label="Ask Aurelia — jewelry AI assistant"
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {/* Tooltip */}
          <span
            aria-hidden
            className="absolute right-16 bg-dark text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Ask Aurelia
          </span>
        </button>
      )}

      {/* Panel — only mounted after first open, stays mounted to preserve history */}
      {everOpened && (
        <Suspense fallback={null}>
          {open && <ChatPanel onClose={() => setOpen(false)} />}
        </Suspense>
      )}
    </>
  )
}
