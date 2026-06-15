'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTED_QUESTIONS = [
  'What is ASSNA?',
  'What events does ASSNA host?',
  'How can I become a member?',
  'What are the benefits of joining?',
]

const DEFAULT_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hello! I'm the **ASSNA Assistant** 👋\n\nI can help you with information about ASSNA, our events, membership, and more. How can I assist you today?",
  timestamp: new Date(),
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ ...DEFAULT_MESSAGE }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false)
      setTimeout(() => {
        setMessages([{ ...DEFAULT_MESSAGE, timestamp: new Date() }])
        setShowSuggestions(true)
        setInput('')
      }, 300)
    } else {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, messages, scrollToBottom])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return

      setShowSuggestions(false)
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setIsLoading(true)
      setIsTyping(true)

      try {
        const allMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: allMessages }),
        })

        const data = await res.json()
        setIsTyping(false)

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message || data.error || 'Sorry, something went wrong.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } catch {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date(),
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* Floating Button */}
      <div className="chatbot-wrapper">
        <button
          id="chatbot-toggle"
          className={`chatbot-fab ${isOpen ? 'chatbot-fab--open' : ''}`}
          onClick={handleToggle}
          aria-label="Toggle ASSNA Assistant"
        >
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          )}
          {!isOpen && <span className="chatbot-fab__pulse" />}
        </button>

        {/* Chat Window */}
        <div
          ref={chatWindowRef}
          className={`chatbot-window ${isOpen ? 'chatbot-window--open' : ''}`}
          role="dialog"
          aria-label="ASSNA AI Assistant"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="chatbot-header__info">
              <h3 className="chatbot-header__title">ASSNA Assistant</h3>
            </div>
            <button
              className="chatbot-header__close"
              onClick={handleToggle}
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" id="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-msg ${msg.role === 'user' ? 'chatbot-msg--user' : 'chatbot-msg--assistant'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="chatbot-msg__avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4l3 3" />
                    </svg>
                  </div>
                )}
                <div className="chatbot-msg__content">
                  <div className="chatbot-msg__bubble">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="chatbot-md-p">{children}</p>,
                        strong: ({ children }) => <strong className="chatbot-md-strong">{children}</strong>,
                        ul: ({ children }) => <ul className="chatbot-md-ul">{children}</ul>,
                        ol: ({ children }) => <ol className="chatbot-md-ol">{children}</ol>,
                        li: ({ children }) => <li className="chatbot-md-li">{children}</li>,
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="chatbot-md-a">
                            {children}
                          </a>
                        ),
                        code: ({ children }) => <code className="chatbot-md-code">{children}</code>,
                        h1: ({ children }) => <h1 className="chatbot-md-h1">{children}</h1>,
                        h2: ({ children }) => <h2 className="chatbot-md-h2">{children}</h2>,
                        h3: ({ children }) => <h3 className="chatbot-md-h3">{children}</h3>,
                        blockquote: ({ children }) => <blockquote className="chatbot-md-blockquote">{children}</blockquote>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  <span className="chatbot-msg__time">{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chatbot-msg chatbot-msg--assistant">
                <div className="chatbot-msg__avatar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div className="chatbot-msg__content">
                  <div className="chatbot-msg__bubble chatbot-typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="chatbot-suggestions">
                <p className="chatbot-suggestions__label">Try asking:</p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    className="chatbot-suggestion-btn"
                    onClick={() => sendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <div className="chatbot-input-row">
              <textarea
                ref={inputRef}
                id="chatbot-input"
                className="chatbot-input"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about ASSNA, events, membership…"
                rows={1}
                disabled={isLoading}
                aria-label="Chat message input"
              />
              <button
                id="chatbot-send"
                className={`chatbot-send ${input.trim() && !isLoading ? 'chatbot-send--active' : ''}`}
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <p className="chatbot-footer-note">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </>
  )
}
