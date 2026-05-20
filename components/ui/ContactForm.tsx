'use client'
import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface border border-border rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 className="font-serif text-xl text-dark mb-2">Message Sent</h3>
        <p className="text-text-muted text-sm">Thanks for reaching out — I&apos;ll get back to you within 1–2 business days.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-accent hover:text-dark transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-dark mb-1.5">Your Name <span className="text-accent">*</span></label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-dark mb-1.5">Email Address <span className="text-accent">*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-xs font-medium text-dark mb-1.5">Subject <span className="text-accent">*</span></label>
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-dark focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Select a topic…</option>
          <option value="General Question">General Question</option>
          <option value="Jewelry Advice">Jewelry Advice</option>
          <option value="Media Inquiry">Media Inquiry</option>
          <option value="Collaboration">Collaboration / Partnership</option>
          <option value="Website Feedback">Website Feedback</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-dark mb-1.5">Message <span className="text-accent">*</span></label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="What can I help you with?"
          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong — please try again or email directly at <a href="mailto:hello@moissanitebyaurelia.com" className="underline">hello@moissanitebyaurelia.com</a>.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-dark text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-accent disabled:opacity-60 transition-colors duration-200"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message →'}
      </button>
      <p className="text-center text-[10px] text-text-subtle">Your message is sent directly to Mehedi — no third-party marketing tools.</p>
    </form>
  )
}
