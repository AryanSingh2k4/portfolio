import { useEffect, useRef, useState } from 'react'

export default function BackgroundEffects() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'default')
  const canvasRef = useRef(null)

  useEffect(() => {
    // Monitor HTML theme mutations to activate specific canvas effects
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'default')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (theme !== 'space-odyssey') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let animationId

    // Space Odyssey Twinkling Starfield Loop
    const numStars = 150
    const stars = Array(numStars).fill(null).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.5 + Math.random() * 2,
      opacity: Math.random(),
      speed: 0.005 + Math.random() * 0.01
    }))

    const draw = () => {
      ctx.fillStyle = '#02020a'
      ctx.fillRect(0, 0, width, height)

      stars.forEach(star => {
        star.opacity += star.speed
        if (star.opacity > 1 || star.opacity < 0) {
          star.speed = -star.speed
        }
        ctx.fillStyle = `rgba(180, 220, 255, ${Math.max(0.1, Math.min(star.opacity, 1))})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }
    draw()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [theme])

  return (
    <>
      <div className="bg-grid" />
      <div className="ambient-glow" />
      {theme === 'vaporwave' && (
        <div className="vaporwave-sun" />
      )}
      {theme === 'space-odyssey' && (
        <canvas 
          ref={canvasRef} 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  )
}
