import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  lastAddedId: string | null
  addItem: (product: Product, opts: { quantity?: number }) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
  markAdded: (id: string | null) => void
}

const itemKey = (i: Pick<CartItem, 'productId'>) => i.productId

export const cartKey = itemKey

/** Quita campos legacy size/color de carritos persistidos antes de este refactor. */
const migrateLegacyItems = (raw: unknown): CartItem[] => {
  if (!Array.isArray(raw)) return []
  return raw.map((entry) => {
    const i = entry as CartItem & { size?: string; color?: string }
    return {
      productId: i.productId,
      slug: i.slug,
      name: i.name,
      price: i.price,
      image: i.image,
      quantity: i.quantity,
      mpPaymentUrl: i.mpPaymentUrl,
    }
  })
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      lastAddedId: null,

      addItem: (product, { quantity = 1 }) =>
        set((state) => {
          const key = itemKey({ productId: product.id })
          const existing = state.items.find((i) => itemKey(i) === key)

          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i) === key
                  ? { ...i, quantity: Math.min(i.quantity + quantity, 20) }
                  : i,
              ),
              isOpen: true,
              lastAddedId: product.id,
            }
          }

          const next: CartItem = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0]?.src ?? '',
            quantity,
            mpPaymentUrl: product.mpPaymentUrl,
          }

          return {
            items: [...state.items, next],
            isOpen: true,
            lastAddedId: product.id,
          }
        }),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => itemKey(i) !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => itemKey(i) !== key)
              : state.items.map((i) =>
                  itemKey(i) === key ? { ...i, quantity: Math.min(quantity, 20) } : i,
                ),
        })),

      clearCart: () => set({ items: [] }),
      setOpen: (isOpen) => set({ isOpen }),
      markAdded: (lastAddedId) => set({ lastAddedId }),
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
