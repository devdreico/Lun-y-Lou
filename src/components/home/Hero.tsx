import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Camera, Clock, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { LinkButton } from '../ui/Button'
import { SITE, WHATSAPP_URL } from '../../lib/constants'
import { products } from '../../data/products'

export function Hero() {
  const [heroImg, setHeroImg] = useState('/img/hero/modela.webp')

  return (
    <section className="relative overflow-hidden pb-14 pt-24 sm:pb-16 sm:pt-28 md:pt-32 lg:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,63,95,0.2),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(46,74,61,0.18),transparent_45%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* Copy — mobile first */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 lg:items-start"
          >
            <span className="grid size-20 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-rose to-rose-dark shadow-rose ring-4 ring-white/60 sm:size-24">
              <img
                src="/logo.png"
                alt="Lun & Lou"
                className="size-14 object-contain mix-blend-screen brightness-125 sm:size-17"
              />
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-rose/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-dark sm:text-xs">
              <Sparkles className="size-3.5" /> {products.length} productos · Glam en casa
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[2.35rem] font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Tu glow de salón{' '}
            <span className="text-gradient-rose italic">en casa</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/65 md:text-lg lg:mx-0"
          >
            Dispositivos de belleza para rostro, cabello y cuerpo.{' '}
            <strong className="font-semibold text-ink/85">{SITE.shippingPromise}</strong>{' '}
            y pagas en efectivo al recibir: sin tarjetas, sin anticipos, sin riesgo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-center sm:justify-start"
          >
            <LinkButton to="/productos" size="lg" className="group">
              Ver productos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </LinkButton>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost btn-lg"
            >
              <MessageCircle className="size-4" /> WhatsApp {SITE.phoneDisplay}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs text-ink/60 sm:gap-4 lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 ring-1 ring-ink/8">
              <Clock className="size-3.5 text-rose" /> Envío en 2 días
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 ring-1 ring-ink/8">
              <Sparkles className="size-3.5 text-gold" /> Contraentrega
            </span>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 ring-1 ring-ink/8 transition hover:border-rose/40 hover:text-rose-dark"
            >
              <Camera className="size-3.5 text-forest" /> {SITE.instagramHandle}
            </a>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 ring-1 ring-ink/8">
              <MapPin className="size-3.5 text-rose" /> Toda Colombia
            </span>
          </motion.div>
        </div>

        {/* Foto de modelaje — mobile visible, desktop hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(201,63,95,0.25),transparent_65%)] blur-2xl" />

          <div className="glass grain relative overflow-hidden rounded-[2rem] p-2.5 shadow-glass-lg sm:rounded-[2.5rem] sm:p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-forest-dark via-ink to-rose-dark sm:rounded-[2.1rem]">
              <img
                src={heroImg}
                onError={() => setHeroImg('/img/hero/modelo-editorial.svg')}
                alt="Modelo con máscara LED facial — glam de salón en casa con Lun & Lou"
                className="h-full w-full object-cover object-top"
                fetchPriority="high"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-4 pt-14 sm:p-6 sm:pt-20">
                <p className="font-display text-xl font-semibold text-cream sm:text-2xl">
                  Glam de salón, en casa
                </p>
                <p className="mt-1 text-xs text-cream/75 sm:text-sm">
                  Máscaras LED, masajeadores y más · Envío en 2 días
                </p>
              </div>
            </div>
          </div>

          {/* floating badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="glass absolute -left-2 top-6 rounded-2xl px-3 py-2 text-left shadow-glass sm:-left-5 sm:px-4 sm:py-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
              Entrega
            </p>
            <p className="font-display text-base font-semibold text-gradient-rose sm:text-lg">
              2 días
            </p>
            <p className="text-[10px] text-ink/55">a tu puerta</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="glass-dark absolute -right-2 bottom-16 rounded-2xl px-3 py-2 text-left sm:-right-5 sm:px-4 sm:py-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
              Pago
            </p>
            <p className="font-display text-base font-semibold text-cream sm:text-lg">
              Efectivo
            </p>
            <p className="text-[10px] text-cream/60">al recibir</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="relative mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6">
        <div className="glass grain grid grid-cols-2 gap-3 rounded-3xl px-4 py-4 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5">
          {[
            { k: '2 días', v: 'Envío a tu puerta' },
            { k: 'Efectivo', v: 'Pago contraentrega' },
            { k: 'Colombia', v: 'Envíos nacionales' },
            { k: SITE.instagramHandle, v: 'Síguenos en Instagram' },
          ].map((s) => (
            <div key={s.k} className="text-center">
              <p className="font-display text-lg font-semibold text-gradient-rose sm:text-2xl">
                {s.k}
              </p>
              <p className="text-[11px] text-ink/55 sm:text-xs">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
