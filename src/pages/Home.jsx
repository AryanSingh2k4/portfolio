import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { ScrollDownBadge, SayHelloBadge, HeadlineUnderline } from '../components/Icons'
import './Home.css'

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0)
  const rotatingWords = ['interfaces', 'motion', 'systems', 'platforms']

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <PageTransition>
      <div className="home-page">
        {/* Hero Section */}
        <header className="hero" id="top">
          {/* Vertical Guidelines */}
          <div className="gl" style={{ left: '25%', animationDelay: '0.2s' }} aria-hidden="true" />
          <div className="gl" style={{ left: '50%', animationDelay: '0.35s' }} aria-hidden="true" />
          <div className="gl" style={{ left: '75%', animationDelay: '0.5s' }} aria-hidden="true" />

          <div className="w">
            {/* Metadata Bar */}
            <div className="meta mono">
              <span>Navi Mumbai, India</span>
              <span><i className="pd" aria-hidden="true" />Available for opportunities — 2026</span>
              <span>Aryan Singh • Portfolio</span>
            </div>

            {/* Giant Headline with Rotating Italic Accent */}
            <h1 className="hero-title">
              <span className="ln"><span>Building</span></span>
              <span className="ln">
                <span className="hero-cycler">
                  <span className="it hero-rotating-word" key={wordIndex}>
                    {rotatingWords[wordIndex]}
                  </span>
                </span>
              </span>
              <span className="ln">
                <span>
                  that feel{' '}
                  <span className="al">
                    alive.
                    <HeadlineUnderline />
                  </span>
                </span>
              </span>
            </h1>

            {/* Sub-Hero Description & Actions */}
            <div className="sub">
              <div>
                <p className="hero-bio">
                  Computer Science Engineering student specializing in IoT, Cyber Security, and Blockchain Technology. 
                  Building high-performance systems, autonomous AI platforms, and practical digital experiences.
                </p>
                <div className="hero-cta-group">
                  <Link to="/projects" className="btn hover-target">
                    View selected work
                  </Link>
                  <Link to="/about" className="ghost hover-target">
                    About me →
                  </Link>
                  <a
                    href="/Aryan_Singh_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ghost hover-target"
                    style={{ marginLeft: '12px' }}
                  >
                    Resume ↗
                  </a>
                </div>
              </div>

              <a href="#work" className="hover-target" aria-label="Scroll to selected work">
                <ScrollDownBadge />
              </a>
            </div>
          </div>
        </header>

        {/* Dual-Track Infinite Marquee Banner */}
        <div className="mq" aria-hidden="true">
          <div className="tr">
            <span>Interaction</span><span className="ol">Motion</span>
            <span>AI Systems</span><span className="ol">Full Stack</span>
            <span>Web3</span><span className="ol">Cybersecurity</span>
            <span>Interaction</span><span className="ol">Motion</span>
            <span>AI Systems</span><span className="ol">Full Stack</span>
            <span>Web3</span><span className="ol">Cybersecurity</span>
          </div>
          <div className="tr rv">
            <span className="ol">TypeScript</span><span>Next.js</span>
            <span className="ol">React</span><span>Supabase</span>
            <span className="ol">WebRTC</span><span>Performance</span>
            <span className="ol">TypeScript</span><span>Next.js</span>
            <span className="ol">React</span><span>Supabase</span>
            <span className="ol">WebRTC</span><span>Performance</span>
          </div>
        </div>

        {/* Philosophy Statement Section */}
        <section className="philosophy-section">
          <div className="w">
            <div className="mono" style={{ color: 'var(--o)', marginBottom: '16px' }}>(01) Philosophy</div>
            <p className="fill-quote">
              Software should be <span className="it" style={{ color: 'inherit' }}>fast</span>, motion should guide attention, and every interface deserves precision craftsmanship.
            </p>
          </div>
        </section>

        {/* Featured Work Stacking Sticky Showcase */}
        <section id="work" className="featured-work-section">
          <div className="w">
            <div className="section-hd">
              <div>
                <div className="mono" style={{ color: 'var(--o)', marginBottom: '8px' }}>(02) Featured Work</div>
                <h2 className="section-title">
                  Work that <span className="it">moves</span> people.
                </h2>
              </div>
              <Link to="/projects" className="btn-secondary hover-target">
                View all 7 projects →
              </Link>
            </div>

            {/* Card 01: Sentinel (Dark Card) */}
            <div className="fc a">
              <div className="fl">
                <div>
                  <div className="mono" style={{ color: 'var(--o)' }}>01 — Cybersecurity & AI</div>
                  <h3>Sentinel</h3>
                  <p>
                    Autonomous security scanner that maps attack surfaces, discovers vulnerabilities, and simulates exploits via state machine agents.
                  </p>
                </div>
                <div>
                  <div>
                    <span className="tag">Next.js</span>
                    <span className="tag">Nuclei</span>
                    <span className="tag">Katana</span>
                    <span className="tag">Supabase</span>
                  </div>
                  <div style={{ marginTop: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a href="https://sentinel-pentesting.vercel.app/?v=1" target="_blank" rel="noopener noreferrer" className="ghost hover-target" style={{ color: 'var(--t)' }}>
                      Live Demo ↗
                    </a>
                    <a href="https://github.com/AryanSingh2k4/sentinel" target="_blank" rel="noopener noreferrer" className="ghost hover-target" style={{ color: 'var(--t)' }}>
                      Source Code ↗
                    </a>
                  </div>
                </div>
              </div>
              <div className="art">
                <i className="cr" />
                <i className="cr x" />
                <i className="cr y" />
                <i className="cr d" />
              </div>
            </div>

            {/* Card 02: Dropline (Orange Card) */}
            <div className="fc b">
              <div className="fl">
                <div>
                  <div className="mono" style={{ color: '#191812', opacity: 0.75 }}>02 — WebRTC & P2P Streaming</div>
                  <h3>Dropline</h3>
                  <p style={{ color: '#191812' }}>
                    Peer-to-peer file sharing app for sending files directly between browsers with zero cloud storage and no size limits.
                  </p>
                </div>
                <div>
                  <div>
                    <span className="tag" style={{ borderColor: '#191812', color: '#191812' }}>WebRTC</span>
                    <span className="tag" style={{ borderColor: '#191812', color: '#191812' }}>Next.js</span>
                    <span className="tag" style={{ borderColor: '#191812', color: '#191812' }}>TypeScript</span>
                    <span className="tag" style={{ borderColor: '#191812', color: '#191812' }}>Supabase</span>
                  </div>
                  <div style={{ marginTop: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a href="https://droplinegg.vercel.app/" target="_blank" rel="noopener noreferrer" className="ghost hover-target" style={{ color: '#191812', background: 'linear-gradient(#191812, #191812) left bottom / 100% 3px no-repeat' }}>
                      Live Demo ↗
                    </a>
                    <a href="https://github.com/AryanSingh2k4/drop-line" target="_blank" rel="noopener noreferrer" className="ghost hover-target" style={{ color: '#191812', background: 'linear-gradient(#191812, #191812) left bottom / 100% 3px no-repeat' }}>
                      Source Code ↗
                    </a>
                  </div>
                </div>
              </div>
              <div className="art">
                <i className="sq" />
                <i className="sq x" />
                <i className="sq y" />
              </div>
            </div>

            {/* Card 03: CareFlow (Parchment Card) */}
            <div className="fc c">
              <div className="fl">
                <div>
                  <div className="mono" style={{ color: 'var(--o)' }}>03 — AI Systems & Automation</div>
                  <h3>CareFlow</h3>
                  <p>
                    AI medical receptionist that handles conversational patient intake, automated appointment booking, and clinic triage.
                  </p>
                </div>
                <div>
                  <div>
                    <span className="tag">Next.js</span>
                    <span className="tag">Groq API</span>
                    <span className="tag">Supabase</span>
                    <span className="tag">Tailwind</span>
                  </div>
                  <div style={{ marginTop: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a href="https://med-careflow.vercel.app/" target="_blank" rel="noopener noreferrer" className="ghost hover-target">
                      Live Demo ↗
                    </a>
                    <a href="https://github.com/aryansingh81167/careflow" target="_blank" rel="noopener noreferrer" className="ghost hover-target">
                      Source Code ↗
                    </a>
                  </div>
                </div>
              </div>
              <div className="art">
                <div className="bars">
                  <i /><i /><i /><i /><i /><i /><i />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach / "How I Build" Track Section */}
        <section className="dark-section" id="approach">
          <div className="w">
            <div className="section-hd" style={{ marginBottom: '32px' }}>
              <div>
                <div className="mono" style={{ color: '#FD4F04', marginBottom: '8px' }}>(03) Methodology</div>
                <h2 className="section-title" style={{ color: '#F0ECE2' }}>
                  How I <span className="it" style={{ color: '#FD4F04' }}>build</span>.
                </h2>
              </div>
            </div>

            {/* Laser runner track */}
            <div className="trk" aria-hidden="true" />

            <div className="cols">
              <div className="sc">
                <div className="nu">01</div>
                <h3>Understand</h3>
                <p>Deconstruct requirements, threat models, and architectural constraints before writing a single line of code.</p>
              </div>
              <div className="sc">
                <div className="nu">02</div>
                <h3>Architect</h3>
                <p>Design modular, scalable foundations with robust state machines, typed schemas, and edge runtime optimization.</p>
              </div>
              <div className="sc">
                <div className="nu">03</div>
                <h3>Animate</h3>
                <p>Implement purposeful micro-interactions, smooth physics-based motion, and responsive tactile feedback.</p>
              </div>
              <div className="sc">
                <div className="nu">04</div>
                <h3>Ship</h3>
                <p>Ensure sub-second load times, clean accessibility compliance, strict data isolation, and resilient reliability.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact High-Impact Banner */}
        <section className="ct">
          <Link to="/contact" className="hover-target" aria-label="Go to contact page">
            <SayHelloBadge />
          </Link>
          <div className="w">
            <div className="mono" style={{ color: '#191812', opacity: 0.75, marginBottom: '8px' }}>
              (04) Contact
            </div>
            <h2>
              Let’s create something <span className="it">memorable.</span>
            </h2>
            <a href="mailto:aryanvsingh641@gmail.com" className="mail hover-target">
              aryanvsingh641@gmail.com
            </a>
            <div className="soc mono" style={{ marginTop: '50px' }}>
              <a href="https://github.com/AryanSingh2k4" target="_blank" rel="noopener noreferrer" className="hover-target">GitHub</a>
              <a href="https://linkedin.com/in/aryansingh2k4" target="_blank" rel="noopener noreferrer" className="hover-target">LinkedIn</a>
              <a href="https://discordapp.com/users/carnage__2k4" target="_blank" rel="noopener noreferrer" className="hover-target">Discord</a>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
