export const SITE = {
  name: 'Lun & Lou',
  tagline: 'Belleza y bienestar con alma',
  description:
    'Tienda e-commerce de productos de belleza y bienestar femenino con envíos a toda Colombia. Paga con Mercado Pago o pide a contraentrega.',
  whatsapp: (import.meta.env.VITE_WHATSAPP as string) || '573001234567',
  email: 'hola@lunylou.com',
  instagram: 'https://instagram.com/lunylou',
  tiktok: 'https://tiktok.com/@lunylou',
} as const

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}`

export const CATEGORIES_LABEL: Record<string, string> = {
  facial: 'Facial',
  cabello: 'Cabello',
  corporal: 'Corporal',
}
