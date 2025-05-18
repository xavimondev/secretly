"use client";

import { Button } from "./ui/button";
import type { UseChatHelpers } from "@ai-sdk/react";

interface SuggestedActionsProps {
  append: UseChatHelpers["append"];
}

export function SuggestedActions({ append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: "Show my profile",
      label: "details",
      action: "Show my profile",
    },
    {
      title: "Display all organizations",
      label: "I belong to",
      action: "List all organizations I belong to",
    },
    {
      title: "Display all members of the",
      label: "current organization",
      action: "List all members from current organization",
    },
  ];
  return (
    <div className="flex flex-col gap-2 w-full">
      {suggestedActions.map((suggestedAction) => (
        <Button
          key={suggestedAction.title}
          variant="ghost"
          onClick={async () => {
            append({
              role: "user",
              content: suggestedAction.action,
            });
          }}
          className="text-left border rounded-sm px-4 py-3 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
        >
          <span className="font-medium">{suggestedAction.title}</span>
          <span className="text-muted-foreground">{suggestedAction.label}</span>
        </Button>
      ))}
    </div>
  );
}
