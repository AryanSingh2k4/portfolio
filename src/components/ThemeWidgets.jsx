import { useEffect, useRef, useState } from 'react'

const CLIPPY_QUOTES = [
  "It looks like you want to hire Aryan. Would you like me to open the Contact page?",
  "Did you know? Aryan has written over 22,000 lines of code for this project!",
  "I'm Clippy! I recommend trying out the 'Y2K / Frutiger Aero' theme next.",
  "Beep boop! This entire portfolio is built using React, Vite, and custom CSS.",
  "Looking for the projects? Just click the 'Projects' link in the menu, or ask me!",
  "Aryan is currently based in India, building high-performance web applications."
]

export default function ThemeWidgets() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'default')
  const [arcadeOpen, setArcadeOpen] = useState(false)
  const [clippyVisible, setClippyVisible] = useState(true)
  const [clippyText, setClippyText] = useState(CLIPPY_QUOTES[0])
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snake-high-score') || '0', 10))

  // Snake game states
  const canvasRef = useRef(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'default')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  // Rotate clippy speech bubbles randomly
  const rotateClippyQuote = () => {
    const randomIdx = Math.floor(Math.random() * CLIPPY_QUOTES.length)
    setClippyText(CLIPPY_QUOTES[randomIdx])
  }

  // Snake game loops
  useEffect(() => {
    if (!arcadeOpen || !gameStarted || gameOver) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const grid = 10
    let count = 0
    let snake = {
      x: 100,
      y: 100,
      dx: grid,
      dy: 0,
      cells: [{ x: 100, y: 100 }, { x: 90, y: 100 }, { x: 80, y: 100 }],
      maxCells: 3
    }
    let apple = { x: 160, y: 160 }

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

    const resetApple = () => {
      apple.x = getRandomInt(0, 20) * grid
      apple.y = getRandomInt(0, 15) * grid
    }

    const loop = () => {
      animationId = requestAnimationFrame(loop)

      // slow game loop to 15fps
      if (++count < 6) {
        return
      }
      count = 0

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // draw grid background
      ctx.fillStyle = '#050c05'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // move snake by its velocity
      snake.x += snake.dx
      snake.y += snake.dy

      // wrap snake position horizontally/vertically on edge
      if (snake.x < 0) snake.x = canvas.width - grid
      else if (snake.x >= canvas.width) snake.x = 0

      if (snake.y < 0) snake.y = canvas.height - grid
      else if (snake.y >= canvas.height) snake.y = 0

      // keep track of where snake has been
      snake.cells.unshift({ x: snake.x, y: snake.y })

      // remove cells as we move away from them
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop()
      }

      // draw apple
      ctx.fillStyle = '#ff0055'
      ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1)

      // draw snake cell by cell
      ctx.fillStyle = '#33ff33'
      snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1)

        // snake ate apple
        if (cell.x === apple.x && cell.y === apple.y) {
          snake.maxCells++
          setScore(s => {
            const next = s + 10
            if (next > highScore) {
              setHighScore(next)
              localStorage.setItem('snake-high-score', next.toString())
            }
            return next
          })
          resetApple()
        }

        // check collision with all cells after this one (self-eat)
        for (let i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            setGameOver(true)
            setGameStarted(false)
          }
        }
      })
    }

    let animationId = requestAnimationFrame(loop)

    // Key handlers
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -grid
        snake.dy = 0
      } else if (e.key === 'ArrowUp' && snake.dy === 0) {
        snake.dy = -grid
        snake.dx = 0
      } else if (e.key === 'ArrowRight' && snake.dx === 0) {
        snake.dx = grid
        snake.dy = 0
      } else if (e.key === 'ArrowDown' && snake.dy === 0) {
        snake.dy = grid
        snake.dx = 0
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [arcadeOpen, gameStarted, gameOver, highScore])

  const startNewGame = () => {
    setScore(0)
    setGameOver(false)
    setGameStarted(true)
  }

  const showClippy = theme === 'classic-mac' && clippyVisible
  const showArcadeButton = ['retro-crt', 'vaporwave', 'glitch-hazard'].includes(theme)

  return (
    <>
      {/* 1. Retro Clippy Assistant */}
      {showClippy && (
        <div 
          className="clippy-assistant" 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'flex-end',
            fontFamily: 'var(--font-body)',
          }}
        >
          <div 
            className="clippy-bubble"
            style={{
              background: '#ffffcc',
              border: '2px solid #000000',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '3px 3px 0 #000',
              color: '#000',
              fontSize: '13px',
              maxWidth: '220px',
              marginBottom: '40px',
              marginRight: '-10px',
              position: 'relative',
            }}
          >
            <p style={{ margin: 0, lineHeight: '1.4' }}>{clippyText}</p>
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button 
                onClick={rotateClippyQuote}
                style={{
                  background: '#eaeaea',
                  border: '1px solid #000',
                  fontSize: '11px',
                  padding: '2px 6px',
                  cursor: 'pointer',
                  borderRadius: '0px'
                }}
              >
                Next Quote
              </button>
              <button 
                onClick={() => setClippyVisible(false)}
                style={{
                  background: '#ffcccc',
                  border: '1px solid #000',
                  fontSize: '11px',
                  padding: '2px 6px',
                  cursor: 'pointer',
                  borderRadius: '0px'
                }}
              >
                Close
              </button>
            </div>
            {/* Speech bubble pointer */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-8px',
                right: '24px',
                width: '0',
                height: '0',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #ffffcc',
              }}
            />
            <div 
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '24px',
                width: '0',
                height: '0',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #000000',
                zIndex: -1,
              }}
            />
          </div>

          {/* Clippy Paperclip Avatar */}
          <div 
            onClick={rotateClippyQuote}
            className="hover-target"
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              userSelect: 'none',
              animation: 'clippy-float 3s ease-in-out infinite'
            }}
          >
            <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 8C19.5817 8 16 11.5817 16 16V40C16 43.3137 18.6863 46 22 46C25.3137 46 28 43.3137 28 40V20C28 18.8954 27.1046 18 26 18C24.8954 18 24 18.8954 24 20V40C24 41.1046 23.1046 42 22 42C20.8954 42 20 41.1046 20 40V16C20 13.7909 21.7909 12 24 12C26.2091 12 28 13.7909 28 16V40C28 44.4183 24.4183 48 24 48C23.5817 48 20 44.4183 20 40V24C20 22.8954 19.1046 22 18 22C16.8954 22 16 22.8954 16 24V40C16 46.6274 21.3726 52 28 52C34.6274 52 40 46.6274 40 40V16C40 11.5817 36.4183 8 32 8C27.5817 8 24 8 24 8Z" fill="#888888" stroke="#000000" strokeWidth="2.5"/>
              {/* Retro Eyes */}
              <circle cx="21" cy="20" r="3" fill="#ffffff" stroke="#000000" strokeWidth="1.5"/>
              <circle cx="21" cy="20" r="1" fill="#000000"/>
              <circle cx="29" cy="20" r="3" fill="#ffffff" stroke="#000000" strokeWidth="1.5"/>
              <circle cx="29" cy="20" r="1" fill="#000000"/>
              {/* Retro Eyebrows */}
              <path d="M19 15C20 16 22 16 23 15" stroke="#000000" strokeWidth="1.5"/>
              <path d="M27 15C28 16 30 16 31 15" stroke="#000000" strokeWidth="1.5"/>
            </svg>
            <div style={{
              fontSize: '10px',
              background: '#000080',
              color: '#fff',
              padding: '1px 4px',
              border: '1px solid #fff',
              marginTop: '4px',
              boxShadow: '1px 1px 0 #000'
            }}>
              Guide.exe
            </div>
          </div>
        </div>
      )}

      {/* 2. Playable Retro Arcade */}
      {showArcadeButton && (
        <>
          {/* Floating minimize bubble button */}
          {!arcadeOpen && (
            <div 
              onClick={() => setArcadeOpen(true)}
              className="hover-target"
              style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 99999,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '2px solid var(--color-outline)',
                boxShadow: '0 0 15px var(--color-cyan-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                animation: 'clippy-float 3s ease-in-out infinite'
              }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '28px' }}>
                sports_esports
              </span>
            </div>
          )}

          {/* Retro Arcade Window */}
          {arcadeOpen && (
            <div 
              style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                width: '240px',
                background: '#0a0f0a',
                border: '3px solid #33ff33',
                padding: '12px',
                zIndex: 99999,
                color: '#33ff33',
                fontFamily: 'monospace',
                boxShadow: '0 0 25px rgba(51, 255, 51, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {/* Window Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #33ff33', paddingBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>🎮 RETRO_SNAKE.EXE</span>
                <button 
                  onClick={() => setArcadeOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff0055',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: 0
                  }}
                >
                  [X]
                </button>
              </div>

              {/* Game Screen */}
              <div style={{ position: 'relative', width: '210px', height: '160px', margin: '0 auto', border: '2px solid #225522' }}>
                <canvas 
                  ref={canvasRef}
                  width="210"
                  height="160"
                  style={{ display: 'block', imageRendering: 'pixelated' }}
                />

                {/* Overlays */}
                {!gameStarted && !gameOver && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(5, 12, 5, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <div style={{ fontSize: '11px', textAlign: 'center' }}>HI-SCORE: {highScore}</div>
                    <button 
                      onClick={startNewGame}
                      className="hover-target"
                      style={{
                        background: '#33ff33',
                        color: '#000',
                        border: 'none',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}
                    >
                      START GAME
                    </button>
                  </div>
                )}

                {gameOver && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(15, 5, 5, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <div style={{ fontSize: '13px', color: '#ff0055', fontWeight: 'bold' }}>GAME OVER</div>
                    <div style={{ fontSize: '11px' }}>SCORE: {score}</div>
                    <button 
                      onClick={startNewGame}
                      className="hover-target"
                      style={{
                        background: '#33ff33',
                        color: '#000',
                        border: 'none',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}
                    >
                      PLAY AGAIN
                    </button>
                  </div>
                )}
              </div>

              {/* Game Stats & Mini Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span>SCORE: {score}</span>
                <span>HIGH: {highScore}</span>
              </div>

              {/* Virtual Control D-Pad for Mouse users */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', margin: '4px 0' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button 
                    onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))}
                    style={{ background: '#222', border: '1px solid #33ff33', color: '#33ff33', padding: '2px 8px', fontSize: '10px', cursor: 'pointer' }}
                  >
                    ▲
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button 
                    onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))}
                    style={{ background: '#222', border: '1px solid #33ff33', color: '#33ff33', padding: '2px 8px', fontSize: '10px', cursor: 'pointer' }}
                  >
                    ◀
                  </button>
                  <button 
                    onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))}
                    style={{ background: '#222', border: '1px solid #33ff33', color: '#33ff33', padding: '2px 8px', fontSize: '10px', cursor: 'pointer' }}
                  >
                    ▼
                  </button>
                  <button 
                    onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
                    style={{ background: '#222', border: '1px solid #33ff33', color: '#33ff33', padding: '2px 8px', fontSize: '10px', cursor: 'pointer' }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Embedded Clippy float animation keyframes */}
      <style>{`
        @keyframes clippy-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </>
  )
}
