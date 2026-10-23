import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, opts: { quantity?: number }) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
}

const itemKey = (i: Pick<CartItem, 'productId'>) => i.productId

export const cartKey = itemKey

const MAX_QTY_FALLBACK = 20

/** Quita campos legacy (size/color/mpPaymentUrl) de carritos persistidos. */
const migrateLegacyItems = (raw: unknown): CartItem[] => {
  if (!Array.isArray(raw)) return []
  return raw.map((entry) => {
    const i = entry as CartItem & { size?: string; color?: string; mpPaymentUrl?: string }
    return {
      productId: i.productId,
      slug: i.slug,
      name: i.name,
      price: i.price,
      image: i.image,
      quantity: i.quantity,
    }
  })
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product, { quantity = 1 }) =>
        set((state) => {
          const key = itemKey({ productId: product.id })
          const existing = state.items.find((i) => itemKey(i) === key)
          const max = product.stock || MAX_QTY_FALLBACK

          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i) === key
                  ? { ...i, quantity: Math.min(i.quantity + quantity, max), stock: max }
                  : i,
              ),
              isOpen: true,
            }
          }

          const next: CartItem = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0]?.src ?? '',
            quantity: Math.min(quantity, max),
            stock: max,
          }

          return { items: [...state.items, next], isOpen: true }
        }),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => itemKey(i) !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => itemKey(i) !== key)
              : state.items.map((i) =>
                  itemKey(i) === key
                    ? { ...i, quantity: Math.min(quantity, i.stock ?? MAX_QTY_FALLBACK) }
                    : i,
                ),
        })),

      clearCart: () => set({ items: [] }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'lunylou-cart',
      partialize: (s) => ({ items: s.items }),
      migrate: (persisted) => {
        const state = persisted as { items?: unknown }
        return { items: migrateLegacyItems(state.items) } as CartState
      },
    },
  ),
)

export const selectCount = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.quantity, 0)

export const selectTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
