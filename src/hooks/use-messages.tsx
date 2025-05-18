import { useState, useEffect } from "react";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import type { UseChatHelpers } from "@ai-sdk/react";

export function useMessages({ status }: { status: UseChatHelpers["status"] }) {
  const {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
  } = useScrollToBottom();

  const [hasSentMessage, setHasSentMessage] = useState(false);

  useEffect(() => {
    // if (chatId) {
    scrollToBottom("instant");
    setHasSentMessage(false);
    // }
  }, [scrollToBottom]);

  useEffect(() => {
    if (status === "submitted") {
      setHasSentMessage(true);
    }
  }, [status]);

  return {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  };
}
