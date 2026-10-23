import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCOP } from '../../lib/format'
import { cartKey, useCart } from '../../store/cart'
import type { CartItem } from '../../types'

interface Props {
  item: CartItem
  /** Cierra el drawer al navegar (no aplica en la página de carrito). */
  onNavigate?: () => void
}

export function CartItemRow({ item, onNavigate }: Props) {
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeItem = useCart((s) => s.removeItem)
  const key = cartKey(item)
  const max = item.stock ?? 20

  return (
    <div className="glass flex gap-3 rounded-2xl p-3">
      <Link
        to={`/producto/${item.slug}`}
        onClick={onNavigate}
        className="size-20 shrink-0 overflow-hidden rounded-xl bg-cream-dark"
      >
        <img
          src={item.image}
          alt=""
          width={80}
          height={80}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/producto/${item.slug}`}
            onClick={onNavigate}
            className="truncate text-sm font-semibold hover:text-rose-dark"
          >
            {item.name}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(key)}
            className="text-ink/65 transition hover:text-rose"
            aria-label={`Quitar ${item.name} del carrito`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div
            className="flex items-center rounded-full border border-ink/10 bg-white/70"
            role="group"
            aria-label={`Cantidad de ${item.name}`}
          >
            <button
              type="button"
              onClick={() => updateQuantity(key, item.quantity - 1)}
              className="grid size-8 place-items-center rounded-full transition hover:bg-rose/10 active:scale-90"
              aria-label={`Quitar uno de ${item.name}`}
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(key, item.quantity + 1)}
              disabled={item.quantity >= max}
              className="grid size-8 place-items-center rounded-full transition hover:bg-rose/10 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Agregar uno de ${item.name}`}
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <p className="text-sm font-semibold">{formatCOP(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  )
}
