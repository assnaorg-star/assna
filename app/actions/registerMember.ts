'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function registerMember(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const position = formData.get('position') as string
  const affiliation = formData.get('affiliation') as string
  const email = formData.get('email') as string
  const phone = (formData.get('phone') as string) || null
  const country = formData.get('country') as string
  const state = formData.get('state') as string
  const expertise = formData.get('expertise') as string
  const status = formData.get('status') as string
  const mentoring = formData.get('mentoring') as string
  const volunteering = formData.get('volunteering') as string
  const shareName = formData.get('shareName') as string

  if (
    !fullName ||
    !position ||
    !affiliation ||
    !email ||
    !country ||
    !state ||
    !expertise ||
    !status ||
    !mentoring ||
    !volunteering ||
    !shareName
  ) {
    return { error: 'All required fields must be completed' }
  }

  try {
    // Check if member already exists with this email
    const existingMember = await prisma.member.findUnique({
      where: { email },
    })

    if (existingMember) {
      return { error: 'This email is already registered as a member.' }
    }

    await prisma.member.create({
      data: {
        fullName,
        position,
        affiliation,
        email,
        phone,
        country,
        state,
        expertise,
        status,
        mentoring,
        volunteering,
        shareName,
      },
    })

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Membership registration error:', error)
    return { error: 'Failed to register. Please try again.' }
  }
}
