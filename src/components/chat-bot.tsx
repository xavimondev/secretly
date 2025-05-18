"use client";

import { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { ChatInput } from "./chat-input";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { ChatSDKError } from "@/errors";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Messages } from "@/components/messages";
import { useOrganization } from "@clerk/nextjs";

interface ChatBotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const id = generateUUID();

export function ChatBot({ open, onOpenChange }: ChatBotProps) {
  const { organization } = useOrganization();
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
  } = useChat({
    id,
    initialMessages: [],
    experimental_throttle: 100,
    // fetch: fetchWithErrorHandlers,
    onFinish: () => {
      // mutate(unstable_serialize(getChatHistoryPaginationKey));
    },
    onError: (error) => {
      if (error instanceof ChatSDKError) {
        toast.error(error.message);
      }
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Bot className="size-6 text-primary" />
            <SheetHeader className="space-y-1">
              <SheetTitle className="text-base">
                {organization?.name ?? ""} - Secretly Assistant
              </SheetTitle>
              <SheetDescription className="text-xs">
                AI-powered help
              </SheetDescription>
            </SheetHeader>
          </div>
        </div>

        <div className="flex flex-col min-w-0 h-dvh bg-background">
          <Messages
            status={status}
            messages={messages}
            organizationName={organization?.name ?? ""}
          />
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          status={status}
          stop={stop}
          messages={messages}
          setMessages={setMessages}
          append={append}
          handleSubmit={handleSubmit}
        />
      </SheetContent>
    </Sheet>
  );
}
