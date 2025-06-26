import { renderStyledMessage } from "@/app/utils/formaters";
import { Message } from "@/app/types/message";
import clsx from "clsx";
import React from "react";

export default function ChatBubble({ text, isUser }: Message) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={clsx(
          "max-w-[70%] px-4 py-2 rounded-2xl shadow-md text-base whitespace-pre-line",
          isUser
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-gray-200 text-gray-900 rounded-bl-sm"
        )}
        dangerouslySetInnerHTML={{ __html: renderStyledMessage(text) }}
      />
    </div>
  );
}
