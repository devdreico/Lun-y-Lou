import { motion } from 'framer-motion'
import { Eye, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { formatCOP } from '../../lib/format'
import { CATEGORIES_LABEL } from '../../lib/constants'
import type { Product } from '../../types'
import { useCart } from '../../store/cart'
import { toast } from '../../lib/toast'

interface Props {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCart((s) => s.addItem)
  const navigate = useNavigate()
  const img = product.images[0]?.src

  const quickAdd = () => {
    addItem(product, { quantity: 1 })
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
      <div className="glass grain overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-glass-lg hover:border-white/75">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
          <Link
            to={`/producto/${product.slug}`}
            className="absolute inset-0 z-0"
            aria-label={`Ver ${product.name}`}
          >
            <img
              src={img}
              alt={product.images[0]?.alt ?? product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[1.5deg]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:group-hover:opacity-100" />
          </Link>

          {product.badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-rose/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-rose">
              {product.badge}
            </span>
          )}

          {product.compareAtPrice && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-forest/90 px-3 py-1 text-[11px] font-semibold text-cream">
              -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
            </span>
          )}

          <div className="absolute inset-x-3 bottom-3 z-20 flex translate-y-0 gap-2 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <button
              type="button"
              onClick={quickAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/95 px-3 py-2.5 text-xs font-semibold text-ink backdrop-blur-md transition hover:bg-rose hover:text-white active:scale-95"
            >
              <ShoppingBag className="size-3.5" /> Agregar
            </button>
            <button
              type="button"
              onClick={() => navigate(`/producto/${product.slug}`)}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white/95 text-ink backdrop-blur-md transition hover:bg-white active:scale-95"
              aria-label={`Ver detalle de ${product.name}`}
            >
              <Eye className="size-4" />
            </button>
          </div>
        </div>

        <Link
          to={`/producto/${product.slug}`}
          className="block space-y-2 p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-rose-dark/80">
                {CATEGORIES_LABEL[product.category] ?? product.category}
              </p>
              <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-rose-dark">
                {product.name}
              </h3>
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
          </div>
        </Link>
      </div>
    </motion.article>
  )
}
