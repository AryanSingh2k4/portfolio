import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import './Projects.css'

const allProjects = [
  { title: 'Sentinel', desc: 'Autonomous cybersecurity platform with a 5-stage agent state machine, 800+ TruffleHog rules, and AST-based self-healing auto-patcher.', tech: ['Next.js', 'Nuclei', 'Katana', 'Supabase'], icon: 'security', category: 'AI & Web3', link: 'https://sentinel-pentesting.vercel.app/?v=1', source: 'https://github.com/AryanSingh2k4/sentinel' },
  { title: 'Dropline', desc: 'Serverless P2P file sharing platform using WebRTC DataChannels with 64KB chunked binary streaming and zero cloud storage.', tech: ['Next.js', 'WebRTC', 'TypeScript', 'Supabase'], icon: 'folder_shared', category: 'Web Apps', link: 'https://droplinegg.vercel.app/', source: 'https://github.com/AryanSingh2k4/drop-line' },
  { title: 'CareFlow', desc: 'AI medical receptionist built with Next.js, Groq Llama 3.1 API (sub-400ms latency), and Supabase RLS for patient data isolation.', tech: ['Next.js', 'Groq API', 'Supabase', 'Tailwind CSS'], icon: 'smart_toy', category: 'Web Apps', link: 'https://med-careflow.vercel.app/', source: 'https://github.com/aryansingh81167/careflow' },
  { title: 'CodeBot', desc: 'Open-source ChatGPT alternative with real-time streaming responses, chat persistence, and Markdown support.', tech: ['React', 'TypeScript', 'Vite', 'Groq API'], icon: 'chat', category: 'AI & Web3', link: 'https://the-code-bot.vercel.app/', source: 'https://github.com/AryanSingh2k4/CodeBot' },
  { title: 'NFTicketing', desc: 'A decentralized NFT event ticketing platform using ERC721 smart contracts and Ethereum (Sepolia).', tech: ['Solidity', 'React', 'Ethers.js', 'MetaMask'], icon: 'confirmation_number', category: 'AI & Web3', link: 'https://nftticketing.vercel.app/', source: 'https://github.com/AryanSingh2k4/NFTicketing' },
  { title: 'Eynexa Pharma Corporate Website', desc: 'Corporate digital platform designed to improve pharmaceutical client conversion rates, establish professional brand guidelines, and optimize search discoverability.', tech: ['Web Development', 'SEO', 'Brand Design'], icon: 'medical_services', category: 'Web Apps', link: 'https://eynexapharma.com/', source: null },
]
const timeline = [
  { 
    year: 'Aug. 2026 — Present', 
    role: 'Technical and Digital Operations Intern', 
    company: 'Purplotus Consultancy', 
    desc: 'Working on Scale Orbit, an AI-assisted People Systems platform automating organizational workflows.',
    details: [
      'Engineered frontend modules for Scale Orbit, an AI-assisted People Systems platform that automates organizational workflows and HR diagnostic toolkits.',
      'Built a config-driven schema engine to dynamically generate 18+ business tools without hardcoded templates.',
      'Implemented modular configuration packages across diagnostic, psychometric, and HR tools within a pnpm monorepo.'
    ],
    tech: ['Solid.js', 'TypeScript', 'Tailwind CSS', 'pnpm']
  },
  { 
    year: 'Nov. 2025 — Present', 
    role: 'Technical Operations Lead (Part-Time)', 
    company: 'Phasecor Healthcare', 
    desc: 'Managing corporate platforms, e-commerce automation, and technical infrastructure.',
    details: [
      'Develop and maintain corporate and e-commerce platforms on Vercel using Next.js, sustaining 99.99% uptime and under 1.5s load times.',
      'Automate e-commerce workflows and product enquiry pipelines, reducing manual processing by 70%.',
      'Manage daily technical operations, domain DNS, corporate email infrastructure, and e-commerce operations.'
    ],
    tech: ['Next.js', 'Vercel', 'E-commerce', 'Automation', 'DNS']
  },
  { 
    year: 'Oct. 2025 — Present', 
    role: 'Freelance Developer', 
    company: 'Freelance', 
    desc: 'Engineering responsive corporate websites, brand identities, and modern web applications.',
    link: 'https://aryan-singh.me',
    details: [
      'Engineer responsive corporate websites and web applications tailored to diverse client specifications.',
      'Develop modern full-stack web applications using Next.js and Tailwind CSS with modular architectures.',
      'Spearheaded brand guidelines, deployment workflows, and client conversion design for corporate platforms like Eynexa Pharma.'
    ],
    tech: ['Next.js', 'Tailwind CSS', 'React', 'SEO', 'Brand Design']
  }
]

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [activeNodes, setActiveNodes] = useState({})
  const sectionRef = useScrollReveal()
  const timelineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  })

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }



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
          <div className="projects-page-grid">
            {allProjects.map((p, i) => (
              <div
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
                <h3 className="text-headline-md" style={{ fontSize: '22px', marginBottom: '8px' }}>{p.title}</h3>
                <p className="text-body-md text-muted" style={{ marginBottom: '16px', flex: 1 }}>{p.desc}</p>
                <div className="project-page-card__tech">
                  {p.tech.map(t => (
                    <span key={t} className="chip" style={{ fontSize: '11px', padding: '2px 8px' }}>{t}</span>
                  ))}
                </div>
                <div className="project-page-card__actions">
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary hover-target" style={{ padding: '8px 20px', fontSize: '12px' }}>
                      View Project
                    </a>
                  )}
                  {p.source && (
                    <a href={p.source} target="_blank" rel="noopener noreferrer" className="btn-secondary hover-target" style={{ padding: '8px 20px', fontSize: '12px' }}>
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="section container" ref={timelineRef}>
          <h2 className="text-headline-lg text-cyan scroll-reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Professional Experience
          </h2>
          <div className="timeline">
            {/* Scroll progress laser line */}
            <div className="timeline__line-container">
              <div className="timeline__line-base" />
              <motion.div 
                className="timeline__line-progress" 
                style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              />
            </div>

            {timeline.map((item, i) => (
              <div 
                key={i} 
                className={`timeline__item scroll-reveal ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Viewport Node Dot */}
                <motion.div 
                  className={`timeline__node ${activeNodes[i] ? 'timeline__node--active' : ''}`}
                  onViewportEnter={() => setActiveNodes(prev => ({ ...prev, [i]: true }))}
                  onViewportLeave={() => setActiveNodes(prev => ({ ...prev, [i]: false }))}
                  viewport={{ amount: 0.8 }}
                >
                  <div className="timeline__dot" />
                </motion.div>

                {/* Card Wrapper */}
                <div className="timeline__content-wrapper">
                  <div 
                    className="timeline__content glass-panel hover-target"
                    onClick={() => toggleExpand(i)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <span className="text-label-code text-cyan">{item.year}</span>
                      <span className="text-label-code text-violet" style={{ fontSize: '12px' }}>{item.company}</span>
                    </div>
                    <h3 className="text-headline-md" style={{ fontSize: '20px', margin: '8px 0 4px' }}>{item.role}</h3>
                    <p className="text-body-md text-muted" style={{ margin: 0 }}>{item.desc}</p>
                    
                    <AnimatePresence>
                      {expandedIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ marginTop: '16px', borderTop: '1px solid rgba(150, 142, 154, 0.15)', paddingTop: '16px' }}>
                            <ul style={{ paddingLeft: '16px', color: 'var(--color-on-surface-variant)', fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>
                              {item.details.map((detail, idx) => (
                                <li key={idx} style={{ marginBottom: '8px' }}>{detail}</li>
                              ))}
                            </ul>
                            {item.link && (
                              <div style={{ marginBottom: '16px' }}>
                                <a 
                                  href={item.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="btn-primary hover-target" 
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '12px', textDecoration: 'none' }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>language</span>
                                  Visit Website
                                </a>
                              </div>
                            )}
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              {item.tech.map(t => (
                                <span key={t} className="chip" style={{ fontSize: '11px', padding: '2px 8px' }}>{t}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--color-cyan)', opacity: 0.8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {expandedIndex === i ? 'Click to collapse ▲' : 'Click to expand details ▼'}
                    </div>
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
