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

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SOCRATIC_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const hint = response.text || "I'm having trouble thinking of a hint right now. Try reviewing the lesson material!";
    
    return NextResponse.json({ hint });
  } catch (error: any) {
    console.error("AI Tutor Error:", error);
    return NextResponse.json(
      { error: "Failed to generate hint", details: error.message },
      { status: 500 }
    );
  }
}
