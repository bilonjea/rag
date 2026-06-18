import React from "react";

interface DocumentCardProps {
  name: string;
  size: number;
  chunkCount: number;
  uploadedAt: Date;
  onRemove: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  name,
  size,
  chunkCount,
  uploadedAt,
  onRemove,
}) => {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 p-6 hover:shadow-lg transition-all hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">📄</div>
        <button
          onClick={onRemove}
          className="px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
        >
          🗑️ Delete
        </button>
      </div>

      <div>
        <h3 className="font-bold text-lg text-gray-900 truncate mb-2 hover:underline">
          {name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 bg-white rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span>📊</span>
            <span>
              <strong>{chunkCount}</strong> chunks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>💾</span>
            <span>
              <strong>{formatSize(size)}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>🕐</span>
            <span>
              {uploadedAt.toLocaleDateString()} at{" "}
              {uploadedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
