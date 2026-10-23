export interface HeroSlide {
  id: string
  photoId: number
  /** object-position para encuadrar al modelo en desktop y mobile */
  position: string
  alt: string
  eyebrow: string
  support: string
  cta: { label: string; to: string }
}

const WIDTHS = [640, 960, 1280, 1920] as const

/** URL de la foto de stock (Pexels CDN) con ancho solicitado. */
export const heroSrc = (photoId: number, width: number): string =>
  `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`

export const heroSrcSet = (photoId: number): string =>
  WIDTHS.map((w) => `${heroSrc(photoId, w)} ${w}w`).join(', ')

export const HERO_SIZES = '100vw'

/** Fallback local si el CDN no responde. */
export const HERO_FALLBACK = '/img/hero/modelo-editorial.svg'

export const heroSlides: HeroSlide[] = [
  {
    id: 'rostro-led',
    photoId: 7216285,
    position: 'center 45%',
    alt: 'Modelo con máscara LED facial encendida durante un tratamiento de luz en casa',
    eyebrow: 'Rostro · Máscara LED 7 colores',
    support:
      'Luz LED de 7 colores en 15 minutos, mientras descansas o ves televisión: el tratamiento de salón cabe en tu noche.',
    cta: { label: 'Ver dispositivos faciales', to: '/productos?cat=facial' },
  },
  {
    id: 'cabello-editorial',
    photoId: 30270927,
    position: 'center 22%',
    alt: 'Modelo de alto carácter con secador de cabello en estudio, peinado de salón',
    eyebrow: 'Cabello · Secado y peinado',
    support:
      'Cepillos secadores, planchas viajeras y masajeadores capilares para peinarte en minutos, sin cita y sin salir de casa.',
    cta: { label: 'Ver productos para cabello', to: '/productos?cat=cabello' },
  },
  {
    id: 'glow-toda-piel',
    photoId: 19525141,
    position: 'center 30%',
    alt: 'Retrato editorial de modelo con cabello afro y piel luminosa',
    eyebrow: 'Glow para toda piel',
    support:
      'Tu piel no viene en un solo formato: arma tu ritual con lo que de verdad necesita, a tu ritmo y con presupuesto honesto.',
    cta: { label: 'Explorar el catálogo', to: '/productos' },
  },
  {
    id: 'cuidado-para-todos',
    photoId: 7607306,
    position: 'center 40%',
    alt: 'Hombre usando un rodillo facial frente al espejo en su habitación',
    eyebrow: 'Cuidado para todos',
    support:
      'Rodillos, masajeadores y mascarillas también son tuyos: cuidarte en casa es de cualquiera, sin complicaciones ni rituales eternos.',
    cta: { label: 'Ver autocuidado', to: '/productos?cat=facial' },
  },
  {
    id: 'cuerpo-masaje',
    photoId: 19641809,
    position: 'center 35%',
    alt: 'Modelo recibiendo un masaje corporal en un ambiente cálido y relajado',
    eyebrow: 'Cuerpo · Masaje en casa',
    support:
      'Masajeadores anticelulitis, pistolas musculares y rodillos para soltar tensión cuando tú quieras, no cuando agenda el salón.',
    cta: { label: 'Ver productos corporales', to: '/productos?cat=corporal' },
  },
]
