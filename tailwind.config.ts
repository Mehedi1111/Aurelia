import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:     '#ffffff',
        dark:   '#111111',
        accent: {
          DEFAULT: '#d19b8a',
          dark:    '#b8826f',
          light:   '#f5ebe7',
          muted:   '#e8d5ce',
        },
        text: {
          DEFAULT: '#2d2d2d',
          muted:   '#737373',
          subtle:  '#a8a8a8',
        },
        surface: '#f9f6f4',
        border:  '#ede8e4',
        card:    '#ffffff',
      },
      fontFamily: {
        serif: ['var(--font-marcellus)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      typography: () => ({
        aurelia: {
          css: {
            '--tw-prose-body':          '#2d2d2d',
            '--tw-prose-headings':      '#111111',
            '--tw-prose-lead':          '#555555',
            '--tw-prose-links':         '#d19b8a',
            '--tw-prose-bold':          '#111111',
            '--tw-prose-counters':      '#737373',
            '--tw-prose-bullets':       '#d19b8a',
            '--tw-prose-hr':            '#ede8e4',
            '--tw-prose-quotes':        '#111111',
            '--tw-prose-quote-borders': '#d19b8a',
            '--tw-prose-captions':      '#737373',
            '--tw-prose-th-borders':    '#ede8e4',
            '--tw-prose-td-borders':    '#f3efec',
            maxWidth: 'none',
            fontSize: '1.0625rem',
            lineHeight: '1.8',
            h1: { fontFamily: 'Marcellus, Georgia, serif', fontWeight: '400', letterSpacing: '-0.01em' },
            h2: { fontFamily: 'Marcellus, Georgia, serif', fontWeight: '400', letterSpacing: '-0.01em', marginTop: '2.5em', paddingBottom: '0.4em', borderBottom: '1px solid #ede8e4' },
            h3: { fontFamily: 'Marcellus, Georgia, serif', fontWeight: '400', letterSpacing: '-0.005em' },
            h4: { fontFamily: 'Marcellus, Georgia, serif', fontWeight: '400' },
            a: {
              color: '#d19b8a',
              textDecoration: 'none',
              borderBottom: '1px solid #e8d5ce',
              transition: 'color 0.2s, border-color 0.2s',
              '&:hover': { color: '#b8826f', borderBottomColor: '#b8826f' },
            },
            table: { width: '100%', fontSize: '0.9em', borderCollapse: 'collapse' },
            thead: { backgroundColor: '#111111', color: '#ffffff' },
            'thead th': {
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontFamily: 'Marcellus, Georgia, serif',
              fontWeight: '400',
              letterSpacing: '0.02em',
              borderBottom: 'none',
            },
            'tbody tr': { borderBottomColor: '#f3efec' },
            'tbody tr:nth-child(even)': { backgroundColor: '#f9f6f4' },
            'tbody td': { padding: '0.75rem 1rem', verticalAlign: 'top' },
            blockquote: {
              borderLeftColor: '#d19b8a',
              backgroundColor: '#f9f6f4',
              padding: '1.25rem 1.5rem',
              borderRadius: '0 4px 4px 0',
              fontStyle: 'normal',
            },
            'blockquote p': { color: '#2d2d2d', fontSize: '1.05em' },
            code: { backgroundColor: '#f9f6f4', padding: '0.15em 0.4em', borderRadius: '3px', fontSize: '0.875em', color: '#b8826f', fontWeight: '400' },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
          },
        },
      }),
      boxShadow: {
        sm:   '0 1px 2px rgba(0,0,0,0.05)',
        card: '0 1px 4px rgba(0,0,0,0.06)',
        md:   '0 4px 12px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
