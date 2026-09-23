import { motion } from 'framer-motion'
import { ChevronRight, Heart, Package, RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProductActions } from '../components/product/ProductActions'
import { ProductCard } from '../components/product/ProductCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { getProductBySlug, products } from '../data/products'
import { formatCOP } from '../lib/format'
import { CATEGORIES_LABEL, WHATSAPP_URL } from '../lib/constants'

const ProductPanels3D = lazy(() =>
  import('../components/three/ProductPanels3D').then((m) => ({ default: m.ProductPanels3D })),
)

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const [activeImg, setActiveImg] = useState(0)
  const [wishlist, setWishlist] = useState(false)
  const [view3d, setView3d] = useState(true)

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
        <ChevronRight className="size-3.5" />
        <Link to={`/productos?cat=${product.category}`} className="transition hover:text-rose-dark">
          {CATEGORIES_LABEL[product.category]}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-ink/75">{product.name}</span>
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
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setView3d(false)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    !view3d ? 'bg-rose text-white shadow-rose' : 'bg-white/60 text-ink/60'
                  }`}
                >
                  Fotos
                </button>
                <button
                  type="button"
                  onClick={() => setView3d(true)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    view3d ? 'bg-rose text-white shadow-rose' : 'bg-white/60 text-ink/60'
                  }`}
                >
                  Vista 3D
                </button>
              </div>
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
              {view3d ? (
                <Suspense
                  fallback={
                    <div className="grid h-full w-full place-items-center text-sm text-ink/50">
                      Cargando escena 3D…
                    </div>
                  }
                >
                  <ProductPanels3D product={product} />
                </Suspense>
              ) : (
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  src={product.images[activeImg]?.src}
                  alt={product.images[activeImg]?.alt ?? product.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {!view3d && (
              <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar px-1 pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`size-16 shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                      activeImg === i
                        ? 'ring-2 ring-rose ring-offset-2 ring-offset-cream scale-105'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={img.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, t: 'Envío nacional' },
              { icon: RotateCcw, t: 'Cambios 7 días' },
              { icon: ShieldCheck, t: 'Compra segura' },
            ].map((f) => (
              <div
                key={f.t}
                className="glass flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center"
              >
                <f.icon className="size-4 text-forest" />
                <span className="text-[11px] font-medium text-ink/65">{f.t}</span>
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
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold-dark">
                <Star className="size-3 fill-gold text-gold" /> 4.9 (128)
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
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

          <div className="glass grain rounded-3xl p-5">
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
              Despacho en 24–72 horas hábiles según ciudad. Incluye empaque regalo opcional al
              confirmar el pedido.
            </p>
          </div>
        </motion.div>
      </div>

      <section className="mt-24">
        <SectionHeading
          eyebrow="También te puede gustar"
          title="Segue explorando"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedList.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
