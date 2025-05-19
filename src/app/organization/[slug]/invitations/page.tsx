import { OrganizationHeader } from "@/components/organization-header";
import { OrganizationInvitations } from "@/components/organization-invitations";
import { OrganizationInviteForm } from "@/components/organization-invite-form";

export default function OrganizationInvitationsPage() {
  return (
    <div className="space-y-6">
      <OrganizationHeader description="Manage organization invitations" />
      <OrganizationInviteForm />
      <OrganizationInvitations />
    </div>
  );
}
