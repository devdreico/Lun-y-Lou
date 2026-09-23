import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Banknote, Loader2, Lock, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../components/ui/Button'
import { toast } from '../lib/toast'
import { citiesOf, departmentNames } from '../data/colombia'
import { buildOrderPayload, submitOrder } from '../lib/formspree'
import { formatCOP } from '../lib/format'
import { selectTotal, useCart } from '../store/cart'
import type { CheckoutFormData } from '../types'

const schema = z.object({
  fullName: z.string().min(3, 'Ingresa tu nombre completo'),
  phone: z
    .string()
    .min(7, 'Teléfono inválido')
    .max(15, 'Teléfono muy largo')
    .regex(/^[0-9+\s-]+$/, 'Solo números'),
  email: z.email('Correo inválido'),
  department: z.string().min(1, 'Selecciona el departamento'),
  city: z.string().min(1, 'Selecciona la ciudad'),
  address: z.string().min(8, 'Dirección muy corta (barrio, calle, número)'),
  notes: z.string().max(400, 'Máximo 400 caracteres').default(''),
})

export function CheckoutPage() {
  const items = useCart((s) => s.items)
  const clearCart = useCart((s) => s.clearCart)
  const total = selectTotal(items)
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { notes: '' },
  })

  const department = watch('department')
  const cities = useMemo(() => citiesOf(department), [department])

  if (items.length === 0 && !sending) {
    return <Navigate to="/carrito" replace />
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setSending(true)
    const payload = buildOrderPayload(items, data)
    const result = await submitOrder(payload)
    setSending(false)

    if (result.ok) {
      clearCart()
      navigate('/pedido-exitoso', {
        state: { demo: result.demo, name: data.fullName, city: data.city },
      })
    } else {
      toast({ title: 'No se pudo enviar', message: result.error })
    }
  }

  const fieldCls = (error?: string) => `space-y-1.5 ${error ? '[&_input]:border-rose/60' : ''}`

  return (
    <div className="mx-auto min-h-[70vh] max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-dark">
          Contraentrega
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-balance sm:text-4xl md:text-5xl">
          Finaliza tu pedido
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-ink/60">
          Pagas en efectivo al recibir. Te confirmamos por WhatsApp el despacho a tu ciudad en
          toda Colombia.
        </p>
      </motion.header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass grain space-y-8 rounded-[2rem] p-4 sm:p-6 md:p-8"
          noValidate
        >
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-rose text-xs font-bold text-white">
                1
              </span>
              <h2 className="font-display text-xl font-semibold">Tus datos</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className={fieldCls(errors.fullName?.message)}>
                <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  Nombre completo
                </label>
                <input id="fullName" {...register('fullName')} className="input-glass" placeholder="Maria Perez" />
                {errors.fullName && (
                  <p className="text-xs text-rose-dark">{errors.fullName.message}</p>
                )}
              </div>

              <div className={fieldCls(errors.phone?.message)}>
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  Celular
                </label>
                <input id="phone" {...register('phone')} className="input-glass" placeholder="300 123 4567" inputMode="tel" />
                {errors.phone && <p className="text-xs text-rose-dark">{errors.phone.message}</p>}
              </div>

              <div className={`sm:col-span-2 ${fieldCls(errors.email?.message)}`}>
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  Correo
                </label>
                <input id="email" type="email" {...register('email')} className="input-glass" placeholder="tucorreo@email.com" />
                {errors.email && <p className="text-xs text-rose-dark">{errors.email.message}</p>}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-forest text-xs font-bold text-cream">
                2
              </span>
              <h2 className="font-display text-xl font-semibold">Entrega en toda Colombia</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className={fieldCls(errors.department?.message)}>
                <label htmlFor="department" className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  Departamento
                </label>
                <select id="department" {...register('department')} className="input-glass appearance-none">
                  <option value="">Selecciona…</option>
                  {departmentNames.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-xs text-rose-dark">{errors.department.message}</p>
                )}
              </div>

              <div className={fieldCls(errors.city?.message)}>
                <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  Ciudad / Municipio
                </label>
                <select
                  id="city"
                  {...register('city')}
                  className="input-glass appearance-none"
                  disabled={!department}
                >
                  <option value="">{department ? 'Selecciona…' : 'Elige departamento'}</option>
                  {cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-xs text-rose-dark">{errors.city.message}</p>}
              </div>

              <div className={`sm:col-span-2 ${fieldCls(errors.address?.message)}`}>
                <label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  Dirección con barrio
                </label>
                <input
                  id="address"
                  {...register('address')}
                  className="input-glass"
                  placeholder="Cra 7 # 72-41, Barrio Chicó"
                />
                {errors.address && (
                  <p className="text-xs text-rose-dark">{errors.address.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  Notas (opcional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  {...register('notes')}
                  className="input-glass mt-1.5 resize-none"
                  placeholder="Referencias, horario de entrega, apartamento…"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-gold text-xs font-bold text-ink">
                3
              </span>
              <h2 className="font-display text-xl font-semibold">Pago contraentrega</h2>
            </div>

            <div className="rounded-2xl border border-forest/25 bg-forest/8 p-4 text-sm text-ink/70">
              <p className="flex items-start gap-2">
                <Banknote className="mt-0.5 size-4 shrink-0 text-forest" />
                <span>
                  Al confirmar enviamos tu pedido en <strong>texto plano</strong> a nuestro
                  equipo (Formspree). Coordinamos el despacho y pagas en{' '}
                  <strong>efectivo</strong> cuando recibas el paquete.
                </span>
              </p>
              <p className="mt-2 flex items-start gap-2 text-ink/55">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-rose" />
                <span>
                  ¿Prefieres tarjeta o Nequi? En la ficha de cada producto puedes pagar con{' '}
                  <strong>Mercado Pago</strong> (solo compras de 1 producto). Varios
                  productos en carrito: solo contraentrega.
                </span>
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              loading={sending}
              className="w-full justify-center text-center"
            >
              {sending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Enviando pedido…
                </>
              ) : (
                <span className="min-w-0">
                  Confirmar pedido
                  <span className="mt-0.5 block text-xs font-medium opacity-80">
                    {formatCOP(total)}
                  </span>
                </span>
              )}
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-ink/45">
              <Lock className="size-3" /> Tus datos solo se usan para la entrega
            </p>
          </section>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="glass grain h-fit rounded-[2rem] p-5 sm:p-6 lg:sticky lg:top-28"
        >
          <h2 className="font-display text-xl font-semibold">Tu pedido</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-3">
                <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-cream-dark">
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-ink/50">
                    {item.quantity}×
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatCOP(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between text-ink/55">
              <span>Subtotal</span>
              <span>{formatCOP(total)}</span>
            </div>
            <div className="flex justify-between text-ink/55">
              <span>Envío</span>
              <span>Coordinado</span>
            </div>
            <div className="flex flex-col gap-1 pt-2 sm:flex-row sm:items-end sm:justify-between">
              <span className="font-medium">Total a pagar al recibir</span>
              <span className="font-display text-2xl font-semibold text-gradient-rose">
                {formatCOP(total)}
              </span>
            </div>
          </div>

          <Link
            to="/carrito"
            className="mt-5 block text-center text-sm text-ink/50 underline-offset-4 hover:text-rose-dark hover:underline"
          >
            ← Volver al carrito
          </Link>
        </motion.aside>
      </div>
    </div>
  )
}
