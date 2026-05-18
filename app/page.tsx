import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/graphql/queries/posts'
import { getProducts, getAllProductCategories } from '@/lib/graphql/queries/products'
import { getAllCategories } from '@/lib/graphql/queries/categories'
import PostCard from '@/components/blog/PostCard'
import ProductCard from '@/components/products/ProductCard'

export const metadata: Metadata = {
  title: 'Moissanite by Aurelia — Diamond, Gemstone & Moissanite Jewelry Guides',
  description: 'Expert guides on moissanite, diamonds, and gemstones. Honest reviews and affiliate buying advice by Mehedi Hasan, cited in People, Us Weekly & Page Six.',
  alternates: { canonical: 'https://moissanitebyaurelia.com' },
}

// High-converting affiliate partner cards
const PARTNERS = [
  {
    name: 'Blue Nile',
    tag: 'Best Overall',
    desc: 'Largest certified diamond selection online. GIA graded, best prices.',
    href: 'https://www.bluenile.com/?a_aid=66fc3592af524&a_cid=55e51e63',
    deal: 'Up to 70% Off — Vault Sale',
    accent: '#d19b8a',
  },
  {
    name: 'James Allen',
    tag: 'Best Visuals',
    desc: '360° HD video for every diamond. See it before you buy it.',
    href: 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309',
    deal: 'New Collection Available',
    accent: '#111111',
  },
  {
    name: 'Charles & Colvard',
    tag: 'Best Moissanite',
    desc: 'The original moissanite brand. Forever One quality guaranteed.',
    href: 'https://charlesandcolvard.sjv.io/YRmOWB',
    deal: 'Free Shipping on All Orders',
    accent: '#6b7280',
  },
  {
    name: 'Rare Carat',
    tag: 'Best Deals',
    desc: 'AI compares thousands of diamonds instantly. Always get the best price.',
    href: 'https://www.rarecarat.com/',
    deal: 'Up to 40% Off Sitewide',
    accent: '#059669',
  },
]

const GUIDES = [
  { label: 'Moissanite Guide', href: '/moissanite/' },
  { label: 'Diamond 4Cs', href: '/diamond-cut-chart/' },
  { label: 'Engagement Rings', href: '/category/diamond-buying-guide/engagement-ring-buying-guide/' },
  { label: 'Lab Diamonds', href: '/category/lab-grown-diamond/' },
  { label: 'Sapphire', href: '/category/gemstone/sapphire-guide/' },
  { label: 'Moissanite vs Diamond', href: '/which-is-more-sparkly-diamond-or-moissanite/' },
]

export default async function HomePage() {
  const [postsData, productsData, productCats, blogCats] = await Promise.all([
    getPosts(7),
    getProducts(4),
    getAllProductCategories(),
    getAllCategories(),
  ])
  const posts = postsData.posts.nodes
  const products = productsData.products.nodes
  // Top-level blog categories only (no ancestors), with posts
  const topBlogCats = blogCats
    .filter(c => !c.ancestors?.nodes?.length && (c.count ?? 0) > 0)
    .slice(0, 10)

  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="max-w-xl">
              <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-4">
                Cited in People · Us Weekly · Page Six
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl text-dark leading-[1.1] mb-5 text-balance">
                Buy Jewelry Smarter.<br />
                <span className="text-accent">Save Thousands.</span>
              </h1>
              <p className="text-text-muted text-base leading-relaxed mb-7 max-w-md">
                Expert guides on diamonds, moissanite, and gemstones — with honest reviews and the best deals from trusted retailers. By Mehedi Hasan.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/moissanite/"
                  className="inline-flex items-center gap-2 bg-dark text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-accent transition-colors"
                >
                  Moissanite Guide →
                </Link>
                <Link
                  href="/which-is-more-sparkly-diamond-or-moissanite/"
                  className="inline-flex items-center gap-2 border border-border text-dark text-sm font-medium px-6 py-3 rounded-lg hover:border-accent hover:text-accent transition-colors"
                >
                  Moissanite vs Diamond
                </Link>
              </div>
            </div>

            {/* Trust panel — press + stats + featured deal */}
            <div className="hidden lg:block w-[360px] shrink-0">
              <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
                {/* Press mentions */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-text-subtle font-medium mb-3">As Featured In</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['People', 'Us Weekly', 'Page Six', 'Brides', 'WeddingWire', 'The Knot'].map(pub => (
                      <div key={pub} className="bg-bg border border-border rounded-lg py-2 px-1.5 text-center">
                        <span className="text-[9px] font-semibold text-dark tracking-wide leading-tight block">{pub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured deal */}
                <div className="border-t border-border pt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-text-subtle font-medium mb-3">Today&apos;s Top Deal</p>
                  <a
                    href="https://www.bluenile.com/clear-the-vault?a_aid=66fc3592af524&a_cid=55e51e63&chan=168657"
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="flex items-center gap-3 bg-dark rounded-xl p-3.5 hover:bg-accent transition-colors group"
                  >
                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0 text-lg">💎</div>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold">Blue Nile — Vault Sale</p>
                      <p className="text-white/60 text-[11px] mt-0.5">Up to 70% off — limited time</p>
                    </div>
                    <svg className="w-4 h-4 text-white/40 group-hover:text-white ml-auto shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick links bar ── */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2.5">
          {/* Guides row — curated static links + dynamic blog categories */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[11px] text-text-subtle uppercase tracking-widest shrink-0 hidden sm:block">Guides:</span>
            {GUIDES.map(g => (
              <Link key={g.label} href={g.href} className="text-[12px] text-text-muted border border-border bg-bg px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors">
                {g.label}
              </Link>
            ))}
            {topBlogCats.filter(c => !GUIDES.some(g => g.href.includes(c.slug))).map(c => (
              <Link key={c.slug} href={`/category/${c.slug}/`} className="text-[12px] text-text-muted border border-border bg-bg px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
          {/* Shop categories row */}
          {productCats.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[11px] text-text-subtle uppercase tracking-widest shrink-0 hidden sm:block">Shop:</span>
              <Link href="/shop-fine-jewelry/" className="text-[12px] text-text-muted border border-border bg-bg px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors">All Jewelry</Link>
              {productCats.map(c => (
                <Link key={c.slug} href={`/product-category/${c.slug}/`} className="text-[12px] text-text-muted border border-border bg-bg px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors">
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* ── Affiliate Partners (conversion section) ── */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-1">Where to Buy</p>
              <h2 className="font-serif text-2xl text-dark">Trusted Retailers</h2>
            </div>
            <Link href="/category/diamond-review/" className="text-xs text-accent hover:text-accent-dark font-medium transition-colors">All reviews →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNERS.map(p => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group flex flex-col border border-border hover:border-[#d19b8a] rounded-xl p-5 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: p.accent }}
                  >
                    {p.tag}
                  </span>
                  <svg className="w-3.5 h-3.5 text-text-subtle group-hover:text-accent transition-colors mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <h3 className="font-serif text-base text-dark group-hover:text-accent transition-colors mb-1.5">{p.name}</h3>
                <p className="text-xs text-text-muted leading-relaxed flex-1 mb-3">{p.desc}</p>
                <p className="text-[11px] text-accent font-medium border-t border-border pt-3">
                  🔥 {p.deal}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ── Latest guides ── */}
        {posts.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-1">Expert Content</p>
                <h2 className="font-serif text-2xl text-dark">Latest Guides</h2>
              </div>
              <Link href="/blog/" className="text-xs text-accent hover:text-accent-dark font-medium transition-colors">All guides →</Link>
            </div>
            <div className="mb-5">
              <PostCard post={posts[0]} featured />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {posts.slice(1, 7).map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* ── Shop products ── */}
        {products.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-1">Curated Picks</p>
                <h2 className="font-serif text-2xl text-dark">Shop Fine Jewelry</h2>
              </div>
              <Link href="/shop-fine-jewelry/" className="text-xs text-accent hover:text-accent-dark font-medium transition-colors">View all →</Link>
            </div>

            {/* Product category pill shortcuts */}
            {productCats.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {productCats.map(c => (
                  <Link
                    key={c.slug}
                    href={`/product-category/${c.slug}/`}
                    className="text-xs text-text-muted border border-border bg-surface px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {products.map(p => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* ── Quiz CTA ── high conversion block ── */}
        <section className="bg-[#111111] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="px-7 py-10 sm:px-10 sm:py-12 flex flex-col justify-center">
              <p className="text-[#d19b8a] text-[11px] uppercase tracking-widest font-medium mb-4">Interactive Quiz</p>
              <h2 className="font-serif text-white text-2xl sm:text-3xl mb-4 leading-snug">
                Natural or Lab-Grown Diamond?<br />
                <span className="text-[#d19b8a]">Can you tell?</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-7">
                Same cut. Same color. Same clarity. One costs $16,240 — the other $1,970.
                Test your diamond IQ and discover which is right for you.
              </p>
              <Link
                href="/jewelry-personality-quiz/"
                className="inline-flex self-start items-center gap-2 bg-[#d19b8a] hover:bg-[#b8826f] text-white text-sm font-semibold px-7 py-3.5 rounded-lg transition-colors"
              >
                Take the Quiz →
              </Link>
            </div>
            <div className="hidden sm:block relative aspect-square sm:aspect-auto">
              <Image
                src="https://moissanitebyaurelia.com/wp-content/uploads/2026/02/827x827.jpg.webp"
                alt="Fine jewelry — Blue Nile sale"
                fill
                className="object-cover"
                sizes="50vw"
                unoptimized
              />
              <a
                href="https://www.bluenile.com/clear-the-vault?a_aid=66fc3592af524&a_cid=55e51e63&chan=168657"
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="absolute inset-0 flex items-end p-6"
              >
                <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-[#d19b8a] transition-colors">
                  Blue Nile — Up to 70% Off →
                </span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export const revalidate = 3600
