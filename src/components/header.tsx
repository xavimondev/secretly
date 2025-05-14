import { UserButton } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { OrganizationSwitcher } from "./organization-switcher";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">
          <OrganizationSwitcher />
          <UserButton
            userProfileMode="modal"
            fallback={<UserIcon className="size-6" />}
          />
        </div>
      </header>
      {/* TODO: add llm chat */}
    </>
  );
}
