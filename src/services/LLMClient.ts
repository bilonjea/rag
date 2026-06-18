import axios from "axios";
import type { LLMRequest, LLMResponse } from "../types";

/**
 * Service for communicating with LLM APIs
 * Supports OpenAI and compatible APIs
 */
class LLMClientService {
  private apiKey: string;
  private apiBaseUrl: string = "https://api.openai.com/v1";
  private model: string = "gpt-3.5-turbo";

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
  }

  /**
   * Set the API key
   */
  setApiKey(key: string): void {
    this.apiKey = key;
  }

  /**
   * Set the model
   */
  setModel(model: string): void {
    this.model = model;
  }

  /**
   * Generate completion from LLM
   */
  async generateCompletion(request: LLMRequest): Promise<LLMResponse> {
    if (!this.apiKey) {
      throw new Error("API key not set. Please configure VITE_OPENAI_API_KEY");
    }

    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/chat/completions`,
        {
          model: request.model || this.model,
          messages: [{ role: "user", content: request.prompt }],
          max_tokens: request.maxTokens || 500,
          temperature: request.temperature || 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      const message = response.data.choices[0]?.message?.content;
      if (!message) {
        throw new Error("No response from LLM");
      }

      return {
        text: message,
        usage: {
          promptTokens: response.data.usage?.prompt_tokens || 0,
          completionTokens: response.data.usage?.completion_tokens || 0,
          totalTokens: response.data.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `LLM API Error: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

// Export singleton instance
export const llmClient = new LLMClientService();
