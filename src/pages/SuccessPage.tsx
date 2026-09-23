import { motion } from 'framer-motion'
import {
  CheckCircle2,
  ExternalLink,
  Home,
  MapPin,
  MessageCircle,
  Package,
  ShoppingBag,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { LinkButton } from '../components/ui/Button'
import { formatCOP } from '../lib/format'
import { WHATSAPP_URL, SITE } from '../lib/constants'
import { readOrderConfirm, type OrderConfirm } from '../lib/orderConfirm'

function isOrderConfirm(value: unknown): value is OrderConfirm {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'method' in value &&
      'items' in value &&
      Array.isArray((value as OrderConfirm).items),
  )
}

export function SuccessPage() {
  const location = useLocation()
  const fromNav = location.state
  const order: OrderConfirm | null = isOrderConfirm(fromNav)
    ? fromNav
    : readOrderConfirm()

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 pb-24 pt-32 text-center">
        <div className="glass grain rounded-[2rem] px-6 py-12">
          <ShoppingBag className="mx-auto size-10 text-rose" />
          <h1 className="mt-4 font-display text-2xl font-semibold">Sin pedido que mostrar</h1>
          <p className="mt-2 text-sm text-ink/60">
            Esta página muestra la confirmación del último pedido. Si acabas de pagar, vuelve
            desde el botón correspondiente.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LinkButton to="/productos">Ver productos</LinkButton>
            <LinkButton to="/" variant="ghost">
              Ir al inicio
            </LinkButton>
          </div>
        </div>
      </div>
    )
  }

  const isMp = order.method === 'mp'
  const firstName = order.name?.split(' ')[0]
  const waText = encodeURIComponent(
    isMp
      ? `¡Hola ${SITE.name}! Acabo de iniciar el pago con Mercado Pago${
          firstName ? ` (${firstName})` : ''
        }. ¿Me confirman el pedido?`
      : `¡Hola ${SITE.name}! Acabo de confirmar un pedido contraentrega${
          order.city ? ` para ${order.city}` : ''
        }${firstName ? ` a nombre de ${firstName}` : ''}. ¿Me confirman los detalles de envío?`,
  )

  return (
    <div className="mx-auto flex min-h-[85vh] max-w-xl flex-col items-center justify-center px-4 pb-24 pt-32 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative"
      >
        <div className="absolute inset-0 -m-4 rounded-full bg-forest/15 blur-2xl" />
        <span className="relative grid size-24 place-items-center rounded-full bg-gradient-to-br from-forest to-forest-dark text-cream shadow-forest sm:size-28">
          <CheckCircle2 className="size-12 sm:size-14" />
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-rose-dark"
      >
        Confirmación de pedido
      </motion.p>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-2 font-display text-3xl font-semibold sm:text-4xl"
      >
        {isMp ? 'Pedido listo para pagar' : '¡Pedido recibido!'}
      </motion.h1>

      <motion.p
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-3 max-w-md text-ink/60"
      >
        {isMp
          ? `${firstName ? firstName + ', ' : ''}revisa el resumen y continúa a Mercado Pago para completar el pago con tarjeta, PSE o Nequi.`
          : `${firstName ? firstName + ', ' : ''}recibimos tu pedido${
              order.city ? ` para ${order.city}` : ''
            }. Te escribimos por WhatsApp para coordinar el despacho y el pago en efectivo al recibir.`}
      </motion.p>

      {order.demo && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 rounded-full border border-dashed border-gold/50 bg-gold/10 px-4 py-2 text-xs text-ink/65"
        >
          Modo demostración: configura <code>VITE_FORMSPREE_ID</code> para recibir pedidos
          reales.
        </motion.p>
      )}

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="glass grain mt-8 w-full rounded-3xl p-5 text-left sm:p-6"
      >
        <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">
            Resumen
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
              isMp ? 'bg-rose/12 text-rose-dark' : 'bg-forest/12 text-forest-dark'
            }`}
          >
            {isMp ? 'Mercado Pago' : 'Contraentrega'}
          </span>
        </div>

        <ul className="mt-4 space-y-3">
          {order.items.map((item) => (
            <li key={item.productId} className="flex gap-3">
              <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-cream-dark">
                {item.image ? (
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-ink/50">{item.quantity}×</p>
              </div>
              <p className="text-sm font-semibold">
                {formatCOP(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-3">
          <span className="text-sm text-ink/55">Total</span>
          <span className="font-display text-2xl font-semibold text-gradient-rose">
            {formatCOP(order.total)}
          </span>
        </div>

        {!isMp && (order.city || order.address || order.phone) ? (
          <div className="mt-4 space-y-1.5 rounded-2xl bg-white/45 p-3 text-xs text-ink/65 ring-1 ring-ink/8">
            {order.name ? (
              <p className="font-semibold text-ink/80">{order.name}</p>
            ) : null}
            {order.phone ? <p>Celular: {order.phone}</p> : null}
            {order.city || order.address ? (
              <p className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-rose" />
                <span>
                  {[order.address, order.city].filter(Boolean).join(' · ')}
                </span>
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-4 space-y-2.5 text-sm text-ink/70">
          {isMp ? (
            <>
              <p className="flex items-center gap-2">
                <ExternalLink className="size-4 text-rose" /> Continúa en Mercado Pago para
                pagar
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="size-4 text-forest" /> Te confirmamos el pedido por
                WhatsApp
              </p>
            </>
          ) : (
            <>
              <p className="flex items-center gap-2">
                <Package className="size-4 text-rose" /> Preparamos el paquete
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="size-4 text-forest" /> Coordinamos fecha por
                WhatsApp
              </p>
              <p className="flex items-center gap-2">
                <Home className="size-4 text-gold" /> Pagas en efectivo al recibir
              </p>
            </>
          )}
        </div>
      </motion.div>

      <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
        {isMp && order.mpUrl ? (
          <a
            href={order.mpUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-dark btn-lg w-full justify-center sm:w-auto"
          >
            Continuar a Mercado Pago <ExternalLink className="size-4" />
          </a>
        ) : (
          <a
            href={`${WHATSAPP_URL}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="btn-dark btn-lg w-full justify-center sm:w-auto"
          >
            <MessageCircle className="size-4" /> Confirmar por WhatsApp
          </a>
        )}
        <LinkButton to="/productos" variant="ghost" className="w-full justify-center sm:w-auto">
          Seguir comprando
        </LinkButton>
      </div>

      <Link
        to="/"
        className="mt-4 text-sm text-ink/45 underline-offset-4 hover:text-rose-dark hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
