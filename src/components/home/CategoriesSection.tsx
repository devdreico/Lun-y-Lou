import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryList, products } from '../../data/products'
import { SectionHeading } from '../ui/SectionHeading'

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Categorías"
        title={
          <>
            Rostro, cabello <span className="text-gradient-forest italic">y cuerpo</span>
          </>
        }
        description="Elige la zona que quieres cuidar, arma tu carrito en minutos y pagas en efectivo cuando el paquete esté en tus manos."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {categoryList.map((cat, i) => {
          const count = products.filter((p) => p.category === cat.slug).length
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={i === 2 ? 'col-span-2 sm:col-span-1' : undefined}
            >
              <Link
                to={`/productos?cat=${cat.slug}`}
                className="glass grain flex h-full flex-col items-center justify-center gap-3 rounded-3xl p-5 text-center transition-colors duration-300 hover:border-rose/40 sm:p-7"
              >
                <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-white/70 to-white/30 text-4xl shadow-inner">
                  {cat.emoji}
                </span>
                <span className="text-base font-semibold text-ink/85">{cat.label}</span>
                <span className="text-xs text-ink/60">
                  {count} {count === 1 ? 'producto' : 'productos'}
                </span>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/productos"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-rose-dark"
        >
          Ver todo el catálogo
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  )
}
