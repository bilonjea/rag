import React from "react";
import type { SearchResult } from "../types";

interface SourceCardProps {
  source: SearchResult;
  index: number;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, index }) => {
  const scorePercentage = Math.round(source.score * 100);

  const getRelevanceBadge = () => {
    if (scorePercentage >= 80) {
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-800",
        label: "🔥 Highly Relevant",
      };
    } else if (scorePercentage >= 60) {
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "✓ Relevant",
      };
    } else if (scorePercentage >= 40) {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "⚠ Somewhat Relevant",
      };
    } else {
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "Low Match",
      };
    }
  };

  const badge = getRelevanceBadge();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            {index}
          </div>
          <div>
            <p className="text-sm text-gray-600">Source Document</p>
            <h4 className="font-bold text-gray-900 text-lg">
              {source.document.name}
            </h4>
          </div>
        </div>
        <div
          className={`${badge.bg} ${badge.text} px-3 py-2 rounded-lg font-semibold text-sm`}
        >
          {badge.label}
        </div>
      </div>

      {/* Content Preview */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        <p className="text-gray-700 leading-relaxed line-clamp-4 text-sm">
          {source.chunk.content}
        </p>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            📊 Relevance Score:
            <span className="font-bold text-blue-600 ml-2">
              {scorePercentage}%
            </span>
          </span>
        </div>
        {/* Relevance Bar */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
