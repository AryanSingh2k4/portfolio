import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { SayHelloBadge, GithubIcon, LinkedInIcon, DiscordIcon } from '../components/Icons'
import './Contact.css'

const faqs = [
  {
    q: 'What is your typical project timeline?',
    a: 'Most projects take 2-4 weeks from architecture to production delivery, depending on complexity. I provide clear milestone deliverables and communicate directly without intermediaries.'
  },
  {
    q: 'What technologies do you work with?',
    a: 'I specialize in React, Next.js, TypeScript, Solid.js, WebRTC, Tailwind CSS, Node.js, and Supabase. I also build AI-driven applications using Groq/LLMs and smart contract architectures on EVM chains.'
  },
  {
    q: 'Are you available for contract or full-time roles?',
    a: 'Yes! I am open to technical internships, freelance projects, and full-time opportunities. I can assist with greenfield web architectures, performance overhauls, or full-stack engineering.'
  },
  {
    q: 'How do you structure client communication?',
    a: 'Asynchronous updates via Slack/Discord, transparent GitHub repositories, and regular live milestone reviews. No corporate fluff, just working software.'
  },
]

const contactDetails = [
  { label: 'Direct Email', value: 'aryanvsingh641@gmail.com', href: 'mailto:aryanvsingh641@gmail.com' },
  { label: 'Location & Base', value: 'Navi Mumbai, India (IST UTC+5:30)', href: null },
  { label: 'Current Availability', value: 'Open for Opportunities & Contracts', isAvailable: true },
]

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null)
  const [currentTime, setCurrentTime] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'New Project', message: '', budget: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' IST'
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.subject} — from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Topic: ${formData.subject}\n` +
      `Budget: ${formData.budget || 'Not specified'}\n\n` +
      `Message:\n${formData.message}`
    )
    window.location.href = `mailto:aryanvsingh641@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', subject: 'New Project', message: '', budget: '' })
  }

  return (
    <PageTransition>
      <div className="contact-page">
        {/* Electric Orange Hero Banner */}
        <section className="ct" id="contact-banner">
          <a 
            className="say hover-target" 
            href="mailto:aryanvsingh641@gmail.com" 
            aria-label="Say hello via email"
          >
            <SayHelloBadge />
          </a>

          <div className="w">
            <div className="mono" style={{ color: '#191812', opacity: 0.85 }}>(04) Contact</div>
            <h2>
              Let’s create something <span className="it">memorable.</span>
            </h2>
            <div>
              <a className="mail hover-target" href="mailto:aryanvsingh641@gmail.com">
                aryanvsingh641@gmail.com
              </a>
            </div>

            <div className="soc mono" style={{ marginTop: '54px' }}>
              <a 
                href="https://github.com/AryanSingh2k4" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover-target"
              >
                GitHub ↗
              </a>
              <a 
                href="https://linkedin.com/in/aryansingh2k4" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover-target"
              >
                LinkedIn ↗
              </a>
              <a 
                href="https://discordapp.com/users/carnage__2k4" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover-target"
              >
                Discord ↗
              </a>
            </div>
          </div>
        </section>

        {/* Detailed Inquiry & FAQ Section */}
        <section className="contact-details-section">
          <div className="w">
            <div className="contact-editorial-grid">
              {/* Left Column: Direct Info & FAQs */}
              <div className="contact-left-col">
                <div className="mono" style={{ color: 'var(--o)', marginBottom: '12px' }}>(Direct Channels)</div>
                <h3 className="contact-section-heading">Get in touch directly.</h3>
                <p className="contact-lead-desc">
                  Have an ambitious project, an engineering role, or a technical question? I reply promptly to genuine inquiries.
                </p>

                {/* Info Cards */}
                <div className="contact-info-cards">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="contact-info-card">
                      <span className="mono contact-info-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="contact-info-value hover-target" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {item.value} ↗
                        </a>
                      ) : (
                        <span className="contact-info-value">
                          {item.isAvailable && <i className="pd" aria-hidden="true" />}
                          {item.value}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Live Clock Card */}
                  <div className="contact-info-card">
                    <span className="mono contact-info-label">Current Local Time</span>
                    <span className="contact-info-value mono" style={{ color: 'var(--o)', fontSize: '15px' }}>
                      {currentTime || 'Loading IST...'}
                    </span>
                  </div>
                </div>

                {/* FAQ Accordion */}
                <div style={{ marginTop: '54px' }}>
                  <div className="mono" style={{ color: 'var(--o)', marginBottom: '16px' }}>(Frequently Asked)</div>
                  <div className="faq-accordion">
                    {faqs.map((faq, i) => (
                      <div key={i} className="faq-node">
                        <button 
                          className="faq-trigger hover-target"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          aria-expanded={openFaq === i}
                        >
                          <span className="faq-q">{faq.q}</span>
                          <span className="faq-icon" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                            +
                          </span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <p className="faq-a">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="contact-right-col">
                <div className="contact-form-card">
                  <div className="mono" style={{ color: 'var(--o)', marginBottom: '8px' }}>Project Inquiry</div>
                  <h3 className="form-card-title">Send a message</h3>
                  <p className="form-card-desc">Fill out the form below to launch your email client with a pre-formatted message.</p>

                  <form onSubmit={handleSubmit} className="editorial-form">
                    <div className="form-field">
                      <label htmlFor="name" className="mono">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Jane Doe"
                        required 
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="email" className="mono">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. jane@company.com"
                        required 
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="subject" className="mono">Project Scope / Topic</label>
                      <select 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="New Web Application">New Web Application</option>
                        <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                        <option value="AI Integration & Workflows">AI Integration & Workflows</option>
                        <option value="Freelance / Consultation">Freelance / Consultation</option>
                        <option value="Technical Opportunity">Technical Opportunity</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="budget" className="mono">Budget or Scope (Optional)</label>
                      <input 
                        type="text" 
                        id="budget" 
                        name="budget" 
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="e.g. ₹20,000 - ₹50,000 or Fixed Scope"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="message" className="mono">Message & Details</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, goals, and timeline..."
                        required 
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn hover-target" 
                      style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                    >
                      {submitted ? 'Opening Email Client...' : 'Dispatch Message ↗'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
