"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Bot, UserIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { OrganizationSwitcher } from "./organization-switcher";
import { Button } from "@/components/ui/button";
import { ChatBot } from "@/components/chat-bot";

export function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">
          <OrganizationSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsChatOpen(true)}
          >
            <Bot className="size-10" />
          </Button>
          <UserButton
            userProfileMode="modal"
            fallback={<UserIcon className="size-8" />}
          />
        </div>
      </header>
      <ChatBot open={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}
