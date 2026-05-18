import Link from 'next/link'
import Image from 'next/image'
import type { WPProductCard } from '@/types/wordpress'

interface ProductCardProps {
  product: WPProductCard
}

function cleanPrice(price: string | null | undefined) {
  return price?.replace(/<[^>]+>/g, '').trim() ?? ''
}

function discount(regular: string | null | undefined, sale: string | null | undefined) {
  if (!sale || !regular) return null
  const r = parseFloat(regular.replace(/[^0-9.]/g, ''))
  const s = parseFloat(sale.replace(/[^0-9.]/g, ''))
  if (!r || !s) return null
  return Math.round((1 - s / r) * 100)
}

export default function ProductCard({ product }: ProductCardProps) {
  const pct = discount(product.regularPrice, product.salePrice)
  const cat = product.productCategories.nodes[0]

  return (
    <article className="group flex flex-col border border-border rounded-lg overflow-hidden hover:border-accent-muted transition-colors duration-200">
      <div className="relative aspect-square overflow-hidden bg-surface">
        {product.image ? (
          <Image
            src={product.image.sourceUrl}
            alt={product.image.altText || product.name}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-border">💍</div>
        )}
        {pct !== null && (
          <span className="absolute top-2 left-2 bg-accent text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            -{pct}%
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        {cat && (
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-1.5">{cat.name}</p>
        )}
        <h3 className="font-serif text-sm text-dark leading-snug mb-3 flex-1 line-clamp-2 group-hover:text-accent transition-colors">
          <Link href={`/product/${product.slug}/`}>{product.name}</Link>
        </h3>
        <div className="flex items-baseline gap-2 mb-4">
          {product.onSale && product.salePrice ? (
            <>
              <span className="text-dark font-medium text-sm">{cleanPrice(product.salePrice)}</span>
              <span className="text-text-subtle text-xs line-through">{cleanPrice(product.regularPrice)}</span>
            </>
          ) : (
            <span className="text-dark font-medium text-sm">{cleanPrice(product.price)}</span>
          )}
        </div>
        <Link
          href={`/product/${product.slug}/`}
          className="block text-center border border-dark text-dark text-xs font-medium py-2 rounded-md hover:bg-dark hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
