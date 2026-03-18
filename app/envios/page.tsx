// app/envios/page.tsx
import type { Metadata } from 'next'
import styles from '../privacidad/legal.module.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Envíos',
  description: 'Conoce los tiempos, tarifas y condiciones de envío de Salma Store a toda Colombia.',
}

export default function EnviosPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>← Volver al catálogo</Link>
        <h1 className={`${styles.title} serif`}>Política de <em>Envíos</em></h1>
        <p className={styles.updated}>Última actualización: 18 de marzo de 2025</p>

        <section className={styles.section}>
          <h2>1. Cobertura</h2>
          <p>
            Realizamos envíos a todo el territorio nacional colombiano a través de empresas de mensajería certificadas.
            Para pedidos locales (ciudad de despacho), también ofrecemos entrega en mano con disponibilidad de fechas según acuerdo.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Tiempos de entrega</h2>
          <ul>
            <li><strong>Ciudades principales</strong> (Bogotá, Medellín, Cali, Barranquilla): 2-3 días hábiles</li>
            <li><strong>Resto del país</strong>: 3-7 días hábiles según ubicación</li>
            <li><strong>Zonas de difícil acceso</strong>: 7-15 días hábiles</li>
            <li><strong>Entrega local</strong> (mismo municipio): 1-2 días hábiles</li>
          </ul>
          <p>Los tiempos son estimados y pueden variar según la transportadora y condiciones externas.</p>
        </section>

        <section className={styles.section}>
          <h2>3. Costos de envío</h2>
          <p>Los costos de envío se calculan según el destino y el peso del pedido, y son informados al cliente antes de confirmar la compra vía WhatsApp.</p>
          <ul>
            <li><strong>Envío gratis</strong> aplicará en compras que superen el monto mínimo indicado en promociones vigentes.</li>
            <li>El costo de envío en devoluciones por cambio de talla está a cargo del cliente.</li>
            <li>En caso de producto defectuoso, Salma Store asume el costo del envío.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Proceso de despacho</h2>
          <ol>
            <li>El pedido se procesa <strong>después de confirmar el pago</strong>.</li>
            <li>El despacho se realiza en <strong>1-2 días hábiles</strong> tras la confirmación.</li>
            <li>Se le comparte el número de guía de seguimiento.</li>
            <li>El cliente recibe notificación del estado del envío por WhatsApp.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>5. Responsabilidad en el envío</h2>
          <p>
            Salma Store entrega los paquetes en perfectas condiciones a la transportadora.
            Una vez entregado a la empresa de mensajería, la responsabilidad del tiempo de entrega
            recae sobre la transportadora. En caso de pérdida o daño durante el transporte, le
            ayudaremos a gestionar el reclamo correspondiente.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Dirección de envío incorrecta</h2>
          <p>
            Es responsabilidad del cliente proporcionar una dirección de envío correcta y completa.
            Salma Store no se hace responsable por demoras o pérdidas derivadas de información de
            entrega incorrecta o incompleta proporcionada por el cliente.
          </p>
        </section>

        <div className={styles.legalLinks}>
          <Link href="/privacidad">Política de Privacidad</Link>
          <span>·</span>
          <Link href="/terminos">Términos y Condiciones</Link>
          <span>·</span>
          <Link href="/devoluciones">Política de Devoluciones</Link>
        </div>
      </div>
    </div>
  )
}
