import { Component, type ReactNode } from 'react'
import { SITE } from '../lib/constants'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-cream px-6 text-center text-ink">
          <div>
            <p className="font-display text-6xl font-semibold text-gradient-rose">Ups</p>
            <p className="mt-3 max-w-md text-ink/65">
              Algo falló en esta sección. Recarga la página o vuelve al inicio para seguir
              comprando.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-primary btn-md"
              >
                Recargar
              </button>
              <a href="/" className="btn-ghost btn-md">
                Volver al inicio
              </a>
            </div>
            <p className="mt-6 text-xs text-ink/65">
              ¿Persiste? Escríbenos al {SITE.phoneDisplay} por WhatsApp.
            </p>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
