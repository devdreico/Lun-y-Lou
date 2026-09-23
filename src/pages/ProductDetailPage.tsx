import { motion } from 'framer-motion'
import { ChevronRight, Heart, Package, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProductActions } from '../components/product/ProductActions'
import { ProductCard } from '../components/product/ProductCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { getProductBySlug, products } from '../data/products'
import { formatCOP } from '../lib/format'
import { CATEGORIES_LABEL, WHATSAPP_URL } from '../lib/constants'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const [activeImg, setActiveImg] = useState(0)
  const [wishlist, setWishlist] = useState(false)

  if (!product) return <Navigate to="/productos" replace />

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4)
  const relatedList = related.length >= 3 ? related : fallbackRelated

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-ink/50">
        <Link to="/" className="transition hover:text-rose-dark">
          Inicio
        </Link>
        <ChevronRight className="size-3.5" />
        <Link to="/productos" className="transition hover:text-rose-dark">
          Tienda
        </Link>
        <ChevronRight className="size-3.5 hidden sm:block" />
        <Link to={`/productos?cat=${product.category}`} className="hidden transition hover:text-rose-dark sm:block">
          {CATEGORIES_LABEL[product.category]}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="min-w-0 truncate text-ink/75">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="glass grain relative overflow-hidden rounded-[2rem] p-3">
            <div className="mb-3 flex items-center justify-end px-1">
              <button
                type="button"
                onClick={() => setWishlist((v) => !v)}
                className={`grid size-9 place-items-center rounded-full transition active:scale-90 ${
                  wishlist ? 'bg-rose text-white shadow-rose' : 'bg-white/60 hover:bg-white'
                }`}
                aria-label="Favorito"
              >
                <Heart className={`size-4 ${wishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cream-dark to-white">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                src={product.images[activeImg]?.src}
                alt={product.images[activeImg]?.alt ?? product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar px-1 pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`size-14 shrink-0 overflow-hidden rounded-xl transition-all duration-300 sm:size-16 ${
                    activeImg === i
                      ? 'ring-2 ring-rose ring-offset-2 ring-offset-cream sm:scale-105'
                      : 'opacity-70 hover:opacity-100 sm:hover:scale-105'
                  }`}
                >
                  <img src={img.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {[
              { icon: Truck, t: 'Envío nacional' },
              { icon: RotateCcw, t: 'Cambios 7 días' },
              { icon: ShieldCheck, t: 'Compra segura' },
            ].map((f) => (
              <div
                key={f.t}
                className="glass flex flex-row items-center gap-3 rounded-2xl px-3 py-3 text-left sm:flex-col sm:items-center sm:gap-1.5 sm:px-2 sm:text-center"
              >
                <f.icon className="size-4 shrink-0 text-forest" />
                <span className="text-[11px] font-medium text-ink/65 sm:text-center">{f.t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {product.badge && (
                <span className="rounded-full bg-rose px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {product.badge}
                </span>
              )}
              <span className="rounded-full bg-forest/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-forest">
                {CATEGORIES_LABEL[product.category]}
              </span>
            </div>

            <h1 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-ink/55 italic">{product.tagline}</p>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              <span className="font-display text-3xl font-semibold text-gradient-rose">
                {formatCOP(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-ink/40 line-through">
                  {formatCOP(product.compareAtPrice)}
                </span>
              )}
              <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-ink/55 ring-1 ring-ink/8">
                Stock: {product.stock}
              </span>
            </div>
          </div>

          <div className="glass grain rounded-3xl p-4 sm:p-5">
            <p className="text-sm leading-relaxed text-ink/70">{product.description}</p>
          </div>

          <ProductActions product={product} />

          <div className="rounded-3xl border border-dashed border-forest/25 bg-forest/5 p-4 text-sm text-ink/65">
            <p className="font-semibold text-forest-dark mb-1">¿Pedir por WhatsApp?</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-forest underline underline-offset-4 hover:text-rose-dark"
            >
              Escríbenos y coordinamos tu entrega a contraentrega →
            </a>
          </div>

          <div className="flex items-start gap-3 text-xs text-ink/50">
            <Package className="mt-0.5 size-4 shrink-0 text-rose" />
            <p>
              Despacho en 24–72 horas hábiles según ciudad. Envíos a toda Colombia desde la
              Sábana Occidental.
            </p>
          </div>
        </motion.div>
      </div>

      <section className="mt-24">
        <SectionHeading
          eyebrow="También te puede gustar"
          title="Sigue explorando"
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedList.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
