import type { Product } from '../types'

/**
 * Catálogo de demostración — reemplaza precios, fotos y mpPaymentUrl
 * con los de tu negocio.
 * mpPaymentUrl: link único de pago creado en Mercado Pago
 * (Panel → Cobrar → Link de pago / o API Checkout Pro).
 */
export const products: Product[] = [
  {
    id: 'p01',
    slug: 'vestido-midi-aurora',
    name: 'Vestido Midi Aurora',
    tagline: 'Fluidos, femenino y listo para brillar',
    description:
      'Vestido midi en satín con caída elegante, escote sutil y cintura marcada. Ideal para citas, cenas y eventos. Tejido suave al tacto con forro ligero y cierre lateral invisible.',
    price: 189900,
    compareAtPrice: 239900,
    category: 'vestidos',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Frambuesa', hex: '#C93F5F' },
      { name: 'Nude', hex: '#E8C4B0' },
      { name: 'Negro', hex: '#1A1518' },
    ],
    images: [
      { src: '/img/products/vestido-midi-aurora.svg', alt: 'Vestido Midi Aurora frente' },
      { src: '/img/products/vestido-midi-aurora-2.svg', alt: 'Vestido Midi Aurora detalle' },
      { src: '/img/products/vestido-midi-aurora-3.svg', alt: 'Vestido Midi Aurora look' },
    ],
    mpPaymentUrl: '',
    featured: true,
    badge: 'Top ventas',
    stock: 12,
  },
  {
    id: 'p02',
    slug: 'blusa-seda-lumiere',
    name: 'Blusa Seda Lumière',
    tagline: 'Ligereza con acabado premium',
    description:
      'Blusa de seda vegana con botones perla y mangas ligeramente voluminosas. Combina con jeans, faldas o sastrería. Talla relajada y textura fresca.',
    price: 99900,
    compareAtPrice: 129900,
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#F0E6D8' },
      { name: 'Marfil', hex: '#FAF7F2' },
      { name: 'Rosa', hex: '#F8D5DE' },
    ],
    images: [
      { src: '/img/products/blusa-seda-lumiere.svg', alt: 'Blusa Seda Lumière frente' },
      { src: '/img/products/blusa-seda-lumiere-2.svg', alt: 'Blusa Seda Lumière detalle' },
      { src: '/img/products/blusa-seda-lumiere-3.svg', alt: 'Blusa Seda Lumière look' },
    ],
    mpPaymentUrl: '',
    featured: true,
    stock: 18,
  },
  {
    id: 'p03',
    slug: 'jeans-wide-leg-nova',
    name: 'Jeans Wide Leg Nova',
    tagline: 'Silueta moderna, comodidad real',
    description:
      'Pantalón denim wide leg de tiro medio, lavado medio y costuras reforzadas. Estira sin deformarse y estiliza la figura desde la cadera hasta el piso.',
    price: 159900,
    category: 'pantalones',
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'Índigo', hex: '#3D5A80' },
      { name: 'Negro', hex: '#1A1518' },
      { name: 'Crudo', hex: '#E8DFD0' },
    ],
    images: [
      { src: '/img/products/jeans-wide-leg-nova.svg', alt: 'Jeans Wide Leg Nova frente' },
      { src: '/img/products/jeans-wide-leg-nova-2.svg', alt: 'Jeans Wide Leg Nova detalle' },
      { src: '/img/products/jeans-wide-leg-nova-3.svg', alt: 'Jeans Wide Leg Nova look' },
    ],
    mpPaymentUrl: '',
    featured: true,
    stock: 15,
  },
  {
    id: 'p04',
    slug: 'bolso-tote-classic',
    name: 'Bolso Tote Classic',
    tagline: 'Espacio, estilo y estructura',
    description:
      'Tote bag estructurada con asas reforzadas, bolsillo interior con cierre y base firme. Cabe laptop de 14", cartera y lo esencial del día.',
    price: 179900,
    compareAtPrice: 209900,
    category: 'bolsos',
    sizes: ['Único'],
    colors: [
      { name: 'Vino', hex: '#A32F4A' },
      { name: 'Camel', hex: '#C4A484' },
      { name: 'Verde', hex: '#2E4A3D' },
    ],
    images: [
      { src: '/img/products/bolso-tote-classic.svg', alt: 'Bolso Tote Classic' },
      { src: '/img/products/bolso-tote-classic-2.svg', alt: 'Bolso Tote Classic detalle' },
      { src: '/img/products/bolso-tote-classic-3.svg', alt: 'Bolso Tote Classic look' },
    ],
    mpPaymentUrl: '',
    featured: true,
    badge: 'Nuevo',
    stock: 10,
  },
  {
    id: 'p05',
    slug: 'aretes-aro-sol',
    name: 'Aretes Aro Dorado Sol',
    tagline: 'El brillo que completa el look',
    description:
      'Aros medianos en baño de oro con cierre de presión seguro. Hipoalergénicos, ligeros y perfectos para uso diario o noches especiales.',
    price: 59900,
    category: 'accesorios',
    sizes: ['Único'],
    colors: [
      { name: 'Dorado', hex: '#D4A574' },
      { name: 'Plateado', hex: '#C0C0C8' },
    ],
    images: [
      { src: '/img/products/aretes-aro-sol.svg', alt: 'Aretes Aro Dorado Sol' },
      { src: '/img/products/aretes-aro-sol-2.svg', alt: 'Aretes Aro Dorado Sol detalle' },
      { src: '/img/products/aretes-aro-sol-3.svg', alt: 'Aretes Aro Dorado Sol look' },
    ],
    mpPaymentUrl: '',
    stock: 30,
  },
  {
    id: 'p06',
    slug: 'tacones-stiletto-ruby',
    name: 'Tacones Stiletto Ruby',
    tagline: 'Elegancia con estabilidad',
    description:
      'Stiletto de 8 cm con punta afilada, plantilla acolchada y talón reforzado. Forro suave que reduce roces en salidas largas.',
    price: 219900,
    compareAtPrice: 259900,
    category: 'calzado',
    sizes: ['35', '36', '37', '38', '39', '40'],
    colors: [
      { name: 'Ruby', hex: '#C93F5F' },
      { name: 'Negro', hex: '#1A1518' },
      { name: 'Nude', hex: '#E8C4B0' },
    ],
    images: [
      { src: '/img/products/tacones-stiletto-ruby.svg', alt: 'Tacones Stiletto Ruby' },
      { src: '/img/products/tacones-stiletto-ruby-2.svg', alt: 'Tacones Stiletto Ruby detalle' },
      { src: '/img/products/tacones-stiletto-ruby-3.svg', alt: 'Tacones Stiletto Ruby look' },
    ],
    mpPaymentUrl: '',
    featured: true,
    stock: 8,
  },
  {
    id: 'p07',
    slug: 'set-lounge-satinado',
    name: 'Set Lounge Satinado',
    tagline: 'Comodidad que se ve cara',
    description:
      'Set de dos piezas en satín: top con breteles regulables y pantalón de pierna amplia con cordón. Perfecto para居家 o brunch con espadillas.',
    price: 139900,
    category: 'conjuntos',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Salvia', hex: '#4A7360' },
      { name: 'Rosa', hex: '#E86A86' },
      { name: 'Champagne', hex: '#F0E6D8' },
    ],
    images: [
      { src: '/img/products/set-lounge-satinado.svg', alt: 'Set Lounge Satinado' },
      { src: '/img/products/set-lounge-satinado-2.svg', alt: 'Set Lounge Satinado detalle' },
      { src: '/img/products/set-lounge-satinado-3.svg', alt: 'Set Lounge Satinado look' },
    ],
    mpPaymentUrl: '',
    stock: 14,
  },
  {
    id: 'p08',
    slug: 'chaqueta-denim-oversize',
    name: 'Chaqueta Denim Oversize',
    tagline: 'Layering con actitud',
    description:
      'Chaqueta denim unisex-fit con lavado stone, bolsillos pecho y caída oversize. Aporta estructura a vestidos, tops y conjuntos.',
    price: 199900,
    category: 'chaquetas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Stone', hex: '#3D5A80' },
      { name: 'Negro', hex: '#1A1518' },
      { name: 'Blanco roto', hex: '#F3EFE7' },
    ],
    images: [
      { src: '/img/products/chaqueta-denim-oversize.svg', alt: 'Chaqueta Denim Oversize' },
      { src: '/img/products/chaqueta-denim-oversize-2.svg', alt: 'Chaqueta Denim Oversize detalle' },
      { src: '/img/products/chaqueta-denim-oversize-3.svg', alt: 'Chaqueta Denim Oversize look' },
    ],
    mpPaymentUrl: '',
    featured: true,
    stock: 11,
  },
  {
    id: 'p09',
    slug: 'falda-plisada-luna',
    name: 'Falda Plisada Luna',
    tagline: 'Movimiento en cada paso',
    description:
      'Falda midi plisada al sol con cintura elástica y forro interior. Tejido que no se arruga, ideal para oficina o looks de fin de semana.',
    price: 119900,
    category: 'faldas',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Lila', hex: '#6B5B95' },
      { name: 'Negro', hex: '#1A1518' },
      { name: 'Crema', hex: '#F6F1E8' },
    ],
    images: [
      { src: '/img/products/falda-plisada-luna.svg', alt: 'Falda Plisada Luna' },
      { src: '/img/products/falda-plisada-luna-2.svg', alt: 'Falda Plisada Luna detalle' },
      { src: '/img/products/falda-plisada-luna-3.svg', alt: 'Falda Plisada Luna look' },
    ],
    mpPaymentUrl: '',
    stock: 16,
  },
  {
    id: 'p10',
    slug: 'gafas-cat-eye-solar',
    name: 'Gafas Cat Eye Solar',
    tagline: 'Protección con firma de estilo',
    description:
      'Lentes cat-eye en acetato con protección UV400 y estuche rígido incluido. Marco ligero que enmarca el rostro con un toque sofisticado.',
    price: 89900,
    compareAtPrice: 109900,
    category: 'gafas',
    sizes: ['Único'],
    colors: [
      { name: 'Negro', hex: '#1A1518' },
      { name: 'Tortoise', hex: '#8B5A2B' },
      { name: 'Havana', hex: '#C4A484' },
    ],
    images: [
      { src: '/img/products/gafas-cat-eye-solar.svg', alt: 'Gafas Cat Eye Solar' },
      { src: '/img/products/gafas-cat-eye-solar-2.svg', alt: 'Gafas Cat Eye Solar detalle' },
      { src: '/img/products/gafas-cat-eye-solar-3.svg', alt: 'Gafas Cat Eye Solar look' },
    ],
    mpPaymentUrl: '',
    badge: 'Oferta',
    stock: 20,
  },
]

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug)

export const featuredProducts = products.filter((p) => p.featured)

export const categoryList = [
  { slug: 'vestidos', label: 'Vestidos', emoji: '👗' },
  { slug: 'tops', label: 'Tops', emoji: '👚' },
  { slug: 'pantalones', label: 'Pantalones', emoji: '👖' },
  { slug: 'bolsos', label: 'Bolsos', emoji: '👜' },
  { slug: 'calzado', label: 'Calzado', emoji: '👠' },
  { slug: 'accesorios', label: 'Accesorios', emoji: '✨' },
  { slug: 'conjuntos', label: 'Conjuntos', emoji: '🧵' },
  { slug: 'chaquetas', label: 'Chaquetas', emoji: '🧥' },
  { slug: 'faldas', label: 'Faldas', emoji: '🌙' },
  { slug: 'gafas', label: 'Gafas', emoji: '🕶️' },
] as const
