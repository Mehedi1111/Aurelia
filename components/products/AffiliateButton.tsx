interface AffiliateButtonProps {
  href: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export default function AffiliateButton({
  href,
  label = 'Shop This Product',
  size = 'md',
  variant = 'primary',
  className = '',
}: AffiliateButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-sm',
  }

  const variantClasses = {
    primary: 'bg-dark text-white hover:bg-accent',
    secondary: 'bg-accent text-white hover:bg-accent-dark',
    outline: 'border-2 border-dark text-dark hover:bg-dark hover:text-white',
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`
        inline-flex items-center justify-center gap-2 font-semibold tracking-wide
        rounded-lg transition-colors duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {label}
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  )
}
