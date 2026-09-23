import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article' | 'section'
}

export function GlassCard({ children, className = '', hover = false, as: Tag = 'div' }: Props) {
  return (
    <Tag
      className={`glass grain rounded-3xl transition-all duration-500 ${
        hover
          ? 'hover:-translate-y-1.5 hover:shadow-glass-lg hover:border-white/70'
          : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
