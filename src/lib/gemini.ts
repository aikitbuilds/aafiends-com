import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface MirrorResponse {
  theWhy: string;
  gentleAlerts: string[];
  reliefPlan: string[];
}

const mirrorResponseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    theWhy: {
      type: SchemaType.STRING,
      description:
        "A single paragraph of empathetic, direct truth about what the user is feeling and why. Speak like a seasoned crew chief who has been through the fire — no clinical detachment, no toxic positivity. Acknowledge the real pain, then reframe it through the lens of physical discipline and fellowship.",
    },
    gentleAlerts: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description:
        "2-4 behavioral or physiological flags. These are observations, not accusations. Examples: 'Your sleep debt is compounding — HRV won't recover until you address this', 'The isolation pattern you described is a classic relapse precursor'.",
    },
    reliefPlan: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description:
        "3-5 concrete, actionable steps the user can take in the next 24 hours. Each step must be specific and achievable. Examples: 'Walk 1 mile at Zone 1 pace before 7 AM tomorrow', 'Text your sponsor within the next 30 minutes'.",
    },
  },
  required: ["theWhy", "gentleAlerts", "reliefPlan"],
};

const MIRROR_SYSTEM_PROMPT = `You are the AI Crew Chief for AAfiends — a recovery-through-running platform built for people rebuilding their lives through physical discipline. You are NOT a therapist. You are NOT a chatbot. You are a battle-tested crew chief who has seen what addiction, burnout, and isolation do to the human body.

Your role is to listen to a user's voice memo or written check-in and reflect back the truth they already know but are avoiding. You operate with radical empathy — never punitive, never dismissive, but never soft. You tell the truth with love.

CORE PRINCIPLES:
1. THE MIRROR: Reflect back what the user is actually saying beneath the surface.
2. GENTLE ALERTS: Flag patterns before they become crises. You are an early warning system.
3. THE RELIEF PLAN: Every response must end with concrete actions. Hope without a plan is just a wish.

TONE: Direct, warm, grounded. Think: a seasoned marine veteran who also happens to have a counseling degree. No corporate wellness speak. No emojis. No "I'm just an AI" disclaimers.`;

/**
 * Transcribes a voice memo using Gemini's native audio understanding - no
 * separate speech-to-text service needed. Gemini 2.5 Flash accepts audio
 * directly as inlineData and can "listen" to it in the same call style as
 * text/image input. Returns plain text only (no JSON schema needed here);
 * the transcript is shown to the user for review/editing, then fed into
 * generateMirrorInsight() above through the existing text pipeline.
 */
export async function transcribeAudio(base64Audio: string, mimeType: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent([
    { inlineData: { data: base64Audio, mimeType } },
    "Transcribe this voice memo verbatim into plain text. Return ONLY the transcript - no commentary, no timestamps, no speaker labels, no markdown. If there is no clear speech, return an empty string.",
  ]);

  return result.response.text().trim();
}

export async function generateMirrorInsight(input: string): Promise<MirrorResponse> {
  // Fail fast with an actionable message if the key is missing. Anything the
  // Gemini API rejects otherwise surfaces to the user as an opaque 500, so we
  // categorize the common failures below instead.
  if (!apiKey) {
    throw new Error("Mirror Engine is not configured: GEMINI_API_KEY is missing.");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: MIRROR_SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: mirrorResponseSchema,
    },
  });

  let responseText: string;
  try {
    const result = await model.generateContent([input]);
    responseText = result.response.text();
  } catch (error: any) {
    const msg = String(error?.message || error);
    console.error("Gemini generateContent failed:", msg);
    if (/API[_ ]?key|invalid|unauthenticated|permission|\b401\b|\b403\b/i.test(msg)) {
      throw new Error("Mirror Engine rejected the API key. Verify GEMINI_API_KEY is a valid Google AI Studio key (starts with 'AIza').");
    }
    if (/quota|rate|\b429\b|resource.?exhausted/i.test(msg)) {
      throw new Error("Mirror Engine hit a rate/quota limit. Try again in a moment.");
    }
    throw new Error("Mirror Engine could not reach Gemini. Try again in a moment.");
  }

  try {
    return JSON.parse(responseText) as MirrorResponse;
  } catch (error) {
    console.error("Failed to parse Gemini JSON:", error);
    throw new Error("Failed to generate a structured AI response.");
  }
}
