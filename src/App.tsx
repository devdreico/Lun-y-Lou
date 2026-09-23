import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const CatalogPage = lazy(() =>
  import('./pages/CatalogPage').then((m) => ({ default: m.CatalogPage })),
)
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })),
)
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })))
const CheckoutPage = lazy(() =>
  import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })),
)
const SuccessPage = lazy(() =>
  import('./pages/SuccessPage').then((m) => ({ default: m.SuccessPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function PageFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center pt-24">
      <div className="size-12 animate-spin rounded-full border-[3px] border-rose/25 border-t-rose" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout />
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<PageFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/productos"
            element={
              <Suspense fallback={<PageFallback />}>
                <CatalogPage />
              </Suspense>
            }
          />
          <Route
            path="/producto/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProductDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/carrito"
            element={
              <Suspense fallback={<PageFallback />}>
                <CartPage />
              </Suspense>
            }
          />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<PageFallback />}>
                <CheckoutPage />
              </Suspense>
            }
          />
          <Route
            path="/pedido-exitoso"
            element={
              <Suspense fallback={<PageFallback />}>
                <SuccessPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
