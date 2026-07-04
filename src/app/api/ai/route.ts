import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({}); // Relies on GEMINI_API_KEY env var

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Call the AI model
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error("AI Service Error:", error);
    return NextResponse.json({ error: "AI Processing Failed" }, { status: 500 });
  }
}
