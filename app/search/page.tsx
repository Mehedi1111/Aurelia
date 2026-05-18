import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { searchContent } from '@/lib/graphql/queries/search'
import ProductCard from '@/components/products/ProductCard'
import type { WPProductCard } from '@/types/wordpress'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search: "${q}" — Moissanite by Aurelia` : 'Search — Moissanite by Aurelia',
    robots: { index: false },
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').trim()
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  const results = query.length >= 2 ? await searchContent(query) : { posts: [], products: [] }
  const totalCount = results.posts.length + results.products.length

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search form */}
      <div className="mb-10">
        <h1 className="font-serif text-2xl sm:text-3xl text-dark mb-6">
          {query ? `Results for "${query}"` : 'Search Guides & Products'}
        </h1>
        <form action="/search" method="GET">
          <div className="flex gap-3 max-w-xl">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search diamonds, moissanite, reviews…"
              autoFocus
              className="flex-1 border border-border rounded-lg px-4 py-3 text-sm text-dark placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent-dark text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        {query && (
          <p className="text-text-muted text-sm mt-3">
            {totalCount > 0 ? `${totalCount} result${totalCount !== 1 ? 's' : ''} found` : 'No results found'}
            {totalCount === 0 && (
              <span> — try a different term or <Link href="/blog/" className="text-accent hover:underline">browse all guides</Link></span>
            )}
          </p>
        )}
      </div>

      {/* Article results */}
      {results.posts.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-lg text-dark mb-5 pb-3 border-b border-border">
            Guides & Articles
            <span className="text-sm font-sans text-text-muted font-normal ml-2">({results.posts.length})</span>
          </h2>
          <div className="space-y-5">
            {results.posts.map(post => {
              const cat = post.categories?.nodes?.[0]
              const excerpt = post.excerpt ? stripHtml(post.excerpt).slice(0, 160) : ''
              return (
                <article key={post.slug} className="flex gap-4 group">
                  {post.featuredImage?.node && (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface shrink-0">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    {cat && (
                      <Link
                        href={`/category/${cat.slug}/`}
                        className="text-accent text-[11px] uppercase tracking-widest font-medium hover:text-accent-dark transition-colors"
                      >
                        {cat.name}
                      </Link>
                    )}
                    <h3 className="font-serif text-base text-dark group-hover:text-accent transition-colors leading-snug mt-1 mb-1">
                      <Link href={`/${post.slug}/`}>{post.title}</Link>
                    </h3>
                    {excerpt && (
                      <p className="text-text-muted text-xs leading-relaxed line-clamp-2">{excerpt}</p>
                    )}
                    <time className="text-text-subtle text-[11px] mt-1.5 block">{formatDate(post.date)}</time>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* Product results */}
      {results.products.length > 0 && (
        <section>
          <h2 className="font-serif text-lg text-dark mb-5 pb-3 border-b border-border">
            Products
            <span className="text-sm font-sans text-text-muted font-normal ml-2">({results.products.length})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {results.products.map(p => (
              <ProductCard key={p.slug} product={p as WPProductCard} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
