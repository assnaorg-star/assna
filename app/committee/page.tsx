// app/committee/page.tsx
import NavClient from '@/components/NavClient'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Committee – ASSNA',
  description: 'ASSNA Executive Committee, Advisory Board, and Constitution.',
}

const executiveCommittee = [
  { initials: 'UW', name: 'Uditha Wijesuriya',      role: 'President',              isPresident: true, image: '/Uditha Wijesuriya .jpg' },
  { initials: 'KJ', name: 'Kalanka Jayalath',        role: 'Vice-President',         isPresident: true, image: '/Kalanka Jayalath.jpg' },
  { initials: 'DD', name: 'Dulanjalee Devage',        role: 'Secretary',              isPresident: false, image: '/Dulanjalee Dewage.jpg' },
  { initials: '', name: 'Dhanush Wijekularatne',  role: 'Treasurer',              isPresident: false, image: '/Danush Wijekularathna.jpg' },
  { initials: 'HR', name: 'Hansapani Rodrigo',        role: 'Communication Officer',  isPresident: false, image: '/Hansapani Rodrigo.jpg' },
  { initials: 'LP', name: 'Lochana Palayangoda',      role: 'Committee Member',       isPresident: false, image: '/Lochana Palayangoda.jpg' },
  { initials: 'WJ', name: 'Wasantha Jayawardene',     role: 'Committee Member',       isPresident: false, image: '/Wasantha Jayawardene.jpg' },
  { initials: 'SA', name: 'Sakitha Ariyarathne',      role: 'Committee Member',       isPresident: false, image: '/Sakitha Ariyarathne.jpg' },
  { initials: 'SA', name: 'Sasanka Adikari',          role: 'Committee Member',       isPresident: false, image: '/Sasanka Adikari.jpg' },
  { initials: 'MI', name: 'Malinda Iluppangama',      role: 'Committee Member',       isPresident: false, image: '/Malinda Illupangama.jpg' },
  { initials: 'SA', name: 'Stephanson Anthonymuthu',  role: 'Committee Member',       isPresident: false, image: '/Steephanson Anthonymuthu.jpg' },
]

// Advisory board
const advisoryBoard = [
  { 
    initials: 'AN', 
    name: 'Prof. Ampalavanar Nanthakumar', 
    role: 'Advisory Board Member', 
    affil: 'Mathematics Department\nOswego State University of New York', 
    image: '/Amp Nanthakumar.jpg' 
  },
  { 
    initials: 'AM', 
    name: 'Prof. Ananda Manage', 
    role: 'Advisory Board Member', 
    affil: 'Department of Mathematics and Statistics\nSam Houston State University', 
    image: '/Ananda Manage .jpg' 
  },
  { 
    initials: 'KK', 
    name: 'Prof. K. B. Kulasekera', 
    role: 'Advisory Board Member', 
    affil: 'Bioinformatics and Biostatistics\nSchool of Public Health and Information Sciences\nUniversity of Louisville', 
    image: '/KB Kulasekara.jpg' 
  },
]

export default function CommitteePage() {
  return (
    <>
      <NavClient />

      {/* ── EXECUTIVE COMMITTEE ── */}
      <section id="committee" style={{ paddingTop: '6rem' }}>
        <div className="section-inner">
          <h2 className="section-title reveal">Executive Committee</h2>
          <p className="section-subtitle reveal">
            ASSNA is led by a volunteer executive committee of statisticians dedicated to
            advancing the association&apos;s mission.
          </p>
          <div className="committee-grid">
            {executiveCommittee.map((m, i) => (
              <div key={i} className={`committee-card reveal${m.isPresident ? ' president' : ''}`}>
                <div className="avatar" style={{ padding: m.image ? 0 : undefined }}>
                  {m.image ? (
                    <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  ) : (
                    m.initials
                  )}
                </div>
                <div>
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">{m.role}</div>
                  <div className="member-affil">ASSNA</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVISORY BOARD ── */}
      <section id="advisory-board" style={{ background: 'var(--section-alt)' }}>
        <div className="section-inner">
          <h2 className="section-title reveal">Advisory Board</h2>
          <p className="section-subtitle reveal">
            ASSNA&apos;s Advisory Board comprises distinguished statisticians and academics who
            provide strategic guidance and mentorship to the association.
          </p>
          <div className="committee-grid">
            {advisoryBoard.map((m, i) => (
              <div key={i} className="committee-card reveal">
                <div className="avatar" style={{ background: m.image ? 'transparent' : 'var(--accent)', color: 'white', padding: m.image ? 0 : undefined }}>
                  {m.image ? (
                    <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  ) : (
                    m.initials
                  )}
                </div>
                <div>
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">{m.role}</div>
                  {m.affil && <div className="member-affil" style={{ whiteSpace: 'pre-wrap', marginTop: '0.4rem' }}>{m.affil}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSTITUTION ── */}
      <section id="constitution" style={{ background: 'var(--white)' }}>
        <div className="section-inner">
          <h2 className="section-title reveal">ASSNA Constitution</h2>
          <div className="about-grid" style={{ marginTop: '2rem' }}>
            <div className="about-text reveal">
              <p>
                The ASSNA Constitution provides the governance framework for the Association.
                It outlines the purpose, membership eligibility, governing body, and election
                procedures.
              </p>
              <ul className="eligibility-list" style={{ marginTop: '1.5rem' }}>
                <li>Purpose and Objectives</li>
                <li>Membership Eligibility and Structure</li>
                <li>Executive Committee Composition</li>
                <li>Election and Dissolution Procedures</li>
              </ul>
              <div style={{ marginTop: '2.5rem' }}>
                <a href="/constitution.pdf" className="btn-primary" download>
                  Download Full Constitution (PDF)
                </a>
              </div>
            </div>
            <div className="vm-card reveal" style={{ background: 'var(--cream)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '1rem' }}>Important Note</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                Although the constitution includes membership categories and possible future
                fee structures, ASSNA is not collecting any membership fee at this time.
                Current membership is based on online registration through the website.
              </p>
            </div>
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
