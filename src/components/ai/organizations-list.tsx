import { Organization, Role } from "@/types/auth";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { RoleBadge } from "./role-badge";

type OrganizationsListProps = {
  data: Organization[];
};

export function OrganizationsList({ data }: OrganizationsListProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Organizations</h3>
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {data.map((org) => (
              <Link href={`/organization/${org.slug}`} key={org.id}>
                <Card className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <div className="font-medium text-sm">{org.name}</div>
                    <RoleBadge
                      role={org.role as Role}
                      includeDescription={false}
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No organizations found
          </p>
        )}
      </div>
    </div>
  );
}
