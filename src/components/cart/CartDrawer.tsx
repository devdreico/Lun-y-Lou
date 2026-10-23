import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { cartKey, selectCount, selectTotal, useCart } from '../../store/cart'
import { formatCOP } from '../../lib/format'
import { Button, LinkButton } from '../ui/Button'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { WHATSAPP_URL } from '../../lib/constants'
import { CartItemRow } from './CartItemRow'

export function CartDrawer() {
  const { items, isOpen, setOpen, clearCart } = useCart()
  const count = selectCount(items)
  const total = selectTotal(items)
  const panelRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => setOpen(false), [setOpen])
  useFocusTrap({ active: isOpen, containerRef: panelRef, onEscape: close })

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const confirmClear = () => {
    if (window.confirm('¿Vaciar todo el carrito?')) clearCart()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-[min(420px,100vw)] flex-col border-l border-white/40 bg-cream/85 shadow-2xl backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            tabIndex={-1}
          >
            <header className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-rose" />
                <h2 className="font-display text-xl font-semibold">Carrito</h2>
                <span className="rounded-full bg-rose/12 px-2 py-0.5 text-xs font-bold text-rose-dark">
                  {count}
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white/60 transition hover:bg-white hover:rotate-90"
                aria-label="Cerrar carrito"
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
                  <p className="mt-1 text-sm text-ink/70">Agrega productos desde el catálogo.</p>
                </div>
                <LinkButton to="/productos" onClick={close}>
                  Ver productos
                </LinkButton>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={cartKey(item)}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                      >
                        <CartItemRow item={item} onNavigate={close} />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="rounded-2xl border border-dashed border-rose/30 bg-rose/5 p-3 text-xs text-ink/65">
                    Paga en <strong>efectivo al recibir</strong> · Envío en 2 días a tu puerta.
                  </div>
                </div>

                <footer className="space-y-3 border-t border-ink/8 px-5 py-4">
                  <div className="flex items-center justify-between text-sm text-ink/70">
                    <span>Subtotal</span>
                    <span className="font-display text-2xl font-semibold text-ink">
                      {formatCOP(total)}
                    </span>
                  </div>
                  <p className="text-xs text-ink/65">
                    Envío se coordina al confirmar. Contraentrega en toda Colombia.
                  </p>

                  <div className="grid gap-2">
                    <LinkButton to="/checkout" onClick={close} className="w-full" size="lg">
                      Pedir a contraentrega
                    </LinkButton>

                    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={close}
                        className="w-full"
                      >
                        Seguir comprando
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={confirmClear}
                        className="w-full !text-rose-dark"
                      >
                        Vaciar
                      </Button>
                    </div>

                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-center text-xs text-ink/65 underline-offset-4 hover:text-rose-dark hover:underline"
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
