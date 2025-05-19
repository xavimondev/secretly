import { OnboardingOrganizationList } from "@/components/onboarding-organization-list";
import { Building2 } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const cookieStore = await cookies();
  const hasRedirectUrlCookie = cookieStore.has("selectedOrganizationUrl");

  if (hasRedirectUrlCookie) {
    const redirectUrl = cookieStore.get("selectedOrganizationUrl")?.value;

    redirect(decodeURIComponent(redirectUrl as string));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-12 px-4 flex flex-col items-center gap-4 text-center">
        <Building2 className="size-14 text-gray-400" />
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to Your Organizations
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Select an organization to get started or create a new one to
          collaborate with your team.
        </p>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <OnboardingOrganizationList />
      </main>
    </div>
  );
}
