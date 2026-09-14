"use client"

import { useState, useTransition, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { askAiTutorAction } from "@/lib/actions/ai-tutor"

interface AiTutorDrawerProps {
  lessonId: string
  isOpen: boolean
  onClose: () => void
  codeContext: { html: string; css: string; js: string }
}

interface Message {
  id: string
  sender: "user" | "tutor"
  text: string
  timestamp: string
}

export default function AiTutorDrawer({
  lessonId,
  isOpen,
  onClose,
  codeContext
}: AiTutorDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "tutor",
      text: "👋 Hi there! I'm your **Edutech AI Tutor**. Need help understanding your HTML/CSS code or finding bugs? Ask me anything!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ])
  const [inputPrompt, setInputPrompt] = useState("")
  const [isPending, startTransition] = useTransition()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!isOpen) return null

  const handleSend = (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    setMessages((prev) => [...prev, userMessage])
    if (!customPrompt) setInputPrompt("")

    startTransition(async () => {
      try {
        const result = await askAiTutorAction({
          lessonId,
          userPrompt: textToSend,
          codeContext
        })

        const tutorMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: "tutor",
          text: result.response,
          timestamp: new Date(result.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }

        setMessages((prev) => [...prev, tutorMessage])
      } catch (err: any) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: "tutor",
          text: `⚠️ Sorry, I encountered an error: ${err.message || "Failed to respond"}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    })
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col font-sans transition-all duration-300">
      {/* Drawer Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">AI Learning Assistant</h3>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Ready to help
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 text-base font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Preset Action Chips */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <button
          onClick={() => handleSend("Explain my current code")}
          disabled={isPending}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 whitespace-nowrap transition cursor-pointer"
        >
          💡 Explain code
        </button>
        <button
          onClick={() => handleSend("Find errors or bugs in my code")}
          disabled={isPending}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 whitespace-nowrap transition cursor-pointer"
        >
          🔍 Check for bugs
        </button>
        <button
          onClick={() => handleSend("Give me a hint for this lesson")}
          disabled={isPending}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 whitespace-nowrap transition cursor-pointer"
        >
          🎯 Lesson hint
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none shadow-sm"
              }`}
            >
              {msg.sender === "tutor" ? (
                <div className="prose prose-invert prose-xs max-w-none prose-headings:font-bold prose-headings:text-slate-100 prose-code:text-blue-300 prose-code:bg-slate-950 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
        {isPending && (
          <div className="flex items-center space-x-2 text-xs text-blue-400 bg-slate-800/60 p-3 rounded-xl border border-slate-800 w-fit">
            <span className="animate-spin">⏳</span>
            <span>AI Tutor is reviewing your code...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask AI Tutor a question..."
            disabled={isPending}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={isPending || !inputPrompt.trim()}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
