'use client'

import { useState } from 'react'
import CustomSelect from './CustomSelect'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call for sending a message
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      
      // Reset form after a few seconds
      setTimeout(() => {
        setSubmitted(false)
        if (e.target instanceof HTMLFormElement) {
          e.target.reset()
        }
      }, 5000)
    }, 1000)
  }

  return (
    <div className="contact-form-card reveal">
      <h3>Send a Message</h3>
      
      {submitted ? (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--accent)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          marginTop: '1.5rem'
        }}>
          <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Message Sent!</h4>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Thank you for reaching out to ASSNA. We have received your inquiry and will get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Your Name', type: 'text', placeholder: 'Full name', name: 'name' },
            { label: 'Email Address', type: 'email', placeholder: 'your@email.com', name: 'email' },
            { label: 'Affiliation', type: 'text', placeholder: 'Institution or organization', name: 'affiliation' },
          ].map((f) => (
            <div key={f.label} className="cf-group">
              <label htmlFor={f.name}>{f.label} *</label>
              <input type={f.type} id={f.name} name={f.name} placeholder={f.placeholder} required />
            </div>
          ))}
          <div className="cf-group">
            <label htmlFor="subject">Subject *</label>
            <CustomSelect 
              id="subject"
              name="subject"
              defaultValue="General Inquiry"
              options={['General Inquiry', 'Membership Question', 'Event Information', 'Collaboration Opportunity', 'Mentoring Inquiry', 'Speaker Suggestion', 'Other'].map(o => ({ label: o, value: o }))}
            />
          </div>
          <div className="cf-group">
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" placeholder="Your message to ASSNA…" required rows={4} style={{ resize: 'vertical' }} />
          </div>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
            style={{ width: '100%', justifyContent: 'center', border: 'none', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
}
