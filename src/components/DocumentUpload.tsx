import React, { useRef } from "react";

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUpload,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-blue-50", "border-blue-400");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-blue-50", "border-blue-400");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-50", "border-blue-400");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative border-3 border-dashed border-blue-400 rounded-xl p-12 text-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf,.md"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isLoading}
      />
      <div
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className="cursor-pointer"
      >
        {isLoading ? (
          <>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            </div>
            <p className="text-xl font-bold text-blue-900">
              Uploading document...
            </p>
            <p className="text-gray-600 mt-2">
              Please wait while we process your file
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">📤</div>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              Drop your documents here
            </p>
            <p className="text-lg text-gray-600 mb-4">
              or click to select files
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                📄 TXT
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold">
                📕 PDF
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                📝 MD
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Maximum file size: 10MB • Supported formats: TXT, PDF, Markdown
            </p>
          </>
        )}
      </div>
    </div>
  );
};
