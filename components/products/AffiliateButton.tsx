import Link from 'next/link'

interface AffiliateButtonProps {
  href: string
  retailer: string
  label?: string
  price?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const RETAILER_ICONS: Record<string, string> = {
  'james allen': '💍',
  'blue nile': '🔷',
  'charles & colvard': '✨',
  'amazon': '📦',
  'ritani': '💎',
  'vrai': '🌿',
  'rare carat': '🔍',
}

export default function AffiliateButton({
  href,
  retailer,
  label,
  price,
  variant = 'primary',
  size = 'md',
  className = '',
}: AffiliateButtonProps) {
  const icon = RETAILER_ICONS[retailer.toLowerCase()] || '🛒'
  const buttonLabel = label || `Shop on ${retailer}`

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variantClasses = {
    primary: 'bg-accent hover:bg-accent-dark text-white',
    secondary: 'bg-dark hover:bg-accent text-white',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`
        inline-flex items-center justify-center gap-2.5 font-semibold rounded-full
        transition-all duration-200 group
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <span>{icon}</span>
      <span>{buttonLabel}</span>
      {price && (
        <span className="opacity-80 font-normal">— {price}</span>
      )}
      <svg
        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  )
}
