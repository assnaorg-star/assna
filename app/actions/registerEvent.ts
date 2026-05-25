'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function registerEvent(formData: FormData) {
  const eventId = formData.get('eventId') as string
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const affiliation = formData.get('affiliation') as string
  const position = formData.get('position') as string

  if (!eventId || !fullName || !email || !affiliation || !position) {
    return { error: 'All fields are required' }
  }

  try {
    await prisma.registration.create({
      data: {
        eventId,
        fullName,
        email,
        affiliation,
        position,
      },
    })

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Failed to register. Please try again.' }
  }
}
