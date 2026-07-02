import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useScrollReveal, useParticles } from '../hooks/useAnimations'
import './Home.css'

const projects = [
  { title: 'CareFlow', desc: 'AI-powered receptionist platform featuring appointment scheduling and intelligent customer interactions.', tech: ['Next.js', 'React', 'Groq API'], icon: 'smart_toy', link: 'https://med-careflow.vercel.app/' },
  { title: 'CodeBot', desc: 'Open-source ChatGPT alternative with real-time streaming and chat persistence.', tech: ['React', 'TypeScript', 'Vite'], icon: 'chat', link: 'https://the-code-bot.vercel.app/' },
  { title: 'NFTicketing', desc: 'Decentralized NFT event ticketing platform using ERC721 smart contracts.', tech: ['Solidity', 'Ethers.js'], icon: 'confirmation_number', link: 'https://nftticketing.vercel.app/' },
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
              Computer Science Engineering student specializing in IoT, Cyber Security, and Blockchain Technology. 
              Building practical solutions that combine clean user experiences with solid engineering, focusing on AI, scalable platforms, and Web3.
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
