import { createFileRoute } from '@tanstack/react-router'
import NoteTakingApp from '../components/NoteTakingApp'
import NoteTakingAppDemo from '../components/NoteTakingAppDemo'
import { MockConvexProvider } from '../lib/mockConvex'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/')({ component: App })

function App() {
  // Check if Convex is available
  const isConvexReady = api && api.notes && api.notes.getNotes

  if (!isConvexReady) {
    return (
      <MockConvexProvider>
        <NoteTakingAppDemo />
      </MockConvexProvider>
    )
  }

  return <NoteTakingApp />
}
