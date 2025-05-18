import { memo } from "react";
import type { UIMessage } from "ai";
import { motion } from "framer-motion";
import { PreviewMessage, ThinkingMessage } from "@/components/message";
import { Greeting } from "@/components/greeting";
import equal from "fast-deep-equal";
import type { UseChatHelpers } from "@ai-sdk/react";
import { useMessages } from "@/hooks/use-messages";

interface MessagesProps {
  status: UseChatHelpers["status"];
  messages: Array<UIMessage>;
  organizationName: string;
}

function PureMessages({ status, messages, organizationName }: MessagesProps) {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  } = useMessages({
    status,
  });

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 relative"
    >
      {messages.length === 0 && <Greeting />}

      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          message={message}
          isLoading={status === "streaming" && messages.length - 1 === index}
          requiresScrollPadding={
            hasSentMessage && index === messages.length - 1
          }
          organizationName={organizationName}
        />
      ))}

      {status === "submitted" &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}

      <motion.div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.status && nextProps.status) return false;
  if (prevProps.organizationName && nextProps.organizationName) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;

  return true;
});
