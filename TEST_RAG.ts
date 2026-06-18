/**
 * Test file for RAG application
 * Run this in browser console to test all features
 */

// ============================================
// 1. TEST DOCUMENT STORE
// ============================================
console.log("🧪 TESTING DOCUMENT STORE...");

const testContent = `Python is a programming language.
Python is known for its simplicity.
Python supports multiple paradigms.
Python has a large community.
Python is used in data science.`;

// Import services
import { documentStore } from "./src/services/DocumentStore";
import { indexer } from "./src/services/Indexer";
import { retriever } from "./src/services/Retriever";
import { promptTemplate } from "./src/services/PromptTemplate";

// Test document add
const doc = documentStore.addDocument("test.txt", testContent);
console.log("✅ Document added:", doc);
console.log("📊 Chunks created:", doc.chunks.length);

// ============================================
// 2. TEST INDEXER
// ============================================
console.log("\n🧪 TESTING INDEXER...");

const allChunks = documentStore.getAllChunks();
console.log("📊 Total chunks in store:", allChunks.length);

indexer.buildIndex(allChunks);
console.log("✅ Index built");

// ============================================
// 3. TEST SEARCH
// ============================================
console.log("\n🧪 TESTING SEARCH...");

const searchQuery = "Python programming";
const results = indexer.searchWithScores(searchQuery, 5);
console.log(`🔍 Search results for "${searchQuery}":`, results);

if (results.length === 0) {
  console.error("❌ SEARCH FAILED: No results returned!");
} else {
  console.log("✅ Search working, found", results.length, "results");
}

// ============================================
// 4. TEST RETRIEVER
// ============================================
console.log("\n🧪 TESTING RETRIEVER...");

try {
  const retrieved = retriever.retrieve(searchQuery, 5);
  console.log("✅ Retriever results:", retrieved);

  if (retrieved.length > 0) {
    const context = retriever.formatContext(retrieved);
    console.log("📝 Formatted context:\n", context);
  }
} catch (error) {
  console.error("❌ RETRIEVER ERROR:", error);
}

// ============================================
// 5. TEST PROMPT TEMPLATE
// ============================================
console.log("\n🧪 TESTING PROMPT TEMPLATE...");

const template = promptTemplate.getTemplate();
console.log("📋 Current template:", template);

const augmented = promptTemplate.augmentPrompt(
  searchQuery,
  "Test context here",
);
console.log("✅ Augmented prompt:\n", augmented);

// ============================================
// 6. TEST STORAGE PERSISTENCE
// ============================================
console.log("\n🧪 TESTING STORAGE PERSISTENCE...");

const stored = localStorage.getItem("rag_documents");
console.log("💾 Stored documents in localStorage:", !!stored);
if (stored) {
  const parsed = JSON.parse(stored);
  console.log("📊 Stored docs count:", parsed.length);
}

// ============================================
// SUMMARY
// ============================================
console.log("\n================================");
console.log("✅ ALL TESTS COMPLETED");
console.log("================================\n");
