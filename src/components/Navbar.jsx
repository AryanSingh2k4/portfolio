import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Work' },
  { path: '/skills', label: 'Skills' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark') ||
    document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight))
        setScrollProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('portfolio-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('portfolio-theme', 'light')
    }
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="pg" 
        style={{ transform: `scaleX(${scrollProgress})` }} 
        aria-hidden="true" 
      />

      <nav className="navw">
        <div className="w">
          <div className="nav">
            <Link to="/" className="logo hover-target" aria-label="Aryan Singh - Home">
              Aryan Singh<i aria-hidden="true" />
            </Link>

            <div className="nl">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`hover-target ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Theme Flip Toggle */}
              <button 
                className="theme-flip-btn hover-target" 
                onClick={toggleTheme}
                title={isDark ? "Switch to Parchment Paper" : "Switch to Carbon Dark"}
                aria-label="Toggle theme"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>

              <Link to="/contact" className="btn hover-target">
                Let’s talk
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="nav-mobile-actions">
              <button 
                className="theme-flip-btn hover-target" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>

              <button
                className="nav-hamburger hover-target"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                  {mobileOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="nav-mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="w" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px 32px' }}>
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/contact" className="btn" style={{ textAlign: 'center', width: '100%', marginTop: '8px' }}>
                  Let’s talk
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
