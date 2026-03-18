import Link from 'next/link'

interface LogoProps {
  clickable?: boolean
  light?: boolean /* light=true: texto blanco para fondos oscuros */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StoreLogo({ clickable = false, light = false, size = 'md', className = '' }: LogoProps) {
  const fontSizes: Record<string, string> = { sm: '1.1rem', md: '1.5rem', lg: '2rem' }
  const fontSize = fontSizes[size]
  const gold = '#C9973E'
  const textColor = light ? '#ffffff' : 'var(--text-main, #2C1810)'

  const inner = (
    <span
      className={`store-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.15em',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        fontSize,
        lineHeight: 1,
        textDecoration: 'none',
        letterSpacing: '0.02em',
        userSelect: 'none',
      }}
    >
      {/* Diamante decorativo */}
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill={gold}
        style={{ flexShrink: 0, marginRight: '0.15em' }}
        aria-hidden="true"
      >
        <polygon points="4,0 8,6 4,12 0,6" />
      </svg>

      {/* "Salma" en estilo sans-serif bold */}
      <span style={{ fontWeight: 700, color: textColor, letterSpacing: '0.05em' }}>
        Salma
      </span>

      {/* "Store" en cursiva dorada */}
      <span style={{ fontWeight: 300, fontStyle: 'italic', color: gold, letterSpacing: '0.08em' }}>
        {'\u00a0'}Store
      </span>
    </span>
  )

  if (clickable) {
    return (
      <Link href="/" style={{ textDecoration: 'none' }} aria-label="Ir al inicio">
        {inner}
      </Link>
    )
  }

  return inner
}
