'use client'
// components/NavClient.tsx

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
  { href: '/#about',      label: 'About',         sectionId: 'about' },
  { href: '/events-news', label: 'Events & News', page: '/events-news' },
  { href: '/committee',   label: 'Committee',     page: '/committee' },
  { href: '/resources',   label: 'Resources',     page: '/resources' },
  { href: '/#contact',    label: 'Contact',       sectionId: 'contact' },
]

export default function NavClient() {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach((el) => revealObserver.observe(el))

    // Active section detection only on home page
    if (pathname === '/') {
      const sections = document.querySelectorAll('section[id]')
      const onScroll = () => {
        let current = ''
        sections.forEach((s) => {
          if (window.scrollY >= (s as HTMLElement).offsetTop - 100) {
            current = s.id
          }
        })
        setActiveSection(current)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', onScroll)
        revealObserver.disconnect()
      }
    }

    return () => revealObserver.disconnect()
  }, [pathname])

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.page) return pathname === link.page
    if (link.sectionId) return pathname === '/' && activeSection === link.sectionId
    return false
  }

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/LL.svg" alt="ASSNA Logo" style={{ height: '36px', width: 'auto' }} />
        </Link>

        <button
          className={`nav-burger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={isActive(link) ? { color: 'var(--accent-light)' } : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="nav-cta">
            <Link href="/#register" onClick={() => setIsMenuOpen(false)}>
              Join ASSNA
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
