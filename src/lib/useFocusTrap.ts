import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface Options {
  /** Activa el trap (drawer/menú abierto). */
  active: boolean
  /** Contenedor que atrapa el foco. */
  containerRef: RefObject<HTMLElement | null>
  /** Se llama al presionar Escape. */
  onEscape?: () => void
  /** Elemento a enfocar al abrir (por defecto, el primero enfocable). */
  initialFocusRef?: RefObject<HTMLElement | null>
}

/**
 * Trap de foco para diálogos (drawer, menú móvil):
 * enfoca al abrir, Tab/Shift+Tab circulan dentro y Escape cierra.
 */
export function useFocusTrap({ active, containerRef, onEscape, initialFocusRef }: Options) {
  useEffect(() => {
    if (!active) return
    const container = containerRef.current
    if (!container) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )

    const target = initialFocusRef?.current ?? focusables()[0] ?? container
    target.focus({ preventScroll: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onEscape?.()
        return
      }
      if (e.key !== 'Tab') return

      const els = focusables()
      if (els.length === 0) {
        e.preventDefault()
        return
      }
      const first = els[0]!
      const last = els[els.length - 1]!
      const current = document.activeElement

      if (e.shiftKey && (current === first || !container.contains(current))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [active, containerRef, onEscape, initialFocusRef])
}
