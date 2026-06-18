import React from "react";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            RAG Demonstration
          </h1>
          <p className="text-2xl text-gray-700 font-light">
            Retrieval Augmented Generation for Intelligent Q&A
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-t-4 border-blue-500">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Upload Documents
            </h3>
            <p className="text-gray-600 text-lg">
              Import your documents (TXT, PDF, MD) to create a searchable
              knowledge base
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-t-4 border-purple-500">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Smart Retrieval
            </h3>
            <p className="text-gray-600 text-lg">
              System finds the most relevant documents matching your question
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-t-4 border-pink-500">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              AI Generation
            </h3>
            <p className="text-gray-600 text-lg">
              AI generates answers grounded in your document context
            </p>
          </div>
        </div>
      </div>

      {/* How RAG Works Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            How Does RAG Work?
          </h2>

          {/* Process Flow */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Retrieval</h3>
                  <p className="text-gray-600 mt-2">
                    Finding the most relevant document excerpts from your
                    knowledge base that match the user's query
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500 text-white font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Augmentation
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Enriching the prompt with relevant context from your
                    documents
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-pink-500 text-white font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Generation
                  </h3>
                  <p className="text-gray-600 mt-2">
                    AI generates accurate answers grounded in your document
                    context
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🔄</div>
                <p className="text-gray-700 font-semibold text-lg">
                  Three-Step Process for Better Answers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🚀 Get Started in 3 Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Upload Documents</h3>
              <p className="text-blue-50">
                Click Documents tab and upload your files
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Configure API</h3>
              <p className="text-blue-50">
                Add your OpenAI API key in Settings
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Ask Questions</h3>
              <p className="text-blue-50">Go to Q&A and ask your questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Use RAG?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ✅ More Accurate
            </h3>
            <p className="text-gray-600">
              Answers are based on your actual documents, not just AI training
              data
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🔒 Private & Secure
            </h3>
            <p className="text-gray-600">
              Your documents stay on your computer, nothing is stored on servers
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              📚 Transparent
            </h3>
            <p className="text-gray-600">
              See exactly which documents were used to generate each answer
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ⚡ Fast & Efficient
            </h3>
            <p className="text-gray-600">
              Get instant answers with intelligent document retrieval
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
