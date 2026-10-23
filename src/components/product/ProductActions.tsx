import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Banknote, Clock, Truck } from 'lucide-react'
import { formatCOP } from '../../lib/format'
import type { Product } from '../../types'
import { useCart } from '../../store/cart'
import { Button } from '../ui/Button'
import { toast } from '../../lib/toast'

interface Props {
  product: Product
}

export function ProductActions({ product }: Props) {
  const addItem = useCart((s) => s.addItem)
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    addItem(product, { quantity: qty })
    toast({ title: 'Agregado al carrito', message: product.name })
  }

  /** Individual a contraentrega: agrega y va al checkout. */
  const handleContraentrega = () => {
    addItem(product, { quantity: qty })
    navigate('/checkout')
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/65">
          Cantidad
        </p>
        <div
          className="inline-flex items-center rounded-full border border-ink/10 bg-white/60 p-1 backdrop-blur"
          role="group"
          aria-label="Cantidad"
        >
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-11 place-items-center rounded-full text-lg transition hover:bg-rose/10 active:scale-90"
            aria-label="Quitar uno"
          >
            −
          </button>
          <motion.span
            key={qty}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-10 text-center font-display text-lg font-semibold"
            aria-live="polite"
          >
            {qty}
          </motion.span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            disabled={qty >= product.stock}
            className="grid size-11 place-items-center rounded-full text-lg transition hover:bg-rose/10 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Agregar uno"
          >
            +
          </button>
        </div>
        {product.stock <= 5 && (
          <p className="mt-2 text-xs font-semibold text-rose-dark">
            Quedan {product.stock} unidades
          </p>
        )}
      </div>

      <div className="grid gap-3">
        <Button
          size="lg"
          onClick={handleContraentrega}
          className="w-full justify-center text-center"
        >
          <Banknote className="size-4 shrink-0" />
          <span className="min-w-0">
            Pedir a contraentrega
            <span className="mt-0.5 block text-xs font-medium opacity-80">
              {formatCOP(product.price * qty)} · pagas al recibir
            </span>
          </span>
        </Button>

        <Button variant="ghost" onClick={handleAdd} className="w-full justify-center">
          Agregar al carrito
        </Button>

        <div className="space-y-1.5 rounded-2xl border border-forest/20 bg-forest/5 px-4 py-3 text-[11px] leading-relaxed text-ink/60">
          <p className="flex items-center gap-2">
            <Banknote className="size-3.5 shrink-0 text-forest" /> Pagas en efectivo al
            recibir el paquete
          </p>
          <p className="flex items-center gap-2">
            <Clock className="size-3.5 shrink-0 text-rose" /> Envío en 2 días a tu puerta
          </p>
        </div>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-ink/65">
          <Truck className="size-3.5 shrink-0 text-forest" /> Envíos a toda Colombia ·
          Sábana Occidental
        </p>
      </div>
    </div>
  )
}
