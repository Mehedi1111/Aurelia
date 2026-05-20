'use client'

import { useEffect, useRef } from 'react'

export default function PostBodyInteractive({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = ref.current
    if (!wrapper) return
    initPearlQuiz(wrapper)
  }, [])

  return (
    <div
      ref={ref}
      className="wp-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function initPearlQuiz(wrapper: HTMLElement) {
  const section = wrapper.querySelector<HTMLElement>('.pearl-quiz-section')
  if (!section) return

  const options = section.querySelectorAll<HTMLElement>('.pearl-option')
  const description = section.querySelector<HTMLElement>('.description')
  const quizResult = section.querySelector<HTMLElement>('.quiz-result-pearl')
  const resultMessage = section.querySelector<HTMLElement>('.result-message-pearl')
  const selectButtons = section.querySelectorAll<HTMLElement>('.select-button')
  const pearlLabels = section.querySelectorAll<HTMLElement>('.pearl-label')

  if (!quizResult || !resultMessage) return

  const correctMsg = "That's amazing! You correctly identified the <span class='price-natural-pearl'>Natural Pearl Necklace</span>. A true treasure of the ocean, their extreme rarity commands a legendary price. A fantastic eye for historical value!"
  const incorrectMsg = "A very tricky one! You chose the beautiful <span class='price-cultured-pearl'>Cultured Pearl Necklace</span>. They offer the same classic elegance and timeless style for an <span class='price-cultured-pearl'>accessible price</span>. Let's explore the beauty of both!"

  options.forEach(option => {
    option.addEventListener('click', () => {
      if (quizResult.style.display === 'block') return
      resultMessage.innerHTML = option.dataset.correct === 'true' ? correctMsg : incorrectMsg
      if (description) description.style.display = 'none'
      selectButtons.forEach(btn => { btn.style.display = 'none' })
      pearlLabels.forEach(label => { label.style.display = 'block' })
      quizResult.style.display = 'block'
      options.forEach(opt => { opt.style.pointerEvents = 'none' })
    })
  })
}
