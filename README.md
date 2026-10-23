# Lun & Lou

E-commerce glassmorphism con React + Vite + Tailwind + animaciones 3D (404).

Catálogo real de belleza/bienestar (10 productos individuales, precios COP). Imágenes WebP en `public/img/products/`.

**Solo contraentrega:** todos los pedidos (producto individual o carrito) se pagan en efectivo al recibir y se envían a Formspree como texto plano indexable.

Los zips originales viven en `IMG REAL/` (fuente local, ignorados por git).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (microtransiciones y scroll)
- three / @react-three/fiber / @react-three/drei (solo decor 404)
- Zustand (carrito con persistencia)
- React Hook Form + Zod + Formspree (pedidos contraentrega → texto plano)

## Scripts

```bash
npm install
npm run dev      # desarrollo
npm run build    # typecheck + build
npm run lint     # oxlint
npm run preview  # previsualizar build
```

## Configuración

1. Copia `.env.example` a `.env`.
2. Pona el ID de Formspree en `VITE_FORMSPREE_ID` (ej. `mnpnvwlq` → `https://formspree.io/f/mnpnvwlq`).
3. WhatsApp del negocio en `VITE_WHATSAPP` (formato `57` + número, ej. `573144572008`).
4. Imágenes reales en `public/img/products/` (WebP ≤1400px).
5. (Opcional) Foto de modelaje del hero en `public/img/hero/modela.webp` — si no existe, se usa el arte editorial incluido.

## Contacto

- WhatsApp: 314 457 2008
- Instagram: @lunylouco
- Email: inbox@lunylou.com
- Región: Sábana Occidental · Envíos a toda Colombia

## Flujos de venta

| Escenario | Medio |
|-----------|--------|
| Producto individual (ficha) | Contraentrega (Formspree) |
| Carrito (1 o varios productos) | Contraentrega (Formspree) |

| Medio | Cómo funciona |
|-------|----------------|
| Contraentrega | Ficha/Carrito → Checkout → Formspree → pago en efectivo al recibir |
| Envío | En 2 días a tu puerta (se coordina por WhatsApp) |
