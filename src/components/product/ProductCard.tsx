import { motion } from 'framer-motion'
import { Eye, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCOP } from '../../lib/format'
import type { Product } from '../../types'
import { useCart } from '../../store/cart'
import { toast } from '../../lib/toast'

interface Props {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCart((s) => s.addItem)
  const img = product.images[0]?.src

  const quickAdd = () => {
    addItem(product, { size: product.sizes[Math.min(1, product.sizes.length - 1)], color: product.colors[0]?.name ?? 'Único' })
    toast({ title: 'Agregado al carrito', message: product.name })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        to={`/producto/${product.slug}`}
        className="block glass grain overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-glass-lg hover:border-white/75"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
          <img
            src={img}
            alt={product.images[0]?.alt ?? product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[1.5deg]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-rose/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-rose">
              {product.badge}
            </span>
          )}

          {product.compareAtPrice && (
            <span className="absolute right-3 top-3 rounded-full bg-forest/90 px-3 py-1 text-[11px] font-semibold text-cream">
              -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
            </span>
          )}

          <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                quickAdd()
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/90 px-3 py-2.5 text-xs font-semibold text-ink backdrop-blur-md transition hover:bg-rose hover:text-white active:scale-95"
            >
              <ShoppingBag className="size-3.5" /> Agregar
            </button>
            <span className="grid size-10 place-items-center rounded-full bg-white/90 text-ink backdrop-blur-md">
              <Eye className="size-4" />
            </span>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-rose-dark/80">
                {product.category}
              </p>
              <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-rose-dark">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-gold/15 px-2 py-1 text-[11px] font-semibold text-gold">
              <Star className="size-3 fill-gold text-gold" /> 4.9
            </div>
          </div>

          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-lg font-semibold text-ink">{formatCOP(product.price)}</p>
              {product.compareAtPrice && (
                <p className="text-xs text-ink/40 line-through">
                  {formatCOP(product.compareAtPrice)}
                </p>
              )}
            </div>
            <div className="flex -space-x-1.5">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="size-4 rounded-full ring-2 ring-white"
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
