import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Truck, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LinkButton } from '../ui/Button'

const HeroScene = lazy(() =>
  import('../three/HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,63,95,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(46,74,61,0.16),transparent_45%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-rose/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-rose-dark"
          >
            <Sparkles className="size-3.5" /> Nueva colección
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Moda femenina{' '}
            <span className="text-gradient-rose italic">que se siente</span>{' '}
            como tú
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/65 md:text-lg lg:mx-0"
          >
            Lun y Lou lleva estilo, calidad y entrega a toda Colombia. Paga seguro con Mercado
            Pago o recibe tu pedido a contraentrega.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <LinkButton to="/productos" size="lg" className="group">
              Explorar tienda
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </LinkButton>
            <LinkButton to="/productos?cat=vestidos" variant="ghost" size="lg">
              Ver vestidos
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-ink/55 lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1.5 ring-1 ring-ink/8">
              <Truck className="size-3.5 text-forest" /> Envío nacional
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1.5 ring-1 ring-ink/8">
              <ShieldCheck className="size-3.5 text-rose" /> Mercado Pago
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1.5 ring-1 ring-ink/8">
              <Sparkles className="size-3.5 text-gold" /> Contraentrega
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="glass grain relative aspect-square overflow-hidden rounded-[2.5rem] p-2 shadow-glass-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose/20 via-cream to-forest/15">
              <Suspense
                fallback={
                  <div className="grid h-full w-full place-items-center">
                    <div className="size-16 animate-spin rounded-full border-[3px] border-rose/30 border-t-rose" />
                  </div>
                }
              >
                <HeroScene />
              </Suspense>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div className="glass rounded-2xl px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50">Desde</p>
                  <p className="font-display text-xl font-semibold text-ink">$59.900</p>
                </div>
                <div className="glass rounded-full px-4 py-2.5 text-xs font-semibold text-forest-dark">
                  3D · Live
                </div>
              </div>
            </div>
          </div>

          <div className="glass absolute -left-3 top-8 hidden rounded-2xl px-4 py-3 text-sm shadow-glass animate-float sm:block">
            <p className="font-semibold text-ink">Envíos a 1.100+ ciudades</p>
            <p className="text-xs text-ink/50">Todo Colombia</p>
          </div>
          <div className="glass absolute -right-2 bottom-16 hidden rounded-2xl px-4 py-3 text-sm shadow-glass animate-float-slow sm:block">
            <p className="font-semibold text-ink">Pago flexible</p>
            <p className="text-xs text-ink/50">MP o contraentrega</p>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <div className="glass grain flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-5">
          {[
            { k: '10K+', v: 'Clientas felices' },
            { k: '4.9★', v: 'Satisfacción' },
            { k: '24-72h', v: 'Despacho promedio' },
            { k: '100%', v: 'Compra protegida' },
          ].map((s) => (
            <div key={s.k} className="flex-1 text-center min-w-[120px]">
              <p className="font-display text-2xl font-semibold text-gradient-rose">{s.k}</p>
              <p className="text-xs text-ink/55">{s.v}</p>
            </div>
          ))}
        </div>
      </div>

      <Link to="/productos" className="sr-only">
        Ir a la tienda
      </Link>
    </section>
  )
}
