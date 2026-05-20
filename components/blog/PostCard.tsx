import Link from 'next/link'
import Image from 'next/image'
import type { WPPostCard } from '@/types/wordpress'

interface PostCardProps {
  post: WPPostCard
  featured?: boolean
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, ' ').trim()
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const excerpt = stripHtml(post.excerpt).slice(0, 120) + '…'
  const category = post.categories.nodes[0]

  if (featured) {
    return (
      <article className="group grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border rounded-xl overflow-hidden hover:border-accent-muted transition-colors duration-200">
        {post.featuredImage && (
          /* Square on mobile, fills grid cell on sm+ */
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
        )}
        <div className="flex flex-col justify-center p-6 sm:p-8">
          {category && (
            <Link
              href={`/category/${category.slug}/`}
              className="text-accent text-[11px] uppercase tracking-widest font-medium hover:text-accent-dark transition-colors mb-3 block"
            >
              {category.name}
            </Link>
          )}
          <h2 className="font-serif text-xl sm:text-2xl text-dark leading-snug mb-3 group-hover:text-accent transition-colors">
            <Link href={`/${post.slug}/`}>{post.title}</Link>
          </h2>
          <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between">
            <time className="text-xs text-text-subtle" dateTime={post.date}>{formatDate(post.date)}</time>
            <Link
              href={`/${post.slug}/`}
              className="text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              Read guide →
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex flex-col border border-border rounded-xl overflow-hidden hover:border-accent-muted transition-colors duration-200">
      {/* Square image */}
      <div className="relative aspect-square overflow-hidden bg-surface flex-shrink-0">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface">
            <svg className="w-10 h-10 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
          </div>
        )}
        {category && (
          <Link
            href={`/category/${category.slug}/`}
            className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-accent text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full hover:bg-accent hover:text-white transition-colors"
          >
            {category.name}
          </Link>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-serif text-sm text-dark leading-snug mb-2 flex-1 group-hover:text-accent transition-colors line-clamp-2">
          <Link href={`/${post.slug}/`}>{post.title}</Link>
        </h3>
        <p className="text-[12px] text-text-muted leading-relaxed mb-3 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
          <time className="text-[11px] text-text-subtle" dateTime={post.date}>{formatDate(post.date)}</time>
          <Link href={`/${post.slug}/`} className="text-[11px] font-semibold text-accent hover:text-accent-dark transition-colors">
            Read →
          </Link>
        </div>
      </div>
    </article>
  )
}
