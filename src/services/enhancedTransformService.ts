export interface TransformRequest {
  text: string;
  tool: 'humanize' | 'paraphrase' | 'tone' | 'simplify' | 'summarize' | 'grammar';
  tone?: 'friendly' | 'professional' | 'casual' | 'academic';
  maxWords?: number;
}

export interface TransformResponse {
  transformedText: string;
  originalCharCount: number;
  transformedCharCount: number;
  toolUsed: string;
}

export interface HistoryItem {
  id: string;
  inputText: string;
  outputText: string;
  toolUsed: string;
  date: string;
  tone?: string;
}

const getPromptForTool = (request: TransformRequest): string => {
  const { text, tool, tone } = request;

  switch (tool) {
    case 'humanize':
      return `You are a skilled human editor who specializes in making text sound more natural and engaging. Your task is to rework the input text so it keeps the same meaning and all important details, but with a more human touch.

Input text to humanize:
${text}

Instructions:
- Rewrite the text to preserve the original meaning and key details
- Use different words and phrasing while maintaining the same intent
- Keep all formatting elements like lists, headings, and structural cues unchanged
- Do not add extra information or remove essential content
- Introduce subtle grammar variations and natural inconsistencies to make it feel authentically human-written
- Maintain the same language as the input text
- Keep the word count within 5% of the original length
- Return ONLY the transformed text with no explanations, notes, or additional commentary

Maximum word limit: ${request.maxWords || 1000} words`;

    case 'paraphrase':
      return `You are an expert paraphraser. Rewrite the following text using different wording while preserving the exact meaning.

Input text to paraphrase:
${text}

Instructions:
- Use completely different vocabulary and sentence structure
- Maintain the original meaning and all key information
- Keep the same tone and style as the original
- Do not add or remove any important information
- Ensure proper grammar and flow
- Return ONLY the paraphrased text with no explanations

Maximum word limit: ${request.maxWords || 1000} words`;

    case 'tone':
      return `You are a tone adjustment expert. Rewrite the following text to match the specified tone while preserving the meaning.

Input text:
${text}

Target tone: ${tone}

Instructions:
- Adjust the language, vocabulary, and sentence structure to match the ${tone} tone
- Maintain all the original meaning and key information
- Make the tone consistent throughout the text
- Use appropriate language for the ${tone} context
- Return ONLY the rewritten text with no explanations

Maximum word limit: ${request.maxWords || 1000} words`;

    case 'simplify':
      return `You are an expert at simplifying complex text. Rewrite the following text so a 10th grade student can easily understand it.

Input text to simplify:
${text}

Instructions:
- Use simpler vocabulary and shorter sentences
- Break down complex ideas into easier concepts
- Maintain all the essential information and meaning
- Use clear, straightforward language
- Avoid jargon and technical terms unless necessary
- Return ONLY the simplified text with no explanations

Maximum word limit: ${request.maxWords || 1000} words`;

    case 'summarize':
      return `You are an expert summarizer. Summarize the following text clearly and concisely.

Input text to summarize:
${text}

Instructions:
- Extract the most important points and key information
- Create a shorter, more condensed version
- Maintain the original meaning and essential details
- Use clear and concise language
- Focus on the main ideas and conclusions
- Return ONLY the summary with no explanations

Target length: Approximately 30% of the original text
Maximum word limit: ${request.maxWords || 300} words`;

    case 'grammar':
      return `You are a grammar and style expert. Correct the grammar and improve readability of the following text without changing the meaning.

Input text to fix:
${text}

Instructions:
- Fix all grammar, spelling, and punctuation errors
- Improve sentence structure and flow
- Maintain the original meaning and tone
- Enhance readability while preserving the author's voice
- Do not add or remove any information
- Return ONLY the corrected text with no explanations

Maximum word limit: ${request.maxWords || 1000} words`;

    default:
      return text;
  }
};

export const transformText = async (request: TransformRequest): Promise<TransformResponse> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.");
    }

    const prompt = getPromptForTool(request);

    // Try gemini-1.5-flash first (more stable and has better free tier support)
    const models = [
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-pro'
    ];

    let lastError: Error | null = null;

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
              generationConfig: {
                temperature: 0.9,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
              },
            }),
          }
        );

        const data = await response.json();

        // If we hit rate limit, try next model
        if (!response.ok) {
          if (data.error?.message?.includes('quota') || data.error?.message?.includes('rate limit')) {
            console.warn(`Rate limit hit for model ${model}, trying next model...`);
            lastError = new Error(data.error.message);
            continue;
          }
          throw new Error(`Gemini API error: ${data.error?.message || response.statusText}`);
        }

        if (!data.candidates || data.candidates.length === 0) {
          throw new Error("No response generated from Gemini API");
        }

        const transformedText = data.candidates[0].content.parts[0].text.trim();

        // Save to history
        const historyItem: HistoryItem = {
          id: Date.now().toString(),
          inputText: request.text,
          outputText: transformedText,
          toolUsed: request.tool,
          date: new Date().toISOString(),
          tone: request.tone
        };

        saveToHistory(historyItem);

        return {
          transformedText,
          originalCharCount: request.text.length,
          transformedCharCount: transformedText.length,
          toolUsed: request.tool,
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown error");
        // If it's not a quota error, throw immediately
        if (!lastError.message.includes('quota') && !lastError.message.includes('rate limit')) {
          throw lastError;
        }
      }
    }

    // If all models failed, throw the last error
    throw new Error(
      `All Gemini models exhausted. ${lastError?.message || 'Please check your API quota and try again later.'}\n\n` +
      `Solutions:\n` +
      `1. Wait for quota to reset (check: https://ai.google.dev/gemini-api/docs/rate-limits)\n` +
      `2. Get a new API key from: https://aistudio.google.com/app/apikey\n` +
      `3. Upgrade to paid tier for higher limits\n` +
      `4. Monitor usage at: https://ai.google.dev/usage`
    );
  } catch (error) {
    console.error("Error transforming text:", error);
    throw error instanceof Error ? error : new Error("Unknown error occurred while transforming text");
  }
};

// History management
export const getHistory = (): HistoryItem[] => {
  try {
    const history = localStorage.getItem('humanify-history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
};

export const saveToHistory = (item: HistoryItem): void => {
  try {
    const history = getHistory();
    history.unshift(item); // Add to beginning
    
    // Keep only last 100 items
    if (history.length > 100) {
      history.splice(100);
    }
    
    localStorage.setItem('humanify-history', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem('humanify-history');
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

export const deleteHistoryItem = (id: string): void => {
  try {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem('humanify-history', JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting history item:', error);
  }
};

// Usage tracking
export const getUsageStats = () => {
  const today = new Date().toDateString();
  const history = getHistory();
  
  const todayTransformations = history.filter(item => 
    new Date(item.date).toDateString() === today
  ).length;
  
  const totalCharacters = history.reduce((sum, item) => 
    sum + item.inputText.length, 0
  );
  
  const toolUsage = history.reduce((acc, item) => {
    acc[item.toolUsed] = (acc[item.toolUsed] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostUsedTool = Object.entries(toolUsage)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'humanize';
  
  return {
    transformationsToday: todayTransformations,
    totalCharacters,
    mostUsedTool,
    remainingUses: Math.max(0, 10 - todayTransformations), // Free tier: 10 per day
    historyCount: history.length
  };
};
