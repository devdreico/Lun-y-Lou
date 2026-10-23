import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollProgress } from './ScrollProgress'
import { WhatsAppFab } from './WhatsAppFab'
import { CartDrawer } from '../cart/CartDrawer'
import { ToastHost } from '../ui/Toaster'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="relative min-h-screen">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-rose focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="contenido" className="relative" tabIndex={-1}>
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
      <CartDrawer />
      <ToastHost />
    </div>
  )
}
