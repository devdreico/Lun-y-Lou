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
    tagline: 'Luz LED para rutina facial en casa',
    description:
      'Máscara de tratamiento facial con 7 colores de luz (LED) para distintas rutinas de cuidado: luminosidad, calma y renovación. Diseño ligero, recargable y fácil de usar en casa o al viajar.',
    price: 190000,
    category: 'facial',
    sizes: ['Único'],
    colors: [{ name: 'Blanco', hex: '#F6F1E8' }],
    images: [
      { src: '/img/products/mascara-tratamiento-facial-7-colores.webp', alt: 'Máscara Tratamiento Facial 7 Colores' },
      { src: '/img/products/mascara-tratamiento-facial-7-colores-2.webp', alt: 'Máscara facial vista 2' },
      { src: '/img/products/mascara-tratamiento-facial-7-colores-3.webp', alt: 'Máscara facial vista 3' },
      { src: '/img/products/mascara-tratamiento-facial-7-colores-4.webp', alt: 'Máscara facial vista 4' },
    ],
    mpPaymentUrl: 'https://mpago.li/2mpq2z4',
    featured: true,
    badge: 'Top ventas',
    stock: 15,
  },
  {
    id: 'p02',
    slug: 'masajeador-capilar-electrico',
    name: 'Masajeador Capilar Eléctrico',
    tagline: 'Relaja el cuero cabelludo en minutos',
    description:
      'Masajeador capilar eléctrico con puntas suaves y vibro-masaje para desestresar el cuero cabelludo, activar la circulación y potenciar la sensación de bienestar en tu lavado.',
    price: 55900,
    category: 'cabello',
    sizes: ['Único'],
    colors: [{ name: 'Rosa', hex: '#E86A86' }],
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
    tagline: 'Estilo compacto que cabe en cualquier bolso',
    description:
      'Plancha mini de cerámica para alisar, definir y tocar puntas al viajar. Tamaño portátil, calentamiento rápido y acabado suave sin apagar el brillo natural del cabello.',
    price: 27900,
    compareAtPrice: 34900,
    category: 'cabello',
    sizes: ['Único'],
    colors: [{ name: 'Negro', hex: '#1A1518' }],
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
    tagline: 'Limpieza profunda con regalo incluido',
    description:
      'Cepillo facial para limpieza y exfoliación suave, con Natural Shine de obsequio. Ideal para rutina diaria, preparar la piel y potenciar el brillo natural del rostro.',
    price: 26000,
    category: 'facial',
    sizes: ['Único'],
    colors: [{ name: 'Rosa', hex: '#F8D5DE' }],
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
    tagline: 'Tecnología ultrasónica para el cuerpo',
    description:
      'Masajeador corporal con ultrasonido y vibración para sesiones de masaje en abdomen, piernas y brazos. Ayuda a relajar la piel y a acompañar tu ritual de cuidado corporal en casa.',
    price: 60000,
    compareAtPrice: 75000,
    category: 'corporal',
    sizes: ['Único'],
    colors: [{ name: 'Blanco', hex: '#FAF7F2' }],
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
    tagline: 'Secado, volumen y rizos en un solo accesorio',
    description:
      'Cepillo secador multifunción 5 en 1 con boquillas intercambiables para secar, peinar, dar volumen y ondular. Potencia uniforme y acabado de salón sin complicarte la mañana.',
    price: 46900,
    category: 'cabello',
    sizes: ['Único'],
    colors: [{ name: 'Rosa', hex: '#C93F5F' }],
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
    tagline: 'Percusión portátil para sobrecarga muscular',
    description:
      'Pistola de masaje mini con punzos suaves y varios niveles de intensidad. Perfecta para hombros, espalda y piernas después del gym o de un día largo frente al computador.',
    price: 40900,
    category: 'corporal',
    sizes: ['Único'],
    colors: [{ name: 'Negro', hex: '#1A1518' }],
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
    tagline: 'Rizos definidos donde sea que estés',
    description:
      'Rizador portátil con diseño en espiral para lograr rizos y ondas con un movimiento simple. Compacto, ideal para maletas, oficina o cambios de look al instante.',
    price: 32900,
    category: 'cabello',
    sizes: ['Único'],
    colors: [{ name: 'Rosa', hex: '#E86A86' }],
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
    tagline: 'Frío natural + drenaje suave',
    description:
      'Rodillo facial de jade para masajear rostro y cuello con movimientos ascendentes. Ayuda a desinflamar, relajar la musculatura facial y sellar tus productos de skincare.',
    price: 31000,
    category: 'facial',
    sizes: ['Único'],
    colors: [{ name: 'Jade', hex: '#4A7360' }],
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
    tagline: 'Depilación láser en casa, 110V',
    description:
      'Depiladora láser IPL de 110V con distintos niveles de intensidad para tratar rostro y cuerpo. Acompaña un plan de sesiones continuas con diseño ergonómico y uso domiciliario.',
    price: 63900,
    compareAtPrice: 79900,
    category: 'corporal',
    sizes: ['Único'],
    colors: [{ name: 'Blanco', hex: '#F0E6D8' }],
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
