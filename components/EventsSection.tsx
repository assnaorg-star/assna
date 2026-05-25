// components/EventsSection.tsx
// Server Component — fetches events directly from Supabase via Prisma

import { prisma } from '@/lib/prisma'
import EventCardActions from './EventCardActions'
import EventFilter from './EventFilter'

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export default async function EventsSection() {
  // Fetch upcoming and past events dynamically based on current date
  const now = new Date()
  const [upcomingEvents, pastEvents] = await Promise.all([
    prisma.event.findMany({
      where: { date: { gt: now } },
      orderBy: { date: 'asc' },
    }),
    prisma.event.findMany({
      where: { date: { lte: now } },
      orderBy: { date: 'desc' },
    }),
  ])

  return (
    <section id="events">
      <div className="section-inner">
        <p className="section-label reveal">Stay Informed</p>
        <h2 className="section-title reveal">Events &amp; Seminars</h2>
        <p className="section-subtitle reveal">
          ASSNA organizes seminars, workshops, panel discussions, and scientific meetings to
          promote scholarly exchange, professional development, and collaboration.
        </p>

        {/* ── Upcoming Events ── */}
        {upcomingEvents.length === 0 ? (
          <div className="events-notice reveal">
            <div className="icon">🗓️</div>
            <h3>Upcoming Events Coming Soon</h3>
            <p>
              ASSNA is actively planning its inaugural series of seminars and workshops. Register
              as a member to be the first to receive event announcements and invitations.
            </p>
            <a href="#register" className="btn-primary">
              Register to Get Notified
            </a>
          </div>
        ) : (
          <>
            <h3
              className="past-events-header reveal"
              style={{ color: 'var(--accent-light)', marginTop: '2.5rem' }}
            >
              Upcoming Events
            </h3>
            <EventFilter events={upcomingEvents} />
          </>
        )}

        {/* ── Past Events Archive ── */}
        <h3 className="past-events-header reveal">Past Events Archive</h3>

        <div className="events-table-wrap reveal">
          <table className="events-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Speaker</th>
                <th>Affiliation</th>
                <th>Talk Title</th>
                <th>Type</th>
                <th>Recording</th>
              </tr>
            </thead>
            <tbody>
              {pastEvents.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={6}>
                    Past events will be listed here after ASSNA&apos;s inaugural events.
                  </td>
                </tr>
              ) : (
                pastEvents.map((event) => (
                  <tr key={event.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{formatDate(event.date)}</td>
                    <td style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      {event.speaker}
                    </td>
                    <td>{event.affiliation}</td>
                    <td style={{ color: 'rgba(255,255,255,0.8)' }}>{event.talkTitle}</td>
                    <td>
                      <span className="event-type-badge">{event.type}</span>
                    </td>
                    <td>
                      {event.recordingUrl ? (
                        <a
                          href={event.recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="recording-link"
                        >
                          ▶ Watch
                        </a>
                      ) : (
                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
