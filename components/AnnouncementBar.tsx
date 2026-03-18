'use client'
// components/AnnouncementBar.tsx
import { useState } from 'react'
import styles from './AnnouncementBar.module.css'

const MESSAGES = [
  '🚚 Domicilio GRATIS en Neiva, Huila',
  '✨ Nueva Colección 2026 disponible',
  '💛 Paga con WhatsApp · Envío el mismo día',
]

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className={styles.bar} role="banner">
      <div className={styles.track}>
        {/* Duplicar para loop infinito */}
        {[...MESSAGES, ...MESSAGES].map((msg, i) => (
          <span key={i} className={styles.item}>{msg}</span>
        ))}
      </div>
      <button className={styles.close} onClick={() => setVisible(false)} aria-label="Cerrar anuncio">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2">
          <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
        </svg>
      </button>
    </div>
  )
}
