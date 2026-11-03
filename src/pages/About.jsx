import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import './About.css'

export default function About() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark') ||
    document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const checkDark = () => {
      setIsDark(
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark'
      )
    }
    window.addEventListener('storage', checkDark)
    return () => window.removeEventListener('storage', checkDark)
  }, [])

  const handleToggleFlip = (e) => {
    const checked = e.target.checked
    setIsDark(checked)
    if (checked) {
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
    <PageTransition>
      <div className="about-page">
        {/* Header */}
        <header className="about-header">
          <div className="w">
            <div className="meta mono" style={{ marginBottom: '24px' }}>
              <span>(03) About Aryan</span>
              <span>Software Engineer & UI Architect</span>
              <span>Navi Mumbai, India</span>
            </div>
            
            {/* Editorial Split Grid */}
            <div className="ab">
              {/* Left Column: Story & Philosophy */}
              <div>
                <h1 className="about-title">
                  Hi, I’m <span className="it">Aryan</span>.
                </h1>

                <div className="about-narrative">
                  <p className="lead-text">
                    I am a Computer Science Engineering student specializing in <span className="hl">IoT, Cyber Security, and Blockchain Technology</span> at Lokmanya Tilak College of Engineering, graduating in 2027.
                  </p>
                  
                  <p>
                    I build high-performance web systems, autonomous security scanners, and practical digital experiences. From architecting <span className="hl">Scale Orbit’s config-driven business tools</span> at Purplotus to maintaining corporate web infrastructure at Phasecor Healthcare with 99.99% uptime, I focus on building software that feels alive and solves real problems.
                  </p>

                  <p>
                    I believe great software is <span className="hl">fast, intentional, and cut of corporate BS</span>. Interfaces should be responsive to human touch, codebases should be maintainable, and every byte delivered across the wire should earn its place.
                  </p>
                </div>

                {/* Do Not Press Interactive Switch */}
                <div style={{ marginTop: '36px', marginBottom: '40px' }}>
                  <label className="tg hover-target">
                    <input 
                      id="flip" 
                      type="checkbox" 
                      checked={isDark}
                      onChange={handleToggleFlip}
                      aria-label="Do not press: swaps the colour theme" 
                    />
                    <i aria-hidden="true" />
                    <span className="mono">Do not press (Theme Flip)</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="about-actions">
                  <a 
                    href="/Aryan_Singh_Resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn hover-target"
                  >
                    Download Resume ↗
                  </a>
                  <Link to="/contact" className="ghost hover-target">
                    Let’s talk →
                  </Link>
                </div>
              </div>

              {/* Right Column: Credentials, Focus & Toolbox */}
              <div className="about-sidebar">
                {/* Education Card */}
                <div className="creds-card">
                  <div className="mono" style={{ color: 'var(--o)', marginBottom: '8px' }}>
                    Education
                  </div>
                  <h2 className="creds-title">Lokmanya Tilak College of Engineering</h2>
                  <p className="creds-degree">
                    Bachelor of Engineering — Computer Science & Engineering (IoT, Cyber Security with Blockchain)
                  </p>
                  <div className="creds-meta mono">
                    <span>Navi Mumbai, India</span>
                    <span>2023 — 2027</span>
                  </div>
                </div>

                {/* Engineering Pillars */}
                <div className="creds-card" style={{ marginTop: '24px' }}>
                  <div className="mono" style={{ color: 'var(--o)', marginBottom: '14px' }}>
                    Engineering Principles
                  </div>
                  <ul className="principles-list">
                    <li>
                      <strong>Zero Fluff:</strong> Direct, clear communication and code that doesn’t hide behind abstractions.
                    </li>
                    <li>
                      <strong>Performance First:</strong> Sub-second load times, sub-frame animation pacing, and zero unnecessary bloat.
                    </li>
                    <li>
                      <strong>Robust Systems:</strong> Defensive state machines, deterministic error boundaries, and high test reliability.
                    </li>
                  </ul>
                </div>

                {/* Toolbox */}
                <div style={{ marginTop: '32px' }}>
                  <div className="mono" style={{ marginBottom: '16px' }}>Toolbox</div>
                  <div className="toolbox-chips">
                    <span className="chip hover-target">React</span>
                    <span className="chip hover-target">Next.js</span>
                    <span className="chip hover-target">TypeScript</span>
                    <span className="chip hover-target">Solid.js</span>
                    <span className="chip hover-target">WebRTC</span>
                    <span className="chip hover-target">Tailwind CSS</span>
                    <span className="chip hover-target">Supabase</span>
                    <span className="chip hover-target">PostgreSQL</span>
                    <span className="chip hover-target">Groq API</span>
                    <span className="chip hover-target">Solidity</span>
                    <span className="chip hover-target">Docker</span>
                    <span className="chip hover-target">Git</span>
                    <span className="chip hover-target">Figma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Philosophy Highlight Banner */}
        <section className="dark-section" style={{ padding: '100px 0' }}>
          <div className="w">
            <div className="mono" style={{ color: 'var(--o)', marginBottom: '16px' }}>(Statement)</div>
            <p className="fill-quote" style={{ color: '#F0ECE2' }}>
              The best interfaces don't demand attention — they <span className="it" style={{ color: 'var(--o)' }}>reward</span> it with speed, clarity, and thoughtful motion.
            </p>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
