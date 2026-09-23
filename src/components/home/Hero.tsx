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
            className="mt-5 font-display text-3xl font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Belleza y bienestar{' '}
            <span className="text-gradient-rose italic">que se siente</span>{' '}
            como tú
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/65 md:text-lg lg:mx-0"
          >
            Lun & Lou lleva tecnología beauty con envíos a toda Colombia desde la Sábana
            Occidental. Paga con Mercado Pago (producto individual) o pide a contraentrega.
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
            <LinkButton to="/productos?cat=facial" variant="ghost" size="lg">
              Ver cuidado facial
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-[clamp(240px,70vw,340px)] w-full max-w-lg sm:h-[420px] lg:h-[560px] lg:max-w-none"
          aria-hidden
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,63,95,0.22),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(46,74,61,0.18),transparent_65%)] blur-2xl" />

          <div className="absolute inset-0">
            <Suspense
              fallback={
                <div className="grid h-full w-full place-items-center">
                  <div className="size-16 animate-spin rounded-full border-[3px] border-rose/30 border-t-rose" />
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl px-4 sm:mt-16 sm:px-6">
        <div className="glass grain flex flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
          {[
            { k: '24–72h', v: 'Despacho según ciudad' },
            { k: 'MP', v: 'Pago individual seguro' },
            { k: 'Efectivo', v: 'Contraentrega' },
            { k: 'Nacional', v: 'Envíos a toda Colombia' },
          ].map((s) => (
            <div key={s.k} className="flex-1 text-center min-w-[100px] sm:min-w-[120px]">
              <p className="font-display text-xl font-semibold text-gradient-rose sm:text-2xl">
                {s.k}
              </p>
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
