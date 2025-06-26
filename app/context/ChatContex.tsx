import { createContext, useContext, useRef, useState } from "react";
import { ChatContextType } from "../types/chat";
import { Message } from "../types/message";
import { MESSAGE_INITIAL } from "../constants/MESSAGES";
import { useMutation } from "@tanstack/react-query";
import { askAiAdvice, uploadPhotoAdvice } from "../services/openai";
import { formatPetMessage } from "../utils/formaters";
import { useScrollToBottom } from "../hooks/useScrollToBottom";
import { AskAiAdviceParams } from "../types/ai";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([MESSAGE_INITIAL]);
  const chatRef = useRef<HTMLDivElement>(null);
  const adviceMutation = useMutation({
    mutationFn: ({ question, messages }: AskAiAdviceParams) =>
      askAiAdvice({ question, messages }),
    onSuccess: (data) => {
      setMessages((msgs) => [...msgs, { text: data.advice, isUser: false }]);
    },
  });

  const photoMutation = useMutation({
    mutationFn: (photo: File) => uploadPhotoAdvice(photo),
    onSuccess: (data) => {
      if (typeof data === "string") {
        setMessages((msgs) => [
          ...msgs,
          {
            text: data,
            isUser: false,
          },
        ]);
        return;
      }
      setMessages((msgs) => [
        ...msgs,
        {
          text: formatPetMessage(data),
          isUser: false,
        },
      ]);
    },
  });

  useScrollToBottom(chatRef, [
    messages,
    adviceMutation.isPending,
    photoMutation.isPending,
  ]);

  const handleSendText = (text: string) => {
    setMessages((msgs) => [...msgs, { text, isUser: true }]);
    adviceMutation.mutate({ question: text, messages });
  };

  const handleSendPhoto = (file: File) => {
    setMessages((msgs) => [...msgs, { text: `Sent a photo`, isUser: true }]);
    photoMutation.mutate(file);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        handleSendText,
        handleSendPhoto,
        adviceMutation,
        photoMutation,
      }}
    >
      <div ref={chatRef} className="h-full w-full flex flex-col flex-1 min-h-0">
        {children}
      </div>
    </ChatContext.Provider>
  );
}
