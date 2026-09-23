# Lun & Lou

E-commerce glassmorphism con React + Vite + Tailwind + animaciones 3D.

Catálogo real de belleza/bienestar (10 productos, precios COP). Imágenes reales optimizadas a WebP en `public/img/products/`. Links de Mercado Pago pendientes en `mpPaymentUrl`.

Los zips originales viven en `IMG REAL/` (fuente local, ignorados por git).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (microtransiciones y scroll)
- three / @react-three/fiber / @react-three/drei (hero 3D y galería 3D de fotos)
- Zustand (carrito con persistencia)
- React Hook Form + Zod + Formspree (pedidos contraentrega)
- Mercado Pago: link de pago único por producto (`mpPaymentUrl`)

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
2. Crea un formulario en [Formspree](https://formspree.io) y pon su ID en `VITE_FORMSPREE_ID`.
3. En `src/data/products.ts`, llena `mpPaymentUrl` con el link único de pago de Mercado Pago de cada producto (Panel MP → cobrar con link, o Checkout Pro).
4. Imágenes reales ya integradas (WebP ≤1400px). Para reemplazar: actualiza archivos en `public/img/products/` o las rutas `images` en `products.ts`.

## Flujos de venta

| Medio | Cómo funciona |
|-------|----------------|
| Mercado Pago | Botón por producto → redirige al link único de pago |
| Contraentrega | Carrito → Checkout → Formspree (pago en efectivo al recibir) |
