'use client'
// components/ProductCard.tsx
import Image from 'next/image'
import type { Product } from '@/types/database'
import { Shirt, Star } from 'lucide-react'
import styles from './ProductCard.module.css'

interface Props {
  product: Product
  index: number
  onClick: (id: string) => void
}

export default function ProductCard({ product: p, index, onClick }: Props) {
  const hasDiscount = p.original_price && p.original_price > p.price
  const discountPct = hasDiscount
    ? Math.round(((p.original_price! - p.price) / p.original_price!) * 100)
    : 0

  const fmt = (n: number) => '$' + Number(n).toLocaleString('es-CO')

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onClick(p.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(p.id)}
      aria-label={`Ver ${p.name}, ${fmt(p.price)}`}
    >
      {/* Imagen */}
      <div className={styles.imgWrap}>
        {p.images?.[0] ? (
          <Image
            src={p.images[0]}
            alt={p.name}
            fill
            sizes="(max-width:540px) 50vw, 280px"
            className={styles.img}
            loading={index < 6 ? 'eager' : 'lazy'}
          />
        ) : (
          <div className={styles.noImg}><Shirt size={48} strokeWidth={1} color="var(--mauve)" /></div>
        )}
        {/* Botón "Ver" en hover */}
        <span className={styles.quickView}>Ver Producto</span>
        {/* Badges */}
        {p.status === 'sold_out' && (
          <span className={styles.badge}>Agotado</span>
        )}
        {hasDiscount && p.status !== 'sold_out' && (
          <span className={`${styles.badge} ${styles.badgeDiscount}`}>−{discountPct}%</span>
        )}
        {p.featured && p.status !== 'sold_out' && !hasDiscount && (
          <span className={`${styles.badge} ${styles.badgeFeatured}`}><Star size={12} style={{marginRight:4}} /> Favorito</span>
        )}
        {/* Image count indicator */}
        {p.images?.length > 1 && (
          <span className={styles.imgCount}>+{p.images.length - 1}</span>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.category}>{p.category}</div>
        <div className={styles.name}>{p.name}</div>
        <div className={styles.priceRow}>
          <span className={styles.price}>{fmt(p.price)}</span>
          {hasDiscount && (
            <span className={styles.originalPrice}>{fmt(p.original_price!)}</span>
          )}
        </div>
        {/* Swatches */}
        {p.colors?.length > 0 && (
          <div className={styles.swatches}>
            {p.colors.slice(0, 6).map(c => (
              <div
                key={c.hex}
                className={styles.swatch}
                style={{ background: c.hex }}
                title={c.name}
              />
            ))}
            {p.colors.length > 6 && (
              <div className={styles.swatchMore}>+{p.colors.length - 6}</div>
            )}
          </div>
        )}
        {/* Sizes */}
        {p.sizes?.length > 0 && (
          <div className={styles.sizes}>
            {p.sizes.slice(0, 5).map(s => (
              <span key={s} className={styles.size}>{s}</span>
            ))}
            {p.sizes.length > 5 && <span className={styles.size}>+{p.sizes.length - 5}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
