'use client'

import { useState } from 'react'
import CustomSelect from './CustomSelect'
import { registerMember } from '@/app/actions/registerMember'

const expertiseOptions = [
  { label: 'Statistics', value: 'Statistics' },
  { label: 'Biostatistics', value: 'Biostatistics' },
  { label: 'Data Science', value: 'Data Science' },
  { label: 'Applied Mathematics', value: 'Applied Mathematics' },
  { label: 'Machine Learning / AI', value: 'Machine Learning / AI' },
  { label: 'Epidemiology', value: 'Epidemiology' },
  { label: 'Quantitative Research', value: 'Quantitative Research' },
  { label: 'Other', value: 'Other' },
]

const statusOptions = [
  { label: 'Faculty', value: 'Faculty' },
  { label: 'Student', value: 'Student' },
  { label: 'Industry Professional', value: 'Industry Professional' },
  { label: 'Government Statistician', value: 'Government Statistician' },
  { label: 'Researcher', value: 'Researcher' },
  { label: 'Postdoc', value: 'Postdoc' },
  { label: 'Other', value: 'Other' },
]

const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]

export default function MembershipRegistration() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await registerMember(formData)

    setIsSubmitting(false)
    if (result.success) {
      setMessage({ type: 'success', text: 'Successfully registered as a member!' })
      setTimeout(() => {
        setIsOpen(false)
        setMessage(null)
      }, 3000)
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to register. Please try again.' })
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <div className="eligibility-check" style={{ textAlign: 'left', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <input 
            type="checkbox" 
            id="eligibility-agree" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)} 
            style={{ marginTop: '0.2rem', cursor: 'pointer', width: '16px', height: '16px', accentColor: 'var(--accent)' }}
          />
          <label htmlFor="eligibility-agree" style={{ cursor: 'pointer', lineHeight: '1.4' }}>
            I have reviewed the eligibility criteria and confirm that I qualify for ASSNA membership.
          </label>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => setIsOpen(true)}
          disabled={!agreed}
          style={{ 
            opacity: agreed ? 1 : 0.6, 
            cursor: agreed ? 'pointer' : 'not-allowed',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          Register Now — It&apos;s Free
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOpen(false)}>&times;</button>
            
            <div className="modal-header">
              <span className="event-type-badge">Membership</span>
              <h2>Register as a Member</h2>
              <div className="modal-event-meta">
                <p>Join the ASSNA community today. Registration is free and open to everyone.</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="event-description">
                <h3>About Membership</h3>
                <p>By joining ASSNA, you will receive updates about upcoming events, networking opportunities, and resources dedicated to the advancement of statistics.</p>
              </div>

              <div className="registration-section">
                <h3>Registration Form</h3>
                <form onSubmit={handleSubmit} className="registration-form">
                
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" name="fullName" required placeholder="Your full name" />
                </div>

                <div className="form-group">
                  <label htmlFor="position">Position / Title *</label>
                  <input type="text" id="position" name="position" required placeholder="e.g. PhD Student, Assistant Professor" />
                </div>

                <div className="form-group">
                  <label htmlFor="affiliation">Affiliation / Institution *</label>
                  <input type="text" id="affiliation" name="affiliation" required placeholder="University or organization" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required placeholder="your@email.com" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" id="phone" name="phone" placeholder="Optional" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="country">Country of Residence *</label>
                    <input type="text" id="country" name="country" required placeholder="e.g. USA, Canada" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State / Province *</label>
                    <input type="text" id="state" name="state" required placeholder="e.g. NY, Ontario" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="expertise">Area of Expertise *</label>
                  <CustomSelect
                    id="expertise"
                    name="expertise"
                    required
                    options={expertiseOptions}
                    placeholder="Select Expertise"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Current Professional Status *</label>
                  <CustomSelect
                    id="status"
                    name="status"
                    required
                    options={statusOptions}
                    placeholder="Select Status"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mentoring">Interest in Mentoring *</label>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '-0.25rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                      Are you interested in participating in ASSNA&apos;s mentorship program (as a mentor or mentee)?
                    </p>
                    <CustomSelect
                      id="mentoring"
                      name="mentoring"
                      required
                      options={yesNoOptions}
                      defaultValue="Yes"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="volunteering">Interest in Volunteering *</label>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '-0.25rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                      Would you like to volunteer to help organize ASSNA events or initiatives?
                    </p>
                    <CustomSelect
                      id="volunteering"
                      name="volunteering"
                      required
                      options={yesNoOptions}
                      defaultValue="Yes"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="shareName">Permission to Share Name on Website *</label>
                  <CustomSelect
                    id="shareName"
                    name="shareName"
                    required
                    options={yesNoOptions}
                    defaultValue="Yes"
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Complete Registration'}
                </button>

                {message && (
                  <div className={`form-message ${message.type}`}>
                    {message.text}
                  </div>
                )}
              </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
