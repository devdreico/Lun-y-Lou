export interface ToastData {
  id: string
  title: string
  message?: string
}

type Listener = (t: ToastData) => void

const listeners: Listener[] = []

export function subscribeToasts(listener: Listener): () => void {
  listeners.push(listener)
  return () => {
    const i = listeners.indexOf(listener)
    if (i >= 0) listeners.splice(i, 1)
  }
}

export function toast(data: Omit<ToastData, 'id'>) {
  const payload: ToastData = {
    ...data,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
  }
  listeners.forEach((l) => l(payload))
}
