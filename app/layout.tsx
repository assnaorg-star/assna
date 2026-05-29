// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://assna.org'),
  title: 'ASSNA – Association of Sri Lankan Statisticians in North America',
  description:
    'A professional organization dedicated to advancing statistical science, strengthening professional networks, and promoting collaboration among statisticians of Sri Lankan origin in North America.',
  icons: {
    icon: '/logo-bw.png',
    apple: '/logo-bw.png',
  },
  openGraph: {
    title: 'ASSNA – Association of Sri Lankan Statisticians in North America',
    description:
      'A professional organization dedicated to advancing statistical science and strengthening professional networks among Sri Lankan statisticians in North America.',
    url: 'https://assna.org',
    siteName: 'ASSNA',
    images: [
      {
        url: '/logo-b.png',
        width: 1200,
        height: 630,
        alt: 'ASSNA – Association of Sri Lankan Statisticians in North America',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASSNA – Association of Sri Lankan Statisticians in North America',
    description:
      'A professional organization dedicated to advancing statistical science and strengthening professional networks among Sri Lankan statisticians in North America.',
    images: ['/logo-b.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
