import { useEffect } from "react";

export function useScrollToBottom(
  chatRef: React.RefObject<HTMLDivElement | null>,
  dependencies: any[]
) {
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, dependencies);
}
