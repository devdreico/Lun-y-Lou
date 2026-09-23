import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ShieldCheck, Truck } from 'lucide-react'
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
  const [size, setSize] = useState(
    product.sizes[Math.min(1, product.sizes.length - 1)] ?? product.sizes[0],
  )
  const [color, setColor] = useState(product.colors[0]?.name ?? 'Único')
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
    addItem(product, { size, color, quantity: qty })
    toast({ title: 'Agregado al carrito', message: `${product.name} · ${size}` })
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
          Talla
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`min-w-11 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                size === s
                  ? 'bg-rose text-white shadow-rose scale-105'
                  : 'glass text-ink/70 hover:border-rose/40 hover:text-ink active:scale-95'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
          Color · <span className="text-ink/70">{color}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              title={c.name}
              aria-label={c.name}
              className={`relative size-10 rounded-full transition-all duration-300 ${
                color === c.name
                  ? 'scale-110 ring-2 ring-rose ring-offset-2 ring-offset-cream'
                  : 'ring-1 ring-ink/15 hover:scale-105'
              }`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
          Cantidad
        </p>
        <div className="inline-flex items-center rounded-full border border-ink/10 bg-white/60 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-10 place-items-center rounded-full text-lg transition hover:bg-rose/10 active:scale-90"
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
            className="grid size-10 place-items-center rounded-full text-lg transition hover:bg-rose/10 active:scale-90"
          >
            +
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        <Button size="lg" onClick={handleAdd} className="w-full">
          Agregar al carrito · {formatCOP(product.price * qty)}
        </Button>

        {hasMpLink ? (
          <a
            href={mpHref}
            target="_blank"
            rel="noreferrer"
            className="btn-dark w-full"
          >
            <ShieldCheck className="size-4" /> Pagar ahora con Mercado Pago
            <ExternalLink className="size-3.5 opacity-70" />
          </a>
        ) : (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-white/40 px-4 py-3 text-center text-xs leading-relaxed text-ink/55">
            Link de Mercado Pago pendiente de configurar en{' '}
            <code className="rounded bg-ink/8 px-1.5 py-0.5">products.ts → mpPaymentUrl</code>
            . Mientras tanto, puedes pedir a contraentrega desde el carrito.
          </div>
        )}

        <p className="flex items-center justify-center gap-2 text-xs text-ink/50">
          <Truck className="size-3.5 text-forest" /> Envíos a toda Colombia · Contraentrega
          disponible
        </p>
      </div>
    </div>
  )
}
