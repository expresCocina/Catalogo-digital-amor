// app/terminos/page.tsx
import type { Metadata } from 'next'
import styles from '../privacidad/legal.module.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de compra en Salma Store. Conoce tus derechos y obligaciones al realizar pedidos.',
}

export default function TerminosPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>← Volver al catálogo</Link>
        <h1 className={`${styles.title} serif`}>Términos y <em>Condiciones</em></h1>
        <p className={styles.updated}>Última actualización: 18 de marzo de 2025</p>

        <section className={styles.section}>
          <h2>1. Aceptación de los términos</h2>
          <p>
            Al acceder y usar el catálogo digital de <strong>Salma Store</strong>, usted acepta quedar vinculado por estos
            Términos y Condiciones. Si no está de acuerdo con alguno de ellos, le pedimos abstenerse de usar nuestros servicios.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Descripción del servicio</h2>
          <p>
            Salma Store es un catálogo digital de moda que facilita la visualización de productos y el contacto con el vendedor
            a través de WhatsApp para coordinar pedidos, pagos y entregas. No somos una plataforma de pago en línea.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Precios y disponibilidad</h2>
          <ul>
            <li>Los precios mostrados están en <strong>Pesos Colombianos (COP)</strong> e incluyen IVA cuando aplique.</li>
            <li>Los precios pueden cambiar sin previo aviso. El precio válido es el confirmado al momento del pedido.</li>
            <li>La disponibilidad de productos está sujeta a stock. Un producto visible en el catálogo no garantiza disponibilidad inmediata.</li>
            <li>Las imágenes son referenciales; los colores reales pueden variar levemente según la pantalla del dispositivo.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Proceso de compra</h2>
          <ol>
            <li>El cliente selecciona el producto(s) de su interés en el catálogo.</li>
            <li>Realiza el pedido a través de WhatsApp o el carrito de compras.</li>
            <li>Confirmamos disponibilidad y enviamos el total con el costo de envío.</li>
            <li>El cliente realiza el pago por el medio acordado (transferencia, Nequi, Daviplata, efectivo).</li>
            <li>Confirmado el pago, procesamos y despachamos el pedido.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>5. Medios de pago</h2>
          <p>Aceptamos los siguientes medios de pago:</p>
          <ul>
            <li>Transferencia bancaria (Bancolombia, Davivienda)</li>
            <li>Nequi y Daviplata</li>
            <li>Efectivo (solo entregas locales)</li>
          </ul>
          <p>No almacenamos datos de tarjetas de crédito ni débito.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Propiedad intelectual</h2>
          <p>
            Todo el contenido de este catálogo (imágenes, textos, diseño, logotipo) es propiedad de Salma Store
            y está protegido por las leyes de propiedad intelectual vigentes en Colombia. Queda prohibida su reproducción
            sin autorización expresa.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Responsabilidad</h2>
          <p>
            Salma Store no se responsabiliza por daños derivados del mal uso de los productos adquiridos,
            por demoras en envíos ocasionadas por transportadoras, ni por problemas técnicos de conectividad del usuario.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será resuelta
            conforme a lo establecido por la Superintendencia de Industria y Comercio (SIC) y la normativa
            de protección al consumidor (Ley 1480 de 2011 — Estatuto del Consumidor).
          </p>
        </section>

        <div className={styles.legalLinks}>
          <Link href="/privacidad">Política de Privacidad</Link>
          <span>·</span>
          <Link href="/devoluciones">Política de Devoluciones</Link>
          <span>·</span>
          <Link href="/envios">Política de Envíos</Link>
        </div>
      </div>
    </div>
  )
}
