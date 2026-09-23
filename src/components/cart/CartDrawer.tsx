import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cartKey, selectCount, selectTotal, useCart } from '../../store/cart'
import { formatCOP } from '../../lib/format'
import { Button, LinkButton } from '../ui/Button'
import { WHATSAPP_URL } from '../../lib/constants'

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, clearCart } = useCart()
  const count = selectCount(items)
  const total = selectTotal(items)
  const multi = items.length > 1 || count > 1
  const singleMp =
    !multi && items.length === 1 && Boolean(items[0]?.mpPaymentUrl)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-[min(420px,100vw)] flex-col border-l border-white/40 bg-cream/85 shadow-2xl backdrop-blur-2xl"
            aria-label="Carrito de compras"
          >
            <header className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-rose" />
                <h2 className="font-display text-xl font-semibold">Tu carrito</h2>
                <span className="rounded-full bg-rose/12 px-2 py-0.5 text-xs font-bold text-rose-dark">
                  {count}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white/60 transition hover:bg-white hover:rotate-90"
                aria-label="Cerrar"
              >
                <X className="size-4" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid size-20 place-items-center rounded-full glass-rose">
                  <ShoppingBag className="size-8 text-rose" />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold">Carrito vacío</p>
                  <p className="mt-1 text-sm text-ink/55">
                    Explora la tienda y llena tu bolsa con favoritos.
                  </p>
                </div>
                <LinkButton to="/productos" onClick={() => setOpen(false)}>
                  Ver productos
                </LinkButton>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const key = cartKey(item)
                      return (
                        <motion.div
                          key={key}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                          className="glass flex gap-3 rounded-2xl p-3"
                        >
                          <Link
                            to={`/producto/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="size-20 shrink-0 overflow-hidden rounded-xl bg-cream-dark"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </Link>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                to={`/producto/${item.slug}`}
                                onClick={() => setOpen(false)}
                                className="truncate text-sm font-semibold hover:text-rose-dark"
                              >
                                {item.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeItem(key)}
                                className="text-ink/40 transition hover:text-rose"
                                aria-label="Quitar"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                              <div className="flex items-center rounded-full border border-ink/10 bg-white/70">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(key, item.quantity - 1)}
                                  className="grid size-8 place-items-center rounded-full transition hover:bg-rose/10 active:scale-90"
                                  aria-label="Menos"
                                >
                                  <Minus className="size-3.5" />
                                </button>
                                <span className="w-6 text-center text-sm font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(key, item.quantity + 1)}
                                  className="grid size-8 place-items-center rounded-full transition hover:bg-rose/10 active:scale-90"
                                  aria-label="Más"
                                >
                                  <Plus className="size-3.5" />
                                </button>
                              </div>
                              <p className="text-sm font-semibold">
                                {formatCOP(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>

                  {multi ? (
                    <div className="rounded-2xl border border-dashed border-rose/30 bg-rose/5 p-3 text-xs text-ink/65">
                      Varios productos: este pedido se finaliza <strong>solo a contraentrega</strong>.
                      Para pagar con Mercado Pago, compra un producto a la vez desde su ficha.
                    </div>
                  ) : singleMp ? (
                    <div className="rounded-2xl border border-dashed border-rose/30 bg-rose/5 p-3 text-xs text-ink/65">
                      1 producto: puedes pagar ya con <strong>Mercado Pago</strong> o pedir a
                      contraentrega.
                    </div>
                  ) : null}
                </div>

                <footer className="space-y-3 border-t border-ink/8 px-5 py-4">
                  <div className="flex items-center justify-between text-sm text-ink/60">
                    <span>Subtotal</span>
                    <span className="font-display text-2xl font-semibold text-ink">
                      {formatCOP(total)}
                    </span>
                  </div>
                  <p className="text-xs text-ink/45">
                    Envío se coordina al confirmar. Contraentrega en toda Colombia.
                  </p>

                  <div className="grid gap-2">
                    <LinkButton
                      to="/checkout"
                      onClick={() => setOpen(false)}
                      className="w-full"
                      size="lg"
                    >
                      Pedir a contraentrega
                    </LinkButton>

                    {singleMp && (
                      <a
                        href={items[0].mpPaymentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-dark w-full"
                      >
                        Pagar con Mercado Pago
                      </a>
                    )}

                    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpen(false)}
                        className="w-full"
                      >
                        Seguir comprando
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="w-full !text-rose-dark"
                      >
                        Vaciar
                      </Button>
                    </div>

                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-center text-xs text-ink/50 underline-offset-4 hover:text-rose-dark hover:underline"
                    >
                      ¿Dudas? Escríbenos por WhatsApp
                    </a>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
