import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (/framer-motion|motion-dom|motion-utils|motion-number/.test(id)) return 'motion'
          if (/react-hook-form|@hookform|zod/.test(id)) return 'forms'
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) {
            return 'react'
          }
        },
      },
    },
  },
})
