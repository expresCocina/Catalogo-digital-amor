'use client'
// app/page.tsx — Página principal del catálogo
import { useState, useEffect, useCallback } from 'react'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'
import CartDrawer from '@/components/CartDrawer'
import AnnouncementBar from '@/components/AnnouncementBar'
import ParticlesBg from '@/components/ParticlesBg'
import { createClient } from '@/lib/supabase/client'
import type { Product, StoreConfig } from '@/types/database'
import { Search, Shirt } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import styles from './page.module.css'

const CATEGORIES = ['Todos', 'Camisetas', 'Pantalones', 'Vestidos', 'Conjuntos', 'Accesorios']

const DEFAULT_CONFIG: StoreConfig = {
  name: 'Salma Store',
  whatsapp: '',
  slogan: 'Moda con personalidad · Hecho con amor',
  instagram: '',
  facebook: '',
  tiktok: '',
}

function useSalmaStore() {
  const [products, setProducts]   = useState<Product[]>([])
  const [config, setConfig]       = useState<StoreConfig>(DEFAULT_CONFIG)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    const supabase = createClient()
    ;(async () => {
      try {
        const { data: pData } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
        if (pData) setProducts(pData)

        const { data: cData } = await supabase.from('config').select('*')
        if (cData) {
          const newCfg: Record<string, string> = {}
          ;(cData as any[]).forEach(row => { newCfg[row.key] = row.value })
          setConfig(prev => ({ 
            ...prev, 
            name: newCfg.store_name || prev.name,
            whatsapp: newCfg.whatsapp || prev.whatsapp,
            slogan: newCfg.slogan || prev.slogan,
            instagram: newCfg.instagram || prev.instagram,
            facebook: newCfg.facebook || prev.facebook,
            tiktok: newCfg.tiktok || prev.tiktok
          }))
        }
      } catch {}
      setLoading(false)
    })()
  }, [])

  return { products, config, loading }
}

function StoreApp() {
  const { products, config, loading } = useSalmaStore()
  const [filter, setFilter]     = useState('Todos')
  const [search, setSearch]     = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast]       = useState('')
  const [toastShow, setToastShow] = useState(false)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setToastShow(true)
    setTimeout(() => setToastShow(false), 2700)
  }, [])

  const filtered = products.filter(p => {
    const matchCat = filter === 'Todos' || p.category === filter
    const q = search.toLowerCase()
    const matchQ = !q || p.name.toLowerCase().includes(q) || (p.description ?? '').toLowerCase().includes(q)
    return matchCat && matchQ
  })

  const activeProduct = products.find(p => p.id === activeId) ?? null

  return (
    <>
      {/* Cinta de anuncio superior */}
      <AnnouncementBar />

      <Header
        storeName={config.name}
        onCartOpen={() => setCartOpen(true)}
        onAdminClick={() => window.location.href = '/admin'}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Nueva Colección 2026</p>
          <h1 className={`${styles.heroTitle} serif`}>
            Nuestra <em>Colección</em>
          </h1>
          <p className={styles.heroSub}>{config.slogan}</p>
          <div className={styles.heroOrnament}>
            <div className={styles.heroOrnamentLine} />
            <div className={styles.heroOrnamentDot} />
            <div className={styles.heroOrnamentLine} style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.pill} ${filter === cat ? styles.pillActive : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
        <div className={styles.searchWrap}>
          <Search size={16} strokeWidth={2.5} className={styles.searchIco} />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>
      </div>

      {/* Catalog grid */}
      <main className={styles.catalog}>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={`${styles.skeletonImg} skeleton`} />
              <div className={styles.skeletonBody}>
                <div className={`${styles.skeletonLine} skeleton`} style={{ width: '40%', height: '10px' }} />
                <div className={`${styles.skeletonLine} skeleton`} style={{ width: '80%', height: '18px', marginTop: '8px' }} />
                <div className={`${styles.skeletonLine} skeleton`} style={{ width: '50%', height: '14px', marginTop: '6px' }} />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIco}><Shirt size={64} strokeWidth={1} color="var(--mauve)" /></div>
            <h3 className="serif">
              {selectedCat && selectedCat !== 'Camisetas' && selectedCat !== 'TODOS' 
                ? 'Próximamente...' 
                : products.length ? 'Sin resultados' : 'Catálogo vacío'}
            </h3>
            <p>
              {selectedCat && selectedCat !== 'Camisetas' && selectedCat !== 'TODOS'
                ? `Nuestra colección exclusiva de ${selectedCat.toLowerCase()} está en confección.`
                : products.length ? 'Intenta con otra búsqueda o categoría' : 'Pronto habrá productos disponibles'}
            </p>
          </div>
        ) : (
          filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onClick={setActiveId} />
          ))
        )}
      </main>

      {/* Footer */}
      <Footer
        storeName={config.name}
        whatsapp={config.whatsapp}
        instagram={config.instagram}
        facebook={config.facebook}
        tiktok={config.tiktok}
      />

      {/* WhatsApp FAB */}
      {config.whatsapp && (
        <a
          href={`https://wa.me/${config.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent('¡Hola! Estoy visitando su catálogo 😊')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-fab"
          aria-label="Contactar por WhatsApp"
        >
          <WhatsAppIcon size={28} />
        </a>
      )}

      {/* Product modal */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveId(null)}
          waNumber={config.whatsapp}
          onToast={showToast}
        />
      )}

      {/* Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        waNumber={config.whatsapp}
        storeName={config.name}
      />

      {/* Toast */}
      <div className={`toast ${toastShow ? 'show' : ''}`} role="status">{toast}</div>
    </>
  )
}

export default function HomePage() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  )
}

