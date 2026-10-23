import { motion } from 'framer-motion'
import { ArrowRight, Clock, Heart, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LinkButton } from '../ui/Button'
import { SITE, WHATSAPP_URL } from '../../lib/constants'

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-dark grain relative overflow-hidden rounded-[2rem] px-5 py-12 text-center sm:px-6 sm:py-14 md:rounded-[2.5rem] md:py-20"
      >
        <div className="absolute -left-20 -top-20 size-64 rounded-full bg-rose/35 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 size-72 rounded-full bg-gold/25 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light ring-1 ring-white/15">
            <Heart className="size-3.5" /> {SITE.shippingPromise}
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-cream md:text-5xl">
            Paga en efectivo{' '}
            <span className="italic text-gradient-rose">al recibir</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/70 md:text-base">
            Sin tarjetas, sin anticipos, sin sorpresas. Eliges tus productos, llegan en 2
            días a tu puerta y pagas solo cuando el paquete esté en tus manos.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <LinkButton to="/productos" size="lg" className="group">
              Ir a la tienda
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </LinkButton>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-medium text-cream backdrop-blur transition hover:bg-white/20 active:scale-95"
            >
              <MessageCircle className="size-4" /> WhatsApp {SITE.phoneDisplay}
            </a>
            <Link
              to="/carrito"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-medium text-cream backdrop-blur transition hover:bg-white/20 active:scale-95"
            >
              Ver carrito
            </Link>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-cream/55">
            <Clock className="size-3.5 text-gold" /> Pedidos confirmados hoy salen hoy mismo
          </p>
        </div>
      </motion.div>
    </section>
  )
}
