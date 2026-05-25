// app/resources/page.tsx
import NavClient from '@/components/NavClient'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  GraduationCap,
  Briefcase,
  Users,
  Video,
  Globe,
  FileText,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources – ASSNA',
  description: 'Tools and guidance for students, early-career professionals, and researchers in statistics.',
}

export default function ResourcesPage() {
  const resources = [
    { icon: GraduationCap, title: 'Graduate Study in Statistics', desc: 'Information and guidance for students interested in applying to graduate programs in statistics, biostatistics, data science, and related fields in the United States and Canada.' },
    { icon: Briefcase,     title: 'Career Development',           desc: 'Resources related to academic positions, industry roles, internships, postdoctoral opportunities, government positions, and professional development in statistics.' },
    { icon: Users,         title: 'Mentorship',                   desc: 'Information about mentoring opportunities for students, early-career professionals, and researchers at various stages of their statistics and data science careers.' },
    { icon: Video,         title: 'Seminars & Recordings',        desc: 'Links to past ASSNA seminars, workshops, invited talks, and presentation materials for continued learning and professional engagement.' },
    { icon: Globe,         title: 'Collaboration Opportunities',  desc: 'Information about research collaborations, teaching partnerships, and outreach activities connecting institutions in North America and Sri Lanka.' },
    { icon: FileText,      title: 'ASSNA Constitution',           desc: 'The ASSNA Constitution provides the governance framework, outlining objectives, membership, governing body, elections, and officer responsibilities.' },
  ]

  return (
    <>
      <NavClient />

      {/* ── RESOURCES ── */}
      <section id="resources" style={{ paddingTop: '6rem' }}>
        <div className="section-inner">
          <h2 className="section-title reveal">Resources</h2>
          <p className="section-subtitle reveal">
            Supporting students, early-career professionals, researchers, and statisticians
            seeking academic and professional development opportunities.
          </p>
          <div className="resources-grid">
            {resources.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="resource-card reveal">
                <div className="resource-icon">
                  <Icon size={24} strokeWidth={1.6} color="var(--accent)" />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
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
