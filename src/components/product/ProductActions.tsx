import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, ShieldCheck, Truck, Banknote } from 'lucide-react'
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

  const hasMpLink = Boolean(product.mpPaymentUrl)
  const mpHref = useMemo(() => {
    if (!product.mpPaymentUrl) return '#'
    try {
      const url = new URL(product.mpPaymentUrl)
      return url.toString()
    } catch {
      return product.mpPaymentUrl
    }
  }, [product.mpPaymentUrl])

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
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
          Cantidad
        </p>
        <div className="inline-flex items-center rounded-full border border-ink/10 bg-white/60 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-11 place-items-center rounded-full text-lg transition hover:bg-rose/10 active:scale-90"
          >
            −
          </button>
          <motion.span
            key={qty}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-10 text-center font-display text-lg font-semibold"
          >
            {qty}
          </motion.span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="grid size-11 place-items-center rounded-full text-lg transition hover:bg-rose/10 active:scale-90"
          >
            +
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {hasMpLink ? (
          <a
            href={mpHref}
            target="_blank"
            rel="noreferrer"
            className="btn-dark btn-lg w-full text-center"
          >
            <ShieldCheck className="size-4 shrink-0" />
            <span className="min-w-0">
              Pagar con Mercado Pago
              <span className="mt-0.5 block text-xs font-medium opacity-80">
                {formatCOP(product.price * qty)}
              </span>
            </span>
            <ExternalLink className="size-3.5 shrink-0 opacity-70" />
          </a>
        ) : null}

        <Button
          size="lg"
          onClick={handleContraentrega}
          className="w-full justify-center text-center"
        >
          <Banknote className="size-4 shrink-0" />
          <span className="min-w-0">
            Pedir a contraentrega
            <span className="mt-0.5 block text-xs font-medium opacity-80">
              {formatCOP(product.price * qty)}
            </span>
          </span>
        </Button>

        <Button variant="ghost" onClick={handleAdd} className="w-full justify-center">
          Agregar al carrito
        </Button>

        <p className="text-center text-[11px] leading-relaxed text-ink/50">
          {hasMpLink
            ? 'MP = pago inmediato (1 producto). Contraentrega = pagas en efectivo al recibir. Carrito con varios productos: solo contraentrega.'
            : 'Contraentrega: pagas en efectivo al recibir. Envíos a toda Colombia.'}
        </p>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-ink/50">
          <Truck className="size-3.5 shrink-0 text-forest" /> Envíos a toda Colombia · Sábana
          Occidental
        </p>
      </div>
    </div>
  )
}
