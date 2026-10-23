import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Clock,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react'
import { LinkButton } from '../ui/Button'
import { SITE, WHATSAPP_URL } from '../../lib/constants'
import { products } from '../../data/products'
import {
  HERO_FALLBACK,
  HERO_SIZES,
  heroSlides,
  heroSrc,
  heroSrcSet,
} from '../../data/heroSlides'

const SLIDE_MS = 7000

const pills = [
  { icon: Clock, label: 'Envío en 2 días', to: null },
  { icon: Sparkles, label: 'Contraentrega', to: null },
  { icon: MapPin, label: 'Toda Colombia', to: null },
  { icon: Camera, label: SITE.instagramHandle, to: SITE.instagram },
]

export function Hero() {
  const slides = heroSlides
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [announce, setAnnounce] = useState('')
  const [failed, setFailed] = useState<Record<string, boolean>>({})

  const autoPlay = !paused && !reduced && !hovered && !focused && !hidden
  const slide = slides[index]

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!autoPlay) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS)
    return () => window.clearTimeout(timer)
  }, [autoPlay, index, slides.length])

  useEffect(() => {
    const next = slides[(index + 1) % slides.length]
    if (failed[next.id]) return
    const img = new Image()
    img.src = heroSrc(next.photoId, 1280)
  }, [index, slides, failed])

  const select = (next: number) => {
    const n = (next + slides.length) % slides.length
    setIndex(n)
    setAnnounce(`Historia ${n + 1} de ${slides.length}: ${slides[n].eyebrow}`)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      select(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      select(index - 1)
    }
  }

  const imageSrc = (id: string, photoId: number) =>
    failed[id] ? HERO_FALLBACK : heroSrc(photoId, 1600)
  const imageSrcSet = (id: string, photoId: number) =>
    failed[id] ? undefined : heroSrcSet(photoId)

  return (
    <>
      <section
        role="region"
        aria-roledescription="carousel"
        aria-label="Historias Lun & Lou"
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocused(false)
          }
        }}
        className="relative min-h-[100svh] overflow-hidden bg-ink"
      >
        {/* Capa de imágenes: crossfade + Ken Burns entre modelos */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.25 : 1.1, ease: 'easeInOut' }}
            >
              <motion.img
                src={imageSrc(slide.id, slide.photoId)}
                srcSet={imageSrcSet(slide.id, slide.photoId)}
                sizes={HERO_SIZES}
                alt={slide.alt}
                onError={() => setFailed((f) => (f[slide.id] ? f : { ...f, [slide.id]: true }))}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.position }}
                initial={{ scale: 1 }}
                animate={{ scale: reduced ? 1 : 1.08 }}
                transition={{ duration: reduced ? 0 : 14, ease: 'linear' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Capa de arrastre (swipe) */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70 || info.velocity.x < -450) select(index + 1)
            else if (info.offset.x > 70 || info.velocity.x > 450) select(index - 1)
          }}
          className="absolute inset-0 z-[5] cursor-grab active:cursor-grabbing"
          aria-hidden
        />

        {/* Degradés de legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/15 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/95 via-ink/65 to-ink/10 sm:block" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/55 to-transparent" />

        {/* Copy */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-4 pb-32 pt-28 sm:justify-center sm:px-6 sm:pb-36 lg:pb-32">
          <div className="max-w-2xl text-cream">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/90 backdrop-blur-sm sm:text-xs">
                <Sparkles className="size-3.5 text-gold-light" /> {products.length} productos ·
                Glam en casa
              </span>

              <h1 className="mt-5 font-display text-[2.35rem] font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                Tu glow de salón{' '}
                <span className="text-gradient-rose italic">en casa</span>
              </h1>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-light">
                  {slide.eyebrow}
                </p>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
                  {slide.support}
                </p>
                <div className="mt-7 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center sm:justify-start">
                  <LinkButton to={slide.cta.to} size="lg" className="group">
                    {slide.cta.label}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </LinkButton>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost btn-lg !bg-white/85"
                  >
                    <MessageCircle className="size-4" /> WhatsApp {SITE.phoneDisplay}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-xs text-cream/80 sm:gap-3 lg:justify-start"
            >
              {pills.map((pill) => {
                const content = (
                  <>
                    <pill.icon className="size-3.5 text-gold-light" /> {pill.label}
                  </>
                )
                const cls =
                  'inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/20 hover:text-white'
                return pill.to ? (
                  <a
                    key={pill.label}
                    href={pill.to}
                    target="_blank"
                    rel="noreferrer"
                    className={cls}
                  >
                    {content}
                  </a>
                ) : (
                  <span key={pill.label} className={cls}>
                    {content}
                  </span>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Controles del carrusel */}
        <div className="absolute inset-x-0 bottom-0 z-20 pb-14 sm:pb-16">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Ir a la historia ${i + 1}: ${s.eyebrow}`}
                  aria-current={i === index || undefined}
                  className="relative h-2 w-9 overflow-hidden rounded-full bg-white/30 backdrop-blur-sm transition hover:bg-white/55 sm:w-12"
                >
                  {i === index && autoPlay && (
                    <span
                      key={`progress-${index}`}
                      className="hero-progress absolute inset-0 rounded-full bg-rose"
                    />
                  )}
                  {i === index && !autoPlay && (
                    <span className="absolute inset-0 rounded-full bg-rose" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={
                    paused
                      ? 'Reanudar reproducción automática'
                      : 'Pausar reproducción automática'
                  }
                  aria-pressed={paused}
                  className="glass-dark grid size-10 place-items-center rounded-full text-cream transition hover:bg-white/20"
                >
                  {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => select(index - 1)}
                aria-label="Historia anterior"
                className="glass-dark grid size-10 place-items-center rounded-full text-cream transition hover:bg-white/20"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => select(index + 1)}
                aria-label="Historia siguiente"
                className="glass-dark grid size-10 place-items-center rounded-full text-cream transition hover:bg-white/20"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="sr-only" aria-live="polite">
          {announce}
        </div>
      </section>

      {/* Barra de confianza */}
      <div className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
        <div className="glass grain grid grid-cols-2 gap-3 rounded-3xl px-4 py-4 shadow-glass-lg sm:grid-cols-4 sm:px-6">
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
              <p className="text-[11px] text-ink/65 sm:text-xs">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
