import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  dark: 'btn-dark',
}

const sizeClass: Record<Size, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${variantClass[variant]} ${sizeClass[size]} ${className} disabled:opacity-55 disabled:pointer-events-none`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}

interface LinkButtonProps {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  onClick?: () => void
}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${variantClass[variant]} ${sizeClass[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
