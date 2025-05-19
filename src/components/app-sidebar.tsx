"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Mail, Shield, Users } from "lucide-react";

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
import { SignOutButton } from "@clerk/nextjs";

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
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.includes(`/organization/${slug}`)}
                  tooltip="Credentials"
                >
                  <Link href={`/organization/${slug}`}>
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Credentials</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="members">
                  <Link href={`/organization/${slug}/members`}>
                    <Users className="w-4 h-4" />
                    <span>Members</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Invitations">
                  <Link href={`/organization/${slug}/invitations`}>
                    <Mail className="w-4 h-4" />
                    <span>Invitations</span>
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
            <SignOutButton>
              <SidebarMenuButton tooltip="Logout">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SignOutButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
