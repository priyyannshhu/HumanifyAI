export interface TransformRequest {
  text: string;
  tool: 'humanize' | 'paraphrase' | 'tone' | 'simplify' | 'summarize' | 'grammar' | 'expand' | 'rewrite' | 'academic' | 'creative' | 'professional' | 'casual' | 'formal';
  tone?: 'friendly' | 'professional' | 'casual' | 'academic' | 'creative' | 'persuasive' | 'technical' | 'empathetic';
  maxWords?: number;
  creativity?: number; // 0-1 for creative variations
  formality?: number; // 0-1 for formality level
}

export interface TransformResponse {
  transformedText: string;
  originalCharCount: number;
  transformedCharCount: number;
  toolUsed: string;
  confidence?: number;
  suggestions?: string[];
}

export interface HistoryItem {
  id: string;
  inputText: string;
  outputText: string;
  toolUsed: string;
  date: string;
  tone?: string;
  creativity?: number;
  formality?: number;
}

const getAdvancedPromptForTool = (request: TransformRequest): string => {
  const { text, tool, tone, creativity = 0.7, formality = 0.5 } = request;

  switch (tool) {
    case 'humanize':
      return `You are an expert human writer specializing in converting AI-generated text into natural, human-like content that bypasses AI detection.

TEXT TO HUMANIZE:
${text}

REQUIREMENTS:
- Rewrite to sound naturally human-written with authentic voice
- Add subtle imperfections and natural language patterns
- Vary sentence structure and rhythm
- Use conversational yet professional tone
- Include natural idioms and expressions where appropriate
- Maintain exact meaning and all key information
- Preserve formatting and structure
- Creativity level: ${creativity} (0=conservative, 1=creative)
- Formality level: ${formality} (0=casual, 1=formal)

OUTPUT ONLY the humanized text without explanations.`;

    case 'paraphrase':
      return `You are a master paraphraser with exceptional vocabulary and writing skills.

TEXT TO PARAPHRASE:
${text}

REQUIREMENTS:
- Use completely different vocabulary and sentence structures
- Maintain identical meaning and nuance
- Vary complexity and style
- Use advanced vocabulary where appropriate
- Creativity level: ${creativity}
- Formality level: ${formality}
- Ensure perfect grammar and flow

OUTPUT ONLY the paraphrased text.`;

    case 'tone':
      return `You are a tone adaptation expert specializing in adjusting writing style and voice.

TEXT TO ADAPT:
${text}

TARGET TONE: ${tone}
CREATIVITY: ${creativity}
FORMALITY: ${formality}

REQUIREMENTS:
- Adapt language, vocabulary, and sentence structure to match ${tone} tone
- Maintain all original meaning and information
- Adjust emotional tone and voice appropriately
- Use style-specific vocabulary and expressions
- Ensure consistency throughout the text

OUTPUT ONLY the tone-adjusted text.`;

    case 'simplify':
      return `You are an expert in simplifying complex content while preserving essential meaning.

TEXT TO SIMPLIFY:
${text}

REQUIREMENTS:
- Break down complex concepts into simple terms
- Use clear, straightforward language
- Aim for 10th-grade reading level
- Use shorter sentences and paragraphs
- Maintain all key information
- Use examples if helpful
- Avoid jargon and technical terms

OUTPUT ONLY the simplified text.`;

    case 'summarize':
      return `You are an expert summarizer skilled at extracting key information concisely.

TEXT TO SUMMARIZE:
${text}

REQUIREMENTS:
- Extract most important points and key information
- Create concise, coherent summary
- Maintain logical flow and connections
- Preserve essential meaning and conclusions
- Target 30% of original length
- Use clear, direct language
- Include all critical details

OUTPUT ONLY the summary.`;

    case 'grammar':
      return `You are a grammar and style expert with advanced editing skills.

TEXT TO CORRECT:
${text}

REQUIREMENTS:
- Fix all grammar, spelling, and punctuation errors
- Improve sentence structure and flow
- Enhance readability and clarity
- Maintain original tone and meaning
- Preserve author's voice
- Use proper formatting and punctuation
- Ensure professional quality

OUTPUT ONLY the corrected text.`;

    case 'expand':
      return `You are an expert content developer skilled at expanding ideas while maintaining focus.

TEXT TO EXPAND:
${text}

REQUIREMENTS:
- Add relevant details and examples
- Elaborate on key concepts
- Maintain original focus and direction
- Use appropriate depth and detail
- Add context where helpful
- Ensure logical flow
- Creativity level: ${creativity}

OUTPUT ONLY the expanded text.`;

    case 'rewrite':
      return `You are a professional rewriter with exceptional communication skills.

TEXT TO REWRITE:
${text}

REQUIREMENTS:
- Complete rewrite with fresh perspective
- Maintain core message and intent
- Use improved structure and flow
- Enhance clarity and engagement
- Creativity level: ${creativity}
- Formality level: ${formality}
- Ensure professional quality

OUTPUT ONLY the rewritten text.`;

    case 'academic':
      return `You are an academic writing expert specializing in scholarly content.

TEXT TO ACADEMICIZE:
${text}

REQUIREMENTS:
- Use formal academic language and terminology
- Structure with proper academic conventions
- Include appropriate citations style formatting
- Maintain scholarly tone and objectivity
- Use precise, analytical language
- Ensure logical argumentation

OUTPUT ONLY the academic version.`;

    case 'creative':
      return `You are a creative writing expert with exceptional storytelling skills.

TEXT TO MAKE CREATIVE:
${text}

REQUIREMENTS:
- Add creative flair and engaging language
- Use vivid descriptions and imagery
- Incorporate storytelling elements where appropriate
- Maintain core message and information
- Use metaphors and creative expressions
- Creativity level: ${creativity}
- Ensure engaging and memorable content

OUTPUT ONLY the creative text.`;

    case 'professional':
      return `You are a business communication expert specializing in professional content.

TEXT TO PROFESSIONALIZE:
${text}

REQUIREMENTS:
- Use professional business language
- Maintain formal, respectful tone
- Ensure clarity and conciseness
- Use appropriate business terminology
- Structure for professional context
- Formality level: ${formality}
- Ensure polished, executive-ready quality

OUTPUT ONLY the professional text.`;

    case 'casual':
      return `You are an expert in casual, conversational communication.

TEXT TO CASUALIZE:
${text}

REQUIREMENTS:
- Use friendly, conversational tone
- Include natural contractions and colloquialisms
- Maintain approachable, relatable style
- Use everyday language and expressions
- Creativity level: ${creativity}
- Formality level: ${formality}
- Ensure natural, easy-going communication

OUTPUT ONLY the casual text.`;

    case 'formal':
      return `You are an expert in formal communication and official documentation.

TEXT TO FORMALIZE:
${text}

REQUIREMENTS:
- Use formal, respectful language
- Employ proper etiquette and conventions
- Maintain professional distance and objectivity
- Use sophisticated vocabulary appropriately
- Formality level: ${formality}
- Ensure official, document-ready quality
- Structure with proper formal conventions

OUTPUT ONLY the formal text.`;

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

    const prompt = getAdvancedPromptForTool(request);

    // Enhanced model selection with more options
    const models = [
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-pro',
      'gemini-1.5-pro'
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
                temperature: request.creativity || 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
                candidateCount: 1,
              },
            }),
          }
        );

        const data = await response.json();

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

        // Save to history with enhanced metadata
        const historyItem: HistoryItem = {
          id: Date.now().toString(),
          inputText: request.text,
          outputText: transformedText,
          toolUsed: request.tool,
          date: new Date().toISOString(),
          tone: request.tone,
          creativity: request.creativity,
          formality: request.formality
        };

        saveToHistory(historyItem);

        // Generate suggestions for some tools
        let suggestions: string[] = [];
        if (request.tool === 'humanize' || request.tool === 'paraphrase') {
          suggestions = [
            'Try adjusting creativity level for different results',
            'Consider using tone changer for specific audience',
            'Use grammar fix for final polish'
          ];
        }

        return {
          transformedText,
          originalCharCount: request.text.length,
          transformedCharCount: transformedText.length,
          toolUsed: request.tool,
          confidence: data.candidates[0].safetyRatings ? 0.95 : undefined,
          suggestions
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown error");
        if (!lastError.message.includes('quota') && !lastError.message.includes('rate limit')) {
          throw lastError;
        }
      }
    }

    throw new Error(
      `All models exhausted. ${lastError?.message || 'Please check your API quota and try again later.'}\n\n` +
      `Solutions:\n` +
      `1. Wait for quota to reset\n` +
      `2. Get a new API key from: https://aistudio.google.com/app/apikey\n` +
      `3. Upgrade to paid tier for higher limits`
    );
  } catch (error) {
    console.error("Error transforming text:", error);
    throw error instanceof Error ? error : new Error("Unknown error occurred while transforming text");
  }
};

// Enhanced history management
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
    history.unshift(item);
    
    // Keep last 200 items for better history management
    if (history.length > 200) {
      history.splice(200);
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

// Enhanced usage tracking without limits
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
    totalTransformations: history.length,
    historyCount: history.length,
    averageCharsPerTransformation: history.length > 0 ? Math.round(totalCharacters / history.length) : 0
  };
};

// Free features - no limitations
export const checkUsageLimits = () => {
  return {
    canTransform: true,
    remainingTransformations: Infinity,
    maxCharacters: Infinity,
    isPremium: true, // All users get premium features
    message: "All features are free for everyone!"
  };
};
