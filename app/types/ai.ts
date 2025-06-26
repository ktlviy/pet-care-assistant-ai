import { Message } from "./message";

export interface AskAiAdviceParams {
  question: string;
  messages: Message[];
}
