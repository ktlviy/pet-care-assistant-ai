import { SYSTEM_PROMPT } from "@/app/constants/AI_PROMPTS";
import { openaiChat } from "@/app/services/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { question, messages } = body;
    let openaiMessages;

    if (Array.isArray(messages) && messages.length > 0) {
      openaiMessages =
        messages[0].role !== "system"
          ? [{ role: "system", content: SYSTEM_PROMPT }, ...messages]
          : messages;
    } else if (question) {
      openaiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question },
      ];
    } else {
      return NextResponse.json(
        { error: "No question or messages provided" },
        { status: 400 }
      );
    }
    const data = await openaiChat(openaiMessages, "gpt-4.1-nano");

    const advice =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate advice.";
    return NextResponse.json({ advice });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(e) },
      { status: 500 }
    );
  }
}
