import { motion } from 'framer-motion'
import { MessageCircle, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SITE, WHATSAPP_URL } from '../lib/constants'
import { useSeo } from '../lib/seo'
import { SectionHeading } from '../components/ui/SectionHeading'

const faqs = [
  {
    q: '¿Cómo pago mi pedido?',
    a: 'Solo contraentrega: pagas en efectivo cuando recibes el paquete en tu puerta. No pedimos tarjeta, transferencia ni anticipo. Si no quieres aceptar el paquete, no pagas.',
  },
  {
    q: '¿Cuánto demora el envío?',
    a: 'El envío es de 2 días hábiles a la mayoría de ciudades de Colombia. Al confirmar tu pedido te escribimos por WhatsApp para coordinar el día y el horario de la entrega.',
  },
  {
    q: '¿Cuánto cuesta el envío?',
    a: 'El costo del envío te lo confirmamos por WhatsApp al coordinar el despacho, antes de que el paquete salga. Así evitas sorpresas y decides con calma.',
  },
  {
    q: '¿Puedo cambiar o devolver un producto?',
    a: 'Sí. Si el producto llega dañado, no funciona o no es el que pediste, escríbenos al WhatsApp con una foto y lo resolvemos contigo. Tu compra está cubierta.',
  },
  {
    q: '¿Quién puede usar estos productos?',
    a: 'Cualquiera que quiera cuidarse en casa: máscaras, masajeadores y herramientas de cabello funcionan para hombres y mujeres, con todo tipo de piel y cabello.',
  },
  {
    q: 'No sé cuál elegir, ¿me ayudan?',
    a: `Claro. Escríbenos al ${SITE.phoneDisplay} por WhatsApp, cuéntanos si es para rostro, cabello o cuerpo y cuál es tu presupuesto, y te recomendamos opciones con honestidad. Te contesta una persona real, no un bot.`,
  },
  {
    q: '¿Puedo enviar el pedido a otra ciudad o a otra persona?',
    a: 'Sí, enviamos a toda Colombia. Puedes poner en la dirección el nombre de la persona que recibe y su barrio, y nosotros coordinamos la entrega con ella.',
  },
  {
    q: '¿Cómo sé que mi pedido quedó confirmado?',
    a: 'Al terminar el pedido en la web ves la pantalla de confirmación y te escribimos por WhatsApp para coordinar el despacho. Si prefieres, puedes pedir directo por WhatsApp.',
  },
]

export function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  useSeo({
    title: `Preguntas frecuentes | ${SITE.name}`,
    description:
      'Cómo pagar contraentrega, tiempos de envío, cambios y garantías en Lun & Lou. Resolvemos tus dudas antes de pedir.',
    path: '/preguntas-frecuentes',
    jsonLd,
  })

  return (
    <div className="mx-auto min-h-[70vh] max-w-3xl px-4 pb-24 pt-32 sm:px-6">
      <SectionHeading
        eyebrow="Ayuda"
        title={
          <>
            Preguntas <span className="text-gradient-rose italic">frecuentes</span>
          </>
        }
        description="Todo lo que necesitas saber antes de pedir, sin letra pequeña."
      />

      <div className="mt-10 space-y-3">
        {faqs.map((faq, i) => (
          <motion.details
            key={faq.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.2), duration: 0.4 }}
            className="glass grain group rounded-2xl px-5 py-4 open:shadow-glass"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink marker:hidden sm:text-base">
              {faq.q}
              <Plus className="size-4 shrink-0 text-rose transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{faq.a}</p>
          </motion.details>
        ))}
      </div>

      <div className="glass mt-10 rounded-3xl p-6 text-center">
        <p className="font-display text-xl font-semibold">¿Te quedó una duda?</p>
        <p className="mt-2 text-sm text-ink/70">
          Escríbenos y te contesta una persona real, no un bot.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary btn-md">
            <MessageCircle className="size-4" /> WhatsApp {SITE.phoneDisplay}
          </a>
          <Link to="/productos" className="btn-ghost btn-md">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  )
}
