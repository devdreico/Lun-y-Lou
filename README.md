# Lun & Lou

E-commerce glassmorphism con React + Vite + Tailwind + animaciones 3D (hero).

Catálogo real de belleza/bienestar (10 productos, precios COP). Imágenes WebP en `public/img/products/`. Links de Mercado Pago cargados en `mpPaymentUrl`.

Los zips originales viven en `IMG REAL/` (fuente local, ignorados por git).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (microtransiciones y scroll)
- three / @react-three/fiber / @react-three/drei (solo hero 3D)
- Zustand (carrito con persistencia)
- React Hook Form + Zod + Formspree (pedidos contraentrega → texto plano)
- Mercado Pago: link de pago por producto (`mpPaymentUrl`)

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
4. Links MP ya configurados en `src/data/products.ts` → `mpPaymentUrl`.
5. Imágenes reales en `public/img/products/` (WebP ≤1400px).

## Contacto

- WhatsApp: 314 457 2008
- Email: inbox@lunylou.com
- Región: Sábana Occidental · Envíos a toda Colombia

## Flujos de venta

| Escenario | Medio |
|-----------|--------|
| Ficha de producto (1 ítem) | Mercado Pago **o** contraentrega |
| Carrito con 1 ítem | Mercado Pago **o** contraentrega |
| Carrito con 2+ productos | **Solo contraentrega** |
| Contraentrega (individual o carrito) | Formspree (`VITE_FORMSPREE_ID`) como **texto plano** |

| Medio | Cómo funciona |
|-------|----------------|
| Mercado Pago | Botón en la ficha → redirige a `mpago.li/…` |
| Contraentrega | Ficha/Carrito → Checkout → Formspree (efectivo al recibir) |
