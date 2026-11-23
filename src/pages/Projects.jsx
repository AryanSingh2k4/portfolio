import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import './Projects.css'

const allProjects = [
  { title: 'Sentinel', desc: 'Autonomous security scanner with 5-stage agent state machine, 800+ TruffleHog rules, and AST-based self-healing auto-patcher.', tech: ['Next.js', 'Nuclei', 'Katana', 'Supabase'], icon: 'security', category: 'AI & Web3', link: 'https://sentinel-pentesting.vercel.app/?v=1', source: 'https://github.com/AryanSingh2k4/sentinel' },
  { title: 'ScrutiniX', desc: 'Regulatory document verification and forensic fraud detection engine with Error Level Analysis and SHA-256 sealing for AICTE.', tech: ['Next.js', 'TypeScript', 'OpenCV', 'Gemini API'], icon: 'verified_user', category: 'AI & Web3', link: 'https://scrutinix.vercel.app', source: 'https://github.com/AryanSingh2k4/AICTE-Scrutiny-Dashboard' },
  { title: 'JobSeeker', desc: 'Local-first, privacy-respecting job application desktop app built with Rust, Python FastAPI sidecar, and Typst.', tech: ['Rust', 'Tauri 2', 'Python', 'FastAPI', 'Typst'], icon: 'terminal', category: 'Web Apps', link: 'https://job-seeker-three-flax.vercel.app', source: 'https://github.com/AryanSingh2k4/Job-Seeker' },
  { title: 'Dropline', desc: 'Serverless P2P file sharing platform using WebRTC DataChannels with 64KB chunked binary streaming and zero cloud storage.', tech: ['Next.js', 'WebRTC', 'TypeScript', 'Supabase'], icon: 'folder_shared', category: 'Web Apps', link: 'https://droplinegg.vercel.app/', source: 'https://github.com/AryanSingh2k4/drop-line' },
  { title: 'NexusSecure', desc: 'Collaborative attack-defense threat intelligence mesh for independent websites broadcasting real-time blocklists via SSE.', tech: ['TypeScript', 'Node.js', 'Supabase', 'SSE'], icon: 'hub', category: 'AI & Web3', link: 'https://nexus-secure-admin-dashboard.vercel.app', source: 'https://github.com/AryanSingh2k4/NexusSecure' },
  { title: 'CareFlow', desc: 'AI medical receptionist that handles conversational patient intake, automated appointment booking, and clinic triage.', tech: ['Next.js', 'Groq API', 'Supabase', 'Tailwind CSS'], icon: 'smart_toy', category: 'Web Apps', link: 'https://med-careflow.vercel.app/', source: 'https://github.com/aryansingh81167/careflow' },
  { title: 'Sahayata', desc: 'National Disaster Victim Tracing & Rescue Intelligence System with ticket OCR auto-intake and biometric face recognition.', tech: ['Next.js', 'TypeScript', 'Face Recognition', 'OCR'], icon: 'emergency', category: 'AI & Web3', link: 'https://sahayata-eight.vercel.app', source: 'https://github.com/AryanSingh2k4/sahayata' },
  { title: 'CodeMorph', desc: 'Autonomous code migration and refactoring platform parsing ASTs, previewing diffs, and dispatching GitHub PRs.', tech: ['Next.js', 'TypeScript', 'Babel AST', 'Octokit'], icon: 'transform', category: 'Web Apps', link: 'https://code-morph-snowy.vercel.app', source: 'https://github.com/AryanSingh2k4/CodeMorph' },
  { title: 'CodeBot', desc: 'Open-source AI coding assistant with real-time streaming responses, persistent chats, and Markdown support.', tech: ['React', 'TypeScript', 'Vite', 'Groq API'], icon: 'chat', category: 'AI & Web3', link: 'https://the-code-bot.vercel.app/', source: 'https://github.com/AryanSingh2k4/CodeBot' },
  { title: 'LUMIÈRE', desc: 'Luxury fine-dining reservation and VIP membership platform featuring an AI Virtual Maître d\' for curated dining.', tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI Concierge'], icon: 'restaurant', category: 'Web Apps', link: 'https://ai-restaurant-reservation.vercel.app', source: 'https://github.com/AryanSingh2k4/restaurant-reservation-ai' },
  { title: 'Drift', desc: 'Ultra-lightweight rootless Android autoscroll utility in Kotlin with floating overlay, spring physics, and keyboard auto-pause.', tech: ['Kotlin', 'Android SDK', 'AccessibilityService'], icon: 'android', category: 'Web Apps', link: null, source: 'https://github.com/AryanSingh2k4/drift' },
  { title: 'StudyQuest', desc: 'Local-first Windows desktop study tracker and gamified productivity suite with XP leveling, subject streaks, and timer overlay.', tech: ['Electron', 'JavaScript', 'Node.js', 'Local Storage'], icon: 'timer', category: 'Web Apps', link: null, source: 'https://github.com/AryanSingh2k4/Study-Quest' },
  { title: 'NFTicketing', desc: 'Decentralized ticketing app that mints tickets as NFTs to prevent scalping and verify event access.', tech: ['Solidity', 'React', 'Ethers.js', 'MetaMask'], icon: 'confirmation_number', category: 'AI & Web3', link: 'https://nftticketing.vercel.app/', source: 'https://github.com/AryanSingh2k4/NFTicketing' },
  { title: 'PixelFinds', desc: 'Editorial tech gadget discovery and recommendation hub with static site generation for sub-second page loads.', tech: ['Next.js', 'TypeScript', 'Markdown', 'Tailwind CSS'], icon: 'devices', category: 'Web Apps', link: 'https://pixelfinds.vercel.app', source: 'https://github.com/AryanSingh2k4/PixelFinds' },
  { title: 'Eynexa Pharma Corporate Website', desc: 'Corporate platform and brand identity built for a pharmaceutical company to showcase products and drive leads.', tech: ['Web Development', 'SEO', 'Brand Design'], icon: 'medical_services', category: 'Web Apps', link: 'https://eynexapharma.com/', source: null },
  { title: 'Phasecor Healthcare Corporate Website', desc: 'Corporate pharmaceutical platform and therapeutic formulation catalog engineered with Next.js and Tailwind CSS, featuring automated product enquiry pipelines, sub-1.5s load times, and 99.99% uptime.', tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'], icon: 'medical_services', category: 'Web Apps', link: 'https://healthcare.phasecor.com', source: 'https://github.com/aryansingh2k04/Phasecor_Healthcare' },
]

const timeline = [
  { 
    year: 'Nov. 2025 — Present', 
    role: 'Technical Operations Lead (Part-Time)', 
    company: 'Phasecor Healthcare', 
    desc: 'Managing corporate platforms, e-commerce automation, and technical infrastructure.',
    link: 'https://healthcare.phasecor.com',
    details: [
      'Develop and maintain corporate and e-commerce platforms on Vercel using Next.js, sustaining 99.99% uptime and under 1.5s load times.',
      'Automate e-commerce workflows and product enquiry pipelines, reducing manual processing by 70%.',
      'Manage daily technical operations, domain DNS, corporate email infrastructure, and e-commerce operations.'
    ],
    tech: ['Next.js', 'Vercel', 'E-commerce', 'Automation', 'DNS']
  },
  { 
    year: 'Aug. 2026 — Oct. 2026', 
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
                <h3 className="text-headline-md project-page-card__title">{p.title}</h3>
                <p className="text-body-md text-muted project-page-card__desc">{p.desc}</p>
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
