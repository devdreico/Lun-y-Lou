export const SITE = {
  name: 'Lun & Lou',
  tagline: 'Dispositivos para el cuidado en casa',
  description:
    'Máscaras LED, masajeadores, secadores y más. Envíos a toda Colombia. Mercado Pago o contraentrega.',
  whatsapp: (import.meta.env.VITE_WHATSAPP as string) || '573144572008',
  phoneDisplay: '314 457 2008',
  email: 'inbox@lunylou.com',
  region: 'Sábana Occidental',
  regionFull: 'Sábana Occidental, Colombia',
  instagram: 'https://instagram.com/lunylou',
  tiktok: 'https://tiktok.com/@lunylou',
} as const

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}`

export const CATEGORIES_LABEL: Record<string, string> = {
  facial: 'Facial',
  cabello: 'Cabello',
  corporal: 'Corporal',
}
