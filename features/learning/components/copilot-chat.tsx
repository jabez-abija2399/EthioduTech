/* eslint-disable */
'use client'

import * as React from 'react'
import { useChat } from 'ai/react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, Bot, User, HelpCircle } from 'lucide-react'

export function CopilotChat() {
  const t = useTranslations('Copilot') // We need to add these to messages
  const locale = useLocale()
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    body: { locale },
    api: '/api/chat'
  })

  // "I'm stuck" quick action
  const handleStuck = () => {
    append({
      role: 'user',
      content: t('imStuckMessage') || "I'm stuck on this step. Can you help me figure out what's wrong without giving me the answer?"
    })
  }

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-sm ml-auto border-l shadow-xl rounded-none sm:rounded-xl">
      <CardHeader className="bg-[var(--surface-variant)] py-4 rounded-t-xl">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5 text-[var(--primary)]" />
          {t('title') || 'AI Copilot'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-sm text-gray-500 mt-10">
            {t('emptyState') || "Hi! I'm here to help you learn. What are you working on?"}
          </div>
        )}
        
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-lg p-3 text-sm ${
                m.role === 'user' 
                  ? 'bg-[var(--primary)] text-[var(--on-primary)] rounded-tr-none' 
                  : 'bg-[var(--surface-variant)] text-[var(--foreground)] rounded-tl-none'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex flex-col p-4 bg-[var(--surface)] border-t border-[var(--surface-variant)] rounded-b-xl gap-2">
        {messages.length === 0 && (
          <Button variant="secondary" size="sm" className="w-full text-xs" onClick={handleStuck}>
            <HelpCircle className="w-4 h-4 mr-2" />
            {t('imStuckBtn') || "I'm stuck!"}
          </Button>
        )}
        
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input 
            value={input}
            onChange={handleInputChange}
            placeholder={t('placeholder') || "Ask for a hint..."}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" variant="primary" disabled={isLoading || !input.trim()} className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
