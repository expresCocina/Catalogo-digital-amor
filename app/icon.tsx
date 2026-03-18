import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FEFCF8',
          borderRadius: '8px',
          border: '1px solid #E8D5BB',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* Diamante central de la S */}
        <div style={{
          position: 'absolute',
          left: 4,
          top: 8,
          width: 8,
          height: 16,
          background: '#B8924A',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }} />
        {/* La S de Salma */}
        <div style={{
          fontSize: 24,
          fontWeight: '900',
          color: '#4A1E2E',
          marginLeft: 8,
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'serif'
        }}>
          S
        </div>
      </div>
    ),
    { ...size }
  )
}
