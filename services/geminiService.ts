import { GoogleGenAI, Type } from "@google/genai";
import { DreamAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeDream = async (dreamText: string): Promise<DreamAnalysis> => {
  if (!dreamText || dreamText.length < 10) {
    throw new Error("Dream description is too short for analysis.");
  }

  const modelId = "gemini-2.5-flash"; // Using the recommended fast model for interactive tasks

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Analyze the following dream description for a fantasy dream exchange market called 'Somnium Vault'. 
      Determine its Rarity (Common, Rare, Legendary, Forbidden), Sentiment (Positive, Negative, Neutral, Surreal), 
      Estimate a Value in credits (number between 100 and 10000), provide 3 Visual Keywords, and a short 1-sentence analysis text.
      
      Dream: "${dreamText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rarity: { type: Type.STRING, enum: ["Common", "Rare", "Legendary", "Forbidden"] },
            sentiment: { type: Type.STRING },
            estimatedValue: { type: Type.NUMBER },
            visualKeywords: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            analysisText: { type: Type.STRING }
          },
          required: ["rarity", "sentiment", "estimatedValue", "visualKeywords", "analysisText"]
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("No response from Oracle.");

    return JSON.parse(jsonStr) as DreamAnalysis;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback for demo purposes if API fails or key is missing
    return {
      rarity: "Common",
      sentiment: "Neutral",
      estimatedValue: 150,
      visualKeywords: ["Fog", "Mystery", "Static"],
      analysisText: "The Oracle is currently clouded. Standard valuation applied."
    };
  }
};
