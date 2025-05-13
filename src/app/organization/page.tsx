import { CreateOrganization } from "@clerk/nextjs";

export default function Organizationpage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Organizations</h1>
        <p className="text-muted-foreground text-sm">
          Manage your organizations and their associated projects and team
          members.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CreateOrganization skipInvitationScreen />
      </div>
    </div>
  );
}
