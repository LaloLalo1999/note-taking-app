import { useState } from 'react'
import { X, Send, Wand2, FileText, Lightbulb } from 'lucide-react'

interface AIAssistantProps {
  noteContent: string
  onClose: () => void
}

export default function AIAssistant({ noteContent, onClose }: AIAssistantProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return

    const userMessage = message
    setMessage('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // In a real implementation, this would call the Mastra AI service
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I understand you want help with: "${userMessage}". This is a simulated response. To enable full AI capabilities, configure your Gemini API key in the environment variables.`,
        },
      ])
    } catch (error) {
      console.error('Error calling AI:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = async (action: 'improve' | 'summarize' | 'ideas') => {
    const prompts = {
      improve: 'Please improve and expand this note',
      summarize: 'Please provide a concise summary of this note',
      ideas: 'Please generate related ideas based on this note',
    }

    setMessage(prompts[action])
    // Auto-send after a brief delay
    setTimeout(() => handleSend(), 100)
  }

  return (
    <div className="h-full flex flex-col bg-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h3 className="font-semibold">AI Assistant</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-slate-700">
        <p className="text-xs text-slate-400 mb-2">Quick Actions:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickAction('improve')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded text-xs font-medium transition-colors"
            disabled={isLoading}
          >
            <Wand2 className="w-3 h-3" />
            Improve
          </button>
          <button
            onClick={() => handleQuickAction('summarize')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded text-xs font-medium transition-colors"
            disabled={isLoading}
          >
            <FileText className="w-3 h-3" />
            Summarize
          </button>
          <button
            onClick={() => handleQuickAction('ideas')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded text-xs font-medium transition-colors"
            disabled={isLoading}
          >
            <Lightbulb className="w-3 h-3" />
            Ideas
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-slate-400 text-sm mt-8">
            <p>Ask me anything about your note!</p>
            <p className="mt-2 text-xs">
              I can help you improve, summarize, or expand your ideas.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-slate-100 p-3 rounded-lg text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your note..."
            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Powered by Mastra + Gemini AI
        </p>
      </div>
    </div>
  )
}
