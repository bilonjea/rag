import React, { useState, useEffect } from "react";
import { useRAGStore } from "../store";
import { llmClient } from "../services/LLMClient";

export const SettingsPage: React.FC = () => {
  const { apiKey, setApiKey } = useRAGStore();
  const [tempKey, setTempKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTempKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    setApiKey(tempKey);
    llmClient.setApiKey(tempKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">⚙️</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
              <p className="text-lg text-gray-600 mt-2">
                Configure your RAG application
              </p>
            </div>
          </div>
        </div>

        {/* API Configuration Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span>🔑</span> OpenAI API Configuration
          </h2>
          <p className="text-gray-600 mb-6">
            Configure your OpenAI API key to enable AI-powered question
            answering
          </p>

          <div className="space-y-6">
            {/* API Key Input */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 font-semibold"
                >
                  {showKey ? "👁️ Hide" : "👁️ Show"}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Get your API key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  platform.openai.com/api-keys ↗
                </a>
              </p>
            </div>

            {/* Save Button */}
            <div>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-bold text-lg shadow-lg"
              >
                💾 Save Settings
              </button>
              {saved && (
                <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-lg font-semibold">
                  <span className="text-2xl">✅</span>
                  <span>Settings saved successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security & Privacy Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span>🔒</span> Security & Privacy
          </h3>

          <div className="space-y-4">
            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <div className="text-2xl">📄</div>
              <div>
                <p className="font-semibold text-gray-900">
                  Your documents stay private
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Documents are stored locally in your browser and never sent to
                  our servers
                </p>
              </div>
            </div>

            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <div className="text-2xl">🔐</div>
              <div>
                <p className="font-semibold text-gray-900">
                  Minimal data sharing
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Only your questions and relevant document excerpts are sent to
                  OpenAI for processing
                </p>
              </div>
            </div>

            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <div className="text-2xl">💾</div>
              <div>
                <p className="font-semibold text-gray-900">Local storage</p>
                <p className="text-gray-600 text-sm mt-1">
                  Your API key is stored in your browser's local storage for
                  your convenience
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">⚠️</div>
              <div>
                <p className="font-semibold text-gray-900">
                  Secure your account
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Always use official OpenAI API keys and enable rate limiting
                  in your account to protect against misuse
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
