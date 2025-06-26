import { SYSTEM_PROMPT } from "../constants/AI_PROMPTS";
import { AskAiAdviceParams } from "../types/ai";

export async function openaiChat(messages: any[], model = "gpt-4o") {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model, messages }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function askAiAdvice({ question, messages }: AskAiAdviceParams) {
  const openaiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(1).map((msg) => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: question },
  ];
  const res = await fetch("/api/ai-advice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: openaiMessages }),
  });
  if (!res.ok) throw new Error("Failed to get advice");
  return res.json();
}

export async function uploadPhotoAdvice(photo: File) {
  const formData = new FormData();
  formData.append("photo", photo);
  const res = await fetch("/api/photo-advice", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    let errMsg = "Failed to upload photo";
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
      if (err.details) errMsg += `: ${err.details}`;
    } catch {}
    throw new Error(errMsg);
  }
  return res.json();
}
