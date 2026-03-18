'use client'
// components/ParticlesBg.tsx — Fondo de partículas animadas para toda la página
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  opacityDir: number
  color: string
}

const COLORS = ['#B8924A', '#C9A86C', '#D4B896', '#E8D5B0', '#8C5A6A', '#C4A882']

interface Props {
  fixed?: boolean
}

export default function ParticlesBg({ fixed = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []
    let W = 0, H = 0

    const getSize = () => {
      if (fixed) {
        return { w: window.innerWidth, h: window.innerHeight }
      }
      return { w: canvas.offsetWidth, h: canvas.offsetHeight }
    }

    const resize = () => {
      const { w, h } = getSize()
      W = canvas.width  = w
      H = canvas.height = h
    }

    const spawn = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .32,
      vy: (Math.random() - .5) * .32 - .08,
      size: Math.random() * 2 + .6,
      opacity: Math.random() * .5 + .12,
      opacityDir: (Math.random() > .5 ? 1 : -1) * .004,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })

    const init = () => {
      resize()
      const count = Math.min(100, Math.floor((W * H) / 9000))
      particles = Array.from({ length: count }, spawn)
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Conexiones entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i], q = particles[j]
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            const alpha = (1 - dist / 120) * .1
            ctx.strokeStyle = `rgba(184,146,74,${alpha})`
            ctx.lineWidth = .6
            ctx.stroke()
          }
        }
      }

      // Partículas
      for (const p of particles) {
        p.opacity += p.opacityDir
        if (p.opacity > .6 || p.opacity < .1) p.opacityDir *= -1

        p.x += p.vx
        p.y += p.vy
        if (p.x < -5) p.x = W + 5
        if (p.x > W + 5) p.x = -5
        if (p.y < -5) p.y = H + 5
        if (p.y > H + 5) p.y = -5

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const hex = Math.round(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.fillStyle = p.color + hex
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    if (fixed) {
      window.addEventListener('resize', init)
    } else {
      const ro = new ResizeObserver(init)
      ro.observe(canvas)
      return () => { cancelAnimationFrame(animId); ro.disconnect() }
    }

    return () => {
      cancelAnimationFrame(animId)
      if (fixed) window.removeEventListener('resize', init)
    }
  }, [fixed])

  const positionStyle: React.CSSProperties = fixed
    ? {
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }
    : {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }

  return <canvas ref={canvasRef} aria-hidden="true" style={positionStyle} />
}
