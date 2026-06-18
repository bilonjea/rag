/**
 * Prompt templating and augmentation service
 */

export interface PromptTemplateConfig {
  template: string;
  contextPlaceholder?: string;
  questionPlaceholder?: string;
}

const DEFAULT_TEMPLATE = `You are a helpful assistant. Use the following context to answer the user's question.

Context:
{context}

Question: {question}

Answer:`;

class PromptTemplateService {
  private template: string = DEFAULT_TEMPLATE;

  /**
   * Set the prompt template
   */
  setTemplate(template: string): void {
    this.template = template;
  }

  /**
   * Get the current template
   */
  getTemplate(): string {
    return this.template;
  }

  /**
   * Reset to default template
   */
  resetToDefault(): void {
    this.template = DEFAULT_TEMPLATE;
  }

  /**
   * Augment a prompt with context
   */
  augmentPrompt(question: string, context: string): string {
    return this.template
      .replace("{context}", context)
      .replace("{question}", question);
  }

  /**
   * Validate template has required placeholders
   */
  isValid(template: string): boolean {
    return template.includes("{context}") && template.includes("{question}");
  }
}

// Export singleton instance
export const promptTemplate = new PromptTemplateService();
