import { memo, useEffect, useRef } from "react";
import type { UIMessage } from "ai";
import { motion } from "framer-motion";
import { PreviewMessage, ThinkingMessage } from "@/components/message";
import { Greeting } from "@/components/greeting";
import equal from "fast-deep-equal";
import type { UseChatHelpers } from "@ai-sdk/react";

interface MessagesProps {
  status: UseChatHelpers["status"];
  messages: Array<UIMessage>;
  organizationName: string;
}

function PureMessages({ status, messages, organizationName }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 relative">
      {messages.length === 0 && <Greeting />}

      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          message={message}
          isLoading={status === "streaming" && messages.length - 1 === index}
          organizationName={organizationName}
        />
      ))}

      {status === "submitted" &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}

      <motion.div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
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
