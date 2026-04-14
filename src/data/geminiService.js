import { GoogleGenAI } from '@google/genai';
import { slidesContent } from './slidesContent.js';

// Pre-build the slides context for RAG
const formatSlidesContext = () => {
  let context = "You are an AI teaching assistant for a C++ Standard Template Library (STL) and Compiler Design learning platform. ";
  context += "Your primary source of truth is the provided slide materials. However, if a user asks for examples, deeper explanations, or code snippets that are not explicitly detailed in the slides, you should use your general knowledge of modern C++ and the STL to provide a complete and helpful answer.\n\n";
  context += "--- SLIDES CONTENT ---\n";
  slidesContent.forEach(slide => {
    context += `## ${slide.title}\n`;
    slide.lines.forEach(line => {
      context += `- ${line}\n`;
    });
    context += '\n';
  });
  return context;
};

const slidesSystemContext = formatSlidesContext();

export const queryGemini = async (messages, userApiKey) => {
  const apiKey = userApiKey || import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Gemini API Key. Please provide one in the Chatbot settings or in your local .env file.');
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Format history for the models generateContent API
  const contents = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: slidesSystemContext,
        temperature: 0.3
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || 'Failed to communicate with Gemini API');
  }
};
