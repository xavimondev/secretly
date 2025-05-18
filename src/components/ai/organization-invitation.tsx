import { Mail, Building } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";

import { Card, CardContent } from "@/components/ui/card";
import { Invitation, Role } from "@/types/auth";
import { RoleBadge } from "@/components/ai/role-badge";

interface OrganizationInvitationProps {
  invitation: Invitation;
}

export function OrganizationInvitation({
  invitation,
}: OrganizationInvitationProps) {
  const { organization } = useOrganization();
  const { emailAddress, role } = invitation;

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border shadow-sm hover:shadow transition-shadow">
      <CardContent className="p-0">
        <div className="bg-slate-200 p-3.5">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-slate-500" />
            <h3 className="font-medium text-slate-900">{organization?.name}</h3>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Mail className="h-4 w-4 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground">{emailAddress}</p>
            </div>
          </div>
          <RoleBadge role={role as Role} includeDescription />
        </div>
      </CardContent>
    </Card>
  );
}
