import type { Chunk } from "../types";

/**
 * Split document content into chunks
 * Uses paragraph-based chunking with configurable size
 */
export function chunkDocument(content: string, documentId: string): Chunk[] {
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const chunks: Chunk[] = [];
  let position = 0;

  paragraphs.forEach((paragraph, idx) => {
    const text = paragraph.trim();
    if (text.length > 0) {
      chunks.push({
        id: `${documentId}-chunk-${idx}`,
        documentId,
        content: text,
        position,
        index: idx,
      });
      position += text.length;
    }
  });

  return chunks;
}

/**
 * Split text by sentences (fallback for documents with poor paragraph structure)
 */
export function chunkBySentences(content: string, documentId: string): Chunk[] {
  const sentencesPerChunk = 3;
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  const chunks: Chunk[] = [];
  let chunkIndex = 0;

  for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
    const chunkSentences = sentences.slice(i, i + sentencesPerChunk);
    const chunkText = chunkSentences.join("").trim();

    if (chunkText.length > 0) {
      chunks.push({
        id: `${documentId}-chunk-${chunkIndex}`,
        documentId,
        content: chunkText,
        position: i,
        index: chunkIndex,
      });
      chunkIndex++;
    }
  }

  return chunks;
}

/**
 * Smart chunking - tries paragraph-based first, falls back to sentences
 */
export function smartChunk(content: string, documentId: string): Chunk[] {
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim().length > 0);

  // If we have good paragraph structure, use paragraph-based chunking
  if (paragraphs.length > 2) {
    return chunkDocument(content, documentId);
  }

  // Otherwise use sentence-based chunking
  return chunkBySentences(content, documentId);
}
