// app/events-news/page.tsx
import NavClient from '@/components/NavClient'
import EventsSection from '@/components/EventsSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events & News – ASSNA',
  description: 'Upcoming and past ASSNA seminars, workshops, and news announcements.',
}

export const revalidate = 0

export default function EventsNewsPage() {
  const news = [
    {
      cat: 'Announcement',
      date: 'May 2026',
      title: 'ASSNA Membership Registration Is Now Open',
      body: 'ASSNA invites eligible participants to register through the website and become members. No membership fee is required at this time. Registered members will receive updates about seminars, networking opportunities, and mentoring activities.',
      catStyle: undefined,
    },
    {
      cat: 'Event',
      date: 'May 2026',
      title: 'Call for Seminar Speakers',
      body: 'ASSNA welcomes suggestions for invited speakers from academia, industry, government, and research institutions. Members may recommend speakers or propose seminar topics related to statistical science, data science, biostatistics, and applied research.',
      catStyle: { color: 'var(--navy)', background: 'rgba(26,43,92,0.08)' },
    },
    {
      cat: 'Launch',
      date: 'May 2026',
      title: 'ASSNA Website Official Launch',
      body: 'The Association of Sri Lankan Statisticians in North America is pleased to launch its official website to support membership registration, event communication, professional networking, and collaboration between North America and Sri Lanka.',
      catStyle: { color: '#2d7a56', background: 'rgba(45,122,86,0.1)' },
    },
  ]

  return (
    <>
      <NavClient />

      {/* ── EVENTS ── */}
      <EventsSection />

      {/* ── NEWS ── */}
      <section id="news">
        <div className="section-inner">
          <h2 className="section-title reveal">News &amp; Announcements</h2>
          <p className="section-subtitle reveal">
            Official updates from ASSNA, including launch announcements, registration notices,
            and calls for participation.
          </p>
          <div className="news-grid">
            {news.map((n) => (
              <div key={n.title} className="news-card reveal">
                <div className="news-meta">
                  <span className="news-cat" style={n.catStyle}>{n.cat}</span>
                  <span className="news-date">{n.date}</span>
                </div>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo"><span>ASSNA</span></div>
              <p>
                The Association of Sri Lankan Statisticians in North America — advancing
                statistical science through collaboration, mentorship, and service.
              </p>
            </div>
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><Link href="/#about">About</Link></li>
                <li><Link href="/events-news">Events &amp; News</Link></li>
                <li><Link href="/committee">Committee</Link></li>
                <li><Link href="/resources">Resources</Link></li>
                <li><Link href="/#membership">Membership</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/#register">Register as Member</Link></li>
                <li><Link href="/committee#constitution">Constitution</Link></li>
                <li><Link href="/#contact">Contact ASSNA</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Association of Sri Lankan Statisticians in North America. All rights reserved.</p>
            <span className="est">EST. 2026 · NORTH AMERICA</span>
          </div>
        </div>
      </footer>
    </>
  )
}
