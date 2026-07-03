import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.05) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Small delay to allow page transition to complete
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold, rootMargin: '50px 0px -30px 0px' }
      )

      const children = el.querySelectorAll('.scroll-reveal')
      children.forEach(child => observer.observe(child))
      if (el.classList.contains('scroll-reveal')) observer.observe(el)

      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [threshold])

  return ref
}

export function useParticles(canvasRef, mouseRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = canvas.getContext('2d')
    let particles = []
    
    const style = getComputedStyle(document.documentElement)
    const colors = [
      style.getPropertyValue('--color-cyan').trim() || '#00f4fe',
      style.getPropertyValue('--color-violet').trim() || '#bc13fe',
      style.getPropertyValue('--color-primary').trim() || '#d9b9ff',
      style.getPropertyValue('--color-cyan-dim').trim() || '#00dce5'
    ]

    const observer = new MutationObserver(() => {
      const activeStyle = getComputedStyle(document.documentElement)
      colors[0] = activeStyle.getPropertyValue('--color-cyan').trim() || '#00f4fe'
      colors[1] = activeStyle.getPropertyValue('--color-violet').trim() || '#bc13fe'
      colors[2] = activeStyle.getPropertyValue('--color-primary').trim() || '#d9b9ff'
      colors[3] = activeStyle.getPropertyValue('--color-cyan-dim').trim() || '#00dce5'
      
      // Instantly swap current particle colors to match new theme
      particles.forEach(p => {
        p.color = colors[Math.floor(Math.random() * colors.length)]
      })
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let animationId

    function resize() {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight
    }

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.pulse = Math.random() * Math.PI * 2
      }

      draw() {
        this.pulse += 0.02
        const currentOpacity = this.opacity + Math.sin(this.pulse) * 0.15
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = Math.max(0.05, currentOpacity)
        ctx.fill()
      }

      update() {
        const mouse = mouseRef?.current || { x: -1000, y: -1000 }
        const rect = canvas.getBoundingClientRect()
        const mx = mouse.x - rect.left
        const my = mouse.y - rect.top
        const dx = mx - this.x
        const dy = my - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 200

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist
          this.x += (dx / dist) * force * this.density * 0.3
          this.y += (dy / dist) * force * this.density * 0.3
        } else {
          this.x += (this.baseX - this.x) * 0.05
          this.y += (this.baseY - this.y) * 0.05
        }

        this.draw()
      }
    }

    function init() {
      resize()
      particles = Array.from({ length: 60 }, () => new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = '#00f4fe'
            ctx.globalAlpha = (1 - dist / 120) * 0.06
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach(p => p.update())
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [canvasRef, mouseRef])
}
