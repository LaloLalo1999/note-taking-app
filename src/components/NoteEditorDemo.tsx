import { useState, useEffect } from 'react'
import { Id } from '../../convex/_generated/dataModel'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Eye, Edit } from 'lucide-react'
import { useMockConvex } from '../lib/mockConvex'

interface NoteEditorDemoProps {
  noteId: Id<'notes'>
  note: {
    title: string
    content: string
    tags?: string[]
  }
}

export default function NoteEditorDemo({ noteId, note }: NoteEditorDemoProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [isPreview, setIsPreview] = useState(false)
  const { updateNote } = useMockConvex()

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [noteId, note])

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    updateNote({ id: noteId, title: newTitle })
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    updateNote({ id: noteId, content: newContent })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Title */}
      <div className="p-6 border-b border-slate-700">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full text-3xl font-bold bg-transparent border-none focus:outline-none"
          placeholder="Untitled Note"
        />
      </div>

      {/* Editor Controls */}
      <div className="px-6 py-3 border-b border-slate-700 flex items-center gap-2">
        <button
          onClick={() => setIsPreview(false)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            !isPreview
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Edit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
        <button
          onClick={() => setIsPreview(true)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            isPreview
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4 inline mr-1" />
          Preview
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {isPreview ? (
          <div className="prose prose-invert prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || '*No content yet*'}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full h-full bg-transparent border-none focus:outline-none resize-none font-mono text-sm"
            placeholder="Start writing... (Markdown supported)"
          />
        )}
      </div>
    </div>
  )
}
