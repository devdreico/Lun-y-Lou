import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { subscribeToasts, type ToastData } from '../../lib/toast'

export function ToastHost() {
  const [items, setItems] = useState<ToastData[]>([])

  useEffect(() => {
    return subscribeToasts((t) => {
      setItems((prev) => [...prev, t])
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id))
      }, 3200)
    })
  }, [])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="pointer-events-none fixed bottom-6 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="glass pointer-events-auto rounded-2xl px-4 py-3 shadow-glass-lg"
          >
            <p className="text-sm font-semibold text-ink">{t.title}</p>
            {t.message && <p className="mt-0.5 text-xs text-ink/60">{t.message}</p>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}
