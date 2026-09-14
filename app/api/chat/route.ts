/* eslint-disable */
import { google } from '@ai-sdk/google';
import { streamText, Message } from 'ai';
import { checkDistress, getSafeReply } from '@/lib/ai/distress-detector';
import { createClient } from '@/lib/supabase/server';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a Socratic coding assistant for students aged 10-18.
RULE 1: NEVER output a complete, pasteable solution to the student's problem.
RULE 2: Guide the student to the answer using questions and small hints.
RULE 3: Be warm, encouraging, and never clinical. Use simple language.
RULE 4: If the student provides code, point out the general area of the error, but do not fix it for them.`;

export async function POST(req: Request) {
  const { messages, locale = 'en' } = await req.json();
  const lastMessage = messages[messages.length - 1];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 1. Distress Detection Layer (RULE-012)
  if (lastMessage?.content && checkDistress(lastMessage.content)) {
    const safeReply = getSafeReply(locale);
    
    // Log the distress interaction
    await supabase.from('ai_interactions').insert({
      profile_id: user.id,
      prompt: lastMessage.content,
      response: safeReply,
      flagged_distress: true
    });

    // Return a fake stream mimicking the AI SDK response shape
    return new Response(safeReply, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' } // Basic fallback for UI if needed, but normally use ai sdk's format
    });
    // Wait, the Vercel AI SDK expects a specific stream format on the client `useChat`.
    // Actually returning a string when `useChat` expects a stream will break the frontend parser.
    // The safest way is to use the `streamText` but override it with a fake tool or just a simple string stream.
    // Since `ai` 3.x, you can just return the raw text if you don't use their exact stream protocol, but it's better to use `streamText` with a mock or just let the client handle non-streamed if possible.
    // However, I'll use `streamText` with a dummy provider or just let it use standard DataStreamResponse.
    // Actually, `useChat` gracefully falls back to reading plain text if the stream format isn't recognized, but it's safer to format it as 0:...
  }

  // If distress triggered, I need to format it properly. Let's fix that below.
  if (lastMessage?.content && checkDistress(lastMessage.content)) {
    const safeReply = getSafeReply(locale);
    await supabase.from('ai_interactions').insert({
      profile_id: user.id,
      prompt: lastMessage.content,
      response: safeReply,
      flagged_distress: true
    });
    // Format as AI SDK DataStream protocol (0: "text")
    const formatted = `0:"${safeReply}"\n`;
    return new Response(formatted, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' }
    });
  }

  // 2. Proceed with LLM if no distress
  const result = await streamText({
    model: google('models/gemini-1.5-flash'),
    system: SYSTEM_PROMPT,
    messages,
    async onFinish({ text }) {
      // Log interaction asynchronously
      await supabase.from('ai_interactions').insert({
        profile_id: user.id,
        prompt: lastMessage.content,
        response: text,
        flagged_distress: false
      });
    },
  });

  return result.toDataStreamResponse();
}
