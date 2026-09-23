import type { Product } from '../types'

/**
 * Catálogo real — precios en COP.
 * Imágenes: public/img/products/ (WebP optimizado desde IMG REAL).
 * mpPaymentUrl: link único de Mercado Pago por producto.
 *
 * Reglas de pago:
 * - Producto individual (ficha): Mercado Pago o contraentrega.
 * - Carrito con 2+ productos: solo contraentrega (Formspree).
 * - Contraentrega (individual o carrito): se envía a Formspree como texto plano.
 */
export const products: Product[] = [
  {
    id: 'p01',
    slug: 'mascara-tratamiento-facial-7-colores',
    name: 'Máscara Tratamiento Facial 7 Colores',
    tagline: '7 colores de luz LED, recargable',
    description:
      'Máscara facial con 7 colores LED para usar en casa. Ligera, recargable y fácil de poner mientras descansas o ves televisión.',
    price: 190000,
    category: 'facial',
    images: [
      { src: '/img/products/mascara-tratamiento-facial-7-colores.webp', alt: 'Máscara Tratamiento Facial 7 Colores' },
      { src: '/img/products/mascara-tratamiento-facial-7-colores-2.webp', alt: 'Máscara facial vista 2' },
      { src: '/img/products/mascara-tratamiento-facial-7-colores-3.webp', alt: 'Máscara facial vista 3' },
      { src: '/img/products/mascara-tratamiento-facial-7-colores-4.webp', alt: 'Máscara facial vista 4' },
    ],
    mpPaymentUrl: 'https://mpago.li/2mpq2z4',
    featured: true,
    badge: 'Destacado',
    stock: 15,
  },
  {
    id: 'p02',
    slug: 'masajeador-capilar-electrico',
    name: 'Masajeador Capilar Eléctrico',
    tagline: 'Vibro-masaje con puntas suaves',
    description:
      'Masajeador eléctrico para el cuero cabelludo. Se usa al lavarte el cabello o seco: puntas suaves y vibración para masajear el scalp.',
    price: 55900,
    category: 'cabello',
    images: [
      { src: '/img/products/masajeador-capilar-electrico.webp', alt: 'Masajeador Capilar Eléctrico' },
      { src: '/img/products/masajeador-capilar-electrico-2.webp', alt: 'Masajeador capilar vista 2' },
      { src: '/img/products/masajeador-capilar-electrico-3.webp', alt: 'Masajeador capilar vista 3' },
      { src: '/img/products/masajeador-capilar-electrico-4.webp', alt: 'Masajeador capilar vista 4' },
    ],
    mpPaymentUrl: 'https://mpago.li/239LYJU',
    featured: true,
    stock: 20,
  },
  {
    id: 'p03',
    slug: 'plancha-viajera-mini-cabello',
    name: 'Plancha Viajera Mini para Cabello',
    tagline: 'Plancha mini de cerámica para viaje',
    description:
      'Plancha de pelo pequeña con placa de cerámica. Calienta rápido y cabe en bolso o maleta para alisar o tocar puntas fuera de casa.',
    price: 27900,
    compareAtPrice: 34900,
    category: 'cabello',
    images: [
      { src: '/img/products/plancha-viajera-mini-cabello.webp', alt: 'Plancha Viajera Mini para Cabello' },
      { src: '/img/products/plancha-viajera-mini-cabello-2.webp', alt: 'Plancha mini vista 2' },
    ],
    mpPaymentUrl: 'https://mpago.li/2ayhmhb',
    badge: 'Oferta',
    stock: 25,
  },
  {
    id: 'p04',
    slug: 'cepillo-facial-natural-shine',
    name: 'Cepillo Facial + Natural Shine de Obsequio',
    tagline: 'Exfoliador facial + Natural Shine de obsequio',
    description:
      'Cepillo para limpiar y exfoliar el rostro en el lavado diario. Incluye Natural Shine de obsequio en la misma compra.',
    price: 26000,
    category: 'facial',
    images: [
      { src: '/img/products/cepillo-facial-natural-shine.webp', alt: 'Cepillo Facial + Natural Shine' },
      { src: '/img/products/cepillo-facial-natural-shine-2.webp', alt: 'Cepillo facial vista 2' },
    ],
    mpPaymentUrl: 'https://mpago.li/2Pz7LNF',
    badge: 'Obsequio',
    featured: true,
    stock: 30,
  },
  {
    id: 'p05',
    slug: 'masajeador-anticelulitis-ultrasonido',
    name: 'Masajeador Anticelulitis Ultrasonido',
    tagline: 'Ultrasonido y vibración para cuerpo',
    description:
      'Masajeador corporal con ultrasonido y vibración. Se usa en abdomen, piernas y brazos en sesiones cortas en casa.',
    price: 60000,
    compareAtPrice: 75000,
    category: 'corporal',
    images: [
      { src: '/img/products/masajeador-anticelulitis-ultrasonido.webp', alt: 'Masajeador Anticelulitis Ultrasonido' },
      { src: '/img/products/masajeador-anticelulitis-ultrasonido-2.webp', alt: 'Masajeador anticelulitis vista 2' },
      { src: '/img/products/masajeador-anticelulitis-ultrasonido-3.webp', alt: 'Masajeador anticelulitis vista 3' },
      { src: '/img/products/masajeador-anticelulitis-ultrasonido-4.webp', alt: 'Masajeador anticelulitis vista 4' },
      { src: '/img/products/masajeador-anticelulitis-ultrasonido-5.webp', alt: 'Masajeador anticelulitis vista 5' },
    ],
    mpPaymentUrl: 'https://mpago.li/24CupnC',
    featured: true,
    badge: 'Oferta',
    stock: 12,
  },
  {
    id: 'p06',
    slug: 'cepillo-secador-5-en-1',
    name: 'Cepillo Secador 5 en 1',
    tagline: '5 boquillas: seca, peina y ondula',
    description:
      'Cepillo secador con 5 boquillas intercambiables para secar el pelo, dar volumen y hacer ondas sin pasar dos aparatos.',
    price: 46900,
    category: 'cabello',
    images: [
      { src: '/img/products/cepillo-secador-5-en-1.webp', alt: 'Cepillo Secador 5 en 1' },
    ],
    mpPaymentUrl: 'https://mpago.li/2Jb63fU',
    featured: true,
    stock: 18,
  },
  {
    id: 'p07',
    slug: 'mini-pistola-masajeadora-muscular',
    name: 'Mini Pistola Masajeadora Muscular',
    tagline: 'Masaje de percusión, tamaño mini',
    description:
      'Pistola de masaje pequeña con varios niveles de intensidad. Para hombros, espalda y piernas después de entrenar o de estar sentado mucho rato.',
    price: 40900,
    category: 'corporal',
    images: [
      { src: '/img/products/mini-pistola-masajeadora-muscular.webp', alt: 'Mini Pistola Masajeadora Muscular' },
    ],
    mpPaymentUrl: 'https://mpago.li/2ELYZyy',
    stock: 22,
  },
  {
    id: 'p08',
    slug: 'rizador-pelo-portatil-espiral',
    name: 'Rizador de Pelo Portátil en Espiral',
    tagline: 'Rizador espiral, tamaño portátil',
    description:
      'Rizador en espiral para hacer rizos y ondas con un movimiento. Cabe en maleta; sirve en casa, oficina o de viaje.',
    price: 32900,
    category: 'cabello',
    images: [
      { src: '/img/products/rizador-pelo-portatil-espiral.webp', alt: 'Rizador de Pelo Portátil en Espiral' },
    ],
    mpPaymentUrl: 'https://mpago.li/2t2kmUk',
    stock: 20,
  },
  {
    id: 'p09',
    slug: 'masajeador-rodillo-jade-facial',
    name: 'Masajeador Rodillo de Jade Facial',
    tagline: 'Rodillo de jade para rostro y cuello',
    description:
      'Rodillo de jade frío. Se pasa de abajo hacia arriba en rostro y cuello después del sérum o la crema.',
    price: 31000,
    category: 'facial',
    images: [
      { src: '/img/products/masajeador-rodillo-jade-facial.webp', alt: 'Masajeador Rodillo de Jade Facial' },
      { src: '/img/products/masajeador-rodillo-jade-facial-2.webp', alt: 'Rodillo de jade vista 2' },
      { src: '/img/products/masajeador-rodillo-jade-facial-3.webp', alt: 'Rodillo de jade vista 3' },
      { src: '/img/products/masajeador-rodillo-jade-facial-4.webp', alt: 'Rodillo de jade vista 4' },
      { src: '/img/products/masajeador-rodillo-jade-facial-5.webp', alt: 'Rodillo de jade vista 5' },
    ],
    mpPaymentUrl: 'https://mpago.li/1KeZiqo',
    featured: true,
    stock: 28,
  },
  {
    id: 'p10',
    slug: 'maquina-depiladora-laser-ipl-110v',
    name: 'Máquina Depiladora Láser IPL 110V',
    tagline: 'IPL de 110V para rostro y cuerpo',
    description:
      'Depiladora IPL de 110V con varios niveles de intensidad. Para uso en casa en rostro y cuerpo; requiere sesiones seguidas.',
    price: 63900,
    compareAtPrice: 79900,
    category: 'corporal',
    images: [
      { src: '/img/products/maquina-depiladora-laser-ipl-110v.webp', alt: 'Máquina Depiladora Láser IPL 110V' },
    ],
    mpPaymentUrl: 'https://mpago.li/2ByMhof',
    badge: 'Oferta',
    featured: true,
    stock: 10,
  },
]

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug)

export const featuredProducts = products.filter((p) => p.featured)

export const categoryList = [
  { slug: 'facial', label: 'Facial', emoji: '✨' },
  { slug: 'cabello', label: 'Cabello', emoji: '💇‍♀️' },
  { slug: 'corporal', label: 'Corporal', emoji: '💆‍♀️' },
] as const
