import type { CartItem, CheckoutFormData } from '../types'
import { formatCOP } from './format'

const DEMO_ID = 'your_formspree_id'

export function isFormspreeConfigured(): boolean {
  const id = import.meta.env.VITE_FORMSPREE_ID as string | undefined
  return Boolean(id && id !== DEMO_ID)
}

/**
 * Pedido a contraentrega → texto plano indexado a Formspree.
 * - individual: 1 línea de producto (origen ficha o carrito con 1 ítem)
 * - carrito: 2+ productos → solo contraentrega
 */
export function buildOrderPayload(
  items: CartItem[],
  customer: CheckoutFormData,
): Record<string, string> {
  const lines = items
    .map(
      (i) =>
        `• ${i.quantity}x ${i.name} — Talla ${i.size} — ${i.color} — ${formatCOP(
          i.price * i.quantity,
        )}`,
    )
    .join('\n')

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((n, i) => n + i.quantity, 0)
  const isMulti = items.length > 1 || count > 1
  const origen = isMulti ? 'Carrito (varios productos)' : 'Ficha de producto (individual)'

  return {
    _subject: `Nuevo pedido contraentrega — ${customer.fullName}`,
    _language: 'es',
    tipo_pedido: isMulti
      ? 'Contraentrega — carrito (varios productos)'
      : 'Contraentrega — individual (1 producto)',
    metodo_pago: 'Contraentrega (efectivo al recibir)',
    origen,
    nombre: customer.fullName,
    telefono: customer.phone,
    email: customer.email,
    departamento: customer.department,
    ciudad: customer.city,
    direccion: customer.address,
    notas: customer.notes || '—',
    productos: lines,
    total: formatCOP(total),
    cantidad_productos: String(count),
    fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
    nota_pago:
      items.length === 1
        ? 'Producto individual: también puede pagarse con Mercado Pago desde la ficha.'
        : 'Carrito con varios productos: solo contraentrega (MP individual por producto en su ficha).',
  }
}

export async function submitOrder(
  payload: Record<string, string>,
): Promise<{ ok: boolean; demo: boolean; error?: string }> {
  const id = import.meta.env.VITE_FORMSPREE_ID as string | undefined

  if (!isFormspreeConfigured()) {
    await new Promise((r) => setTimeout(r, 1400))
    console.info('[Lun & Lou] Modo demo — pedido no enviado. Configura VITE_FORMSPREE_ID.', payload)
    return { ok: true, demo: true }
  }

  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { errors?: { message: string }[] }
        | null
      return {
        ok: false,
        demo: false,
        error: data?.errors?.[0]?.message ?? 'No pudimos enviar el pedido. Intenta de nuevo.',
      }
    }

    return { ok: true, demo: false }
  } catch {
    return {
      ok: false,
      demo: false,
      error: 'Error de conexión. Revisa tu internet e intenta otra vez.',
    }
  }
}
