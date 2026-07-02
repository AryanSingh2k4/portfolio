import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Work' },
  { path: '/skills', label: 'Skills' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav className={`navbar navbar--scrolled`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo hover-target">
          ARYAN<span className="navbar__logo-dot">.DEV</span>
        </Link>

        <div className="navbar__links">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link hover-target ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div className="navbar__link-indicator" layoutId="nav-indicator" />
              )}
            </Link>
          ))}
        </div>

        <Link to="/contact" className="navbar__cta btn-primary hover-target">
          Hire Me
        </Link>

        <button
          className="navbar__mobile-toggle hover-target"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__mobile-link hover-target ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary hover-target" style={{ marginTop: '16px', width: '100%' }}>
              Hire Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
