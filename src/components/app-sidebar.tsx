"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Cog, Lock, LogOut, Shield, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const params = useParams<{ slug: string }>();
  const pathname = usePathname();
  const { state } = useSidebar();
  const slug = params.slug;

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="py-4">
        <div className="flex items-center px-4">
          <Shield className="w-8 h-8 mr-2 text-primary" />
          <span
            className={`text-xl font-bold gradient-text transition-opacity duration-200 ${
              state === "collapsed" ? "opacity-0" : "opacity-100"
            }`}
          >
            Secretly
          </span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.includes("/${slug}/access-control")}
                  tooltip="Access Control"
                >
                  <Link href={`/organization/${slug}/access-control`}>
                    <Lock className="w-4 h-4" />
                    <span>Access Control</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/settings"}
              tooltip="Settings"
            >
              <Link href="/settings">
                <Cog className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Profile">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
