# RAG Demonstration Project

A frontend-only Retrieval Augmented Generation (RAG) system built with Vite, React, and TypeScript.

## Overview

This application demonstrates how RAG works by allowing users to:

1. **Upload documents** - Import text files to create a searchable knowledge base
2. **Ask questions** - Query the indexed documents using natural language
3. **Get AI-powered answers** - Receive responses grounded in your document content
4. **See sources** - Review which documents were used to generate answers

## Features

- 📄 **Document Management** - Upload and manage documents (TXT, PDF, Markdown)
- 🔍 **Smart Search** - Full-text search with relevance scoring
- ✨ **AI Integration** - OpenAI API integration for answer generation
- 💾 **Local Storage** - All documents stored locally in your browser
- 🎨 **Modern UI** - Built with Tailwind CSS for responsive design
- 🔐 **Privacy** - No data sent to servers (except prompts to OpenAI)

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Runtime**: Bun (or npm)
- **State Management**: Zustand
- **Search**: Fuse.js (BM25-like search)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Quick Start

### Prerequisites

- Node.js 18+ (or Bun)
- OpenAI API key

### Installation

```bash
# Install dependencies with Bun
bun install

# Or with npm
npm install
```

### Configuration

1. Create a `.env.local` file in the project root:

```env
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

2. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### Development

```bash
# Run development server with Bun
bun run dev

# Or with npm
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
bun run build

# Or with npm
npm run build
```

## Project Structure

```
src/
├── components/           # React components
│   ├── DocumentCard.tsx
│   ├── DocumentUpload.tsx
│   ├── DocumentsPage.tsx
│   ├── HomePage.tsx
│   ├── QuestionInterface.tsx
│   ├── SettingsPage.tsx
│   └── SourceCard.tsx
├── services/            # Core business logic
│   ├── DocumentStore.ts      # Document management
│   ├── Indexer.ts            # Search indexing
│   ├── LLMClient.ts          # OpenAI API client
│   ├── PromptTemplate.ts     # Prompt formatting
│   └── Retriever.ts          # Document retrieval
├── store/               # State management (Zustand)
│   └── index.ts
├── types/               # TypeScript types
│   └── index.ts
├── utils/               # Utility functions
│   └── chunking.ts      # Document chunking
├── App.tsx              # Main app component
├── index.css            # Tailwind CSS
└── main.tsx             # App entry point
```

## How RAG Works

1. **Indexing Phase**: Documents are split into chunks and indexed using full-text search
2. **Retrieval Phase**: When a question is asked, the system finds K most relevant chunks
3. **Augmentation Phase**: Relevant chunks are formatted and added to the AI prompt
4. **Generation Phase**: The AI model generates an answer using the augmented prompt
5. **Response**: User receives the answer with source references

## Usage Guide

### Upload Documents

1. Click the **Documents** tab
2. Drag and drop files or click to select
3. Supported formats: TXT, PDF, Markdown
4. Documents are automatically indexed

### Ask Questions

1. Click the **Q&A** tab
2. Configure your OpenAI API key in **Settings** if not done yet
3. Type your question and press Enter or click Ask
4. Review the answer and sources

### Manage Settings

1. Click the **Settings** tab
2. Add your OpenAI API key
3. Settings are saved to browser storage

## Document Indexing

Documents are automatically split into chunks using a smart chunking strategy:

- **Paragraph-based**: If document has clear paragraph structure, uses paragraph boundaries
- **Sentence-based**: Falls back to sentence-based chunking for documents without paragraphs
- **Optimization**: Each chunk is optimized for search relevance (256-512 tokens)

## Search Algorithm

The search uses **Fuse.js** with BM25-like scoring:

- **Keyword matching**: Finds chunks containing query terms
- **Relevance scoring**: Ranks results by match quality
- **Threshold filtering**: Optional filtering by minimum relevance score

## Privacy & Security

- ✅ **No server storage**: Documents only stored in your browser's localStorage
- ✅ **Local indexing**: Search happens entirely in your browser
- ✅ **Selective API calls**: Only questions and relevant excerpts sent to OpenAI
- ⚠️ **API Key management**: Store keys securely, use rate limiting on your account

## Troubleshooting

### API Key Not Working

- Verify key is valid at [OpenAI Platform](https://platform.openai.com/api-keys)
- Check that key has sufficient balance
- Verify no rate limiting is applied
- Check browser console for detailed error messages

### Search Not Finding Documents

- Ensure documents are uploaded and indexed
- Try using different search terms
- Check browser console for errors
- Verify localStorage is enabled

### Build Errors

- Clear `node_modules` and reinstall: `bun install`
- Clear Vite cache: `rm -rf .vite`
- Check Node/Bun version compatibility

## Resources

- [RAG Overview](https://cloud.google.com/use-cases/retrieval-augmented-generation)
- [OpenAI API Docs](https://platform.openai.com/docs/api-reference)
- [Fuse.js Documentation](https://fusejs.io/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

        // Enable lint rules for React DOM
        reactDom.configs.recommended,
      ],
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
        // other options...
      },

  },
  ])

```

```
