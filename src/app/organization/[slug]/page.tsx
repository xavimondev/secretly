import { CredentialsSection } from "@/components/credentials-section";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export default async function OrganizationsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await fetch(
    `https://api.clerk.com/v1/organizations/${slug}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY as string}`,
      },
    }
  );
  const result = await response.json();
  if (result.errors && result.errors.length > 0) {
    // wrong slug, so organization not found
    notFound();
  }

  // Fetching credentials from supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { id } = result;

  const { data, error } = await supabase.rpc("get_credentials_by_org", {
    p_organization_id: id,
  });

  if (error) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CredentialsSection data={data} />
    </div>
  );
}
