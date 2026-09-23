import { motion } from 'framer-motion'
import { ArrowRight, CreditCard, PackageCheck, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProducts } from '../../data/products'
import { ProductCard } from '../product/ProductCard'
import { SectionHeading } from '../ui/SectionHeading'

export function FeaturedSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Destacados"
            title={
              <>
                Piezas que <span className="text-gradient-rose italic">amarán</span> nuestras clientas
              </>
            }
            description="Selección curada de la temporada — stock limitado."
          />
          <Link
            to="/productos"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/50 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:border-rose/40 hover:shadow-glass"
          >
            Ver todos
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    icon: CreditCard,
    title: 'Mercado Pago',
    text: 'Link de pago único por producto. Tarjeta, PSE, Nequi y más.',
    accent: 'text-rose',
    ring: 'from-rose/25',
  },
  {
    icon: Wallet,
    title: 'Contraentrega',
    text: 'Paga en efectivo cuando recibas tu pedido en la puerta.',
    accent: 'text-gold',
    ring: 'from-gold/30',
  },
  {
    icon: PackageCheck,
    title: 'Envíos nacionales',
    text: 'Despachamos a todo Colombia con seguimiento.',
    accent: 'text-forest',
    ring: 'from-forest/25',
  },
]

export function PerksSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-5 md:grid-cols-3">
        {perks.map((perk, i) => (
          <motion.div
            key={perk.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="glass grain relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1.5 hover:shadow-glass-lg"
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
    </section>
  )
}
