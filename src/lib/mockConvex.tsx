import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Id } from '../../convex/_generated/dataModel'

interface Note {
  _id: Id<'notes'>
  _creationTime: number
  title: string
  content: string
  tags?: string[]
  createdAt: number
  updatedAt: number
}

interface MockConvexContextType {
  notes: Note[]
  createNote: (args: { title: string; content: string; tags?: string[] }) => Promise<Id<'notes'>>
  updateNote: (args: { id: Id<'notes'>; title?: string; content?: string; tags?: string[] }) => Promise<void>
  deleteNote: (args: { id: Id<'notes'> }) => Promise<void>
  getNote: (id: Id<'notes'>) => Note | undefined
}

const MockConvexContext = createContext<MockConvexContextType | null>(null)

/**
 * Provides an in-memory Convex-like context for managing notes and wraps its children with that context.
 *
 * The provider maintains a local list of notes and exposes `createNote`, `updateNote`, `deleteNote`, and `getNote` implementations to consumers.
 *
 * @param children - React nodes to render inside the provider
 * @returns The context provider element that supplies note state and CRUD helpers to its descendants
 */
export function MockConvexProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([
    {
      _id: 'note1' as Id<'notes'>,
      _creationTime: Date.now() - 3600000,
      title: 'Welcome to Note Taking App',
      content: `# Welcome! 👋

This is a demonstration note showing the markdown capabilities of this app.

## Features

- **Markdown Support**: Write in markdown with live preview
- **AI Assistant**: Get help from Gemini AI (configure API key)
- **Real-time Sync**: Powered by Convex backend
- **Search**: Quickly find your notes

## Try it out!

1. Create a new note
2. Edit this note
3. Try the preview mode
4. Use the AI assistant

\`\`\`javascript
// You can even add code blocks!
console.log('Hello from Note Taking App!');
\`\`\`

Happy note-taking! ✨`,
      tags: ['welcome', 'demo'],
      createdAt: Date.now() - 3600000,
      updatedAt: Date.now() - 3600000,
    },
    {
      _id: 'note2' as Id<'notes'>,
      _creationTime: Date.now() - 7200000,
      title: 'Meeting Notes',
      content: `# Team Meeting - Dec 2, 2025

## Attendees
- Alice
- Bob
- Charlie

## Agenda
1. Project updates
2. Sprint planning
3. Technical discussions

## Action Items
- [ ] Review pull requests
- [ ] Update documentation
- [ ] Schedule next meeting`,
      tags: ['meeting', 'work'],
      createdAt: Date.now() - 7200000,
      updatedAt: Date.now() - 7200000,
    },
  ])

  const createNote = useCallback(async (args: { title: string; content: string; tags?: string[] }) => {
    const now = Date.now()
    const newNote: Note = {
      _id: `note${Date.now()}` as Id<'notes'>,
      _creationTime: now,
      title: args.title,
      content: args.content,
      tags: args.tags || [],
      createdAt: now,
      updatedAt: now,
    }
    setNotes((prev) => [newNote, ...prev])
    return newNote._id
  }, [])

  const updateNote = useCallback(async (args: { id: Id<'notes'>; title?: string; content?: string; tags?: string[] }) => {
    setNotes((prev) =>
      prev.map((note) =>
        note._id === args.id
          ? {
              ...note,
              ...(args.title !== undefined && { title: args.title }),
              ...(args.content !== undefined && { content: args.content }),
              ...(args.tags !== undefined && { tags: args.tags }),
              updatedAt: Date.now(),
            }
          : note
      )
    )
  }, [])

  const deleteNote = useCallback(async (args: { id: Id<'notes'> }) => {
    setNotes((prev) => prev.filter((note) => note._id !== args.id))
  }, [])

  const getNote = useCallback((id: Id<'notes'>) => {
    return notes.find((note) => note._id === id)
  }, [notes])

  return (
    <MockConvexContext.Provider value={{ notes, createNote, updateNote, deleteNote, getNote }}>
      {children}
    </MockConvexContext.Provider>
  )
}

/**
 * Access the mock Convex context used for in-memory note management.
 *
 * @returns The mock Convex context object with `notes`, `createNote`, `updateNote`, `deleteNote`, and `getNote`.
 *
 * @throws Error if the hook is called outside of a `MockConvexProvider`.
 */
export function useMockConvex() {
  const context = useContext(MockConvexContext)
  if (!context) {
    throw new Error('useMockConvex must be used within MockConvexProvider')
  }
  return context
}