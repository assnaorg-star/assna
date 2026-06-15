import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `You are ASSNA Assistant, a helpful and knowledgeable AI chatbot for ASSNA (Association of Sri Lankan Statisticians in North America). You are friendly, professional, and concise.

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

If asked about specific upcoming event dates, prices, or registration details you don't have, kindly direct the user to check assna.org or contact the ASSNA team directly.

Always respond in a helpful, warm, and professional tone. Keep answers focused and relevant to ASSNA, statistics, or related professional topics. Use markdown formatting when appropriate (bold, lists, etc.) for clarity.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
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
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Understood. I am ready to assist as the ASSNA Assistant.' }] },
      ...history
    ]

    const chat = model.startChat({ history })

    const lastMessage = messages[messages.length - 1]
    const result = await chat.sendMessage(lastMessage.content)
    const response = result.response.text()

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}
