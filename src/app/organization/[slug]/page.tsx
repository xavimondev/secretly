import { CredentialsSection } from "@/components/credentials-section";

export default async function OrganizationsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // const { slug } = await params;
  // console.log(slug);

  return (
    <div className="space-y-6">
      <CredentialsSection />
    </div>
  );
}
