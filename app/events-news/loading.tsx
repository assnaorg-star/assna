'use client'

import NavClient from '@/components/NavClient'

export default function Loading() {
  return (
    <>
      <NavClient />

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(7, 21, 36, 0.9)',
        backdropFilter: 'blur(4px)',
      }}>
        <div style={{
          position: 'relative',
          width: '90px',
          height: '90px',
        }}>
          {/* Outer Ring */}
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '4px solid transparent',
              borderTopColor: '#d4af37',
              animation: 'customSpin 1s linear infinite',
            }}
          />

          {/* Middle Ring */}
          <span
            style={{
              position: 'absolute',
              inset: '10px',
              borderRadius: '50%',
              border: '4px solid transparent',
              borderTopColor: '#ffffff',
              animation: 'spinReverse 1.5s linear infinite',
            }}
          />

          {/* Inner Ring */}
          <span
            style={{
              position: 'absolute',
              inset: '20px',
              borderRadius: '50%',
              border: '4px solid transparent',
              borderTopColor: '#d4af37',
              animation: 'customSpin 2s linear infinite',
            }}
          />
        </div>

        <p style={{
          color: '#ffffff',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Loading Events & News
        </p>
      </div>

      <style jsx global>{`
        @keyframes customSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </>
  )
}