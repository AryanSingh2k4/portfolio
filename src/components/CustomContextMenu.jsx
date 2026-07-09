import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './CustomContextMenu.css'

const themes = [
  { id: 'retro-crt', label: 'Retro CRT Terminal' },
  { id: 'nordic-light', label: 'Nordic Light Glass' },
  { id: 'neo-brutalist', label: 'Neo-Brutalist Swiss' },
  { id: 'holographic', label: 'Holographic Liquid' },
  { id: 'y2k-aero', label: 'Y2K / Frutiger Aero' },
  { id: 'e-ink', label: 'E-Ink Paper' },
  { id: 'classic-mac', label: 'Classic 90s MacOS' },
  { id: 'dark-academia', label: 'Dark Academia' },
  { id: 'glitch-hazard', label: 'Glitch-Core Hazard' },
  { id: 'vaporwave', label: 'Vaporwave Sunset' },
  { id: 'sketchbook', label: 'Hand-Drawn Sketchbook' },
  { id: 'space-odyssey', label: 'Space Odyssey' },
]

const colorAccents = [
  { id: 'default', label: 'Cyberpunk Amber' },
  { id: 'classic-violet', label: 'Classic Violet' },
  { id: 'aurora', label: 'Nordic Aurora' },
  { id: 'crimson', label: 'Crimson Eclipse' },
  { id: 'synthwave', label: 'Solarized Synth' },
]

export default function CustomContextMenu() {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('portfolio-theme') || 'default')
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const [accentMenuOpen, setAccentMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  const isThemeUnlocked = import.meta.env.VITE_DEVELOPER_MODE === 'true' || localStorage.getItem('themes-unlocked') === 'true'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault()
      
      let posX = e.clientX
      let posY = e.clientY

      // Check if user has selected text
      const selection = window.getSelection().toString()
      setSelectedText(selection)

      // Boundary check to prevent menu from going off-screen
      const menuWidth = 200
      const menuHeight = selection.trim() 
        ? (isThemeUnlocked ? 410 : 330) 
        : (isThemeUnlocked ? 365 : 285)

      if (posX + menuWidth > window.innerWidth) {
        posX = window.innerWidth - menuWidth - 10
      }
      if (posY + menuHeight > window.innerHeight) {
        posY = window.innerHeight - menuHeight - 10
      }

      setPosition({ x: posX, y: posY })
      setVisible(true)
    }

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setVisible(false)
      }
    }

    const handleScroll = () => setVisible(false)

    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!isThemeUnlocked && theme !== 'default') {
      setTheme('default')
    }
  }, [theme, isThemeUnlocked])

  if (!visible) return null

  const handleAction = (action) => {
    setVisible(false)
    action()
  }

  // Exact screen coordinates for theme layout submenu positioning
  const themeButtonY = position.y + (selectedText.trim() ? 315 : 270)
  const themeSubmenuTop = themeButtonY + 445 > window.innerHeight
    ? (themeButtonY + 36 - 445)
    : themeButtonY

  return (
    <>
      <div
        ref={menuRef}
        className="custom-context-menu glass-panel"
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
      >
      {selectedText.trim() && (
        <>
          <div className="menu-group">
            <button 
              className="menu-item hover-target" 
              onClick={() => handleAction(() => {
                navigator.clipboard.writeText(selectedText)
              })}
            >
              <span className="material-symbols-outlined menu-icon">content_copy</span>
              <span>Copy Selection</span>
            </button>
          </div>
          <div className="menu-divider" />
        </>
      )}
      <div className="menu-group">
        <button className="menu-item hover-target" onClick={() => handleAction(() => window.history.back())}>
          <span className="material-symbols-outlined menu-icon">arrow_back</span>
          <span>Back</span>
        </button>
        <button className="menu-item hover-target" onClick={() => handleAction(() => window.history.forward())}>
          <span className="material-symbols-outlined menu-icon">arrow_forward</span>
          <span>Forward</span>
        </button>
        <button className="menu-item hover-target" onClick={() => handleAction(() => window.location.reload())}>
          <span className="material-symbols-outlined menu-icon">refresh</span>
          <span>Reload</span>
        </button>
      </div>

      <div className="menu-divider" />

      <div className="menu-group">
        <button className="menu-item hover-target" onClick={() => handleAction(() => navigate('/'))}>
          <span className="material-symbols-outlined menu-icon">home</span>
          <span>Home</span>
        </button>
        <button className="menu-item hover-target" onClick={() => handleAction(() => navigate('/projects'))}>
          <span className="material-symbols-outlined menu-icon">work</span>
          <span>Projects</span>
        </button>
        <button className="menu-item hover-target" onClick={() => handleAction(() => navigate('/skills'))}>
          <span className="material-symbols-outlined menu-icon">terminal</span>
          <span>Skills</span>
        </button>
        <button className="menu-item hover-target" onClick={() => handleAction(() => navigate('/contact'))}>
          <span className="material-symbols-outlined menu-icon">mail</span>
          <span>Contact</span>
        </button>
      </div>

      {isThemeUnlocked && (
        <>
          <div className="menu-divider" />
          <div 
            className="menu-group"
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            <button 
              className="menu-item hover-target" 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onClick={(e) => {
                e.stopPropagation()
                setSubmenuOpen(!submenuOpen)
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined menu-icon">palette</span>
                <span>Theme</span>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-outline)' }}>
                chevron_right
              </span>
            </button>
          </div>
        </>
      )}

      <div className="menu-divider" />

      <div className="menu-group">
        <button 
          className="menu-item hover-target" 
          onClick={() => handleAction(() => {
            navigator.clipboard.writeText(window.location.href)
            alert('Page URL copied to clipboard!')
          })}
        >
          <span className="material-symbols-outlined menu-icon">content_copy</span>
          <span>Copy Page URL</span>
        </button>
      </div>
    </div>

    {/* Sibling Submenu Flyout to bypass Chrome nested filter rendering bug */}
    <AnimatePresence>
      {isThemeUnlocked && submenuOpen && (
          <motion.div 
            className="custom-context-submenu glass-panel"
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => {
              setSubmenuOpen(false)
              setAccentMenuOpen(false)
            }}
            initial={{ opacity: 0, x: position.x + 400 > window.innerWidth ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position.x + 400 > window.innerWidth ? 10 : -10 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: position.x + 400 > window.innerWidth ? `${position.x - 184}px` : `${position.x + 200}px`,
              top: themeButtonY + 445 > window.innerHeight ? 'auto' : `${themeButtonY}px`,
              bottom: themeButtonY + 445 > window.innerHeight ? `${window.innerHeight - (themeButtonY + 36)}px` : 'auto',
              width: '180px',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              zIndex: 10001,
            }}
          >
            {/* Midnight Neon (Default Layout) with Color Accent Submenu trigger */}
            <button 
              className={`menu-item hover-target ${colorAccents.some(c => c.id === theme) ? 'menu-item--active' : ''}`}
              onMouseEnter={() => setAccentMenuOpen(true)}
              onClick={(e) => {
                e.stopPropagation()
                setAccentMenuOpen(!accentMenuOpen)
              }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>Midnight Neon</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-outline)' }}>
                chevron_right
              </span>
            </button>

            {themes.map(t => (
              <button 
                key={t.id}
                className={`menu-item hover-target ${theme === t.id ? 'menu-item--active' : ''}`}
                onMouseEnter={() => setAccentMenuOpen(false)}
                onClick={() => handleAction(() => {
                  setTheme(t.id)
                  setAccentMenuOpen(false)
                })}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>{t.label}</span>
                {theme === t.id && (
                  <span className="material-symbols-outlined text-cyan" style={{ fontSize: '16px' }}>
                    check
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sibling Sub-submenu Flyout for Midnight Neon Color Accents */}
      <AnimatePresence>
        {isThemeUnlocked && submenuOpen && accentMenuOpen && (
          <motion.div 
            className="custom-context-submenu glass-panel"
            onMouseEnter={() => {
              setSubmenuOpen(true)
              setAccentMenuOpen(true)
            }}
            onMouseLeave={() => {
              setSubmenuOpen(false)
              setAccentMenuOpen(false)
            }}
            initial={{ opacity: 0, x: position.x + 400 > window.innerWidth ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position.x + 400 > window.innerWidth ? 10 : -10 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: position.x + 400 > window.innerWidth ? `${position.x - 368}px` : `${position.x + 384}px`,
              top: `${Math.max(10, Math.min(themeSubmenuTop + 6, window.innerHeight - 192 - 10))}px`,
              width: '180px',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              zIndex: 10002,
            }}
          >
            {colorAccents.map(c => (
              <button 
                key={c.id}
                className={`menu-item hover-target ${theme === c.id ? 'menu-item--active' : ''}`}
                onClick={() => handleAction(() => {
                  setTheme(c.id)
                  setAccentMenuOpen(false)
                })}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>{c.label}</span>
                {theme === c.id && (
                  <span className="material-symbols-outlined text-cyan" style={{ fontSize: '16px' }}>
                    check
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
