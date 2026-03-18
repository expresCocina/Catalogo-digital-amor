// app/privacidad/page.tsx
import type { Metadata } from 'next'
import styles from './legal.module.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Conoce cómo Salma Store recopila, usa y protege tus datos personales conforme a la Ley 1581 de 2012.',
}

export default function PrivacidadPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>← Volver al catálogo</Link>
        <h1 className={`${styles.title} serif`}>Política de <em>Privacidad</em></h1>
        <p className={styles.updated}>Última actualización: 18 de marzo de 2025</p>

        <section className={styles.section}>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>Salma Store</strong> es responsable del tratamiento de los datos personales que usted proporciona a través de este catálogo digital.
            Para consultas sobre privacidad, puede contactarnos vía WhatsApp o Instagram.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Datos que recopilamos</h2>
          <p>En este catálogo digital recopilamos únicamente:</p>
          <ul>
            <li>Información que usted comparte voluntariamente al realizar una consulta o pedido por WhatsApp (nombre, número de teléfono, dirección de envío).</li>
            <li>Datos de navegación anónimos para mejorar la experiencia de usuario (mediante cookies técnicas).</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Finalidad del tratamiento</h2>
          <p>Los datos recopilados se usan para:</p>
          <ul>
            <li>Procesar y gestionar sus pedidos.</li>
            <li>Enviar confirmaciones y actualizaciones sobre su pedido.</li>
            <li>Mejorar nuestros productos y servicios.</li>
            <li>Cumplir con obligaciones legales.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Base legal (Ley 1581 de 2012 — Colombia)</h2>
          <p>
            Conforme a la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013, el tratamiento de sus datos personales
            se realiza con su consentimiento libre, previo, expreso e informado. Al realizar un pedido a través de nuestro
            catálogo, usted autoriza el tratamiento de sus datos para los fines indicados.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Almacenamiento y seguridad</h2>
          <p>
            Los datos de productos son almacenados en <strong>Supabase</strong>, plataforma con cifrado en reposo y en tránsito (TLS/SSL).
            Los pedidos se gestionan directamente por WhatsApp y no almacenamos datos de pago.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Sus derechos</h2>
          <p>Conforme a la ley colombiana, usted tiene derecho a:</p>
          <ul>
            <li><strong>Acceder</strong> a sus datos personales.</li>
            <li><strong>Rectificar</strong> datos inexactos o incompletos.</li>
            <li><strong>Suprimir</strong> sus datos cuando no sean necesarios.</li>
            <li><strong>Revocar</strong> la autorización otorgada para el tratamiento.</li>
            <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC).</li>
          </ul>
          <p>Para ejercer estos derechos, contáctenos por WhatsApp.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Cookies</h2>
          <p>
            Este sitio utiliza únicamente cookies técnicas necesarias para el funcionamiento del carrito de compras
            y la sesión administrativa. No utilizamos cookies de rastreo publicitario de terceros.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política periódicamente. Los cambios entrarán en vigencia al publicarse en este sitio.
            Le recomendamos revisar esta página regularmente.
          </p>
        </section>

        <div className={styles.legalLinks}>
          <Link href="/terminos">Términos y Condiciones</Link>
          <span>·</span>
          <Link href="/devoluciones">Política de Devoluciones</Link>
          <span>·</span>
          <Link href="/envios">Política de Envíos</Link>
        </div>
      </div>
    </div>
  )
}
