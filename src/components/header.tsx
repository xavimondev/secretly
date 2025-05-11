"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AddCredentialForm } from "./add-credential-form";

export function Header() {
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => setIsAddCredentialOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Credential</span>
          </Button>
          <UserButton />
        </div>
      </header>

      <AddCredentialForm
        open={isAddCredentialOpen}
        onOpenChange={setIsAddCredentialOpen}
      />
      {/* TODO: add llm chat */}
    </>
  );
}
