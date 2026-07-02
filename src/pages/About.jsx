import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import './About.css'

const timeline = [
  { year: 'Dec. 2025 — Present', role: 'Freelance Full-Stack Developer', company: 'Independent Client', desc: 'Contributed to a custom responsive e-commerce platform and built dynamic frontend components.' },
  { year: 'May 2026 — June 2026', role: 'Technical Operations Management Intern', company: 'Eynexa Pharma', desc: 'Engineered corporate website, spearheaded brand identity, and managed technical setup.' },
  { year: 'Dec. 2024 — Apr. 2025', role: 'Administrative Assistant', company: 'Excellent Tutorials', desc: 'Managed daily operations and coordinated examination logistics.' },
]

const philosophy = [
  { icon: 'speed', title: 'Performance First', desc: 'Every millisecond matters. I optimize for Core Web Vitals and deliver sub-second load times across every project.' },
  { icon: 'design_services', title: 'Design-Driven', desc: 'Beautiful interfaces aren\'t optional. I bridge design and engineering to create experiences that feel alive.' },
  { icon: 'code', title: 'Open Source', desc: 'I believe in giving back. Active contributor to the React ecosystem and maintainer of several open-source tools.' },
]

export default function About() {
  const sectionRef = useScrollReveal()

  return (
    <PageTransition>
      <div ref={sectionRef}>
        {/* Hero */}
        <section className="section container">
          <div className="about-hero">
            <div className="about-hero__avatar scroll-reveal">
              <div className="about-hero__avatar-frame glass-panel">
                <div className="about-hero__avatar-inner">
                  <span className="material-symbols-outlined" style={{ fontSize: '80px', color: 'var(--color-cyan)' }}>
                    person
                  </span>
                </div>
              </div>
            </div>
            <div className="about-hero__info scroll-reveal">
              <p className="text-label-code text-cyan" style={{ marginBottom: '8px' }}>// ABOUT ME</p>
              <h1 className="text-display-lg" style={{ marginBottom: '8px' }}>Aryan</h1>
              <p className="text-headline-md text-muted" style={{ fontSize: '20px', marginBottom: '24px' }}>
                Full Stack Developer & UI Architect
              </p>
              <p className="text-body-lg text-muted" style={{ marginBottom: '16px' }}>
                I'm a developer obsessed with the intersection of design and engineering.
                For the past several years, I've been building high-performance web applications
                that push the boundaries of what's possible in the browser.
              </p>
              <p className="text-body-md text-muted">
                My approach combines deep technical expertise with a keen eye for visual detail.
                I believe the best digital products are those where every pixel, every animation,
                and every interaction is crafted with intention.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="section container">
          <h2 className="text-headline-lg text-cyan scroll-reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Experience
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

        {/* Philosophy */}
        <section className="section container">
          <h2 className="text-headline-lg text-cyan scroll-reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
            My Philosophy
          </h2>
          <div className="philosophy-grid">
            {philosophy.map((item, i) => (
              <div key={item.title} className="glass-panel philosophy-card hover-target scroll-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="material-symbols-outlined philosophy-card__icon">{item.icon}</span>
                <h3 className="text-headline-md" style={{ fontSize: '20px', margin: '16px 0 12px' }}>{item.title}</h3>
                <p className="text-body-md text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section container scroll-reveal" style={{ textAlign: 'center', paddingBottom: '80px' }}>
          <h2 className="text-headline-lg" style={{ marginBottom: '16px' }}>
            Want to <span className="gradient-text">work together</span>?
          </h2>
          <p className="text-body-lg text-muted" style={{ marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            I'm always open to new opportunities and exciting projects.
          </p>
          <Link to="/contact" className="btn-primary hover-target" style={{ padding: '16px 48px', fontSize: '16px' }}>
            Get in Touch
          </Link>
        </section>
      </div>
    </PageTransition>
  )
}
