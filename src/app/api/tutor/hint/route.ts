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
    let lastError: any = null;

    // Ordered list of providers based on available keys
    const providers = [];
    if (process.env.GEMINI_API_KEY) providers.push("gemini");
    if (process.env.GROQ_API_KEY) providers.push("groq");
    if (process.env.OPENROUTER_API_KEY) providers.push("openrouter");

    if (providers.length === 0) {
      return NextResponse.json(
        { error: "No AI provider configured. Please add GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    for (const provider of providers) {
      try {
        if (provider === "gemini") {
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              systemInstruction: SOCRATIC_SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });
          hint = response.text || "";
          if (hint) break; // Success! Exit loop.
        } 
        else if (provider === "groq" || provider === "openrouter") {
          const isGroq = provider === "groq";
          const apiKey = isGroq ? process.env.GROQ_API_KEY : process.env.OPENROUTER_API_KEY;
          const endpoint = isGroq 
            ? "https://api.groq.com/openai/v1/chat/completions" 
            : "https://openrouter.ai/api/v1/chat/completions";
          const model = isGroq 
            ? "llama-3.1-8b-instant" 
            : "openrouter/free";

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
            const errText = await res.text();
            throw new Error(`[${provider.toUpperCase()}] API Error: ${res.status} ${res.statusText} - ${errText}`);
          }

          const data = await res.json();
          hint = data.choices[0]?.message?.content || "";
          if (hint) break; // Success! Exit loop.
        }
      } catch (err: any) {
        console.warn(`⚠️ AI Fallback Triggered: Provider '${provider}' failed. Moving to next provider if available. Error: ${err.message}`);
        lastError = err;
        // The loop continues to the next provider
      }
    }

    if (!hint) {
      throw lastError || new Error("All AI providers failed to generate a hint.");
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
