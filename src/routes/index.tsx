import { createFileRoute } from '@tanstack/react-router'
import NoteTakingApp from '../components/NoteTakingApp'
import NoteTakingAppDemo from '../components/NoteTakingAppDemo'
import { MockConvexProvider } from '../lib/mockConvex'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/')({ component: App })

/**
 * Renders the root app: the full NoteTakingApp when a Convex backend is available, otherwise a demo wrapped with a mock Convex provider.
 *
 * The selection is based on Convex backend availability (environment-configured Convex URL and API readiness).
 *
 * @returns The root React element: `NoteTakingApp` when Convex is available; otherwise `NoteTakingAppDemo` wrapped by `MockConvexProvider`.
 */
function App() {
  // Check if Convex is available by checking if the URL is configured
  const convexUrl = import.meta.env.VITE_CONVEX_URL
  const isConvexReady = convexUrl && convexUrl !== 'http://localhost:3210' && typeof api.notes?.getNotes === 'function'

  if (!isConvexReady) {
    return (
      <MockConvexProvider>
        <NoteTakingAppDemo />
      </MockConvexProvider>
    )
  }

  return <NoteTakingApp />
}