import { useRef, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useScrollReveal, useParticles } from '../hooks/useAnimations'
import './Home.css'

const projects = [
  { title: 'Sentinel', desc: 'Autonomous threat hunting scanner mapping attack surfaces and triaging findings via agent state machines.', tech: ['Next.js', 'Nuclei', 'Katana'], icon: 'security', link: 'https://sentinel-pentesting.vercel.app/' },
  { title: 'CareFlow', desc: 'AI-powered receptionist platform featuring appointment scheduling and intelligent customer interactions.', tech: ['Next.js', 'React', 'Groq API'], icon: 'smart_toy', link: 'https://med-careflow.vercel.app/' },
  { title: 'Eynexa Corporate Website', desc: 'Corporate digital platform designed to improve pharmaceutical client conversion rates, establish professional brand guidelines, and optimize search discoverability.', tech: ['Web Development', 'SEO', 'Brand Design'], icon: 'medical_services', link: 'https://eynexapharma.vercel.app/' },
]

const skills = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 
  'Tailwind CSS', 'Supabase', 'SQL', 'Node.js', 'REST APIs'
]

export default function Home() {
  const navigate = useNavigate()
  const sectionRef = useScrollReveal()
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const [terminalStep, setTerminalStep] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isInteractive, setIsInteractive] = useState(false)
  const [history, setHistory] = useState([
    { type: 'input', text: 'whoami' },
    { type: 'output', text: 'aryan - full stack developer & Web3 builder' },
    { type: 'input', text: 'cat status.log' },
    { type: 'output', text: 'Building the future of the web...' },
    { type: 'output', text: "Type '/help' to see what else I can do.", color: '#27c93f' }
  ])
  const [inputVal, setInputVal] = useState('')
  const inputRef = useRef(null)

  useParticles(canvasRef, mouseRef)

  // Track mouse for particles
  useEffect(() => {
    const handleMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // Terminal typing animation
  useEffect(() => {
    const texts = [
      'Full Stack Developer...',
      'Building AI Powered Applications...',
      'React | Next.js | TypeScript...',
      'Exploring AI and Emerging Technologies...'
    ]
    let currentTextIndex = 0
    let i = 0
    let isDeleting = false

    const type = () => {
      const currentText = texts[currentTextIndex]
      
      if (!isDeleting) {
        setTypedText(currentText.slice(0, i + 1))
        i++
        if (i === currentText.length) {
          isDeleting = true
          setTimeout(type, 1500) // Pause at end of sentence
          return
        }
      } else {
        setTypedText(currentText.slice(0, i - 1))
        i--
        if (i === 0) {
          isDeleting = false
          currentTextIndex = (currentTextIndex + 1) % texts.length
        }
      }

      setTimeout(type, isDeleting ? 30 : 60)
    }

    const timer = setTimeout(() => {
      type()
      setTimeout(() => setTerminalStep(1), 1000)
      setTimeout(() => setTerminalStep(2), 2000)
      setTimeout(() => setTerminalStep(3), 3000)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  const handleTerminalClick = () => {
    setIsInteractive(true)
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus()
    }, 50)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim().toLowerCase()
      const newHistory = [...history, { type: 'input', text: inputVal }]
      
      if (cmd === '/help') {
        newHistory.push({ type: 'output', text: 'Available commands: /projects, /skills, /about, /contact, /clear, /help' })
      } else if (cmd === '/unlock-themes') {
        localStorage.setItem('themes-unlocked', 'true')
        newHistory.push({ type: 'output', text: 'Theme selector system unlocked! Right-click anywhere to select themes.' })
      } else if (cmd === '/lock-themes') {
        localStorage.setItem('themes-unlocked', 'false')
        newHistory.push({ type: 'output', text: 'Theme selector system locked.' })
      } else if (cmd === '/projects') {
        newHistory.push({ type: 'output', text: 'Redirecting to Projects page...' })
        setTimeout(() => navigate('/projects'), 800)
      } else if (cmd === '/skills') {
        newHistory.push({ type: 'output', text: 'Redirecting to Skills page...' })
        setTimeout(() => navigate('/skills'), 800)
      } else if (cmd === '/about') {
        newHistory.push({ type: 'output', text: 'Computer Science Engineering student specializing in IoT, Cyber Security, and Blockchain.' })
      } else if (cmd === '/contact') {
        newHistory.push({ type: 'output', text: 'Redirecting to Contact page...' })
        setTimeout(() => navigate('/contact'), 800)
      } else if (cmd === '/clear') {
        setHistory([])
        setInputVal('')
        return
      } else if (cmd) {
        newHistory.push({ type: 'output', text: `Command not found: ${cmd}. Type /help for options.` })
      }
      
      setHistory(newHistory)
      setInputVal('')
    }
  }

  return (
    <PageTransition>
      <div ref={sectionRef}>
        {/* Hero Section */}
        <section className="hero">
          <canvas ref={canvasRef} className="hero-canvas" />
          <div className="hero__content container">
            <h1 className="text-display-xl scroll-reveal">
              Full Stack & <span className="gradient-text">Web3 Engineer</span>
            </h1>
            <p className="hero__subtitle text-body-lg text-muted scroll-reveal">
              Computer Science Engineering student specializing in IoT, Cyber Security, and Blockchain Technology. 
              Building practical solutions that combine clean user experiences with solid engineering, focusing on AI, scalable platforms, and Web3.
            </p>
            <div className="hero__actions scroll-reveal" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/projects" className="btn-primary hover-target">
                View Projects
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary hover-target" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>description</span>
                Resume
              </a>
              <Link to="/contact" className="btn-secondary hover-target">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Skills + Terminal Section */}
        <section className="section container">
          <div className="home-grid">
            <div className="scroll-reveal">
              <h2 className="text-headline-lg text-cyan" style={{ marginBottom: '24px' }}>
                The Stack
              </h2>
              <p className="text-body-md text-muted" style={{ marginBottom: '32px' }}>
                Specializing in modern JavaScript frameworks, robust backend architectures,
                and pixel-perfect UI implementations. Every line of code is written with
                scalability and performance in mind.
              </p>
              <div className="skills-chips">
                {skills.map(s => (
                  <span key={s} className="chip hover-target">{s}</span>
                ))}
                <Link 
                  to="/skills" 
                  className="chip hover-target" 
                  style={{ 
                    textDecoration: 'none', 
                    background: 'rgba(0, 244, 254, 0.1)', 
                    color: 'var(--color-cyan)',
                    border: '1px solid rgba(0, 244, 254, 0.3)'
                  }}
                >
                  + More
                </Link>
              </div>
            </div>

            <div className="terminal-container scroll-reveal">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="text-label-code text-outline" style={{ marginLeft: '16px', fontSize: '12px' }}>
                  aryan@dev:~
                </span>
              </div>
              <div 
                className="terminal-body text-label-code" 
                onClick={handleTerminalClick}
                style={{ cursor: 'text', minHeight: '180px', maxHeight: '240px', overflowY: 'auto' }}
              >
                {!isInteractive ? (
                  <>
                    <p className="text-cyan">$ whoami</p>
                    <p className="text-muted terminal-typed">{typedText}<span className="terminal-cursor">|</span></p>
                    <p className={`text-cyan terminal-fade ${terminalStep >= 1 ? 'show' : ''}`}>$ cat status.log</p>
                    <p className={`terminal-fade ${terminalStep >= 2 ? 'show' : ''}`} style={{ color: '#27c93f' }}>
                      &gt; Building the future of the web...
                    </p>
                    <p className={`text-cyan terminal-fade ${terminalStep >= 3 ? 'show' : ''}`} style={{ marginTop: '8px', color: '#ffb86c' }}>
                      [Click here to type commands]
                    </p>
                  </>
                ) : (
                  <>
                    {history.map((line, index) => (
                      <div key={index} style={{ marginBottom: '6px', lineHeight: '1.4' }}>
                        {line.type === 'input' ? (
                          <span className="text-cyan">$ {line.text}</span>
                        ) : (
                          <span style={{ color: line.color || 'var(--color-on-surface-variant)' }}>{line.text}</span>
                        )}
                      </div>
                    ))}
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                      <span className="text-cyan" style={{ marginRight: '8px' }}>$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          color: 'var(--color-on-surface)',
                          fontFamily: 'var(--font-code)',
                          fontSize: 'inherit',
                          flex: 1,
                          padding: 0,
                        }}
                        placeholder="type /help..."
                        autoFocus
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work */}
        <section className="section container">
          <h2 className="text-headline-lg text-cyan scroll-reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Featured Work
          </h2>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div
                key={p.title}
                className={`glass-panel project-card hover-target scroll-reveal`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="project-card__image">
                  <div className="project-card__overlay" />
                  {p.link ? (
                    <img 
                      src={`https://api.microlink.io/?url=${encodeURIComponent(p.link)}&screenshot=true&meta=false&embed=screenshot.url`} 
                      alt={p.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <span className="material-symbols-outlined project-card__icon">{p.icon}</span>
                  )}
                </div>
                <h3 className="text-headline-md" style={{ marginBottom: '8px', fontSize: '24px' }}>{p.title}</h3>
                <p className="text-body-md text-muted" style={{ marginBottom: '16px', flex: 1 }}>{p.desc}</p>
                <div className="project-card__tech">
                  {p.tech.map(t => (
                    <span key={t} className="chip" style={{ fontSize: '12px', padding: '2px 8px' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }} className="scroll-reveal">
            <Link to="/projects" className="btn-secondary hover-target">
              View All Projects →
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section container scroll-reveal" style={{ textAlign: 'center', paddingBottom: '80px' }}>
          <h2 className="text-headline-lg text-cyan" style={{ marginBottom: '16px' }}>Let's Work Together</h2>
          <p className="text-body-lg text-muted" style={{ marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Ready to build something extraordinary? Let's connect and create the future together.
          </p>
          <Link to="/contact" className="btn-primary hover-target" style={{ padding: '16px 48px', fontSize: '16px' }}>
            Get In Touch
          </Link>
        </section>
      </div>
    </PageTransition>
  )
}
