import React, { useState } from "react";
import { useRAGStore } from "../store";
import { DocumentCard } from "./DocumentCard";
import { DocumentUpload } from "./DocumentUpload";

export const DocumentsPage: React.FC = () => {
  const { documents, addDocument, removeDocument, setError } = useRAGStore();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const text = await file.text();
      addDocument(file.name, text);
    } catch (error) {
      setError(
        `Failed to read file: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">📚</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Document Management
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Upload documents to build your searchable knowledge base
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <DocumentUpload onUpload={handleFileUpload} isLoading={isUploading} />
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Section Header */}
          <div className="mb-8 flex items-center justify-between border-b-2 border-gray-200 pb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                📄 Uploaded Documents
              </h2>
              <p className="text-gray-600">
                {documents.length}{" "}
                {documents.length === 1 ? "document" : "documents"} in your
                knowledge base
              </p>
            </div>
            {documents.length > 0 && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete all documents? This cannot be undone.",
                    )
                  ) {
                    documents.forEach((doc) => removeDocument(doc.id));
                  }
                }}
                className="px-6 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
              >
                🗑️ Clear All
              </button>
            )}
          </div>

          {/* Documents List */}
          {documents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-xl text-gray-600 mb-2">
                No documents uploaded yet
              </p>
              <p className="text-gray-500">
                Start by uploading a document above to build your knowledge base
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  name={doc.name}
                  size={doc.size}
                  chunkCount={doc.chunks.length}
                  uploadedAt={doc.uploadedAt}
                  onRemove={() => removeDocument(doc.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        {documents.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                TOTAL DOCUMENTS
              </h3>
              <p className="text-4xl font-bold text-blue-600">
                {documents.length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                TOTAL CHUNKS
              </h3>
              <p className="text-4xl font-bold text-purple-600">
                {documents.reduce((sum, doc) => sum + doc.chunks.length, 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                TOTAL SIZE
              </h3>
              <p className="text-4xl font-bold text-green-600">
                {(
                  documents.reduce((sum, doc) => sum + doc.size, 0) / 1024
                ).toFixed(1)}{" "}
                KB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
