import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import './NotFound.css'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="not-found-page">
        <div className="w not-found-content">
          <div className="mono" style={{ color: 'var(--o)', marginBottom: '16px' }}>
            (404 Error)
          </div>
          <div className="not-found-num" aria-hidden="true">
            404
          </div>
          <h1 className="not-found-title">
            Lost in <span className="it">whitespace</span>.
          </h1>
          <p className="not-found-desc">
            The page or route you requested does not exist or has been refactored.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn hover-target">
              Back to Home ↗
            </Link>
            <Link to="/projects" className="ghost hover-target">
              Browse Work →
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
