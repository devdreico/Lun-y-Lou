import { Camera, Mail, MapPin, MessageCircle, Music2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WHATSAPP_URL, SITE } from '../../lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24 overflow-hidden text-cream">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-ink" />
      <div
        className="absolute -left-24 top-0 size-72 rounded-full bg-rose/25 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-16 bottom-10 size-64 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20">
                <img src="/logo.png" alt="Lun & Lou" className="size-9 object-contain" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold">Lun & Lou</p>
                <p className="text-xs uppercase tracking-[0.3em] text-cream/55">
                  Belleza y bienestar · Colombia
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
              Distribuimos mercancía femenina a todo el país. Paga seguro con Mercado Pago o recibe
              tu pedido a contraentrega donde estés.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 transition hover:bg-white/20 hover:ring-rose/40"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 transition hover:bg-white/20 hover:ring-rose/40"
              >
                <Camera className="size-4" /> Instagram
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 transition hover:bg-white/20 hover:ring-rose/40"
              >
                <Music2 className="size-4" /> TikTok
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-lg font-semibold">Tienda</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li>
                <Link to="/productos" className="transition hover:text-rose-light">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link to="/productos?cat=facial" className="transition hover:text-rose-light">
                  Facial
                </Link>
              </li>
              <li>
                <Link to="/productos?cat=cabello" className="transition hover:text-rose-light">
                  Cabello
                </Link>
              </li>
              <li>
                <Link to="/productos?cat=corporal" className="transition hover:text-rose-light">
                  Corporal
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="transition hover:text-rose-light">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-lg font-semibold">Ayuda</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 transition hover:text-rose-light">
                  <Mail className="size-3.5" /> {SITE.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 size-3.5 shrink-0" /> Envíos a todo Colombia
              </li>
              <li className="text-cream/55">Contraentrega disponible</li>
              <li className="text-cream/55">Cambios por talla en 7 días</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} Lun & Lou. Todos los derechos reservados.</p>
          <p>Pagos procesados por Mercado Pago · Hecho con ♥ en Colombia</p>
        </div>
      </div>
    </footer>
  )
}
