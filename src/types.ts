export type Category =
  | 'vestidos'
  | 'tops'
  | 'pantalones'
  | 'bolsos'
  | 'accesorios'
  | 'calzado'
  | 'conjuntos'
  | 'chaquetas'
  | 'faldas'
  | 'gafas'

export interface ProductImage {
  src: string
  alt: string
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  price: number
  compareAtPrice?: number
  category: Category
  sizes: string[]
  colors: { name: string; hex: string }[]
  images: ProductImage[]
  /** Link único de pago Mercado Pago (dashboard → Link de pago) */
  mpPaymentUrl: string
  featured?: boolean
  badge?: string
  stock: number
}

export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
  mpPaymentUrl: string
}

export interface CheckoutFormData {
  fullName: string
  phone: string
  email: string
  department: string
  city: string
  address: string
  notes: string
}
