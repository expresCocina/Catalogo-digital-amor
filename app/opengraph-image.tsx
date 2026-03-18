import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Salma Store — Moda con Personalidad'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FEFCF8 0%, #F5EBE8 50%, #E8D5BB 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '12px solid #4A1E2E',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Banner/Eyebrow top */}
        <div style={{
          position: 'absolute', top: 40, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', letterSpacing: 8,
          fontSize: 22, color: '#B8924A', textTransform: 'uppercase',
          fontWeight: 'bold',
        }}>
          ◆ Boutique de Moda Exclusiva ◆
        </div>

        {/* Logo Salma Store */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 100,
          marginBottom: 30,
        }}>
          {/* Diamante */}
          <div style={{
            width: 30, height: 45, background: '#B8924A', marginRight: 24,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }} />
          <span style={{ color: '#4A1E2E', fontWeight: 'bold', marginRight: 15 }}>Salma</span>
          <span style={{ color: '#B8924A', fontStyle: 'italic', fontWeight: 'normal' }}>Store</span>
        </div>

        {/* Slogan */}
        <div style={{
          fontSize: 32,
          color: '#8A7070',
          letterSpacing: 6,
          textTransform: 'uppercase',
          marginTop: 20
        }}>
          Moda con Personalidad · Hecho con Amor
        </div>

        {/* Decorative divider bottom */}
        <div style={{ position: 'absolute', bottom: 60, display: 'flex', width: '300px' }}>
          <div style={{ flex: 1, height: 2, background: 'linear-gradient(to right, transparent, #B8924A)' }} />
          <div style={{ width: 10, height: 10, background: '#B8924A', borderRadius: '50%', margin: '0 15px' }} />
          <div style={{ flex: 1, height: 2, background: 'linear-gradient(to left, transparent, #B8924A)' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
