"use client";

import { useOrganization } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { InvitationsTable } from "./invitations-table";
import { TableSkeleton } from "./table-skeleton";

export function OrganizationInvitations() {
  const { isLoaded, invitations, memberships } = useOrganization({
    invitations: {
      pageSize: 5,
      keepPreviousData: true,
    },
    memberships: {
      pageSize: 5,
      keepPreviousData: true,
    },
  });

  if (!isLoaded) return <TableSkeleton columns={5} rows={5} />;

  const data = invitations?.data ?? [];

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>Manage pending invitations.</CardDescription>
          </div>
          {data.length > 0 && (
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1">
                <span className="text-sm">{data.length} pending</span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <InvitationsTable
            data={data}
            invitations={invitations}
            memberships={memberships}
          />
        </CardContent>
      </Card>
    </div>
  );
}
