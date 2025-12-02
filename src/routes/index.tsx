import { createFileRoute } from '@tanstack/react-router'
import NoteTakingApp from '../components/NoteTakingApp'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return <NoteTakingApp />
}
