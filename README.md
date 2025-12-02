# Note Taking App

A modern note-taking application inspired by Obsidian and Notion, built with TanStack Start, Convex, and AI-powered features using Mastra and Google Gemini.

## Features

- 📝 **Markdown Support**: Write notes in markdown with live preview
- 🔍 **Real-time Search**: Quickly find notes by title or content
- 🤖 **AI Assistant**: Get help improving, summarizing, and expanding your notes using Gemini AI
- ⚡ **Real-time Sync**: Powered by Convex for instant updates
- 🎨 **Modern UI**: Clean, dark-mode interface inspired by Obsidian and Notion
- 🏷️ **Tags**: Organize your notes with tags

## Tech Stack

- **Frontend Framework**: TanStack Start (React)
- **Backend & Database**: Convex
- **AI Framework**: Mastra
- **AI Model**: Google Gemini
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with GitHub Flavored Markdown

## Getting Started

### Prerequisites

- Node.js 20+ (or Bun if available)
- A Convex account (optional for local development)
- Google Gemini API key (optional, for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LaloLalo1999/note-taking-app.git
cd note-taking-app
```

2. Install dependencies:
```bash
npm install
# or if you have bun:
# bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
- `VITE_CONVEX_URL`: Your Convex deployment URL (or `http://localhost:3210` for local)
- `GOOGLE_API_KEY`: Your Google Gemini API key
- `MASTRA_API_KEY`: Your Mastra API key (if required)

4. Start the Convex development server (in a separate terminal):
```bash
npx convex dev
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

### Creating Notes

1. Click the "New Note" button in the sidebar
2. Start typing your note content
3. Use markdown formatting for rich text

### AI Assistant

1. Select a note
2. Click the "AI Assistant" button
3. Use quick actions to:
   - **Improve**: Enhance your note's content and structure
   - **Summarize**: Get a concise summary
   - **Ideas**: Generate related ideas
4. Or ask custom questions about your note

### Markdown Support

The app supports full markdown syntax including:
- Headers (`# H1`, `## H2`, etc.)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- Code blocks and inline code
- Links and images
- Tables
- Blockquotes

## Project Structure

```
note-taking-app/
├── convex/                 # Convex backend
│   ├── schema.ts          # Database schema
│   ├── notes.ts           # Notes queries and mutations
│   └── _generated/        # Generated Convex types
├── src/
│   ├── components/        # React components
│   │   ├── NoteTakingApp.tsx    # Main app component
│   │   ├── NoteEditor.tsx       # Note editing interface
│   │   ├── AIAssistant.tsx      # AI chat interface
│   │   └── Header.tsx           # App header
│   ├── lib/               # Utilities and configurations
│   │   ├── convex.ts      # Convex client setup
│   │   └── mastra.ts      # Mastra AI configuration
│   ├── routes/            # TanStack Start routes
│   └── styles.css         # Global styles
├── package.json
└── README.md
```

## Development

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Deployment

This app can be deployed to various platforms:

- **Convex**: For the backend (follow [Convex deployment docs](https://docs.convex.dev/production))
- **Vercel/Netlify/Cloudflare**: For the frontend (TanStack Start supports all major platforms)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- Inspired by [Obsidian](https://obsidian.md/) and [Notion](https://notion.so/)
- Built with [TanStack Start](https://tanstack.com/start)
- Powered by [Convex](https://convex.dev/)
- AI features by [Mastra](https://mastra.ai/) and [Google Gemini](https://ai.google.dev/)
