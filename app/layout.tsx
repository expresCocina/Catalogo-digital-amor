// app/layout.tsx
import type { Metadata } from 'next'
import ParticlesBg from '@/components/ParticlesBg'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://salmastore.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Salma Store — Moda con Personalidad',
    template: '%s | Salma Store',
  },
  description: 'Descubre nuestra colección exclusiva de moda femenina. Camisetas, vestidos, conjuntos y accesorios con estilo único. Envíos a toda Colombia.',
  keywords: ['moda femenina', 'ropa mujer Colombia', 'tienda online ropa', 'vestidos', 'conjuntos', 'Salma Store', 'moda colombiana'],
  authors: [{ name: 'Salma Store' }],
  creator: 'Salma Store',
  publisher: 'Salma Store',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    siteName: 'Salma Store',
    title: 'Salma Store — Moda con Personalidad',
    description: 'Descubre nuestra colección exclusiva de moda femenina con estilo único.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Salma Store' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salma Store — Moda con Personalidad',
    description: 'Descubre nuestra colección exclusiva de moda femenina.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Fondo de partículas que cubre toda la página */}
        <ParticlesBg fixed />
        {children}
      </body>
    </html>
  )
}
