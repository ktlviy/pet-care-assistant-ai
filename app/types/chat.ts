import { UseMutationResult } from "@tanstack/react-query";
import { AskAiAdviceParams } from "./ai";
import { Message } from "./message";

export interface ChatInputProps {
  loading?: boolean;
  onSendText: (text: string) => void;
  onSendPhoto: (file: File) => void;
}
export interface PhotoUploadProps {
  onPhotoChange: (file: File | null) => void;
  disabled?: boolean;
}

export interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  handleSendText: (text: string) => void;
  handleSendPhoto: (file: File) => void;
  adviceMutation: UseMutationResult<unknown, Error, AskAiAdviceParams, unknown>;
  photoMutation: UseMutationResult<unknown, Error, File, unknown>;
}
