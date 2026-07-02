import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    { label: 'GitHub', url: 'https://github.com/AryanSingh2k4' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/aryansingh2k4' },
  ]

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <Link to="/" className="footer__logo hover-target">
          ARYAN<span className="footer__logo-dot">.DEV</span>
        </Link>

        <p className="footer__copyright text-label-code">
          © {year} ARYAN.DEV — Architect of the Future
        </p>

        <div className="footer__socials">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link hover-target text-label-code"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
