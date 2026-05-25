// app/page.tsx
import NavClient from '@/components/NavClient'
import MembershipRegistration from '@/components/MembershipRegistration'
import {
  Users,
  Calendar,
  GraduationCap,
  Briefcase,
  Globe,
  BookOpen,
} from 'lucide-react'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  const whatWeDo = [
    { Icon: Users,          title: 'Networking',         desc: 'Promote academic and professional networking among Sri Lankan statisticians in North America.' },
    { Icon: Calendar,       title: 'Events',             desc: 'Organize seminars, workshops, scientific discussions, and invited talks by experts from academia, industry, government, and research institutions.' },
    { Icon: GraduationCap,  title: 'Mentorship',         desc: 'Support mentorship for students, graduate applicants, early-career professionals, and researchers.' },
    { Icon: Briefcase,      title: 'Career Development', desc: 'Share information on academic positions, industry roles, research opportunities, internships, and career development.' },
    { Icon: Globe,          title: 'Collaboration',      desc: 'Strengthen collaborations with universities, research institutes, and statistical organizations in Sri Lanka.' },
    { Icon: BookOpen,       title: 'Outreach',           desc: 'Support statistical education, research capacity, and applied statistical practice through outreach and knowledge sharing.' },
  ]

  return (
    <>
      <NavClient />

      {/* ── HERO ── */}
      <section id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div>
            <div className="hero-badge">Est. 2026 · North America</div>
            <h1 className="hero-title">
              Connecting Sri Lankan statisticians across{' '}
              <em>North America and beyond</em>
            </h1>
            <p className="hero-desc">
              The Association of Sri Lankan Statisticians in North America (ASSNA) is a
              professional and academic organization dedicated to advancing statistical science,
              strengthening professional networks, and promoting collaboration among
              statisticians of Sri Lankan origin living and working in North America.
            </p>
            <div className="hero-actions">
              <a href="#register" className="btn-primary">
                Become a Member →
              </a>
              <a href="#about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-seal-wrapper">
            <div className="hero-seal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hero-seal" src="/logo-b.png" alt="ASSNA Seal" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="section-inner">
          <h2 className="section-title reveal">About ASSNA</h2>
          <div className="about-grid">
            <div className="about-text reveal" style={{ maxWidth: '720px' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                The Association of Sri Lankan Statisticians in North America (ASSNA) is a
                professional organization uniting statisticians of Sri Lankan origin across
                universities, industry, government, and research institutions throughout the
                United States and Canada.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85 }}>
                Founded to advance statistical science and strengthen professional networks,
                ASSNA promotes collaboration in research and education, supports mentorship
                and career development, and bridges the statistical communities of North
                America and Sri Lanka through seminars, workshops, and scholarly engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section id="what-we-do">
        <div className="section-inner">
          <h2 className="section-title reveal">What We Do</h2>
          <p className="section-subtitle reveal">
            ASSNA pursues its mission through a range of activities designed to support
            members and advance statistical science.
          </p>
          <div className="objectives-grid">
            {whatWeDo.map(({ Icon, title, desc }) => (
              <div key={title} className="objective-card reveal">
                <div className="obj-icon" style={{ color: 'var(--accent-light)' }}>
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP ── */}
      <section id="membership">
        <div className="section-inner">
          <h2 className="section-title reveal">Membership</h2>
          <p className="section-subtitle reveal">
            ASSNA membership is open to statisticians, data scientists, biostatisticians, and
            quantitative researchers of Sri Lankan origin or heritage in North America.
          </p>
          <div className="membership-layout">
            <div className="reveal">
              <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '0.75rem', color: 'var(--navy)' }}>
                Eligibility
              </h3>
              <ul className="eligibility-list">
                {[
                  'Sri Lankan origin, heritage, or connection',
                  'Based in the United States or Canada',
                  'Working or studying in statistics, biostatistics, data science, or a related quantitative field',
                  'Committed to advancing statistical science and supporting the Sri Lankan statistical community',
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--navy)' }}>No membership fee.</strong> ASSNA does
                  not charge a membership fee at this time. All eligible individuals are encouraged
                  to register and become part of the community.
                </p>
              </div>
            </div>
            <div className="register-card reveal" id="register" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Become a Member</h3>
              <p style={{ marginBottom: '2rem', color: 'var(--text-light)', maxWidth: '400px' }}>Join the ASSNA community today. Registration is free and open to all eligible individuals.</p>
              <MembershipRegistration />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="section-inner">
          <h2 className="section-title reveal">Contact ASSNA</h2>
          <p className="section-subtitle reveal">
            Please reach out for membership questions, event information, collaboration
            opportunities, mentoring inquiries, or general questions about ASSNA.
          </p>
          <div className="contact-layout">
            <ContactForm />
            <div className="contact-info reveal">
              <h3>Contact Information</h3>
              {[
                { label: 'Email',        val: 'To be added' },
                { label: 'Website',      val: 'assna.org (coming soon)' },
                { label: 'Region',       val: 'North America' },
                { label: 'Social Media', val: 'Links coming soon' },
              ].map((c) => (
                <div key={c.label} className="contact-info-item">
                  <div className="ci-text">
                    <div className="ci-label">{c.label}</div>
                    <div className="ci-val">{c.val}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '2rem' }}>
                <style>{`
                  .btn-navy-custom {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--navy-deep);
                    color: var(--white);
                    padding: 0.85rem 1.75rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 0.875rem;
                    text-decoration: none;
                    transition: all 0.25s;
                    border: 2px solid var(--navy-deep);
                  }
                  .btn-navy-custom:hover {
                    background: var(--accent);
                    border-color: var(--accent);
                    color: var(--navy-deep);
                  }
                `}</style>
                <Link href="/committee" className="btn-navy-custom">
                  Meet the Committee →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <span>ASSNA</span>
              </div>
              <p>
                The Association of Sri Lankan Statisticians in North America is a professional
                and academic organization dedicated to advancing statistical science, promoting
                collaboration, supporting professional development, and strengthening connections
                between Sri Lankan statisticians in North America and Sri Lanka.
              </p>
            </div>
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><Link href="/#about">About</Link></li>
                <li><Link href="/#what-we-do">What We Do</Link></li>
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
                <li><Link href="/#membership">Membership Info</Link></li>
                <li><Link href="/committee#constitution">Constitution</Link></li>
                <li><Link href="/#contact">Contact ASSNA</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Association of Sri Lankan Statisticians in North America. All rights reserved.</p>
            <p>Advancing statistical science through collaboration, mentorship, and service.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Contact: <a href="mailto:contact@assna.org" style={{ color: 'var(--accent-light)', textDecoration: 'none' }}>contact@assna.org</a></p>
            <span className="est">EST. 2026 · NORTH AMERICA</span>
          </div>
        </div>
      </footer>
    </>
  )
}
