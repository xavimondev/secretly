import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

type OrganizationLayoutProps = {
  children: React.ReactNode;
};

export default async function OrganizationLayout({
  children,
}: OrganizationLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen size-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
