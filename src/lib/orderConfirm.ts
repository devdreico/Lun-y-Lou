export type OrderMethod = 'contraentrega' | 'mp'

export interface OrderConfirmItem {
  productId: string
  name: string
  quantity: number
  price: number
  image: string
}

export interface OrderConfirm {
  method: OrderMethod
  demo?: boolean
  name?: string
  phone?: string
  city?: string
  address?: string
  items: OrderConfirmItem[]
  total: number
  mpUrl?: string
  createdAt: string
}

const KEY = 'lunylou-order-confirm'

export function saveOrderConfirm(order: OrderConfirm): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(order))
  } catch {
    /* sessionStorage lleno o bloqueado */
  }
}

export function readOrderConfirm(): OrderConfirm | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as OrderConfirm
    if (!parsed || !Array.isArray(parsed.items) || !parsed.method) return null
    return parsed
  } catch {
    return null
  }
}

export function clearOrderConfirm(): void {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}

export function orderFromCart(
  items: {
    productId: string
    name: string
    quantity: number
    price: number
    image: string
    mpPaymentUrl: string
  }[],
  extra: Partial<OrderConfirm> & { method: OrderMethod },
): OrderConfirm {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return {
    ...extra,
    items: items.map((i) => ({
      productId: i.productId,
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      image: i.image,
    })),
    total,
    createdAt: new Date().toISOString(),
  }
}
