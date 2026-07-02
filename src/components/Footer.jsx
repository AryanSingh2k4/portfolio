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
      <div className="footer__inner container">
        <Link to="/" className="footer__logo hover-target">
          ARYAN<span className="footer__logo-dot">.DEV</span>
        </Link>

        <p className="footer__copyright text-label-code">
          © {year} ARYAN.DEV — Full Stack & Web3 Engineer
        </p>

        <div className="footer__socials">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link hover-target text-label-code"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
