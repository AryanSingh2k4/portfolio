import { useEffect, useRef, useState } from 'react'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import './Skills.css'

const categories = [
  {
    title: 'Frontend',
    icon: 'web',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML5/CSS3', level: 95 },
    ]
  },
  {
    title: 'Backend & Web3',
    icon: 'dns',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Solidity', level: 75 },
      { name: 'Supabase', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'Ethers.js', level: 75 },
      { name: 'REST APIs', level: 85 },
    ]
  },
  {
    title: 'Tools & APIs',
    icon: 'build',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Vite', level: 85 },
      { name: 'Groq API', level: 85 },
      { name: 'SEO', level: 80 },
    ]
  },
  {
    title: 'Design & Operations',
    icon: 'palette',
    skills: [
      { name: 'Visual Design', level: 80 },
      { name: 'Brand Identity', level: 75 },
      { name: 'Canva', level: 80 },
      { name: 'Workflow Optimization', level: 85 },
    ]
  },
]

const stats = [
  { value: 12, suffix: '+', label: 'Projects' },
  { value: 2, suffix: '+', label: 'Years' },
  { value: categories.reduce((acc, cat) => acc + cat.skills.length, 0), suffix: '+', label: 'Technologies' },
  { value: 22, suffix: 'K+', label: 'Lines of Code' },
]

const learning = [
  { title: 'AI-Powered Applications', desc: 'Building intelligent applications with LLMs and prompt engineering.' },
  { title: 'Full-Stack Ecosystems', desc: 'Deep diving into React, Next.js, and scalable system design.' },
  { title: 'Cyber Security & Blockchain', desc: 'Exploring secure software architecture and Web3 technologies.' },
]

function AnimatedNumber({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0
        const duration = 2000
        const startTime = Date.now()
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * value))
          if (progress < 1) requestAnimationFrame(animate)
        }
        animate()
        observer.unobserve(ref.current)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count}{suffix}</span>
}

function SkillBar({ name, level }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => setWidth(level), 200)
        observer.unobserve(ref.current)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [level])

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar__header">
        <span className="text-label-code">{name}</span>
        <span className="text-label-code text-cyan">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useScrollReveal()

  return (
    <PageTransition>
      <div ref={sectionRef}>
        <section className="section container" style={{ textAlign: 'center' }}>
          <h1 className="text-display-lg scroll-reveal" style={{ marginBottom: '16px' }}>
            Tech <span className="gradient-text">Arsenal</span>
          </h1>
          <p className="text-body-lg text-muted scroll-reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Tools & technologies I wield to build the future of the web.
          </p>
        </section>

        {/* Stats */}
        <section className="container">
          <div className="stats-grid scroll-reveal">
            {stats.map(s => (
              <div key={s.label} className="stat-card glass-panel hover-target">
                <div className="stat-card__value text-display-lg text-cyan">
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </div>
                <div className="stat-card__label text-label-code text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Categories */}
        <section className="section container">
          <div className="skills-categories-grid">
            {categories.map((cat, i) => (
              <div key={cat.title} className="glass-panel skills-category scroll-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="skills-category__header">
                  <span className="material-symbols-outlined text-cyan" style={{ fontSize: '28px' }}>{cat.icon}</span>
                  <h3 className="text-headline-md" style={{ fontSize: '20px' }}>{cat.title}</h3>
                </div>
                <div className="skills-category__bars">
                  {cat.skills.map(s => (
                    <SkillBar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Currently Learning */}
        <section className="section container">
          <h2 className="text-headline-lg text-cyan scroll-reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            Currently Learning
          </h2>
          <div className="learning-grid">
            {learning.map((item, i) => (
              <div key={item.title} className="glass-panel learning-card hover-target scroll-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <h4 className="text-headline-md" style={{ fontSize: '18px', marginBottom: '8px' }}>{item.title}</h4>
                <p className="text-body-md text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
