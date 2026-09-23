import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SITE } from '../../lib/constants'
import { selectCount, useCart } from '../../store/cart'
import { LinkButton } from '../ui/Button'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Tienda' },
  { to: '/carrito', label: 'Carrito' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const items = useCart((s) => s.items)
  const setOpen = useCart((s) => s.setOpen)
  const count = selectCount(items)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div
            className={`flex w-full items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
              scrolled
                ? 'glass shadow-glass-lg'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <Link to="/" className="group flex items-center gap-3" aria-label="Lun & Lou inicio">
              <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-rose to-rose-dark text-white shadow-rose transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-8deg]">
                <img
                  src="/logo.png"
                  alt=""
                  className="size-8 object-contain mix-blend-screen brightness-125"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-tight text-ink">
                  Lun <span className="text-gradient-rose italic">&</span> Lou
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-ink/50">
                  Colombia
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-rose-dark' : 'text-ink/70 hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-rose/12 ring-1 ring-rose/25"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Abrir carrito, ${count} productos`}
                className="group relative grid size-11 place-items-center rounded-full border border-ink/10 bg-white/50 backdrop-blur-md transition-all duration-300 hover:border-rose/40 hover:bg-white/80 hover:shadow-rose active:scale-95"
              >
                <ShoppingBag className="size-5 text-ink transition-transform duration-300 group-hover:scale-110" />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={`cart-${count}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-0.5 -top-0.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-rose px-1 text-[10px] font-bold text-white shadow-rose cart-bump"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <LinkButton
                to="/productos"
                size="sm"
                className="btn-primary btn-sm hidden sm:inline-flex"
              >
                Comprar
              </LinkButton>

              <button
                type="button"
                className="grid size-11 place-items-center rounded-full border border-ink/10 bg-white/50 backdrop-blur-md transition hover:bg-white/80 md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menú"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="glass absolute inset-x-4 top-24 rounded-3xl p-4 shadow-glass-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-base font-medium transition ${
                        isActive ? 'bg-rose/12 text-rose-dark' : 'text-ink/75 hover:bg-white/50'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl px-4 py-3 text-base font-medium text-ink/75 hover:bg-white/50"
                >
                  Instagram
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
