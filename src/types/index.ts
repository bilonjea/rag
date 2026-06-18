/**
 * Core Types for RAG System
 */

/**
 * Represents an imported document
 */
export interface Document {
  id: string;
  name: string;
  content: string;
  size: number;
  uploadedAt: Date;
  chunks: Chunk[];
}

/**
 * Represents a chunk of text from a document
 */
export interface Chunk {
  id: string;
  documentId: string;
  content: string;
  position: number;
  index?: number;
}

/**
 * Search result from retrieval
 */
export interface SearchResult {
  chunk: Chunk;
  score: number;
  document: Document;
}

/**
 * RAG Response with sources
 */
export interface RAGResponse {
  question: string;
  answer: string;
  sources: SearchResult[];
  timestamp: Date;
}

/**
 * LLM Request payload
 */
export interface LLMRequest {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * LLM Response
 */
export interface LLMResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * App State
 */
export interface AppState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
}
