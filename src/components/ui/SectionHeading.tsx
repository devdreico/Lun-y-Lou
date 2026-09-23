import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
  className?: string
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignCls} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-rose/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] text-ink text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-ink/65 text-base md:text-lg leading-relaxed text-pretty">{description}</p>
      )}
    </div>
  )
}
