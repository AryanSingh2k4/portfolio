import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import './Projects.css'

const filters = ['All', 'Web Apps', 'Web3 & AI']

const allProjects = [
  { title: 'Careflow', desc: 'AI-Based Receptionist System with sub-second latency.', tech: ['Next.js', 'React', 'Groq API', 'Supabase', 'Tailwind CSS'], icon: 'smart_toy', category: 'Web3 & AI', link: '#', source: '#' },
  { title: 'Codebot', desc: 'Open-Source ChatGPT Alternative with real-time streaming.', tech: ['React', 'TypeScript', 'Groq API', 'Vite', 'Tailwind CSS'], icon: 'chat', category: 'Web3 & AI', link: '#', source: '#' },
  { title: 'NFTicketing', desc: 'Decentralized Event Ticketing Platform using ERC721 smart contracts.', tech: ['Solidity', 'React', 'Ethers.js', 'Sepolia'], icon: 'confirmation_number', category: 'Web3 & AI', link: '#', source: '#' },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useScrollReveal()

  const filtered = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter)

  return (
    <PageTransition>
      <div ref={sectionRef}>
        <section className="section container" style={{ textAlign: 'center' }}>
          <h1 className="text-display-lg scroll-reveal" style={{ marginBottom: '16px' }}>
            Selected <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-body-lg text-muted scroll-reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
            A curated collection of digital experiences — each crafted with precision and purpose.
          </p>
        </section>

        <section className="container">
          <div className="filter-bar scroll-reveal">
            {filters.map(f => (
              <button
                key={f}
                className={`chip hover-target ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="projects-page-grid">
            {filtered.map((p, i) => (
              <div
                key={p.title}
                className="glass-panel project-page-card hover-target scroll-reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="project-page-card__image">
                  <div className="project-page-card__overlay" />
                  <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'var(--color-outline)', zIndex: 1 }}>
                    {p.icon}
                  </span>
                </div>
                <div className="project-page-card__body">
                  <h3 className="text-headline-md" style={{ fontSize: '22px', marginBottom: '8px' }}>{p.title}</h3>
                  <p className="text-body-md text-muted" style={{ marginBottom: '16px', flex: 1 }}>{p.desc}</p>
                  <div className="project-page-card__tech">
                    {p.tech.map(t => (
                      <span key={t} className="chip" style={{ fontSize: '11px', padding: '2px 8px' }}>{t}</span>
                    ))}
                  </div>
                  <div className="project-page-card__actions">
                    <a href={p.link} className="btn-primary hover-target" style={{ padding: '8px 20px', fontSize: '12px' }}>
                      View Project
                    </a>
                    <a href={p.source} className="btn-secondary hover-target" style={{ padding: '8px 20px', fontSize: '12px' }}>
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
