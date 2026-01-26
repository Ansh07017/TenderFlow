
import { GoogleGenAI, Type } from "@google/genai";
import { Tender, AIResponse, CompanyProfile, ManagerProfile, SubmissionHistory } from './types';
import { COMPANY_PROFILE as MOCK_COMPANY } from './mockData';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * 1 & 2: Tender Understanding & Fit Scoring Engine
 * Uses gemini-3-flash-preview for high speed and accuracy in structured extraction.
 */
export const getTenderFitScore = async (tender: Tender): Promise<AIResponse> => {
  const prompt = `
    SYSTEM: You are an enterprise FMCG tender intelligence engine. Parse the tender and company profile to determine suitability.
    
    1. TENDER UNDERSTANDING:
    - Title: ${tender.title}
    - Category: ${tender.category}
    - Authority: ${tender.authority}
    - Traits: ${tender.authorityTrait || "None specified"}
    - Description: ${tender.description}
    - Compliance Requirements: ${tender.compliance.join(', ')}
    
    2. COMPANY CONTEXT:
    - Specialization: ${MOCK_COMPANY.specialization}
    - Key Certificates: ${MOCK_COMPANY.certificates.join(', ')}

    TASK:
    - Evaluate fit (0-100).
    - Provide reasoning highlighting pros/cons.
    - Analyze historical traits of the authority.
    - Flag risks (Compliance, Delivery, Margin).

    Return JSON as specified in responseSchema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            explainability: {
              type: Type.OBJECT,
              properties: {
                pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                historyInsight: { type: Type.STRING }
              },
              required: ["pros", "cons", "historyInsight"]
            },
            risks: {
              type: Type.OBJECT,
              properties: {
                compliance: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                delivery: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                margin: { type: Type.STRING, enum: ["Low", "Medium", "High"] }
              },
              required: ["compliance", "delivery", "margin"]
            }
          },
          required: ["score", "reasoning", "explainability", "risks"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as AIResponse;
  } catch (error) {
    console.error("Fit Scoring Error:", error);
    return { 
      score: 0, 
      reasoning: "AI service interrupted.",
      explainability: { pros: [], cons: [], historyInsight: "System standby." },
      risks: { compliance: 'High', delivery: 'High', margin: 'High' }
    };
  }
};

/**
 * 4 & 5: Authority-Aware Response Generator with Learning Loop
 * Uses gemini-3-pro-preview for high-quality, audit-ready formal output.
 * STRICTLY ENFORCES THE PROVIDED TEMPLATE STRUCTURE AND LEARNS FROM HISTORY.
 */
export const generateTenderReport = async (
  tender: Tender, 
  inventoryStatus: string, 
  customTemplate?: string, 
  logoInfo?: string,
  manager?: ManagerProfile,
  company?: CompanyProfile,
  history?: SubmissionHistory[],
  mode: 'draft' | 'assist' = 'draft'
): Promise<string> => {
  
  // ENHANCED LEARNING LOOP: Parsing historical outcomes into actionable intelligence
  const historicalIntelligence = history?.filter(h => h.lessonsLearned || h.rejectionReason)
    .map(h => {
        let entry = `[HISTORICAL CASE: ${h.title}]\n`;
        entry += `  - STATUS: ${h.status}\n`;
        if (h.rejectionReason) entry += `  - REJECTION REASON: ${h.rejectionReason}\n`;
        if (h.lessonsLearned) entry += `  - PREVENTATIVE MEASURE: ${h.lessonsLearned}\n`;
        return entry;
    })
    .join('\n\n') || 'Initial Project Cycle: No historical errors detected yet.';

  const prompt = `
    SYSTEM:
    You are an elite FMCG tender response engine (TenderFlow AI).
    You are currently in SELF-CORRECTION MODE. You must analyze past failures to ensure this new response is bulletproof.

    REQUIRED STRUCTURE (MANDATORY):
    ${customTemplate || "Use standard enterprise markdown structure."}

    INSTITUTIONAL MEMORY & SELF-CORRECTION PROTOCOL:
    Analyze the historical cases below. Your primary objective is to avoid repeating these mistakes. 
    If a previous tender was LOST due to a specific reason (e.g., "Missing ISO certifications" or "Poor delivery logistics description"), 
    you MUST explicitly strengthen those sections in the current draft for ${tender.title}.
    
    --- START HISTORICAL DATABASE ---
    ${historicalIntelligence}
    --- END HISTORICAL DATABASE ---

    AUTHORITY PROFILE:
    Entity: ${tender.authority}
    Historical Trait Logic: ${tender.authorityTrait || "Focus on transparency and technical precision."}
    
    CURRENT TENDER CONTEXT:
    Title: ${tender.title}
    Category: ${tender.category}
    Requirements: ${tender.description}
    Inventory Allocation: ${inventoryStatus}

    TASK:
    Generate a complete, professional, audit-ready formal proposal.
    1. Replace placeholders like [TENDER_TITLE] and [AUTHORITY_NAME] with actual data.
    2. Tone: Formal, High-Trust, Enterprise.
    3. Self-Correction: Ensure any historical "Rejection Reasons" are neutralized in this draft.
    4. Format: Clean Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt
    });
    return response.text || "Failed to generate dossier.";
  } catch (error) {
    console.error("Generation Error:", error);
    return "Error encountered during AI synthesis.";
  }
};
