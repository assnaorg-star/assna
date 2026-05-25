'use client'

import { useState } from 'react'
import { registerEvent } from '@/app/actions/registerEvent'

interface EventModalProps {
  event: {
    id: string
    date: Date
    speaker: string
    affiliation: string
    talkTitle: string
    type: string
    description?: string | null
  }
  isOpen: boolean
  onClose: () => void
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await registerEvent(formData)

    setIsSubmitting(false)
    if (result.success) {
      setMessage({ type: 'success', text: 'Successfully registered for the event!' })
      setTimeout(() => {
        onClose()
        setMessage(null)
      }, 2000)
    } else {
      setMessage({ type: 'error', text: result.error || 'Registration failed' })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <span className="event-type-badge">{event.type}</span>
          <h2>{event.talkTitle}</h2>
          <div className="modal-event-meta">
            <p><strong>Speaker:</strong> {event.speaker}</p>
            <p><strong>Affiliation:</strong> {event.affiliation}</p>
            <p><strong>Date:</strong> {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(event.date))}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="event-description">
            <h3>About this Event</h3>
            <p>{event.description || 'No description available for this event.'}</p>
          </div>

          <div className="registration-section">
            <h3>Register for this Event</h3>
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="eventId">Event ID</label>
                <input type="text" id="eventId" name="eventId" value={event.id} readOnly style={{ background: 'rgba(0,0,0,0.05)', cursor: 'not-allowed' }} />
              </div>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" required placeholder="John Doe" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="john@example.com" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="affiliation">Affiliation</label>
                  <input type="text" id="affiliation" name="affiliation" required placeholder="University / Organization" />
                </div>
                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <input type="text" id="position" name="position" required placeholder="e.g. PhD Student" />
                </div>
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
  )
}
