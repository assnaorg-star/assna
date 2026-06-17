import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Event } from '@prisma/client'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

function getSystemPrompt(eventsText: string) {
  return `You are ASSNA Assistant, a helpful and dedicated AI chatbot for ASSNA (Association of Sri Lankan Statisticians in North America). 

CRITICAL SAFETY & SCOPE RULE:
- You are strictly allowed ONLY to answer questions, explain topics, or provide information directly related to ASSNA (Association of Sri Lankan Statisticians in North America), its events, membership, organization goals, executive committee, resources, or statistics-related activities specifically connected to ASSNA.
- If the user asks about ANY other topic (such as general programming, unrelated history, coding assistance, math tutorials, recipes, creative writing, translating, sports, general knowledge, or general chat unrelated to ASSNA), you MUST politely refuse to answer.
- Your refusal message should be: "I'm sorry, but I am only authorized to answer questions directly related to ASSNA, its activities, events, and membership. Please let me know if you have any questions about ASSNA!"
- Do not answer even partially if a question is out of scope. Reject out-of-scope requests immediately.

About ASSNA:
- ASSNA stands for the Association of Sri Lankan Statisticians in North America
- It is a professional organization dedicated to advancing statistical science
- It strengthens professional networks among statisticians of Sri Lankan origin in North America
- The association promotes collaboration, mentorship, and career development in statistics and data science
- ASSNA hosts events including webinars, conferences, workshops, and networking events
- Members include statisticians, data scientists, biostatisticians, and related professionals
- The website is assna.org
- ASSNA connects the Sri Lankan statistical community across North America (USA and Canada)
- The organization promotes both professional development and cultural ties among its members

Key activities:
- Annual conferences and symposiums on statistical methods and applications
- Webinars featuring prominent statisticians and researchers
- Networking events for members to connect professionally
- Mentorship programs for early-career statisticians
- Collaboration with universities and research institutions
- Awards and recognition programs for outstanding contributions to statistics

ASSNA Events Information (from the database):
${eventsText}

If asked about specific upcoming event dates, details, that are NOT mentioned in the list above, or if they ask for details you don't have, tell the user: "Please send an email to info@assna.org to get this information."

Always respond in a helpful, warm, and professional tone. Keep answers strictly focused and relevant to ASSNA. Use markdown formatting when appropriate (bold, lists, etc.) for clarity.`
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Fetch all events from database to inject into system prompt
    let databaseEvents: Event[] = []
    try {
      databaseEvents = await prisma.event.findMany({
        orderBy: { date: 'asc' },
      })
    } catch (dbError) {
      console.error('Error fetching events for chatbot:', dbError)
    }

    const eventsText = databaseEvents.length > 0 
      ? databaseEvents.map(e => `
- Event Type: ${e.type}
  Talk Title: "${e.talkTitle}"
  Speaker: ${e.speaker} (${e.affiliation})
  Date: ${e.date.toISOString()}
  Description: ${e.description || 'No description provided'}
  Upcoming: ${e.isUpcoming ? 'Yes' : 'No'}
`).join('\n')
      : 'No events listed currently.';

    const systemPrompt = getSystemPrompt(eventsText)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    })

    // Build chat history (all except last message)
    let history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }))

    // Gemini requires the history to start with a 'user' message
    while (history.length > 0 && history[0].role === 'model') {
      history.shift()
    }

    // Inject System Prompt as the first interaction
    history = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Understood. I am ready to assist as the ASSNA Assistant.' }] },
      ...history
    ]

    const chat = model.startChat({ history })

    const lastMessage = messages[messages.length - 1]
    const result = await chat.sendMessage(lastMessage.content)
    const response = result.response.text()

    return NextResponse.json({ message: response })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: `Failed to process your request. Details: ${error?.message || String(error)}` },
      { status: 500 }
    )
  }
}
