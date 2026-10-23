import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { LinkButton } from '../components/ui/Button'
import { CartItemRow } from '../components/cart/CartItemRow'
import { formatCOP } from '../lib/format'
import { cartKey, selectCount, selectTotal, useCart } from '../store/cart'
import { SITE, WHATSAPP_URL } from '../lib/constants'
import { useSeo } from '../lib/seo'

export function CartPage() {
  const { items, clearCart } = useCart()
  const total = selectTotal(items)
  const count = selectCount(items)
  const multi = items.length > 1 || count > 1

  const confirmClear = () => {
    if (window.confirm('¿Vaciar todo el carrito?')) clearCart()
  }

  useSeo({
    title: `Carrito | ${SITE.name}`,
    description: 'Revisa tu pedido antes de confirmarlo.',
    path: '/carrito',
    noindex: true,
  })

  return (
    <div className="mx-auto min-h-[70vh] max-w-5xl px-4 pb-24 pt-32 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-dark">
          Carrito de compra
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">Carrito</h1>
        <p className="mt-2 text-ink/70">
          {count} {count === 1 ? 'producto' : 'productos'} · Paga en efectivo al recibir
          (contraentrega)
        </p>
      </motion.header>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass grain flex flex-col items-center gap-5 rounded-[2rem] px-6 py-20 text-center"
        >
          <div className="grid size-24 place-items-center rounded-full glass-rose">
            <ShoppingBag className="size-10 text-rose" />
          </div>
          <div>
            <p className="font-display text-2xl font-semibold">Tu carrito está vacío</p>
            <p className="mt-2 max-w-sm text-ink/70">
              Carrito vacío. Agrega un producto desde el catálogo.
            </p>
          </div>
          <LinkButton to="/productos" size="lg">
            Ver productos
          </LinkButton>
        </motion.div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={cartKey(item)}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, margin: 0 }}
                  className="grain"
                >
                  <CartItemRow item={item} />
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton to="/productos" variant="ghost" size="sm">
                Seguir comprando
              </LinkButton>
              <button
                type="button"
                onClick={confirmClear}
                className="text-sm font-semibold text-rose-dark underline-offset-4 hover:underline"
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-dark grain h-fit rounded-3xl p-5 text-cream sm:p-6 lg:sticky lg:top-28"
          >
            <h2 className="font-display text-xl font-semibold">Resumen</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-cream/70">
                <span>Subtotal</span>
                <span>{formatCOP(total)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Envío</span>
                <span>Se coordina · 2 días</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex items-end justify-between">
                  <span className="text-cream/70">Total</span>
                  <span className="font-display text-3xl font-semibold text-gradient-rose">
                    {formatCOP(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-2">
              <LinkButton
                to="/checkout"
                size="lg"
                className="w-full justify-center text-center"
              >
                Finalizar pedido
                <span className="mt-0.5 block w-full text-center text-xs font-medium opacity-80">
                  Contraentrega · {formatCOP(total)}
                </span>
              </LinkButton>
              <p className="text-center text-[11px] leading-relaxed text-cream/70">
                Pagas en efectivo al recibir. Envío en 2 días a tu puerta.
                {multi ? ' Varios productos: un solo pedido contraentrega.' : ''}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="text-center text-xs text-cream/75 underline-offset-4 hover:text-rose-light hover:underline"
              >
                ¿Dudas? Escríbenos por WhatsApp
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </div>
  )
}
