'use client'
// components/Header.tsx
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { StoreLogo } from '@/components/icons/StoreLogo'
import styles from './Header.module.css'

interface HeaderProps {
  storeName?: string
  onCartOpen: () => void
  onAdminClick: () => void
}

export default function Header({ storeName = 'Salma Store', onCartOpen, onAdminClick }: HeaderProps) {
  const { totalQty } = useCart()

  return (
    <header className={styles.header}>
      {/* Logo clickeable que lleva al inicio */}
      <Link href="/" style={{ textDecoration: 'none' }} aria-label="Ir al inicio">
        <StoreLogo size="md" />
      </Link>

      <div className={styles.actions}>
        {/* Carrito */}
        <button className={styles.iconBtn} onClick={onCartOpen} title="Ver carrito" aria-label="Abrir carrito">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {totalQty > 0 && (
            <span className={styles.badge} aria-label={`${totalQty} productos`}>
              {totalQty > 99 ? '99+' : totalQty}
            </span>
          )}
        </button>

        {/* Admin */}
        <button className={styles.adminBtn} onClick={onAdminClick} aria-label="Panel de administración">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
          Admin
        </button>
      </div>
    </header>
  )
}
