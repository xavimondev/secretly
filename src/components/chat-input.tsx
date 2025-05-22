import { Textarea } from "@/components/ui/textarea";
import { UseChatHelpers } from "@ai-sdk/react";
import { UIMessage } from "ai";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send, StopCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SuggestedActions } from "./suggested-actions";

export function ChatInput({
  input,
  setInput,
  status,
  stop,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
}: {
  input: UseChatHelpers["input"];
  setInput: UseChatHelpers["setInput"];
  status: UseChatHelpers["status"];
  stop: () => void;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers["setMessages"];
  append: UseChatHelpers["append"];
  handleSubmit: UseChatHelpers["handleSubmit"];
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const { width } = useWindowSize();

  function adjustHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 2
      }px`;
    }
  }

  function resetHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = "98px";
    }
  }

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value);
    adjustHeight();
  }

  function submitForm() {
    handleSubmit();
    resetHeight();
  }

  return (
    <div className="p-4">
      <div className="relative w-full flex flex-col gap-4 flex-1">
        {messages.length === 0 && <SuggestedActions append={append} />}

        <Textarea
          ref={textareaRef}
          placeholder="Send a message..."
          value={input}
          onChange={handleInput}
          className={cn(
            "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none text-sm bg-muted pb-10 dark:border-zinc-700",
            className
          )}
          rows={2}
          autoFocus
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();

              if (status !== "ready") {
                toast.error(
                  "Please wait for the model to finish its response!"
                );
              } else {
                submitForm();
              }
            }
          }}
        />
        <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
          {status === "submitted" ? (
            <Button
              data-testid="stop-button"
              className="p-1.5 h-fit border dark:border-zinc-600"
              onClick={(event) => {
                event.preventDefault();
                stop();
                setMessages((messages) => messages);
              }}
            >
              <StopCircleIcon className="size-4" />
            </Button>
          ) : (
            <Button
              className="p-1.5 h-fit border dark:border-zinc-600"
              onClick={(event) => {
                event.preventDefault();
                submitForm();
              }}
              disabled={input.length === 0}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
