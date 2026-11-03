import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import { useEffect, useState } from 'react'
import './NotFound.css'

export default function NotFound() {
  const sectionRef = useScrollReveal()
  const [glitchText, setGlitchText] = useState('404')

  useEffect(() => {
    const chars = '01!<>_\\/[]{}—=+*^?#'
    let timer

    const glitch = () => {
      if (Math.random() > 0.8) {
        setGlitchText('404')
      } else {
        const randomChar = chars[Math.floor(Math.random() * chars.length)]
        setGlitchText(Math.random() > 0.5 ? `4${randomChar}4` : `${randomChar}04`)
      }
      timer = setTimeout(glitch, 50 + Math.random() * 200)
    }

    timer = setTimeout(glitch, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageTransition>
      <div ref={sectionRef} className="not-found-container container">
        <div className="not-found-content scroll-reveal">
          <p className="text-label-code text-cyan" style={{ marginBottom: '16px' }}>
            // ERROR: SYSTEM_FAULT
          </p>
          <h1 className="text-display-xl not-found-glitch" data-text={glitchText}>
            {glitchText}
          </h1>
          <h2 className="text-headline-md text-primary" style={{ marginBottom: '24px' }}>
            Page Not Found
          </h2>
          <p className="text-body-lg text-muted" style={{ maxWidth: '500px', margin: '0 auto 40px' }}>
            The transmission you are looking for has been lost in the void, or the coordinates are incorrect.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn-primary hover-target">
              Return to Base
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
