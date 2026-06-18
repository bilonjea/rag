import { create } from "zustand";
import type { Document, RAGResponse } from "../types";
import { documentStore } from "../services/DocumentStore";
import { indexer } from "../services/Indexer";

interface RAGStore {
  // Document state
  documents: Document[];
  isLoading: boolean;
  error: string | null;

  // RAG state
  responses: RAGResponse[];
  apiKey: string;

  // Actions
  addDocument: (name: string, content: string) => void;
  removeDocument: (id: string) => void;
  clearAllDocuments: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  // API
  setApiKey: (key: string) => void;

  // RAG
  addResponse: (response: RAGResponse) => void;
  clearResponses: () => void;

  // Utils
  refreshDocuments: () => void;
}

export const useRAGStore = create<RAGStore>((set) => ({
  documents: [],
  isLoading: false,
  error: null,
  responses: [],
  apiKey: localStorage.getItem("openai_api_key") || "",

  addDocument: (name: string, content: string) => {
    try {
      console.log(`[Store] Adding document: ${name}`);
      const doc = documentStore.addDocument(name, content);
      console.log(`[Store] Document added with ${doc.chunks.length} chunks`);
      set((state) => ({
        documents: [...state.documents, doc],
      }));

      // Rebuild index with all documents
      const allChunks = documentStore.getAllChunks();
      indexer.buildIndex(allChunks);
      console.log(
        `[Store] Index rebuilt with ${allChunks.length} total chunks`,
      );
    } catch (error) {
      const errorMsg = `Failed to add document: ${error}`;
      console.error(`[Store] ${errorMsg}`);
      set({ error: errorMsg });
    }
  },

  removeDocument: (id: string) => {
    try {
      documentStore.removeDocument(id);
      set((state) => ({
        documents: state.documents.filter((doc) => doc.id !== id),
      }));

      // Rebuild index
      const allChunks = documentStore.getAllChunks();
      indexer.buildIndex(allChunks);
    } catch (error) {
      set({ error: `Failed to remove document: ${error}` });
    }
  },

  clearAllDocuments: () => {
    try {
      documentStore.clearAll();
      indexer.clear();
      set({
        documents: [],
        responses: [],
      });
    } catch (error) {
      set({ error: `Failed to clear documents: ${error}` });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setApiKey: (key: string) => {
    localStorage.setItem("openai_api_key", key);
    set({ apiKey: key });
  },

  addResponse: (response: RAGResponse) => {
    set((state) => ({
      responses: [response, ...state.responses],
    }));
  },

  clearResponses: () => {
    set({ responses: [] });
  },

  refreshDocuments: () => {
    const docs = documentStore.getAllDocuments();
    set({ documents: docs });
  },
}));
