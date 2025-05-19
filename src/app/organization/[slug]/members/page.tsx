import { OrganizationHeader } from "@/components/organization-header";
import { OrganizationMembers } from "@/components/organization-members";

export default function OrganizationMembersPage() {
  return (
    <div className="space-y-6">
      <OrganizationHeader description="Manage organization members" />
      <OrganizationMembers />
    </div>
  );
}
