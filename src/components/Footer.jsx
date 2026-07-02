import { Link } from 'react-router-dom'
import { GithubIcon, LinkedInIcon } from './Icons'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    { label: 'GitHub', url: 'https://github.com/AryanSingh2k4', icon: <GithubIcon /> },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/aryansingh2k4', icon: <LinkedInIcon /> },
  ]

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__grid">
          {/* Tagline / Logo Col */}
          <div className="footer__col footer__brand">
            <Link to="/" className="footer__logo hover-target">
              ARYAN<span className="footer__logo-dot">.DEV</span>
            </Link>
            <p className="footer__tagline text-body-md text-muted" style={{ marginTop: '12px', maxWidth: '280px' }}>
              Building highly optimized frontend systems, interactive Web3 solutions, and scalable decentralized platforms.
            </p>
            <div className="footer__socials" style={{ marginTop: '20px' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link hover-target"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="footer__col">
            <h4 className="footer__title text-label-code text-cyan">Navigation</h4>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link hover-target">Home</Link></li>
              <li><Link to="/projects" className="footer__link hover-target">Work</Link></li>
              <li><Link to="/skills" className="footer__link hover-target">Skills</Link></li>
              <li><Link to="/about" className="footer__link hover-target">About</Link></li>
              <li><Link to="/contact" className="footer__link hover-target">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="footer__col">
            <h4 className="footer__title text-label-code text-cyan">Get in Touch</h4>
            <p className="text-body-md text-muted" style={{ marginBottom: '8px' }}>
              Have an idea? Let's build it together.
            </p>
            <a href="mailto:aryanvsingh641@gmail.com" className="footer__contact-email hover-target text-label-code text-violet" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>mail</span>
              aryanvsingh641@gmail.com
            </a>
            <p className="text-body-md text-muted" style={{ marginTop: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-cyan)' }}>location_on</span>
              India
            </p>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright text-label-code text-muted">
            © {year} ARYAN.DEV — Full Stack & Web3 Engineer
          </p>
          <p className="footer__stamp text-label-code text-muted" style={{ fontSize: '11px' }}>
            Built with <span className="text-cyan">React</span> & <span className="text-violet">Vite</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
