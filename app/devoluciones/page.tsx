// app/devoluciones/page.tsx
import type { Metadata } from 'next'
import styles from '../privacidad/legal.module.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Devoluciones',
  description: 'Conoce nuestra política de devoluciones, cambios y garantías en Salma Store.',
}

export default function DevolucionesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>← Volver al catálogo</Link>
        <h1 className={`${styles.title} serif`}>Política de <em>Devoluciones</em></h1>
        <p className={styles.updated}>Última actualización: 18 de marzo de 2025</p>

        <section className={styles.section}>
          <h2>1. Plazo para devoluciones</h2>
          <p>
            Aceptamos devoluciones dentro de los <strong>5 días hábiles</strong> siguientes a la recepción del producto,
            siempre que se cumplan las condiciones establecidas en esta política.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Condiciones para devolución</h2>
          <p>Para que una devolución sea válida, el producto debe:</p>
          <ul>
            <li>Estar en su estado <strong>original</strong>, sin usar, lavar ni alterar.</li>
            <li>Conservar todas las <strong>etiquetas y empaques originales</strong>.</li>
            <li>No presentar señales de uso, manchas, olores o deterioro.</li>
            <li>Incluir el comprobante de pago o número de pedido.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Causales válidas de devolución</h2>
          <ul>
            <li>Producto con <strong>defecto de fabricación</strong> o daño en el envío.</li>
            <li>Producto recibido <strong>diferente al pedido</strong> (talla, color o referencia incorrecta).</li>
            <li>Cambio de talla (sujeto a disponibilidad de stock).</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Causales NO aplican devolución</h2>
          <ul>
            <li>Productos en promoción o en liquidación marcados como "Sin devolución".</li>
            <li>Ropa interior y vestidos de baño por razones de higiene.</li>
            <li>Productos con signos de uso, lavado o alteración.</li>
            <li>Cambio de opinión sin defecto comprobable en el producto.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Proceso de devolución</h2>
          <ol>
            <li>Contáctenos por WhatsApp dentro del plazo establecido.</li>
            <li>Describa el motivo e incluya fotos del producto.</li>
            <li>Le indicaremos la dirección de envío o coordinaremos el recogido.</li>
            <li>Una vez recibido y verificado el producto, procesamos el cambio o reembolso en <strong>3-5 días hábiles</strong>.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>6. Garantía legal</h2>
          <p>
            Conforme al Artículo 7 de la Ley 1480 de 2011 (Estatuto del Consumidor), todos nuestros productos
            cuentan con garantía legal mínima de un (1) mes por defectos de calidad o idoneidad.
          </p>
        </section>

        <div className={styles.legalLinks}>
          <Link href="/privacidad">Política de Privacidad</Link>
          <span>·</span>
          <Link href="/terminos">Términos y Condiciones</Link>
          <span>·</span>
          <Link href="/envios">Política de Envíos</Link>
        </div>
      </div>
    </div>
  )
}
