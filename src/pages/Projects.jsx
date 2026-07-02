import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import TiltCard from '../components/TiltCard'
import { useScrollReveal } from '../hooks/useAnimations'
import './Projects.css'

const filters = ['All', 'Web Apps', 'AI & Web3']

const allProjects = [
  { title: 'CareFlow', desc: 'AI-powered receptionist platform featuring appointment scheduling, authentication, and intelligent customer interactions.', tech: ['Next.js', 'React', 'Groq API', 'Supabase'], icon: 'smart_toy', category: 'Web Apps', link: 'https://med-careflow.vercel.app/', source: 'https://github.com/AryanSingh2k4' },
  { title: 'CodeBot', desc: 'Open-source ChatGPT alternative with real-time streaming responses, chat persistence, and Markdown support.', tech: ['React', 'TypeScript', 'Vite', 'Groq API'], icon: 'chat', category: 'AI & Web3', link: 'https://the-code-bot.vercel.app/', source: 'https://github.com/AryanSingh2k4' },
  { title: 'NFTicketing', desc: 'A decentralized NFT event ticketing platform using ERC721 smart contracts and Ethereum (Sepolia).', tech: ['Solidity', 'React', 'Ethers.js', 'MetaMask'], icon: 'confirmation_number', category: 'AI & Web3', link: 'https://nftticketing.vercel.app/', source: 'https://github.com/AryanSingh2k4' },
]

const timeline = [
  { year: 'Dec. 2025 — Present', role: 'Freelance Full-Stack Developer', company: 'Independent Client', desc: 'Contributed to a custom responsive e-commerce platform and built dynamic frontend components.' },
  { year: 'May 2026 — June 2026', role: 'Technical Operations Management Intern', company: 'Eynexa Pharma', desc: 'Engineered corporate website, spearheaded brand identity, and managed technical setup.' },
  { year: 'Dec. 2024 — Apr. 2025', role: 'Administrative Assistant', company: 'Excellent Tutorials', desc: 'Managed daily operations and coordinated examination logistics.' },
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
            Work & <span className="gradient-text">Experience</span>
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
              <TiltCard
                key={p.title}
                className="glass-panel project-page-card hover-target scroll-reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="project-page-card__image">
                  <div className="project-page-card__overlay" />
                  {p.link ? (
                    <img 
                      src={`https://api.microlink.io/?url=${encodeURIComponent(p.link)}&screenshot=true&meta=false&embed=screenshot.url`} 
                      alt={p.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'var(--color-outline)', zIndex: 1 }}>
                      {p.icon}
                    </span>
                  )}
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
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="section container" style={{ paddingTop: 0 }}>
          <h2 className="text-headline-lg text-cyan scroll-reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Professional Experience
          </h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline__item scroll-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="timeline__line">
                  <div className="timeline__dot" />
                </div>
                <div className="timeline__content glass-panel hover-target">
                  <span className="text-label-code text-cyan">{item.year}</span>
                  <h3 className="text-headline-md" style={{ fontSize: '20px', margin: '8px 0 4px' }}>{item.role}</h3>
                  <p className="text-label-code text-violet" style={{ marginBottom: '12px' }}>{item.company}</p>
                  <p className="text-body-md text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
