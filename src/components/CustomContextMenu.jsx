import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './CustomContextMenu.css'

export default function CustomContextMenu() {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState('')
  const menuRef = useRef(null)
  const navigate = useNavigate()

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
      const menuHeight = selection.trim() ? 320 : 280

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

  if (!visible) return null

  const handleAction = (action) => {
    setVisible(false)
    action()
  }

  return (
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
  )
}
