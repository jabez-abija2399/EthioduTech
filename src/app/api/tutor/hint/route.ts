import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/auth";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SOCRATIC_SYSTEM_INSTRUCTION = `
You are a highly skilled, encouraging, and Socratic coding tutor for a web development platform. 
The student is currently working on an interactive CodeSandbox and has requested a hint.

YOUR STRICT DIRECTIVES:
1. NEVER give the direct answer or write the complete, correct code for the student.
2. NEVER point out the exact line number of the error unless it is a severe syntax error that the browser hides.
3. INSTEAD, ask leading questions, point them towards a concept they might have forgotten, or provide a conceptual analogy.
4. If there are failing tests provided, analyze why the code might be failing them and guide the student towards fixing it.
5. Keep your response brief, friendly, and formatted in Markdown.
6. Use the context of the lesson instructions and the failing tests to inform your hint.
`;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { html, css, js, failingTests, lessonTitle } = await req.json();

    const prompt = `
Lesson Title: ${lessonTitle || "Unknown"}

Student's Current Code:
HTML:
\`\`\`html
${html || ""}
\`\`\`

CSS:
\`\`\`css
${css || ""}
\`\`\`

JS:
\`\`\`javascript
${js || ""}
\`\`\`

Failing Tests:
${failingTests && failingTests.length > 0 ? failingTests.join("\n") : "None provided. The student might just be stuck generally."}

Please provide a Socratic hint to help the student progress.
`;

    let hint = "";

    // Fallback logic to check available keys
    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: SOCRATIC_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      hint = response.text || "I'm having trouble thinking of a hint right now. Try reviewing the lesson material!";
    } 
    else if (process.env.GROQ_API_KEY || process.env.OPENROUTER_API_KEY) {
      // Use standard OpenAI-compatible endpoints for Groq or OpenRouter
      const isGroq = !!process.env.GROQ_API_KEY;
      const apiKey = isGroq ? process.env.GROQ_API_KEY : process.env.OPENROUTER_API_KEY;
      const endpoint = isGroq 
        ? "https://api.groq.com/openai/v1/chat/completions" 
        : "https://openrouter.ai/api/v1/chat/completions";
      const model = isGroq 
        ? "llama3-8b-8192" 
        : "openrouter/free"; // OpenRouter free model routing

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Edutech Tutor"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: SOCRATIC_SYSTEM_INSTRUCTION },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
        })
      });

      if (!res.ok) {
        throw new Error(`AI API Error: ${res.statusText}`);
      }

      const data = await res.json();
      hint = data.choices[0]?.message?.content || "I'm having trouble thinking of a hint right now.";
    }
    else {
      return NextResponse.json(
        { error: "No AI provider configured. Please add GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY to your environment variables." },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ hint });
  } catch (error: any) {
    console.error("AI Tutor Error:", error);
    return NextResponse.json(
      { error: "Failed to generate hint", details: error.message },
      { status: 500 }
    );
  }
}
