import type { Document, Chunk } from "../types";
import { smartChunk } from "../utils/chunking";

/**
 * Service for managing documents and their storage
 * Handles document import, storage, and retrieval
 */
class DocumentStoreService {
  private documents: Document[] = [];
  private storageKey = "rag_documents";

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Add a new document
   */
  addDocument(name: string, content: string): Document {
    const id = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const chunks = smartChunk(content, id);

    const document: Document = {
      id,
      name,
      content,
      size: content.length,
      uploadedAt: new Date(),
      chunks,
    };

    this.documents.push(document);
    this.saveToStorage();
    return document;
  }

  /**
   * Get all documents
   */
  getAllDocuments(): Document[] {
    return [...this.documents];
  }

  /**
   * Get document by ID
   */
  getDocument(id: string): Document | undefined {
    return this.documents.find((doc) => doc.id === id);
  }

  /**
   * Get all chunks from all documents
   */
  getAllChunks(): Chunk[] {
    return this.documents.flatMap((doc) => doc.chunks);
  }

  /**
   * Remove document by ID
   */
  removeDocument(id: string): boolean {
    const index = this.documents.findIndex((doc) => doc.id === id);
    if (index !== -1) {
      this.documents.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Clear all documents
   */
  clearAll(): void {
    this.documents = [];
    this.saveToStorage();
  }

  /**
   * Get storage statistics
   */
  getStats() {
    return {
      documentCount: this.documents.length,
      totalChunks: this.getAllChunks().length,
      totalSize: this.documents.reduce((sum, doc) => sum + doc.size, 0),
    };
  }

  /**
   * Save to localStorage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.documents));
    } catch (error) {
      console.error("Failed to save documents to storage:", error);
    }
  }

  /**
   * Load from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.documents = parsed.map((doc: any) => ({
          ...doc,
          uploadedAt: new Date(doc.uploadedAt),
        }));
      }
    } catch (error) {
      console.error("Failed to load documents from storage:", error);
      this.documents = [];
    }
  }
}

// Export singleton instance
export const documentStore = new DocumentStoreService();
