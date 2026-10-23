export const SITE = {
  name: 'Lun & Lou',
  tagline: 'Glam de salón, en casa',
  description:
    'Dispositivos de belleza para rostro, cabello y cuerpo. Envío en 2 días a tu puerta. Paga en efectivo al recibir (contraentrega) en toda Colombia.',
  /** Dominio canónico (usado en canonical, Open Graph y sitemap). */
  url: 'https://lunylou.com',
  whatsapp: (import.meta.env.VITE_WHATSAPP as string) || '573144572008',
  phoneDisplay: '314 457 2008',
  email: 'inbox@lunylou.com',
  region: 'Sábana Occidental',
  regionFull: 'Sábana Occidental, Colombia',
  instagram: 'https://instagram.com/lunylouco',
  instagramHandle: '@lunylouco',
  tiktok: 'https://tiktok.com/@lunylou',
  shippingPromise: 'Envío en 2 días a tu puerta',
  paymentNote: 'Pago contraentrega: en efectivo al recibir',
} as const

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}`

/** URL absoluta a partir de una ruta relativa (`/productos` → dominio + ruta). */
export const absoluteUrl = (path: string): string =>
  `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`


export const CATEGORIES_LABEL: Record<string, string> = {
  facial: 'Facial',
  cabello: 'Cabello',
  corporal: 'Corporal',
}
