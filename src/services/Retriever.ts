import type { SearchResult } from "../types";
import { indexer } from "./Indexer";
import { documentStore } from "./DocumentStore";

/**
 * Service for retrieving relevant documents/chunks
 */
class RetrieverService {
  /**
   * Retrieve top K most relevant chunks for a query
   */
  retrieve(query: string, k: number = 5): SearchResult[] {
    console.log(`[Retriever] Retrieving top ${k} results for: "${query}"`);
    const results = indexer.searchWithScores(query, k);
    console.log(`[Retriever] Got ${results.length} search results`);

    return results.map((result) => {
      const document = documentStore.getDocument(result.chunk.documentId);
      if (!document) {
        console.error(
          `[Retriever] Document not found: ${result.chunk.documentId}`,
        );
        throw new Error(`Document not found: ${result.chunk.documentId}`);
      }

      return {
        chunk: result.chunk,
        score: result.score,
        document,
      };
    });
  }

  /**
   * Retrieve with minimum score threshold
   */
  retrieveByThreshold(query: string, threshold: number = 0.5): SearchResult[] {
    const results = indexer.searchWithScores(query, 20); // Get more results to filter

    return results
      .filter((result) => result.score >= threshold)
      .map((result) => {
        const document = documentStore.getDocument(result.chunk.documentId);
        if (!document) {
          throw new Error(`Document not found: ${result.chunk.documentId}`);
        }

        return {
          chunk: result.chunk,
          score: result.score,
          document,
        };
      });
  }

  /**
   * Format retrieved results as context for LLM
   */
  formatContext(results: SearchResult[]): string {
    if (results.length === 0) {
      return "No relevant documents found.";
    }

    return results
      .map(
        (result, idx) =>
          `[Source ${idx + 1}: ${result.document.name}]\n${result.chunk.content}`,
      )
      .join("\n\n---\n\n");
  }
}

// Export singleton instance
export const retriever = new RetrieverService();
