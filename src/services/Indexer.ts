import Fuse from "fuse.js";
import type { Chunk } from "../types";

/**
 * Service for indexing and searching chunks
 * Uses Fuse.js for full-text search with BM25-like scoring
 */
class IndexerService {
  private fuse: Fuse<Chunk> | null = null;
  private chunks: Chunk[] = [];

  /**
   * Build or rebuild the index from chunks
   */
  buildIndex(chunks: Chunk[]): void {
    this.chunks = [...chunks];

    this.fuse = new Fuse(chunks, {
      keys: [{ name: "content", weight: 1.0 }],
      includeScore: true,
      threshold: 0.6, // More lenient threshold for better matches
      minMatchCharLength: 1,
      useExtendedSearch: false,
      isCaseSensitive: false,
    });
    console.log(`[Indexer] Index built with ${chunks.length} chunks`);
  }

  /**
   * Search for chunks matching a query
   */
  search(query: string, limit: number = 5): Chunk[] {
    if (!this.fuse) {
      console.warn("Index not built. Call buildIndex first.");
      return [];
    }

    if (!query || query.trim().length === 0) {
      return [];
    }

    const results = this.fuse.search(query);
    return results.slice(0, limit).map((result) => result.item);
  }

  /**
   * Search with relevance scores (0-1)
   */
  searchWithScores(
    query: string,
    limit: number = 5,
  ): Array<{ chunk: Chunk; score: number }> {
    if (!this.fuse) {
      console.warn("Index not built. Call buildIndex first.");
      return [];
    }

    if (!query || query.trim().length === 0) {
      return [];
    }

    const results = this.fuse.search(query);
    return results.slice(0, limit).map((result) => ({
      chunk: result.item,
      score: result.score ? 1 - result.score : 0, // Convert Fuse score (0-1, lower is better) to relevance score
    }));
  }

  /**
   * Get index statistics
   */
  getStats() {
    return {
      chunksIndexed: this.chunks.length,
      isBuilt: this.fuse !== null,
    };
  }

  /**
   * Clear the index
   */
  clear(): void {
    this.fuse = null;
    this.chunks = [];
  }
}

// Export singleton instance
export const indexer = new IndexerService();
