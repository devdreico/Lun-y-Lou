export const SITE = {
  name: 'Lun y Lou',
  tagline: 'Moda femenina con alma',
  description:
    'Tienda e-commerce de productos femeninos con envíos a toda Colombia. Paga con Mercado Pago o pide a contraentrega.',
  whatsapp: (import.meta.env.VITE_WHATSAPP as string) || '573001234567',
  email: 'hola@lunylou.com',
  instagram: 'https://instagram.com/lunylou',
  tiktok: 'https://tiktok.com/@lunylou',
} as const

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}`

export const CATEGORIES_LABEL: Record<string, string> = {
  vestidos: 'Vestidos',
  tops: 'Tops',
  pantalones: 'Pantalones',
  bolsos: 'Bolsos',
  accesorios: 'Accesorios',
  calzado: 'Calzado',
  conjuntos: 'Conjuntos',
  chaquetas: 'Chaquetas',
  faldas: 'Faldas',
  gafas: 'Gafas',
}
