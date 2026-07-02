import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import './About.css'



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
                I am a Computer Science Engineering student specializing in IoT, Cyber Security, and Blockchain Technology. 
                I enjoy building practical solutions that combine clean user experiences with solid engineering.
              </p>
              <p className="text-body-md text-muted" style={{ marginBottom: '16px' }}>
                My recent work includes AI-powered applications, full-stack web platforms, and blockchain-based projects. 
                I am particularly interested in AI, modern web technologies, scalable applications, and building products that solve real-world problems.
              </p>
              <blockquote style={{ borderLeft: '3px solid var(--color-cyan)', paddingLeft: '16px', fontStyle: 'italic', color: 'var(--color-outline)' }}>
                "The best way to learn is to build."
              </blockquote>
            </div>
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
