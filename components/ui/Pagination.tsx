import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string  // e.g. '/blog' or '/category/lab-grown-diamond'
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const href = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`

  // Show at most 5 page numbers centred on current page
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)
  const pages: number[] = []
  for (let i = start; i <= end; i++) pages.push(i)

  const pill = (page: number, active: boolean) => (
    <Link
      key={page}
      href={href(page)}
      className={`min-w-[36px] h-9 flex items-center justify-center px-2 text-sm font-medium rounded-lg border transition-colors ${
        active
          ? 'bg-dark text-white border-dark'
          : 'border-border text-text-muted hover:border-accent hover:text-accent'
      }`}
    >
      {page}
    </Link>
  )

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-12 flex-wrap">
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-accent transition-colors px-3 py-2 rounded-lg border border-border hover:border-accent"
        >
          ← Prev
        </Link>
      )}

      {start > 1 && (
        <>
          {pill(1, false)}
          {start > 2 && <span className="text-text-subtle text-sm px-1">…</span>}
        </>
      )}

      {pages.map(p => pill(p, p === currentPage))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-text-subtle text-sm px-1">…</span>}
          {pill(totalPages, false)}
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-accent transition-colors px-3 py-2 rounded-lg border border-border hover:border-accent"
        >
          Next →
        </Link>
      )}
    </nav>
  )
}
