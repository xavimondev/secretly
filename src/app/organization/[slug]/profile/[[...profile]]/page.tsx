import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationHeader } from "@/components/organization-header";
import { OrganizationInvitations } from "@/components/organization-invitations";
import { OrganizationMembers } from "@/components/organization-members";
import { OrganizationInviteForm } from "@/components/organization-invite-form";

export default function OrganizationProfilePage() {
  return (
    <div className="space-y-6">
      <OrganizationHeader />
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4">
          <OrganizationMembers />
        </TabsContent>
        <TabsContent value="invitations" className="space-y-4">
          <OrganizationInviteForm />
          <OrganizationInvitations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
