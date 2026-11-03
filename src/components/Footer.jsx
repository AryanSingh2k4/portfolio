import { Link } from 'react-router-dom'
import { GithubIcon, LinkedInIcon, DiscordIcon } from './Icons'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="ft">
      <div className="w">
        {/* Massive Watermark Signature */}
        <div className="wm hover-target" aria-hidden="true">
          ARYAN SINGH
        </div>

        <div className="ft-grid">
          <div>
            <p className="mono" style={{ color: 'var(--o)', marginBottom: '8px' }}>
              // Systems & Full Stack Engineer
            </p>
            <p style={{ maxWidth: '380px', lineHeight: '1.6', fontSize: '15px', opacity: 0.85, margin: 0 }}>
              Computer Science Engineering student specializing in IoT, Cyber Security, and Blockchain Technology. Crafting systems and interfaces that feel alive.
            </p>
          </div>

          <div className="ft-nav-col">
            <span className="mono" style={{ opacity: 0.5, display: 'block', marginBottom: '12px' }}>
              Navigation
            </span>
            <div className="ft-links">
              <Link to="/" className="hover-target">Home</Link>
              <Link to="/projects" className="hover-target">Work</Link>
              <Link to="/skills" className="hover-target">Skills</Link>
              <Link to="/about" className="hover-target">About</Link>
              <Link to="/contact" className="hover-target">Contact</Link>
            </div>
          </div>

          <div>
            <span className="mono" style={{ opacity: 0.5, display: 'block', marginBottom: '12px' }}>
              Connect
            </span>
            <div className="ft-socials">
              <a href="https://github.com/AryanSingh2k4" target="_blank" rel="noopener noreferrer" className="hover-target" aria-label="GitHub">
                <GithubIcon size={20} />
                <span className="mono">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/aryansingh2k4" target="_blank" rel="noopener noreferrer" className="hover-target" aria-label="LinkedIn">
                <LinkedInIcon size={20} />
                <span className="mono">LinkedIn</span>
              </a>
              <a href="https://discordapp.com/users/carnage__2k4" target="_blank" rel="noopener noreferrer" className="hover-target" aria-label="Discord">
                <DiscordIcon size={20} />
                <span className="mono">Discord</span>
              </a>
            </div>
          </div>
        </div>

        <div className="ft-bottom">
          <span className="mono">© {year} ARYAN SINGH</span>
          
          <a href="#top" onClick={scrollToTop} className="mono ghost hover-target" style={{ color: '#F0ECE2' }}>
            Back to top ↑
          </a>

          <details className="eg">
            <summary className="mono hover-target">One more thing ↓</summary>
            <p>You scrolled all the way down. That’s the kind of curiosity I like to build with.</p>
          </details>
        </div>
      </div>
    </footer>
  )
}
