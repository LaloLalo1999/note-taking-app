import { useState } from 'react'
import { Id } from '../../convex/_generated/dataModel'
import { Search, Plus, FileText, Sparkles, Trash2 } from 'lucide-react'
import NoteEditorDemo from './NoteEditorDemo'
import AIAssistant from './AIAssistant'
import { useMockConvex } from '../lib/mockConvex'

/**
 * Interactive demo note-taking application UI with searchable sidebar, editor, and optional AI assistant.
 *
 * Renders a three-column interface: a left sidebar for searching, creating, selecting, and deleting notes;
 * a central editor pane for the selected note; and a right-side AI assistant panel that can be toggled when a note is open.
 * The component operates against mock note data provided by the demo data hooks.
 *
 * @returns The JSX element representing the note-taking demo interface
 */
export default function NoteTakingAppDemo() {
  const [selectedNoteId, setSelectedNoteId] = useState<Id<'notes'> | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  const { notes, createNote, deleteNote, getNote } = useMockConvex()
  const selectedNote = selectedNoteId ? getNote(selectedNoteId) : null

  const filteredNotes = searchTerm
    ? notes.filter(
        (note) =>
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

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Demo Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-purple-600 text-white text-center py-2 text-sm font-medium">
        🎭 Demo Mode - Using mock data. Run <code className="bg-purple-700 px-2 py-0.5 rounded">npx convex dev</code> for real backend.
      </div>

      <div className="flex w-full pt-10">
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
              filteredNotes.map((note) => (
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
                <NoteEditorDemo noteId={selectedNoteId!} note={selectedNote} />
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
    </div>
  )
}