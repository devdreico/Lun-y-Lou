export type Category = 'facial' | 'cabello' | 'corporal'

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
