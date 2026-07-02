import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useAnimations'
import './Contact.css'

const faqs = [
  {
    q: 'What is your typical project timeline?',
    a: 'Most projects take 4-8 weeks from kickoff to delivery, depending on scope. I provide detailed timelines during the initial consultation and keep you updated with weekly progress reports.'
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'I specialize in React, Next.js, TypeScript, Node.js, and modern CSS. I also have experience with Python, GraphQL, PostgreSQL, and various cloud platforms like AWS and Vercel.'
  },
  {
    q: 'Do you take on freelance projects?',
    a: 'Yes! I\'m currently open to freelance work. Whether it\'s a full website build, a complex web application, or consulting on architecture and performance, I\'d love to hear about your project.'
  },
  {
    q: 'How do you handle project communication?',
    a: 'I use a combination of Slack/Discord for daily communication, Notion for project documentation, and weekly video calls for progress reviews. You\'ll always know exactly where your project stands.'
  },
]

const contactInfo = [
  { icon: 'mail', label: 'Email', value: 'aryanvsingh641@gmail.com', copyable: true },
  { icon: 'location_on', label: 'Location', value: 'Remote / India', copyable: false },
  { icon: 'circle', label: 'Availability', value: 'Open to freelance', status: true },
]

const socials = [
  { icon: '🐙', label: 'GitHub', url: 'https://github.com/AryanSingh2k4' },
  { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/in/aryansingh2k4' },
]

export default function Contact() {
  const sectionRef = useScrollReveal()
  const [openFaq, setOpenFaq] = useState(null)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', budget: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.subject}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nBudget: ${formData.budget || 'N/A'}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:aryan@dev.com?subject=${subject}&body=${body}`

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '', budget: '' })
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <PageTransition>
      <div ref={sectionRef}>
        <section className="section container">
          <div className="contact-grid">
            {/* Left Side */}
            <div className="contact-info scroll-reveal">
              <p className="text-label-code text-cyan" style={{ marginBottom: '8px' }}>// CONTACT</p>
              <h1 className="text-display-lg" style={{ marginBottom: '16px', lineHeight: 1.15 }}>
                Let's Build Something <span className="gradient-text">Extraordinary</span>
              </h1>
              <p className="text-body-lg text-muted" style={{ marginBottom: '40px' }}>
                Ready for your next project? Drop me a line and let's create something amazing together.
              </p>

              <div className="contact-cards">
                {contactInfo.map(info => (
                  <div key={info.label} className="contact-card glass-panel hover-target" onClick={() => info.copyable && handleCopy(info.value)}>
                    <span className="material-symbols-outlined text-cyan" style={{ fontSize: '24px' }}>
                      {info.icon}
                    </span>
                    <div>
                      <p className="text-label-code text-muted" style={{ fontSize: '12px' }}>{info.label}</p>
                      <p className="text-body-md" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {info.status && <span className="status-dot" />}
                        {info.value}
                        {info.copyable && (
                          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-outline)', cursor: 'none' }}>
                            {copied ? 'check' : 'content_copy'}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-links">
                {socials.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                     className="social-link glass-panel hover-target" title={s.label}>
                    <span style={{ fontSize: '20px' }}>{s.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="contact-form-wrapper glass-panel scroll-reveal">
              <h3 className="text-headline-md" style={{ fontSize: '20px', marginBottom: '24px' }}>
                <span className="text-cyan">{'>'}</span> Send Transmission
              </h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label className="text-label-code text-muted" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="input-field"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-label-code text-muted" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="input-field"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-label-code text-muted" htmlFor="contact-subject">Subject</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className="input-field"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="project">New Project</option>
                    <option value="freelance">Freelance Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-label-code text-muted" htmlFor="contact-budget">Budget Range</label>
                  <select
                    id="contact-budget"
                    name="budget"
                    className="input-field"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget</option>
                    <option value="<5k">Under $5,000</option>
                    <option value="5-10k">$5,000 — $10,000</option>
                    <option value="10-25k">$10,000 — $25,000</option>
                    <option value="25k+">$25,000+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-label-code text-muted" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="input-field"
                    placeholder="Tell me about your project..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary hover-target" style={{ width: '100%', padding: '14px', fontSize: '15px' }}>
                  {submitted ? '✓ Transmission Sent!' : 'Send Transmission'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section container">
          <h2 className="text-headline-lg text-cyan scroll-reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            FAQ
          </h2>
          <div className="faq-list" style={{ maxWidth: '750px', margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item glass-panel scroll-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <button
                  className="faq-item__header hover-target"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-body-lg">{faq.q}</span>
                  <span className="material-symbols-outlined faq-item__chevron" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>
                    expand_more
                  </span>
                </button>
                <div className={`faq-item__body ${openFaq === i ? 'open' : ''}`}>
                  <p className="text-body-md text-muted">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
