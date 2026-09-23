import { motion } from 'framer-motion'
import { CheckCircle2, Home, MessageCircle, Package } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { LinkButton } from '../components/ui/Button'
import { WHATSAPP_URL, SITE } from '../lib/constants'

interface LocationState {
  demo?: boolean
  name?: string
  city?: string
}

export function SuccessPage() {
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState

  const waText = encodeURIComponent(
    `¡Hola ${SITE.name}! Acabo de confirmar un pedido contraentrega${
      state.city ? ` para ${state.city}` : ''
    }. ¿Me confirman los detalles de envío?`,
  )

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-4 pb-24 pt-32 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative"
      >
        <div className="absolute inset-0 -m-4 rounded-full bg-forest/15 blur-2xl" />
        <span className="relative grid size-28 place-items-center rounded-full bg-gradient-to-br from-forest to-forest-dark text-cream shadow-forest">
          <CheckCircle2 className="size-14" />
        </span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-8 font-display text-4xl font-semibold"
      >
        ¡Pedido recibido!
      </motion.h1>

      <motion.p
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-3 text-ink/60"
      >
        {state.name ? `Gracias, ${state.name.split(' ')[0]}. ` : 'Gracias. '}
        Te contactaremos pronto para coordinar el despacho a contraentrega
        {state.city ? ` hacia ${state.city}` : ''} en toda Colombia.
      </motion.p>

      {state.demo && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 rounded-full border border-dashed border-gold/50 bg-gold/10 px-4 py-2 text-xs text-ink/65"
        >
          Modo demostración: configura <code>VITE_FORMSPREE_ID</code> para recibir pedidos reales.
        </motion.p>
      )}

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="glass grain mt-8 w-full rounded-3xl p-6 text-left"
      >
        <div className="space-y-3 text-sm text-ink/70">
          <p className="flex items-center gap-2">
            <Package className="size-4 text-rose" /> Empacamos tu pedido con cuidado
          </p>
          <p className="flex items-center gap-2">
            <MessageCircle className="size-4 text-forest" /> Coordinamos horario por WhatsApp
          </p>
          <p className="flex items-center gap-2">
            <Home className="size-4 text-gold" /> Pagas en efectivo al recibir en tu puerta
          </p>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={`${WHATSAPP_URL}?text=${waText}`} target="_blank" rel="noreferrer" className="btn-dark">
          <MessageCircle className="size-4" /> Confirmar por WhatsApp
        </a>
        <LinkButton to="/productos" variant="ghost">
          Seguir comprando
        </LinkButton>
      </div>
    </div>
  )
}
