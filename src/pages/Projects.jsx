import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import './Projects.css'

const allProjects = [
  { title: 'Sentinel', desc: 'Autonomous cybersecurity platform running agentic reconnaissance, exploit simulation, and AI-driven validation triage using state machines.', tech: ['Next.js', 'Nuclei', 'Katana', 'BullMQ', 'Supabase'], icon: 'security', category: 'AI & Web3', link: 'https://sentinel-pentesting.vercel.app/?v=1', source: 'https://github.com/AryanSingh2k4/sentinel' },
  { title: 'CareFlow', desc: 'AI-powered receptionist platform featuring appointment scheduling, authentication, and intelligent customer interactions.', tech: ['Next.js', 'React', 'Groq API', 'Supabase'], icon: 'smart_toy', category: 'Web Apps', link: 'https://med-careflow.vercel.app/', source: 'https://github.com/aryansingh81167/careflow' },
  { title: 'CodeBot', desc: 'Open-source ChatGPT alternative with real-time streaming responses, chat persistence, and Markdown support.', tech: ['React', 'TypeScript', 'Vite', 'Groq API'], icon: 'chat', category: 'AI & Web3', link: 'https://the-code-bot.vercel.app/', source: 'https://github.com/AryanSingh2k4/CodeBot' },
  { title: 'NFTicketing', desc: 'A decentralized NFT event ticketing platform using ERC721 smart contracts and Ethereum (Sepolia).', tech: ['Solidity', 'React', 'Ethers.js', 'MetaMask'], icon: 'confirmation_number', category: 'AI & Web3', link: 'https://nftticketing.vercel.app/', source: 'https://github.com/AryanSingh2k4/NFTicketing' },
  { title: 'Eynexa Pharma Corporate Website', desc: 'Corporate digital platform designed to improve pharmaceutical client conversion rates, establish professional brand guidelines, and optimize search discoverability.', tech: ['Web Development', 'SEO', 'Brand Design'], icon: 'medical_services', category: 'Web Apps', link: 'https://eynexapharma.vercel.app/', source: null },
]

const timeline = [
  { 
    year: 'Dec. 2025 — Present', 
    role: 'Freelance Full-Stack Developer', 
    company: 'Independent Client', 
    desc: 'Contributed to a custom responsive e-commerce platform and built dynamic frontend components.',
    details: [
      'Engineered highly responsive modular components using React and Tailwind CSS.',
      'Optimized page loads by 40% using code splitting and modern asset compression.',
      'Collaborated closely with clients to translate business goals into clean interactive UI.'
    ],
    tech: ['React', 'Tailwind CSS', 'Vite', 'Git']
  },
  { 
    year: 'May 2026 — June 2026', 
    role: 'Technical Operations Management Intern', 
    company: 'Eynexa Pharma', 
    desc: 'Engineered corporate website, spearheaded brand identity, and managed technical setup.',
    link: 'https://eynexapharma.vercel.app/',
    details: [
      'Designed and deployed the corporate website improving client conversion rates.',
      'Led the creation of brand guidelines and modern identity design.',
      'Established streamlined deployment workflows for company websites.'
    ],
    tech: ['Web Development', 'SEO', 'Brand Design']
  },
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
                    style={{ cursor: 'pointer' }}
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
