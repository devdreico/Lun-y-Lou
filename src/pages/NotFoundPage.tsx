import { motion } from 'framer-motion'
import { LinkButton } from '../components/ui/Button'
import { DecorScene } from '../components/three/DecorScene'

export function NotFoundPage() {
  return (
    <div className="relative mx-auto flex min-h-[85vh] max-w-3xl flex-col items-center justify-center px-4 pt-24 text-center">
      <div className="absolute inset-x-4 top-28 bottom-24 overflow-hidden rounded-[2.5rem] opacity-70">
        <DecorScene />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 glass grain rounded-[2rem] px-8 py-12"
      >
        <p className="font-display text-7xl font-semibold text-gradient-rose">404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold">Página no encontrada</h1>
        <p className="mt-3 text-ink/60">
          Esta URL no existe o el producto ya no está publicado. Vuelve al catálogo.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <LinkButton to="/">Ir al inicio</LinkButton>
          <LinkButton to="/productos" variant="ghost">
            Ver productos
          </LinkButton>
        </div>
      </motion.div>
    </div>
  )
}
