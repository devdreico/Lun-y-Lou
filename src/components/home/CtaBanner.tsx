import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LinkButton } from '../ui/Button'

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-dark grain relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-center md:py-20"
      >
        <div className="absolute -left-20 -top-20 size-64 rounded-full bg-rose/35 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 size-72 rounded-full bg-gold/25 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light ring-1 ring-white/15">
            <Heart className="size-3.5" /> Hecho para brillar
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-cream md:text-5xl">
            Tu estilo merece llegar{' '}
            <span className="italic text-gradient-rose">a toda Colombia</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/70 md:text-base">
            Compra con Mercado Pago o pide a contraentrega. En Lun & Lou cada prenda tiene su
            link único de pago y su pedido listo para ti.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LinkButton to="/productos" size="lg" className="group">
              Ir a la tienda
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </LinkButton>
            <Link
              to="/carrito"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-medium text-cream backdrop-blur transition hover:bg-white/20 active:scale-95"
            >
              Ver carrito
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
