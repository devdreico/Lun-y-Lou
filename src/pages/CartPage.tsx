import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, LinkButton } from '../components/ui/Button'
import { formatCOP } from '../lib/format'
import { cartKey, selectCount, selectTotal, useCart } from '../store/cart'

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const total = selectTotal(items)
  const count = selectCount(items)
  const multi = items.length > 1 || count > 1

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
        <p className="mt-2 text-ink/55">
          {multi
            ? `${count} productos · Pedidos con varios productos solo a contraentrega`
            : `${count} producto · Puedes pagar con Mercado Pago o pedir a contraentrega`}
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
            <p className="mt-2 max-w-sm text-ink/55">
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
              {items.map((item) => {
                const key = cartKey(item)
                return (
                  <motion.div
                    key={key}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30, height: 0, margin: 0 }}
                    className="glass grain flex gap-4 rounded-3xl p-4"
                  >
                    <Link
                      to={`/producto/${item.slug}`}
                      className="size-24 shrink-0 overflow-hidden rounded-2xl bg-cream-dark sm:size-28"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to={`/producto/${item.slug}`}
                            className="font-display text-base font-semibold leading-snug hover:text-rose-dark sm:text-lg"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(key)}
                          className="rounded-full p-2 text-ink/40 transition hover:bg-rose/10 hover:text-rose"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                        <div className="flex items-center rounded-full border border-ink/10 bg-white/60">
                          <button
                            type="button"
                            onClick={() => updateQuantity(key, item.quantity - 1)}
                            className="grid size-9 place-items-center rounded-full transition hover:bg-rose/10 active:scale-90"
                            aria-label="Restar"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(key, item.quantity + 1)}
                            className="grid size-9 place-items-center rounded-full transition hover:bg-rose/10 active:scale-90"
                            aria-label="Sumar"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-semibold">
                            {formatCOP(item.price * item.quantity)}
                          </span>
                          {!multi && item.mpPaymentUrl ? (
                            <a
                              href={item.mpPaymentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-dark btn-sm"
                            >
                              Pagar MP <ExternalLink className="size-3" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton to="/productos" variant="ghost" size="sm">
                Seguir comprando
              </LinkButton>
              <Button variant="ghost" size="sm" onClick={clearCart} className="!text-rose-dark">
                Vaciar carrito
              </Button>
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
                <span>Se coordina</span>
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
              <p className="text-center text-[11px] leading-relaxed text-cream/50">
                {multi
                  ? 'Los pedidos con varios productos se piden a contraentrega. Para pagar con Mercado Pago, compra un producto a la vez desde su ficha.'
                  : 'Con 1 producto puedes pagar con Mercado Pago desde la ficha o continuar a contraentrega.'}
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </div>
  )
}
