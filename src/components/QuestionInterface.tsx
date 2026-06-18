import React, { useState } from "react";
import { useRAGStore } from "../store";
import { retriever } from "../services/Retriever";
import { llmClient } from "../services/LLMClient";
import { promptTemplate } from "../services/PromptTemplate";
import { SourceCard } from "./SourceCard";

export const QuestionInterface: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addResponse, setError, apiKey } = useRAGStore();

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    if (!apiKey) {
      setError("Please configure your OpenAI API key in settings");
      return;
    }

    setIsLoading(true);
    setAnswer("");
    setSources([]);

    try {
      console.log("[Q&A] Retrieving documents...");
      // Retrieve relevant documents
      const results = retriever.retrieve(question, 5);
      console.log("[Q&A] Got", results.length, "results");
      setSources(results);

      if (results.length === 0) {
        console.warn("[Q&A] No relevant documents found");
        setAnswer(
          "No relevant documents found. Try rephrasing your question or uploading more documents.",
        );
        setIsLoading(false);
        return;
      }

      // Format context
      const context = retriever.formatContext(results);
      console.log("[Q&A] Formatted context", context.substring(0, 100));

      // Create augmented prompt
      const augmentedPrompt = promptTemplate.augmentPrompt(question, context);
      console.log("[Q&A] Augmented prompt created");

      // Generate response
      llmClient.setApiKey(apiKey);
      console.log("[Q&A] Calling LLM API...");
      const response = await llmClient.generateCompletion({
        prompt: augmentedPrompt,
      });
      console.log("[Q&A] Got LLM response");

      setAnswer(response.text);

      // Store response
      addResponse({
        question,
        answer: response.text,
        sources: results,
        timestamp: new Date(),
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "An error occurred";
      console.error("[Q&A] Error:", errorMsg);
      setError(errorMsg);
      setAnswer("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ask a question about your documents..."
            disabled={isLoading}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-lg font-medium placeholder-gray-400"
          />
          <button
            onClick={handleAsk}
            disabled={isLoading || !question.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 transition-all font-bold text-lg shadow-lg hover:shadow-xl"
          >
            {isLoading ? "🔄 Loading..." : "Ask ✨"}
          </button>
        </div>
        <p className="text-sm text-gray-500">
          💡 Tip: Upload documents first, then ask specific questions about them
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
          <p className="text-xl font-semibold text-gray-700">
            Searching your documents and generating answer...
          </p>
          <p className="text-gray-500 mt-2">This may take a few seconds</p>
        </div>
      )}

      {/* Answer Section */}
      {answer && (
        <div className="space-y-6">
          {/* Answer Box */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-300 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-xl">
              <span>💡</span> Answer
            </h3>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
              {answer}
            </p>
          </div>

          {/* Sources Section */}
          {sources.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-xl">
                <span>📚</span> Sources ({sources.length})
              </h3>
              <div className="space-y-4">
                {sources.map((source, idx) => (
                  <SourceCard key={idx} source={source} index={idx + 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !answer && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-gray-200">
          <div className="text-6xl mb-4">❓</div>
          <p className="text-xl text-gray-600">
            Ask a question about your documents to get started
          </p>
          <p className="text-gray-500 mt-2">
            Make sure you have uploaded documents and configured your API key
          </p>
        </div>
      )}
    </div>
  );
};
