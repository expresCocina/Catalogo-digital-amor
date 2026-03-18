'use client'
// components/CartDrawer.tsx
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { X, ShoppingBag, Shirt } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import styles from './CartDrawer.module.css'

interface Props {
  isOpen: boolean
  onClose: () => void
  waNumber: string
  storeName?: string
}

const fmt = (n: number) => '$' + Number(n).toLocaleString('es-CO')

export default function CartDrawer({ isOpen, onClose, waNumber, storeName = 'Salma Store' }: Props) {
  const { items, totalQty, totalPrice, removeItem, updateQty } = useCart()

  if (!isOpen) return null

  const sendWA = () => {
    if (!waNumber) { alert('⚠️ Configura el WhatsApp en Admin'); return }
    let msg = `🛍️ *Pedido - ${storeName}*\n\n`
    items.forEach(item => {
      msg += `• *${item.name}*\n`
      if (item.color) msg += `  Color: ${item.color.name}\n`
      if (item.size)  msg += `  Talla: ${item.size}\n`
      msg += `  Cant: ${item.qty} · ${fmt(item.price * item.qty)}\n\n`
    })
    msg += `💰 *Total: ${fmt(totalPrice)}*\n\n¡Hola! Me gustaría confirmar disponibilidad 😊`
    window.open(`https://wa.me/${waNumber.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()} role="dialog" aria-modal aria-label="Carrito de compras">
      <div className={styles.panel}>
        {/* Header */}
        <div className={styles.hdr}>
          <div>
            <h2 className={styles.hdrTitle}>Tu Carrito</h2>
            <p className={styles.hdrSub}>{totalQty} producto{totalQty !== 1 ? 's' : ''}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar carrito"><X size={24} /></button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {!items.length ? (
            <div className={styles.empty}>
              <div className={styles.emptyIco}><ShoppingBag size={48} strokeWidth={1} color="var(--mauve)" /></div>
              <p>Tu carrito está vacío</p>
              <button className={styles.continueBtn} onClick={onClose}>Seguir comprando →</button>
            </div>
          ) : (
            items.map((item, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.thumb}>
                  {item.img ? (
                    <Image src={item.img} alt={item.name} fill sizes="72px" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className={styles.thumbEmpty}><Shirt size={24} strokeWidth={1} color="var(--mauve)" /></div>
                  )}
                </div>
                <div className={styles.info}>
                  <h4>{item.name}</h4>
                  <div className={styles.meta}>
                    {item.color && <span>Color: {item.color.name}</span>}
                    {item.color && item.size && <span> · </span>}
                    {item.size  && <span>Talla: {item.size}</span>}
                  </div>
                  <div className={styles.itemPrice}>{fmt(item.price)}</div>
                </div>
                <div className={styles.right}>
                  <button className={styles.rmBtn} onClick={() => removeItem(i)} aria-label="Eliminar"><X size={16} /></button>
                  <div className={styles.qtyCtrl}>
                    <button className={styles.qBtn} onClick={() => updateQty(i, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button className={styles.qBtn} onClick={() => updateQty(i, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <strong>{fmt(totalPrice)}</strong>
            </div>
            <button className={styles.btnWA} onClick={sendWA}>
              <WhatsAppIcon size={18} style={{marginRight: 8}} /> Enviar pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
