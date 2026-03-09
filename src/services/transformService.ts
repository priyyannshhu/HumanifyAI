export interface TransformRequest {
  text: string;
  maxWords?: number;
}

export interface TransformResponse {
  transformedText: string;
  originalCharCount: number;
  transformedCharCount: number;
}

export const transformText = async (request: TransformRequest): Promise<TransformResponse> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.");
    }

    const prompt = `You are a skilled human editor who specializes in making text sound more natural and engaging. Your task is to rework the input text so it keeps the same meaning and all important details, but with a more human touch.

Input text to humanize:
${request.text}

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

        const humanizedText = data.candidates[0].content.parts[0].text.trim();

        return {
          transformedText: humanizedText,
          originalCharCount: request.text.length,
          transformedCharCount: humanizedText.length,
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