'use client'

import * as React from 'react'
import { CodeEditor } from '@/features/learning/components/code-editor'
import { LivePreview } from '@/features/learning/components/live-preview'
import { CopilotChat } from '@/features/learning/components/copilot-chat'
import { checkStepAction } from '@/features/learning/server/actions'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

// Simple mock for demonstration
const MOCK_LESSON = {
  id: 'step-1',
  title: 'Your First Heading',
  content: 'Create an <h1> tag that says "Hello World".',
  expected: '<h1>Hello World</h1>',
}

export default function LessonPage() {
  const t = useTranslations('Editor')
  const [code, setCode] = React.useState('<h1></h1>')
  const [activeTab, setActiveTab] = React.useState<'editor' | 'preview'>('editor')
  const [checkpointStatus, setCheckpointStatus] = React.useState<'idle' | 'checking' | 'passed' | 'failed'>('idle')
  const [feedback, setFeedback] = React.useState('')

  const handleCheck = async () => {
    setCheckpointStatus('checking')
    setFeedback('')
    const result = await checkStepAction({ stepId: MOCK_LESSON.id, code, expectedContent: MOCK_LESSON.expected })
    
    if (result.ok) {
      if (result.data.passed) {
        setCheckpointStatus('passed')
        setFeedback(t('passedFeedback') || 'Great job! You completed the step.')
      } else {
        setCheckpointStatus('failed')
        setFeedback(result.data.hint || 'Something is missing. Keep trying!')
      }
    } else {
      setCheckpointStatus('failed')
      setFeedback('Error checking your code.')
    }
  }

  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      {/* Left Panel: Instructions & Copilot */}
      <div className="w-[30%] flex flex-col border-r border-[var(--surface-variant)] bg-white overflow-hidden shrink-0 hidden md:flex">
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">{MOCK_LESSON.title}</h2>
          <p className="text-gray-700 text-lg">{MOCK_LESSON.content}</p>
          
          <div className="mt-8 pt-6 border-t border-[var(--surface-variant)]">
            <Button 
              variant={checkpointStatus === 'passed' ? 'secondary' : 'primary'} 
              className="w-full"
              onClick={handleCheck}
              isLoading={checkpointStatus === 'checking'}
            >
              {checkpointStatus === 'passed' ? 'Continue to Next Step' : 'Check My Work'}
            </Button>
            {feedback && (
              <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${
                checkpointStatus === 'passed' ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--error-container)] text-[var(--on-error-container)]'
              }`}>
                {feedback}
              </div>
            )}
          </div>
        </div>
        <div className="h-[400px] border-t border-[var(--surface-variant)]">
          <CopilotChat />
        </div>
      </div>

      {/* Right Panel: Editor & Preview */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Tabs */}
        <div className="flex md:hidden bg-[var(--surface-variant)] p-2 gap-2">
          <Button 
            variant={activeTab === 'editor' ? 'primary' : 'ghost'} 
            className="flex-1" 
            onClick={() => setActiveTab('editor')}
          >
            Code
          </Button>
          <Button 
            variant={activeTab === 'preview' ? 'primary' : 'ghost'} 
            className="flex-1" 
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </Button>
        </div>
        
        {/* Workspace Area */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 h-full overflow-hidden">
          <div className={`flex-1 h-full ${activeTab === 'editor' ? 'flex' : 'hidden md:flex'}`}>
            <CodeEditor stepId={MOCK_LESSON.id} initialCode={code} onChange={setCode} />
          </div>
          <div className={`flex-1 h-full ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}`}>
            <LivePreview code={code} />
          </div>
        </div>
      </div>
    </div>
  )
}
