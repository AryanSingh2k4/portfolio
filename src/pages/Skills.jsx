import { useEffect, useRef, useState } from 'react'
import PageTransition from '../components/PageTransition'
import './Skills.css'

const categories = [
  {
    num: '01',
    title: 'Frontend Architecture',
    desc: 'Engineering accessible, responsive, and buttery-smooth user interfaces with strict type safety and sub-frame performance.',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript (ESNext)', level: 92 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Solid.js', level: 82 },
      { name: 'HTML5 & Modern CSS', level: 96 },
      { name: 'Framer Motion', level: 88 },
    ]
  },
  {
    num: '02',
    title: 'Backend & Distributed Systems',
    desc: 'Designing serverless endpoints, real-time protocols, database schemas, and peer-to-peer data transport pipelines.',
    skills: [
      { name: 'Node.js', level: 84 },
      { name: 'WebRTC (DataChannels)', level: 88 },
      { name: 'Supabase & PostgreSQL', level: 86 },
      { name: 'REST & GraphQL APIs', level: 88 },
      { name: 'Solidity & Smart Contracts', level: 76 },
      { name: 'Ethers.js / Web3.js', level: 76 },
    ]
  },
  {
    num: '03',
    title: 'Developer Tooling & Cloud',
    desc: 'Automating build pipelines, vulnerability discovery, continuous integration, and production Vercel infrastructure.',
    skills: [
      { name: 'Git & GitHub Workflows', level: 92 },
      { name: 'Vite & pnpm Monorepos', level: 88 },
      { name: 'Docker Containers', level: 78 },
      { name: 'Groq API & Llama-3', level: 88 },
      { name: 'Nuclei & Katana (Security)', level: 82 },
      { name: 'DNS & Domain Ops', level: 86 },
    ]
  },
  {
    num: '04',
    title: 'Product & Operations',
    desc: 'Translating business logic into config-driven systems, enterprise workflows, and high-conversion client platforms.',
    skills: [
      { name: 'Config-Driven Schema UIs', level: 90 },
      { name: 'E-commerce Workflow Automation', level: 88 },
      { name: 'SEO & Performance Optimization', level: 85 },
      { name: 'System Architecture Design', level: 86 },
      { name: 'Brand & Visual Direction', level: 82 },
    ]
  },
]

const stats = [
  { value: 14, suffix: '+', label: 'Projects Shipped' },
  { value: 2, suffix: '+', label: 'Years of Craft' },
  { value: 24, suffix: '+', label: 'Technologies Mastered' },
  { value: 100, suffix: '%', label: 'Curiosity & Ownership' },
]

const focusAreas = [
  {
    step: '01',
    title: 'Autonomous AI & State Machines',
    desc: 'Building intelligent workflows using high-speed LLM inference (Groq), AST self-healing analysis, and multi-stage agent state machines that solve real problems without hallucinations.'
  },
  {
    step: '02',
    title: 'Real-Time & P2P Networking',
    desc: 'Deploying direct browser-to-browser WebRTC DataChannels with 64KB binary chunking and zero cloud server dependencies for friction-free data transfers.'
  },
  {
    step: '03',
    title: 'Config-Driven Enterprise Frontends',
    desc: 'Developing schema-driven component engines within pnpm monorepos (Scale Orbit) that generate dozens of dynamic diagnostic business tools without repetitive code.'
  }
]

function AnimatedCounter({ target, suffix }) {
  const [val, setVal] = useState(0)
  const nodeRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const duration = 1800
        const startTime = performance.now()
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          setVal(Math.floor(easeOut * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        observer.unobserve(nodeRef.current)
      }
    }, { threshold: 0.3 })

    if (nodeRef.current) observer.observe(nodeRef.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={nodeRef}>
      {val}{suffix}
    </span>
  )
}

function SkillMeter({ name, level }) {
  return (
    <div className="skill-meter">
      <div className="skill-meter__meta">
        <span className="skill-meter__name">{name}</span>
        <span className="mono skill-meter__level">{level}%</span>
      </div>
      <div className="skill-meter__track">
        <div className="skill-meter__fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <PageTransition>
      <div className="skills-page">
        {/* Page Header */}
        <header className="skills-header">
          <div className="w">
            <div className="meta mono" style={{ marginBottom: '24px' }}>
              <span>(02) Capabilities & Stack</span>
              <span>Full-Stack & Systems</span>
              <span>Navi Mumbai, India</span>
            </div>
            <h1 className="skills-title">
              Tools of the <span className="it">craft</span>.
            </h1>
            <p className="skills-subtitle">
              A comprehensive breakdown of engineering disciplines, frameworks, protocols, and architectural paradigms I deploy to design, build, and scale digital products.
            </p>

            {/* Giant Stat Counters */}
            <div className="skills-stats-grid">
              {stats.map((s) => (
                <div key={s.label} className="skills-stat-card">
                  <div className="big">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mono" style={{ opacity: 0.75, marginTop: '8px' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Categorized Matrix Section */}
        <section className="skills-matrix-section">
          <div className="w">
            <div className="section-hd">
              <div>
                <div className="mono" style={{ color: 'var(--o)', marginBottom: '8px' }}>(Disciplines)</div>
                <h2 className="section-title">
                  Core <span className="it">competencies</span>.
                </h2>
              </div>
              <span className="mono" style={{ opacity: 0.65 }}>Hover tags for quick inspection</span>
            </div>

            <div className="skills-domains-grid">
              {categories.map((cat) => (
                <div key={cat.title} className="domain-card">
                  <div className="domain-card__header">
                    <span className="mono" style={{ color: 'var(--o)' }}>{cat.num}</span>
                    <h3 className="domain-card__title">{cat.title}</h3>
                  </div>
                  <p className="domain-card__desc">{cat.desc}</p>
                  
                  {/* Skill Chips */}
                  <div className="domain-card__chips">
                    {cat.skills.map(s => (
                      <span key={s.name} className="chip hover-target">
                        {s.name}
                      </span>
                    ))}
                  </div>

                  {/* Meters */}
                  <div className="domain-card__meters">
                    {cat.skills.map(s => (
                      <SkillMeter key={s.name} name={s.name} level={s.level} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engineering Philosophy / Architecture Focus */}
        <section className="dark-section" style={{ padding: '120px 0' }}>
          <div className="w">
            <div className="section-hd">
              <div>
                <div className="mono" style={{ color: 'var(--o)', marginBottom: '8px' }}>(03) Architectural Focus</div>
                <h2 className="section-title" style={{ color: '#F0ECE2' }}>
                  Engineering <span className="it">depth</span>.
                </h2>
              </div>
              <span className="mono" style={{ color: '#F0ECE2', opacity: 0.7 }}>Beyond Frameworks</span>
            </div>

            <div className="trk" aria-hidden="true" />

            <div className="cols" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {focusAreas.map(f => (
                <div key={f.step} className="sc">
                  <div className="nu">{f.step}</div>
                  <h3 style={{ color: '#F0ECE2' }}>{f.title}</h3>
                  <p style={{ color: '#F0ECE2', opacity: 0.85 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
