import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollProgress } from './ScrollProgress'
import { CartDrawer } from '../cart/CartDrawer'
import { ToastHost } from '../ui/Toaster'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <ToastHost />
    </div>
  )
}
