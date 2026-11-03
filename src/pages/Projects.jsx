import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import './Projects.css'

const allProjects = [
  {
    num: '01',
    title: 'Sentinel',
    type: 'Autonomous AI Cybersecurity Platform',
    desc: 'Autonomous cybersecurity platform with a 5-stage agent state machine, 800+ TruffleHog rules, and AST-based self-healing auto-patcher that maps attack surfaces, flags vulnerabilities, and simulates exploits.',
    tech: ['Next.js', 'Nuclei', 'Katana', 'Supabase', 'TypeScript'],
    year: '2026',
    category: 'AI & Systems',
    link: 'https://sentinel-pentesting.vercel.app/?v=1',
    source: 'https://github.com/AryanSingh2k4/sentinel'
  },
  {
    num: '02',
    title: 'Dropline',
    type: 'Serverless P2P Streaming Engine',
    desc: 'Serverless peer-to-peer file sharing platform using WebRTC DataChannels with 64KB chunked binary streaming, end-to-end direct client transfers, and zero cloud storage bottlenecks.',
    tech: ['Next.js', 'WebRTC', 'TypeScript', 'Supabase', 'Tailwind'],
    year: '2025',
    category: 'Web Apps',
    link: 'https://droplinegg.vercel.app/',
    source: 'https://github.com/AryanSingh2k4/drop-line'
  },
  {
    num: '03',
    title: 'CareFlow',
    type: 'Clinical Workflow & AI Triage',
    desc: 'AI medical receptionist and practice management platform handling conversational patient intake, automated appointment triage, and clinic management with sub-second response times.',
    tech: ['Next.js', 'Groq API', 'Supabase', 'Tailwind CSS', 'TypeScript'],
    year: '2025',
    category: 'AI & Systems',
    link: 'https://med-careflow.vercel.app/',
    source: 'https://github.com/aryansingh81167/careflow'
  },
  {
    num: '04',
    title: 'CodeBot',
    type: 'Real-Time AI Code Assistant',
    desc: 'Open-source AI coding assistant featuring ultra-low latency token streaming, persistent syntax-highlighted sessions, AST code analysis, and Markdown rendering powered by Groq Llama 3.',
    tech: ['React', 'TypeScript', 'Vite', 'Groq API', 'Tailwind CSS'],
    year: '2025',
    category: 'AI & Systems',
    link: 'https://the-code-bot.vercel.app/',
    source: 'https://github.com/AryanSingh2k4/CodeBot'
  },
  {
    num: '05',
    title: 'NFTicketing',
    type: 'Decentralized Smart Contract Ticketing',
    desc: 'Decentralized event ticketing protocol minting verifiable ERC-721 tokens directly to attendee wallets to eliminate counterfeit tickets, secondary market gouging, and unauthorized scalping.',
    tech: ['Solidity', 'React', 'Ethers.js', 'MetaMask', 'Web3'],
    year: '2025',
    category: 'Web3',
    link: 'https://nftticketing.vercel.app/',
    source: 'https://github.com/AryanSingh2k4/NFTicketing'
  },
  {
    num: '06',
    title: 'Eynexa Pharma Corporate Website',
    type: 'Corporate Healthcare Brand Platform',
    desc: 'Corporate pharmaceutical platform and brand identity built for global distribution, showcasing therapeutic formulations with automated distributor inquiries and high-converting performance architecture.',
    tech: ['Next.js', 'SEO', 'Brand Design', 'Tailwind CSS'],
    year: '2025',
    category: 'Corporate',
    link: 'https://eynexapharma.com/',
    source: null
  },
  {
    num: '07',
    title: 'Phasecor Healthcare Corporate Website',
    type: 'Pharmaceutical Platform & Catalog',
    desc: 'Corporate pharmaceutical platform and therapeutic formulation catalog engineered with Next.js and Tailwind CSS, featuring automated product enquiry pipelines, sub-1.5s load times, and 99.99% uptime.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    year: '2025',
    category: 'Corporate',
    link: 'https://healthcare.phasecor.com',
    source: 'https://github.com/aryansingh2k04/Phasecor_Healthcare'
  }
]

const categories = ['All', 'AI & Systems', 'Web Apps', 'Web3', 'Corporate']

const timeline = [
  { 
    year: 'Nov. 2025 — Present', 
    role: 'Technical Operations Lead (Part-Time)', 
    company: 'Phasecor Healthcare', 
    desc: 'Managing corporate platforms, e-commerce automation, and technical infrastructure with high reliability.',
    link: 'https://healthcare.phasecor.com',
    details: [
      'Architect and maintain corporate platforms on Vercel using Next.js, sustaining 99.99% uptime and sub-1.5s real-world load times.',
      'Automated product enquiry pipelines and e-commerce workflows, reducing manual order triage by 70%.',
      'Manage daily technical operations, domain DNS routing, corporate email infrastructure, and digital security.'
    ],
    tech: ['Next.js', 'Vercel', 'E-commerce', 'Automation', 'DNS']
  },
  { 
    year: 'Aug. 2026 — Oct. 2026', 
    role: 'Technical & Digital Operations Intern', 
    company: 'Purplotus Consultancy', 
    desc: 'Working on Scale Orbit, an AI-assisted People Systems platform automating organizational workflows and HR diagnostic suites.',
    details: [
      'Engineered core frontend modules for Scale Orbit, an enterprise People Systems platform automating organizational diagnostic workflows.',
      'Architected a config-driven schema engine dynamically generating 18+ business tools without hardcoded templates.',
      'Implemented modular configuration packages across diagnostic, psychometric, and HR tools within a unified pnpm monorepo.'
    ],
    tech: ['Solid.js', 'TypeScript', 'Tailwind CSS', 'pnpm', 'Monorepo']
  },
  { 
    year: 'Oct. 2025 — Present', 
    role: 'Freelance Software Engineer', 
    company: 'Independent Practice', 
    desc: 'Engineering high-performance corporate platforms, brand identities, and bespoke full-stack applications.',
    link: 'https://aryan-singh.me',
    details: [
      'Engineer custom corporate websites and web applications tailored to demanding client specifications.',
      'Deliver clean, full-stack Next.js and React architectures with meticulous attention to typography and performance.',
      'Led technical strategy, deployment pipelines, and brand conversions for corporate clients like Eynexa Pharma.'
    ],
    tech: ['Next.js', 'Tailwind CSS', 'React', 'SEO', 'Brand Strategy']
  }
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedIndex, setExpandedIndex] = useState(null)
  const timelineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  })

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <PageTransition>
      <div className="work-page">
        {/* Editorial Work Header */}
        <header className="work-header">
          <div className="w">
            <div className="meta mono" style={{ marginBottom: '24px' }}>
              <span>(01) Selected Work</span>
              <span>7 Projects Shipped</span>
              <span>2024 — 2026</span>
            </div>
            <h1 className="work-title">
              Work that <span className="it">moves</span> people.
            </h1>
            <p className="work-subtitle">
              Autonomous AI security platforms, serverless P2P WebRTC engines, clinical automation systems, and high-performance corporate platforms. Built with precision, tested under real load, and shipped to production.
            </p>

            {/* Filter Chips */}
            <div className="filter-chips">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`chip hover-target ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Work Grid */}
        <section className="work-grid-section">
          <div className="w">
            <div className="projects-grid">
              {filteredProjects.map((p) => (
                <article key={p.title} className="project-card">
                  <div className="project-card__header">
                    <span className="mono" style={{ color: 'var(--o)' }}>{p.num} — {p.type}</span>
                    <span className="mono" style={{ opacity: 0.6 }}>{p.year}</span>
                  </div>

                  <div className="project-card__image">
                    {p.link ? (
                      <img 
                        src={`https://api.microlink.io/?url=${encodeURIComponent(p.link)}&screenshot=true&meta=false&embed=screenshot.url`} 
                        alt={p.title} 
                        loading="lazy"
                      />
                    ) : (
                      <div className="project-card__placeholder">
                        <span className="mono">{p.title}</span>
                      </div>
                    )}
                  </div>

                  <h2 className="project-card__title">{p.title}</h2>
                  
                  <p className="project-card__desc">
                    {p.desc}
                  </p>

                  <div className="project-card__tags">
                    {p.tech.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>

                  <div className="project-card__actions">
                    {p.link && (
                      <a 
                        href={p.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn hover-target"
                        style={{ padding: '10px 22px', fontSize: '13px' }}
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {p.source && (
                      <a 
                        href={p.source} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary hover-target"
                        style={{ padding: '9px 18px', fontSize: '13px' }}
                      >
                        Source Code ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Signature Interactive Editorial Row Archive */}
        <section className="work-archive-section">
          <div className="w">
            <div className="section-hd">
              <div>
                <div className="mono" style={{ color: 'var(--o)', marginBottom: '8px' }}>(Archive)</div>
                <h2 className="section-title">
                  Interactive <span className="it">Index</span>.
                </h2>
              </div>
              <span className="mono" style={{ opacity: 0.65 }}>Hover rows for quick preview</span>
            </div>

            <div className="archive-rows">
              {allProjects.map((p) => (
                <a 
                  key={p.num} 
                  href={p.link || p.source || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="row hover-target"
                >
                  <span className="mono">{p.num}</span>
                  <div className="sw">
                    <span className="t">{p.title}</span>
                    <span className="t it" style={{ color: 'var(--o)' }}>{p.type} ↗</span>
                  </div>
                  <span className="mono tgs">{p.tech.slice(0, 3).join(' • ')} · {p.year}</span>
                  <span className="ar" aria-hidden="true">↗</span>
                  <div className="pv">
                    {p.link ? (
                      <img 
                        src={`https://api.microlink.io/?url=${encodeURIComponent(p.link)}&screenshot=true&meta=false&embed=screenshot.url`} 
                        alt={p.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <i />
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="dark-section" ref={timelineRef} style={{ padding: '120px 0' }}>
          <div className="w">
            <div className="section-hd">
              <div>
                <div className="mono" style={{ color: 'var(--o)', marginBottom: '8px' }}>(02) Experience</div>
                <h2 className="section-title" style={{ color: '#F0ECE2' }}>
                  Where I’ve <span className="it">engineered</span>.
                </h2>
              </div>
              <span className="mono" style={{ color: '#F0ECE2', opacity: 0.7 }}>2025 — 2026</span>
            </div>

            <div className="trk" aria-hidden="true" />

            <div className="timeline-grid">
              {timeline.map((item, i) => (
                <div 
                  key={i} 
                  className="timeline-card hover-target"
                  onClick={() => toggleExpand(i)}
                >
                  <div className="timeline-card__header">
                    <span className="mono" style={{ color: 'var(--o)' }}>{item.year}</span>
                    <span className="mono" style={{ color: '#F0ECE2', opacity: 0.7 }}>{item.company}</span>
                  </div>

                  <h3 className="timeline-card__role">{item.role}</h3>
                  <p className="timeline-card__desc">{item.desc}</p>

                  <AnimatePresence>
                    {expandedIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="timeline-card__expanded">
                          <ul className="timeline-card__bullets">
                            {item.details.map((detail, idx) => (
                              <li key={idx}>{detail}</li>
                            ))}
                          </ul>
                          {item.link && (
                            <div style={{ marginTop: '16px' }}>
                              <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="ghost"
                                style={{ color: 'var(--o)' }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Visit Website ↗
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="timeline-card__footer">
                    <div className="timeline-card__tech">
                      {item.tech.map(t => (
                        <span key={t} className="tag" style={{ color: '#F0ECE2', borderColor: 'rgba(240,236,226,0.3)' }}>{t}</span>
                      ))}
                    </div>
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--o)' }}>
                      {expandedIndex === i ? 'Collapse ↑' : 'Read details ↓'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
