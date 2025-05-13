import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

type OrganizationLayoutProps = {
  children: React.ReactNode;
  // params: Promise<{ slug: string }>;
};

export default async function OrganizationLayout({
  children,
}: // params,
OrganizationLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  // const { slug } = await params;
  // console.log(slug);

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
