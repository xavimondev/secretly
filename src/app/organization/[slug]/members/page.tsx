import { OrganizationHeader } from "@/components/organization-header";
import { OrganizationMembers } from "@/components/organization-members";
import { auth } from "@clerk/nextjs/server";

export default async function OrganizationMembersPage() {
  const { orgRole } = await auth();

  return (
    <div className="space-y-6">
      <OrganizationHeader description="Manage organization members" />
      <OrganizationMembers orgRole={orgRole as string} />
    </div>
  );
}
