'use client'

import { useState } from 'react'
import EventModal from './EventModal'

interface EventCardActionsProps {
  event: {
    id: string
    date: Date
    speaker: string
    affiliation: string
    talkTitle: string
    type: string
    description?: string | null
  }
}

export default function EventCardActions({ event }: EventCardActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="btn-more-details"
      >
        Register Now →
      </button>

      <EventModal 
        event={event} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
