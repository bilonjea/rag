import { useState } from "react";
import { useRAGStore } from "./store";
import { HomePage } from "./components/HomePage";
import { DocumentsPage } from "./components/DocumentsPage";
import { QuestionInterface } from "./components/QuestionInterface";
import { SettingsPage } from "./components/SettingsPage";
import "./index.css";

type Page = "home" | "documents" | "qa" | "settings";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const { error, setError, documents } = useRAGStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setCurrentPage("home")}
            >
              <div className="text-4xl">✨</div>
              <div>
                <div className="text-2xl font-bold text-white">RAG</div>
                <span className="text-sm text-blue-100">Demonstration</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage("home")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  currentPage === "home"
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                }`}
              >
                <span>🏠</span> Home
              </button>
              <button
                onClick={() => setCurrentPage("documents")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 relative ${
                  currentPage === "documents"
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                }`}
              >
                <span>📚</span> Documents
                {documents.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                    {documents.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentPage("qa")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  currentPage === "qa"
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                }`}
              >
                <span>❓</span> Q&A
              </button>
              <button
                onClick={() => setCurrentPage("settings")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  currentPage === "settings"
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                }`}
              >
                <span>⚙️</span> Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Toast */}
      {error && (
        <div className="fixed top-24 right-4 max-w-md z-40 animate-pulse">
          <div className="bg-red-50 border-2 border-red-500 text-red-700 px-6 py-4 rounded-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <span className="font-semibold">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 font-bold text-xl ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="max-w-7xl mx-auto">
        {currentPage === "home" && <HomePage />}
        {currentPage === "documents" && <DocumentsPage />}
        {currentPage === "qa" && (
          <div className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">❓</span>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Ask Questions
                  </h1>
                </div>
                <p className="text-lg text-gray-600">
                  Ask questions about your uploaded documents and get AI-powered
                  answers grounded in your content. See which documents were
                  used to generate each answer with relevance scores.
                </p>
              </div>
              <QuestionInterface />
            </div>
          </div>
        )}
        {currentPage === "settings" && <SettingsPage />}
      </div>
    </div>
  );
}

export default App;
