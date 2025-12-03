# GitHub Copilot Instructions for Note Taking App

This is a modern note-taking application inspired by Obsidian and Notion, built with a cutting-edge tech stack focused on real-time collaboration, AI-powered assistance, and markdown editing.

## Tech Stack

### Frontend
- **Framework**: TanStack Start (React-based meta-framework)
- **UI Components**: Custom React components with Lucide icons
- **Styling**: Tailwind CSS v4 (using @tailwindcss/vite)
- **Markdown**: react-markdown with remark-gfm for GitHub Flavored Markdown
- **Router**: @tanstack/react-router for client and server-side routing

### Backend & Database
- **Backend**: Convex - provides real-time database, queries, and mutations
- **Schema**: Typed schema defined in `convex/schema.ts` with Zod validation
- **Data Model**: Notes with title, content, tags, timestamps

### AI Integration
- **AI Framework**: Mastra (@mastra/core) for orchestrating AI workflows
- **AI Model**: Google Gemini via @google/generative-ai
- **AI Features**: Note improvement, summarization, and idea generation tools

### Build & Dev Tools
- **Build Tool**: Vite v7 with TypeScript
- **Testing**: Vitest with @testing-library/react
- **Package Manager**: npm (also supports Bun)
- **Node Version**: Node 20+ (v22+ recommended)

## Project Structure

```
├── convex/                    # Convex backend
│   ├── schema.ts             # Database schema definitions
│   ├── notes.ts              # Queries and mutations for notes
│   └── _generated/           # Auto-generated Convex types and API
├── src/
│   ├── components/           # React UI components
│   │   ├── NoteTakingApp.tsx        # Main app (Convex-backed)
│   │   ├── NoteTakingAppDemo.tsx    # Demo mode (no backend required)
│   │   ├── NoteEditor.tsx           # Note editing interface
│   │   ├── NoteEditorDemo.tsx       # Demo editor
│   │   ├── AIAssistant.tsx          # AI chat interface
│   │   └── Header.tsx               # App header
│   ├── lib/                  # Utility libraries
│   │   ├── convex.ts         # Convex client setup
│   │   ├── mastra.ts         # Mastra AI configuration (re-exports)
│   │   └── mockConvex.tsx    # Mock Convex for demo mode
│   ├── mastra/               # Mastra AI implementation
│   │   ├── index.ts          # Main Mastra export
│   │   ├── agents/           # AI agent configurations
│   │   └── tools/            # AI tool definitions
│   ├── data/                 # Mock data for demo mode
│   ├── routes/               # TanStack Start route definitions
│   ├── router.tsx            # Router configuration
│   └── styles.css            # Global styles
```

## Coding Standards & Best Practices

### TypeScript
- **Strict Mode**: Always enabled - use explicit types
- **Type Safety**: Leverage Convex-generated types from `convex/_generated`
- **No Any**: Avoid `any` types; use proper type definitions
- **Modern Syntax**: Use ES2022+ features (async/await, optional chaining, etc.)

### React Patterns
- **Hooks**: Use functional components with React 19 hooks
- **State Management**: 
  - Use Convex's `useQuery` and `useMutation` for server state
  - Use `useState` for local UI state
  - Avoid prop drilling - component composition preferred
- **Component Structure**: Keep components focused and single-responsibility
- **JSDoc Comments**: Add JSDoc for exported components explaining their purpose

### Convex Integration
- **Queries**: Use `useQuery` from 'convex/react' for reading data
- **Mutations**: Use `useMutation` from 'convex/react' for writing data
- **API Access**: Import from `convex/_generated/api`
- **Type Safety**: Use `Id<'tableName'>` for document IDs
- **Demo Mode Support**: Always check if Convex is configured before using backend features

### AI/Mastra Patterns
- **Tool Definition**: Define AI tools in `src/mastra/tools/`
- **Agent Configuration**: Configure agents in `src/mastra/agents/`
- **Error Handling**: Always handle AI API failures gracefully
- **Environment Variables**: Use GOOGLE_API_KEY and MASTRA_API_KEY appropriately

### Styling
- **Tailwind CSS**: Use utility-first classes
- **Dark Mode**: Primary theme is dark (bg-gray-900, text-white)
- **Responsive**: Design mobile-first with responsive classes
- **Icons**: Use lucide-react for consistent iconography
- **Color Palette**: 
  - Primary backgrounds: gray-900, gray-800, gray-700
  - Accents: blue-500, blue-600 for interactive elements
  - Text: white, gray-300, gray-400

### File Naming
- **Components**: PascalCase (e.g., `NoteEditor.tsx`)
- **Utilities**: camelCase (e.g., `convex.ts`, `mastra.ts`)
- **Types**: Include in component files or separate `.types.ts` files

### Code Organization
- **Import Order**: 
  1. React imports
  2. Third-party libraries
  3. Convex imports (api, dataModel)
  4. Internal components
  5. Icons and assets
- **Export Pattern**: Use default exports for components, named exports for utilities

## Markdown Support

The app supports full GitHub Flavored Markdown (GFM):
- Headers (# H1, ## H2, etc.)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Inline `code`
- Links and images
- Tables
- Blockquotes
- Task lists

When working with markdown rendering, use `react-markdown` with `remark-gfm` plugin.

## Demo Mode

The app includes a comprehensive demo mode that works without a Convex backend:
- Mock data in `src/data/`
- Mock Convex implementation in `src/lib/mockConvex.tsx`
- Separate demo components (*Demo.tsx)
- Always ensure demo mode provides a seamless experience

## Environment Variables

- `VITE_CONVEX_URL`: Convex deployment URL (required for production)
- `GOOGLE_API_KEY`: Google Gemini API key (for AI features)
- `MASTRA_API_KEY`: Mastra API key (if required)

## Testing Guidelines

- Use Vitest for unit and integration tests
- Use @testing-library/react for component testing
- Test files should be co-located with components or in `__tests__` directories
- Mock Convex queries/mutations in tests
- Run tests with `npm test`

## Common Patterns

### Creating a New Component
```typescript
import { useState } from 'react'
import { SomeIcon } from 'lucide-react'

interface MyComponentProps {
  title: string
  onAction?: () => void
}

/**
 * Brief description of what this component does.
 */
export default function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState('')
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      {/* Component content */}
    </div>
  )
}
```

### Adding a Convex Query
```typescript
// In convex/notes.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getNote = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

### Using Convex in Components
```typescript
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

const notes = useQuery(api.notes.getNotes)
const createNote = useMutation(api.notes.createNote)

const handleCreate = async () => {
  await createNote({ title: "New Note", content: "" })
}
```

### Integrating AI Tools
```typescript
// Define tools in src/mastra/tools/
// Use tools in AIAssistant component
// Always handle async operations and errors
```

## Performance Considerations

- Convex provides automatic query caching and reactivity
- Use proper React keys when rendering lists
- Lazy load components when appropriate
- Optimize markdown rendering for large documents

## Security Notes

- Never commit API keys to git
- Use environment variables for all secrets
- Validate all user input before storing
- Sanitize markdown content if rendering user HTML

## Documentation

- Keep README.md updated with setup instructions
- Document major architectural decisions
- Add JSDoc comments to exported functions and components
- Include examples for complex patterns

## Getting Started for Contributors

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and configure
4. Run `npx convex dev` in one terminal (optional for demo mode)
5. Run `npm run dev` in another terminal
6. Open http://localhost:3000

When suggesting code, follow these patterns and maintain consistency with the existing codebase.
