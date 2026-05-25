'use client'

import { useState, useMemo } from 'react'
import EventCardActions from './EventCardActions'

import CustomSelect from './CustomSelect'

interface Event {
  id: string
  date: Date
  speaker: string
  affiliation: string
  talkTitle: string
  type: string
  description?: string | null
  recordingUrl?: string | null
}

interface EventFilterProps {
  events: Event[]
}

export default function EventFilter({ events }: EventFilterProps) {
  const [selectedType, setSelectedType] = useState('All')

  const types = useMemo(() => {
    const allTypes = events.map(e => e.type)
    return ['All', ...Array.from(new Set(allTypes))]
  }, [events])

  const filteredEvents = useMemo(() => {
    if (selectedType === 'All') return events
    return events.filter(e => e.type === selectedType)
  }, [events, selectedType])

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  }

  function formatTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(date))
  }

  return (
    <>
      <div className="filter-wrapper reveal" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label className="filter-label" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter by Type:</label>
        <div style={{ width: '220px' }}>
          <CustomSelect 
            value={selectedType} 
            onChange={(val) => setSelectedType(val)}
            options={types.map(t => ({ label: t, value: t }))}
          />
        </div>
      </div>

      <div className="upcoming-events-grid">
        {filteredEvents.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>No events found for this type.</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="upcoming-event-card reveal visible" style={{ padding: 0, overflow: 'hidden', background: 'var(--white)', border: 'none', borderRadius: '12px', boxShadow: '0 12px 32px rgba(255,255,255,0.15)' }}>
              {/* Header */}
              <div style={{ display: 'flex', background: 'var(--navy-deep)', color: 'white', alignItems: 'stretch' }}>
                <div style={{ padding: '0.75rem', background: 'white', borderRight: '2px solid var(--navy-deep)', display: 'flex', alignItems: 'center' }}>
                  <img src="/logo-w.png" alt="ASSNA" style={{ height: '55px', width: 'auto' }} />
                </div>
                <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'sans-serif', lineHeight: 1.1, letterSpacing: '0.02em' }}>ASSNA</div>
                  <div style={{ fontSize: '0.62rem', opacity: 0.85, lineHeight: 1.3, marginTop: '0.2rem' }}>
                    Association of Sri Lankan Statisticians in North America<br/>
                    Presents a Guest Speaker Talk
                  </div>
                </div>
              </div>
              
              {/* Gold line */}
              <div style={{ height: '4px', background: 'var(--accent)' }}></div>

              <div style={{ padding: '2rem 1.75rem' }}>
                {/* Title */}
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.35rem', color: 'var(--navy-deep)', textAlign: 'center', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.3 }}>
                  "{event.talkTitle}"
                </div>

                {/* Date/Time Bar */}
                <div style={{ display: 'flex', border: '1px solid var(--navy-deep)', marginBottom: '2rem', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ flex: 1, background: 'var(--navy-deep)', color: 'white', padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.35rem', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 
                      DATE
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{formatDate(event.date)}</div>
                  </div>
                  <div style={{ flex: 1, background: '#eef2f9', color: 'var(--navy-deep)', padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.35rem', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      TIME
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{formatTime(event.date)}</div>
                  </div>
                </div>

                {/* Speaker */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Featured Speaker</div>
                  <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '1.25rem' }}>{event.speaker}</div>
                  
                  <div style={{ height: '1px', background: 'var(--border)', margin: '0 auto 1.25rem', width: '85%' }}></div>
                  
                  <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.5 }}>
                    {event.affiliation.split(',').map((part, index, array) => (
                      <span key={index}>
                        <span style={index === array.length - 1 ? { fontWeight: 600, fontStyle: 'normal' } : { fontStyle: 'italic', color: '#556688' }}>{part.trim()}</span>
                        {index < array.length - 1 && <><br/></>}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <style>{`
                    .btn-more-details {
                      display: inline-flex;
                      align-items: center;
                      background: transparent;
                      border: 1px solid var(--navy-deep);
                      color: var(--navy-deep);
                      padding: 0.65rem 1.25rem;
                      border-radius: 8px;
                      font-size: 0.95rem;
                      font-weight: 600;
                      cursor: pointer;
                      transition: all 0.2s;
                      font-family: inherit;
                    }
                    .btn-more-details:hover {
                      background: rgba(26,43,92,0.05);
                    }
                  `}</style>
                  <EventCardActions event={event} />
                  {event.recordingUrl && (
                    <a href={event.recordingUrl} target="_blank" rel="noopener noreferrer" className="recording-link" style={{ color: 'var(--navy-deep)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>▶</span> Event Info
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
