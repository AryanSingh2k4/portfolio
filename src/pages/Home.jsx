import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useScrollReveal, useParticles } from '../hooks/useAnimations'
import './Home.css'

const projects = [
  { title: 'Careflow', desc: 'AI-Based Receptionist System with sub-second latency.', tech: ['Next.js', 'React', 'Groq API'], icon: 'smart_toy' },
  { title: 'Codebot', desc: 'Open-Source ChatGPT Alternative with real-time streaming.', tech: ['React', 'TypeScript', 'Vite'], icon: 'chat' },
  { title: 'NFTicketing', desc: 'Decentralized Event Ticketing Platform using ERC721 smart contracts.', tech: ['Solidity', 'Ethers.js'], icon: 'confirmation_number' },
]

const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Solidity', 'Supabase', 'SQL', 'Node.js']

export default function Home() {
  const sectionRef = useScrollReveal()
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const [terminalStep, setTerminalStep] = useState(0)
  const [typedText, setTypedText] = useState('')

  useParticles(canvasRef, mouseRef)

  // Track mouse for particles
  useEffect(() => {
    const handleMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // Terminal typing animation
  useEffect(() => {
    const fullText = 'Aryan — Full Stack Developer & UI Architect'
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setTypedText(fullText.slice(0, i))
          i++
        } else {
          clearInterval(interval)
          setTimeout(() => setTerminalStep(1), 400)
          setTimeout(() => setTerminalStep(2), 900)
          setTimeout(() => setTerminalStep(3), 1400)
        }
      }, 35)
      return () => clearInterval(interval)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageTransition>
      <div ref={sectionRef}>
        {/* Hero Section */}
        <section className="hero">
          <canvas ref={canvasRef} className="hero-canvas" />
          <div className="hero__content container">
            <h1 className="text-display-xl scroll-reveal">
              Architect of the <span className="gradient-text">Future</span>
            </h1>
            <p className="hero__subtitle text-body-lg text-muted scroll-reveal">
              Crafting high-end, performant digital experiences. Blending deep technical
              expertise with visionary design to build the next generation of web applications.
            </p>
            <div className="hero__actions scroll-reveal">
              <Link to="/projects" className="btn-primary hover-target">
                View Projects
              </Link>
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
              <div className="terminal-body text-label-code">
                <p className="text-cyan">$ whoami</p>
                <p className="text-muted terminal-typed">{typedText}<span className="terminal-cursor">|</span></p>
                <p className={`text-cyan terminal-fade ${terminalStep >= 1 ? 'show' : ''}`}>$ cat status.log</p>
                <p className={`terminal-fade ${terminalStep >= 2 ? 'show' : ''}`} style={{ color: '#27c93f' }}>
                  &gt; Building the future of the web...
                </p>
                <p className={`text-cyan terminal-fade ${terminalStep >= 3 ? 'show' : ''}`}>
                  $ <span className="terminal-blink">█</span>
                </p>
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
                  <span className="material-symbols-outlined project-card__icon">{p.icon}</span>
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
          <h2 className="text-headline-lg text-cyan" style={{ marginBottom: '16px' }}>Initiate Sequence</h2>
          <p className="text-body-lg text-muted" style={{ marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Ready to build something extraordinary? Let's connect and create the future together.
          </p>
          <Link to="/contact" className="btn-primary hover-target" style={{ padding: '16px 48px', fontSize: '16px' }}>
            Send Transmission
          </Link>
        </section>
      </div>
    </PageTransition>
  )
}
