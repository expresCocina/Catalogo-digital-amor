'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Package, Settings, Save, Edit2, Trash2, Upload, Star, X } from 'lucide-react'
import styles from './admin.module.css'
import { StoreLogo } from '@/components/icons/StoreLogo'
import type { Product, StoreConfig } from '@/types/database'

const SIZES_ALL = ['XS','S','M','L','XL','XXL','Única']
const CATEGORIES = ['Camisetas','Pantalones','Vestidos','Conjuntos','Accesorios','Otros']

export default function AdminPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  // Login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authErr, setAuthErr] = useState('')

  // Admin Data
  const [products, setProducts] = useState<Product[]>([])
  const [config, setConfig] = useState<StoreConfig>({ name:'', whatsapp:'', slogan:'', instagram:'', facebook:'', tiktok:'' })
  const [tab, setTab] = useState<'add'|'list'|'cfg'>('add')
  const [toast, setToast] = useState('')

  // Product Form
  const [editingId, setEditingId] = useState<string|null>(null)
  const [pName, setPName] = useState('')
  const [pDesc, setPDesc] = useState('')
  const [pPrice, setPPrice] = useState('')
  const [pOrigPrice, setPOrigPrice] = useState('')
  const [pCat, setPCat] = useState('Camisetas')
  const [pStatus, setPStatus] = useState<'active'|'sold_out'>('active')
  const [pFeatured, setPFeatured] = useState(false)
  const [pSizes, setPSizes] = useState<string[]>([])
  const [pColors, setPColors] = useState<{hex:string,name:string}[]>([])
  const [pImages, setPImages] = useState<string[]>([])

  // Temp form color
  const [cHex, setCHex] = useState('#E8A0B0')
  const [cName, setCName] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user)
        loadData()
      }
      setLoadingAuth(false)
    })
  }, [])

  const loadData = async () => {
    const { data: pData } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (pData) setProducts(pData)

    const { data: cData } = await supabase.from('config').select('*')
    if (cData) {
      const newCfg: any = {}
      ;(cData as any[]).forEach(row => { newCfg[row.key] = row.value })
      setConfig({ name: newCfg.store_name || '', whatsapp: newCfg.whatsapp || '', slogan: newCfg.slogan || '', instagram: newCfg.instagram || '', facebook: newCfg.facebook || '', tiktok: newCfg.tiktok || '' })
    }
  }

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2700)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthErr('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setAuthErr('Correo o contraseña incorrectos') }
    else { setUser(data.user); loadData() }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  // ---- Form Actions ----
  const resetForm = () => {
    setEditingId(null)
    setPName(''); setPDesc(''); setPPrice(''); setPOrigPrice('')
    setPCat('Camisetas'); setPStatus('active'); setPFeatured(false)
    setPSizes([]); setPColors([]); setPImages([])
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    const files = Array.from(e.target.files)
    showToast('⏳ Subiendo imágenes...')
    const urls: string[] = []

    for (const file of files) {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`
      const { data, error } = await supabase.storage.from('product-images').upload(fileName, file)
      if (data) {
        const url = supabase.storage.from('product-images').getPublicUrl(fileName).data.publicUrl
        urls.push(url)
      }
    }
    setPImages(prev => [...prev, ...urls])
    showToast('✅ Imágenes subidas')
  }

  const handleSaveProduct = async () => {
    if (!pName || !pPrice) { showToast('⚠️ Faltan nombre o precio'); return }
    const product = {
      name: pName,
      description: pDesc,
      price: Number(pPrice),
      original_price: pOrigPrice ? Number(pOrigPrice) : null,
      category: pCat,
      status: pStatus,
      featured: pFeatured,
      sizes: pSizes,
      colors: pColors,
      images: pImages
    }

    if (editingId) {
      const { error } = await (supabase.from('products') as any).update(product).eq('id', editingId)
      if (error) showToast('❌ Error al actualizar')
      else { showToast('✅ Producto actualizado'); resetForm(); loadData(); setTab('list') }
    } else {
      const { error } = await (supabase.from('products') as any).insert(product)
      if (error) showToast('❌ Error al guardar')
      else { showToast('✅ Producto creado'); resetForm(); loadData(); setTab('list') }
    }
  }

  const handleEdit = (p: Product) => {
    setEditingId(p.id)
    setPName(p.name); setPDesc(p.description || ''); setPPrice(String(p.price)); setPOrigPrice(p.original_price ? String(p.original_price) : '')
    setPCat(p.category); setPStatus(p.status); setPFeatured(p.featured)
    setPSizes(p.sizes || []); setPColors(p.colors || []); setPImages(p.images || [])
    setTab('add')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar producto?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) { showToast('🗑️ Eliminado'); loadData() }
    else showToast('❌ Error')
  }

  const handleSaveConfig = async () => {
    const keys = [
      { key: 'store_name', value: config.name },
      { key: 'whatsapp', value: config.whatsapp },
      { key: 'slogan', value: config.slogan },
      { key: 'instagram', value: config.instagram },
      { key: 'facebook', value: config.facebook },
      { key: 'tiktok', value: config.tiktok }
    ]
    showToast('⏳ Guardando...')
    for (const item of keys) {
      await (supabase.from('config') as any).upsert(item, { onConflict: 'key' })
    }
    showToast('✅ Configuración guardada')
  }

  if (loadingAuth) return <div className={styles.center}>Cargando...</div>

  if (!user) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div className={styles.logo}><StoreLogo size="md" /></div>
          <p>Panel de administración</p>
          <form onSubmit={handleLogin}>
            <div className={styles.fg}>
              <label>Correo</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className={styles.fg}>
              <label>Contraseña</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            {authErr && <div className={styles.err}>{authErr}</div>}
            <button className={styles.btnPrimary} type="submit">Ingresar</button>
            <Link href="/" className={styles.backLink}>← Volver a la tienda</Link>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.adminWrap}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}><StoreLogo size="md" light /></div>
        <div className={styles.headerRight}>
           <span className={styles.badge}>ADMIN</span>
           <button className={styles.logoutBtn} onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <main className={styles.main}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab==='add'?styles.tabActive:''}`} onClick={()=>setTab('add')}><Plus size={14} style={{marginRight:6}} />{editingId ? 'Editar' : 'Agregar'}</button>
          <button className={`${styles.tab} ${tab==='list'?styles.tabActive:''}`} onClick={()=>setTab('list')}><Package size={14} style={{marginRight:6}} />Lista</button>
          <button className={`${styles.tab} ${tab==='cfg'?styles.tabActive:''}`} onClick={()=>setTab('cfg')}><Settings size={14} style={{marginRight:6}} />Config</button>
        </div>

        {tab === 'add' && (
          <div>
            <h2 className={`${styles.title} serif`}>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            
            <div className={`${styles.fg} ${styles.full}`}>
              <label>Fotos (JPG, PNG, WEBP)</label>
              <div className={styles.uploadZone} onClick={()=>document.getElementById('fileIn')?.click()}>
                <Upload size={20} style={{marginBottom:8, display:'block', margin:'0 auto 8px'}} />
                Toca para subir
              </div>
              <input type="file" id="fileIn" multiple accept="image/*" hidden onChange={handleImageUpload} />
              <div className={styles.imgPreviews}>
                {pImages.map((img, i) => (
                  <div key={i} className={styles.imgPrev}>
                    <img src={img} alt="" />
                    <button onClick={()=>setPImages(imgs => imgs.filter((_, idx)=>idx!==i))}><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.fg}>
                 <label>Nombre</label>
                 <input value={pName} onChange={e=>setPName(e.target.value)} placeholder="Ej: Vestido Gala" />
              </div>
              <div className={styles.fg}>
                 <label>Categoría</label>
                 <select value={pCat} onChange={e=>setPCat(e.target.value)}>
                   {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                 </select>
              </div>
              <div className={styles.fg}>
                 <label>Precio Final (COP)</label>
                 <input type="number" value={pPrice} onChange={e=>setPPrice(e.target.value)} placeholder="50000" />
              </div>
              <div className={styles.fg}>
                 <label>Precio Original Tachado (Opcional)</label>
                 <input type="number" value={pOrigPrice} onChange={e=>setPOrigPrice(e.target.value)} placeholder="70000" />
              </div>
              <div className={styles.fg}>
                 <label>Estado</label>
                 <select value={pStatus} onChange={e=>setPStatus(e.target.value as any)}>
                   <option value="active">Disponible</option>
                   <option value="sold_out">Agotado</option>
                 </select>
              </div>
              <div className={styles.fg} style={{display:'flex', alignItems:'flex-end'}}>
                 <label style={{display:'flex', alignItems:'center', gap:'.5rem', cursor:'pointer', margin:0, paddingBottom:'.6rem'}}>
                   <input type="checkbox" checked={pFeatured} onChange={e=>setPFeatured(e.target.checked)} style={{width:18, height:18}} />
                   <span><Star size={14} style={{marginRight:4}} /> Destacar (Favorito)</span>
                 </label>
              </div>
              <div className={`${styles.fg} ${styles.full}`}>
                 <label>Descripción</label>
                 <textarea value={pDesc} onChange={e=>setPDesc(e.target.value)} rows={3} />
              </div>
              <div className={`${styles.fg} ${styles.full}`}>
                 <label>Tallas</label>
                 <div className={styles.checks}>
                   {SIZES_ALL.map(s => (
                     <label key={s} className={styles.check}>
                       <input type="checkbox" checked={pSizes.includes(s)} onChange={e => {
                         if (e.target.checked) setPSizes(prev => [...prev, s])
                         else setPSizes(prev => prev.filter(x => x !== s))
                       }}/> {s}
                     </label>
                   ))}
                 </div>
              </div>
              <div className={`${styles.fg} ${styles.full}`}>
                 <label>Colores</label>
                 <div className={styles.colorAdder}>
                   <input type="color" value={cHex} onChange={e=>setCHex(e.target.value)} className={styles.cPicker} />
                   <input value={cName} onChange={e=>setCName(e.target.value)} placeholder="Nombre del color" />
                   <button onClick={()=>{
                     if(cName){ setPColors([...pColors, {hex:cHex, name:cName}]); setCName('') }
                   }} className={styles.btnSec}>+</button>
                 </div>
                 <div className={styles.chips}>
                   {pColors.map((c, i) => (
                     <div key={i} className={styles.chip}>
                       <span style={{background:c.hex, width:12, height:12, borderRadius:'50%'}} /> {c.name}
                       <button onClick={()=>setPColors(pColors.filter((_,idx)=>idx!==i))}><X size={14} /></button>
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.btnSec} onClick={resetForm}>Limpiar</button>
              <button className={styles.btnSave} onClick={handleSaveProduct}><Save size={16} style={{marginRight:6}} /> {editingId?'Actualizar':'Guardar'} Producto</button>
            </div>
          </div>
        )}

        {tab === 'list' && (
          <div>
            <h2 className={`${styles.title} serif`}>Todos los productos</h2>
            <div className={styles.pGrid}>
              {products.map(p => (
                <div key={p.id} className={styles.pCard}>
                  <div className={styles.pImg}>
                    {p.images?.[0] ? <img src={p.images[0]} alt="" /> : <span style={{fontSize:28}}>S</span>}
                  </div>
                  <div className={styles.pBody}>
                    <p className={styles.pName}>{p.name}</p>
                    <p className={styles.pPrice}>${p.price.toLocaleString('es-CO')}</p>
                  </div>
                  <div className={styles.pActions}>
                    <button className={styles.btnEdit} onClick={() => handleEdit(p)}><Edit2 size={14} /></button>
                    <button className={styles.btnDel} onClick={() => handleDelete(p.id)}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'cfg' && (
          <div>
            <h2 className={`${styles.title} serif`}>Configuración</h2>
            <div className={styles.grid}>
              <div className={styles.fg}><label>Nombre Tienda</label><input value={config.name} onChange={e=>setConfig({...config,name:e.target.value})} /></div>
              <div className={styles.fg}><label>WhatsApp (ej: 573001234567)</label><input value={config.whatsapp} onChange={e=>setConfig({...config,whatsapp:e.target.value})} /></div>
              <div className={`${styles.fg} ${styles.full}`}><label>Eslogan</label><input value={config.slogan} onChange={e=>setConfig({...config,slogan:e.target.value})} /></div>
              <div className={styles.fg}><label>Usuario Instagram</label><input value={config.instagram} onChange={e=>setConfig({...config,instagram:e.target.value})} /></div>
              <div className={styles.fg}><label>Usuario TikTok</label><input value={config.tiktok} onChange={e=>setConfig({...config,tiktok:e.target.value})} /></div>
              <div className={styles.fg}><label>Usuario Facebook</label><input value={config.facebook} onChange={e=>setConfig({...config,facebook:e.target.value})} /></div>
            </div>
            <button className={styles.btnSave} onClick={handleSaveConfig} style={{marginTop:'1.5rem', maxWidth:250}}><Save size={16} style={{marginRight:6}} /> Guardar Config</button>
          </div>
        )}
      </main>

      {toast && <div className="toast show">{toast}</div>}
    </div>
  )
}
