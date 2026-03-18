'use client'
// components/ProductModal.tsx
import { useState, useCallback } from 'react'
import Image from 'next/image'
import type { Product } from '@/types/database'
import { useCart } from '@/context/CartContext'
import { X, ChevronLeft, ChevronRight, ShoppingBag, Shirt } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import styles from './ProductModal.module.css'

interface Props {
  product: Product
  onClose: () => void
  waNumber: string
  onToast: (msg: string) => void
}

const fmt = (n: number) => '$' + Number(n).toLocaleString('es-CO')

export default function ProductModal({ product: p, onClose, waNumber, onToast }: Props) {
  const { addItem } = useCart()
  const [selColor, setSelColor] = useState<{ hex: string; name: string } | null>(null)
  const [selSize, setSelSize]   = useState<string | null>(null)
  const [qty, setQty]           = useState(1)
  const [imgIdx, setImgIdx]     = useState(0)
  const [warn, setWarn]         = useState(false)

  const needColor = (p.colors?.length ?? 0) > 0
  const needSize  = (p.sizes?.length  ?? 0) > 0
  const isSoldOut = p.status === 'sold_out'
  const hasDiscount = p.original_price && p.original_price > p.price
  const discountPct = hasDiscount
    ? Math.round(((p.original_price! - p.price) / p.original_price!) * 100)
    : 0

  const validate = useCallback(() => {
    if ((needColor && !selColor) || (needSize && !selSize)) {
      setWarn(true)
      setTimeout(() => setWarn(false), 2500)
      return false
    }
    return true
  }, [needColor, needSize, selColor, selSize])

  const handleAddToCart = useCallback(() => {
    if (!validate()) return
    addItem(p, selColor, selSize, qty)
    onToast('✅ Agregado al carrito')
    onClose()
  }, [validate, addItem, p, selColor, selSize, qty, onToast, onClose])

  const handleBuyWA = useCallback(() => {
    if (!validate()) return
    if (!waNumber) { onToast('⚠️ Configura el WhatsApp en Admin'); return }
    let msg = `🛍️ *Pedido - ${p.name}*\n\n`
    if (selColor) msg += `• Color: ${selColor.name}\n`
    if (selSize)  msg += `• Talla: ${selSize}\n`
    msg += `• Cantidad: ${qty}\n`
    msg += `• Total: ${fmt(p.price * qty)}\n\n`
    msg += `¡Hola! Me gustaría confirmar disponibilidad 😊`
    window.open(`https://wa.me/${waNumber.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, '_blank')
  }, [validate, waNumber, p, selColor, selSize, qty, onToast])

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: p.name, text: `Mira este producto: ${p.name}`, url: window.location.href })
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href)
      onToast('🔗 Link copiado')
    }
  }, [p.name, onToast])

  const prevImg = () => setImgIdx(i => (i - 1 + p.images.length) % p.images.length)
  const nextImg = () => setImgIdx(i => (i + 1) % p.images.length)

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()} role="dialog" aria-modal aria-label={p.name}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Cerrar"><X size={24} /></button>

        {/* ── Galería ── */}
        <div className={styles.gallery}>
          {p.images?.length > 0 ? (
            <>
              <div className={styles.mainImg}>
                <Image
                  src={p.images[imgIdx]}
                  alt={`${p.name} imagen ${imgIdx + 1}`}
                  fill
                  sizes="(max-width:600px) 100vw, 520px"
                  className={styles.img}
                  priority
                />
                {p.images.length > 1 && (
                  <>
                    <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prevImg} aria-label="Imagen anterior"><ChevronLeft size={24} /></button>
                    <button className={`${styles.navBtn} ${styles.navNext}`} onClick={nextImg} aria-label="Imagen siguiente"><ChevronRight size={24} /></button>
                    <div className={styles.dots}>
                      {p.images.map((_, i) => (
                        <button
                          key={i}
                          className={`${styles.dot} ${i === imgIdx ? styles.dotActive : ''}`}
                          onClick={() => setImgIdx(i)}
                          aria-label={`Ver imagen ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {p.images.length > 1 && (
                <div className={styles.thumbs}>
                  {p.images.map((src, i) => (
                    <button
                      key={i}
                      className={`${styles.thumb} ${i === imgIdx ? styles.thumbActive : ''}`}
                      onClick={() => setImgIdx(i)}
                    >
                      <Image src={src} alt={`Thumb ${i + 1}`} fill sizes="60px" style={{ objectFit:'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={styles.noImg}><Shirt size={64} strokeWidth={1} color="var(--mauve)" /></div>
          )}
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>
          <div className={styles.topRow}>
            <div className={styles.cat}>{p.category}</div>
            <button className={styles.shareBtn} onClick={handleShare} aria-label="Compartir producto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
          </div>
          <h2 className={styles.name}>{p.name}</h2>
          <div className={styles.priceRow}>
            <span className={styles.price}>{fmt(p.price)}</span>
            {hasDiscount && (
              <>
                <span className={styles.originalPrice}>{fmt(p.original_price!)}</span>
                <span className={styles.discountBadge}>−{discountPct}%</span>
              </>
            )}
          </div>
          {p.description && <p className={styles.desc}>{p.description}</p>}

          {/* Colores */}
          {needColor && (
            <div>
              <div className={styles.selectLbl}>
                Color {selColor && <span className={styles.selVal}>· {selColor.name}</span>}
              </div>
              <div className={styles.colorOpts}>
                {p.colors.map(c => (
                  <button
                    key={c.hex}
                    className={`${styles.colorOpt} ${selColor?.hex === c.hex ? styles.colorActive : ''}`}
                    onClick={() => setSelColor(c)}
                    title={c.name}
                    aria-label={c.name}
                  >
                    <div className={styles.colorCircle} style={{ background: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tallas */}
          {needSize && (
            <div>
              <div className={styles.selectLbl}>
                Talla {selSize && <span className={styles.selVal}>· {selSize}</span>}
              </div>
              <div className={styles.sizeOpts}>
                {p.sizes.map(s => (
                  <button
                    key={s}
                    className={`${styles.sizeOpt} ${selSize === s ? styles.sizeActive : ''}`}
                    onClick={() => setSelSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div className={styles.qtyRow}>
            <span className={styles.qtyLbl}>Cantidad</span>
            <div className={styles.qtyCtrl}>
              <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className={styles.qtyVal}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {warn && <p className={styles.warn}>⚠️ Elige {needColor && !selColor ? 'color' : ''}{needColor && !selColor && needSize && !selSize ? ' y ' : ''}{needSize && !selSize ? 'talla' : ''} para continuar</p>}

          {/* Acciones */}
          <div className={styles.actions}>
            {isSoldOut ? (
              <button className={styles.btnCart} disabled>❌ Agotado</button>
            ) : (
              <>
                <button className={styles.btnWA} onClick={handleBuyWA}>
                  <WhatsAppIcon size={18} style={{marginRight: 8}} /> Pedir por WhatsApp
                </button>
                <button className={styles.btnCart} onClick={handleAddToCart}>
                  <ShoppingBag size={18} style={{marginRight: 8}} /> Agregar al carrito
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
