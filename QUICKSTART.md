# Quick Start Guide

## Setup Complete! ✅

Your RAG demonstration project has been successfully initialized with all core features.

## What Was Created

✅ **Frontend-only RAG System**

- Vite + React 19 + TypeScript
- Full-text search with Fuse.js
- OpenAI API integration
- Zustand state management
- Tailwind CSS styling

✅ **Core Services**

- Document indexing and storage
- Smart document chunking
- Retrieval and ranking
- Prompt augmentation
- LLM client

✅ **UI Pages**

- Home - Overview and tutorial
- Documents - Upload and manage files
- Q&A - Ask questions and see answers with sources
- Settings - Configure OpenAI API

## Running the Project

### 1. Configure Your API Key

Create `.env.local` in the project root:

```env
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

Get your key from: https://platform.openai.com/api-keys

### 2. Start Development Server

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

Server starts at: `http://localhost:5173`

### 3. Try It Out

1. Click "Documents" tab
2. Upload a text file (TXT, PDF, or Markdown)
3. Go to "Q&A" tab
4. Ask a question about your document
5. See AI-generated answers with source references

## Project Commands

```bash
# Development
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run lint
```

## Project Structure

```
src/
├── components/          # React UI components
├── services/           # Core business logic
├── store/              # Zustand state management
├── types/              # TypeScript definitions
├── utils/              # Helper functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Tailwind CSS
```

## Key Features Explained

### 📄 Document Upload

- Drag & drop or click to upload
- Supports: TXT, PDF, Markdown
- Automatic smart chunking
- Local browser storage

### 🔍 Smart Search

- Full-text search using Fuse.js
- BM25-like relevance scoring
- Retrieves top 5 most relevant chunks
- Shows relevance percentage for each source

### ✨ AI Generation

- OpenAI API integration
- Augmented prompts with document context
- Streaming support for long responses
- Shows which documents were used

### 💾 Privacy

- All documents stay in your browser
- No server storage
- Only question + context sent to OpenAI
- localStorage for persistence

## Troubleshooting

### "API key not configured"

→ Add `VITE_OPENAI_API_KEY` to `.env.local`

### Search not finding documents

→ Ensure documents are uploaded first
→ Try different search terms
→ Check browser console for errors

### Build errors

```bash
# Clear cache and reinstall
rm -rf node_modules dist .vite
bun install
bun run build
```

## Next Steps

1. ✅ Project initialized
2. ⬜ Test with sample documents
3. ⬜ Customize prompt template (in SettingsPage)
4. ⬜ Enhance search (add semantic search with embeddings)
5. ⬜ Deploy to production

## Resources

- [React Docs](https://react.dev/)
- [Vite Docs](https://vite.dev/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Fuse.js](https://fusejs.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)

## Support

Check the main README.md for detailed documentation and advanced features.

Happy coding! 🚀
