import { motion } from 'framer-motion'
import { ArrowRight, Clock, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProducts } from '../../data/products'
import { SITE, WHATSAPP_URL } from '../../lib/constants'
import { ProductCard } from '../product/ProductCard'
import { SectionHeading } from '../ui/SectionHeading'

export function FeaturedSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Destacados"
            title={
              <>
                Productos <span className="text-gradient-rose italic">destacados</span>
              </>
            }
            description={`${SITE.shippingPromise}, paga en efectivo al recibir y elige a tu ritmo: aquí no hay membresías ni suscripciones.`}
          />
          <Link
            to="/productos"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/50 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:border-rose/40 hover:shadow-glass"
          >
            Ver todos
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featuredProducts.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const perks = [
  {
    icon: Clock,
    title: 'Envío en 2 días',
    text: 'Despachamos desde la Sábana Occidental a cualquier ciudad de Colombia. En 2 días hábiles el paquete está en tu puerta y coordinamos la entrega por WhatsApp.',
    accent: 'text-rose',
    ring: 'from-rose/25',
  },
  {
    icon: Sparkles,
    title: 'Contraentrega',
    text: 'Sin tarjetas ni anticipos: ves el paquete en la puerta y pagas en efectivo al recibir. Si no lo quieres, no lo aceptas. Cero riesgo.',
    accent: 'text-gold',
    ring: 'from-gold/30',
  },
  {
    icon: MessageCircle,
    title: 'Atención personal',
    text: `Escríbenos al ${SITE.phoneDisplay} y te contesta una persona real: te ayudamos a elegir según tu piel, tu cabello y tu presupuesto.`,
    accent: 'text-forest',
    ring: 'from-forest/25',
  },
]

export function PerksSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-5 md:grid-cols-3">
        {perks.map((perk, i) => (
          <motion.div
            key={perk.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="glass grain relative overflow-hidden rounded-3xl p-5 transition hover:-translate-y-1.5 hover:shadow-glass-lg sm:p-6"
          >
            <div
              className={`pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br ${perk.ring} to-transparent blur-2xl`}
            />
            <div className="relative">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/70 ring-1 ring-white/60">
                <perk.icon className={`size-5 ${perk.accent}`} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{perk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{perk.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="glass-dark grain mt-6 flex flex-col items-center gap-4 rounded-3xl px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left"
      >
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20">
            <img src="/logo.png" alt="" className="size-11 object-contain" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-cream sm:text-xl">
              El valor Lun &amp; Lou
            </p>
            <p className="mt-0.5 text-sm text-cream/75">
              Belleza de calidad, precio honesto y entrega sin complicaciones — para pieles y
              cabellos de todo tipo, para él y para ella.
            </p>
          </div>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-primary btn-sm shrink-0"
        >
          <MessageCircle className="size-4" /> Escribir ahora
        </a>
      </motion.div>
    </section>
  )
}
