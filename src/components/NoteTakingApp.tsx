import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { Search, Plus, FileText, Sparkles, Trash2 } from 'lucide-react'
import NoteEditor from './NoteEditor'
import AIAssistant from './AIAssistant'

interface Note {
  _id: Id<'notes'>
  _creationTime: number
  title: string
  content: string
  tags?: string[]
  createdAt: number
  updatedAt: number
}

export default function NoteTakingApp() {
  const [selectedNoteId, setSelectedNoteId] = useState<Id<'notes'> | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  // Check if api is properly initialized
  const convexUrl = import.meta.env.VITE_CONVEX_URL
  const isConvexReady = convexUrl && typeof api.notes?.getNotes === 'function'
  
  // Use conditional hook calls with type safety
  const notesQuery = isConvexReady ? api.notes.getNotes : undefined
  const noteQuery = isConvexReady && selectedNoteId ? api.notes.getNote : undefined
  const createNoteMutation = isConvexReady ? api.notes.createNote : undefined
  const deleteNoteMutation = isConvexReady ? api.notes.deleteNote : undefined
  
  const notes = (useQuery(notesQuery as any) as Note[] | undefined) || []
  const selectedNote = useQuery(
    noteQuery as any,
    selectedNoteId ? { id: selectedNoteId } : 'skip' as any
  ) as Note | null | undefined

  const createNote = useMutation(createNoteMutation as any)
  const deleteNote = useMutation(deleteNoteMutation as any)

  const filteredNotes = searchTerm
    ? notes.filter(
        (note: Note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : notes

  const handleCreateNote = async () => {
    const newNoteId = await createNote({
      title: 'Untitled Note',
      content: '',
      tags: [],
    })
    setSelectedNoteId(newNoteId)
  }

  const handleDeleteNote = async (id: Id<'notes'>) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote({ id })
      if (selectedNoteId === id) {
        setSelectedNoteId(null)
      }
    }
  }

  // Show setup message if Convex is not ready
  if (!isConvexReady) {
    return (
      <div className="flex h-screen bg-slate-900 text-slate-100 items-center justify-center">
        <div className="max-w-2xl p-8 bg-slate-800 rounded-lg border border-slate-700">
          <h1 className="text-3xl font-bold mb-4 text-cyan-400">Welcome to Note Taking App!</h1>
          <p className="text-slate-300 mb-4">
            To get started, you need to set up the Convex backend:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 mb-6">
            <li>Copy <code className="bg-slate-900 px-2 py-1 rounded">.env.example</code> to <code className="bg-slate-900 px-2 py-1 rounded">.env.local</code></li>
            <li>Run <code className="bg-slate-900 px-2 py-1 rounded">npx convex dev</code> in a separate terminal</li>
            <li>Optionally, add your Google Gemini API key for AI features</li>
            <li>Refresh this page</li>
          </ol>
          <p className="text-sm text-slate-400">
            See the README.md for detailed setup instructions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-700 flex flex-col">
        {/* Search and New Note */}
        <div className="p-4 border-b border-slate-700">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
            />
          </div>
          <button
            onClick={handleCreateNote}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="p-4 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notes yet</p>
              <p className="text-xs mt-1">Create your first note!</p>
            </div>
          ) : (
            filteredNotes.map((note: Note) => (
              <div
                key={note._id}
                onClick={() => setSelectedNoteId(note._id)}
                className={`p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors relative group ${
                  selectedNoteId === note._id ? 'bg-slate-800' : ''
                }`}
              >
                <h3 className="font-medium text-sm mb-1 truncate pr-8">
                  {note.title || 'Untitled'}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {note.content || 'Empty note'}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteNote(note._id)
                  }}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="border-b border-slate-700 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Edit Note</h2>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                AI Assistant
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <NoteEditor noteId={selectedNoteId!} note={selectedNote} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Select a note to start editing</p>
              <p className="text-sm mt-2">or create a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Sidebar */}
      {showAIAssistant && selectedNote && (
        <div className="w-96 border-l border-slate-700">
          <AIAssistant
            noteContent={selectedNote.content}
            onClose={() => setShowAIAssistant(false)}
          />
        </div>
      )}
    </div>
  )
}
