"use client";

import { Users } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MembersTable } from "./members-table";
import { TableSkeleton } from "./table-skeleton";

export function OrganizationMembers({ orgRole }: { orgRole: string }) {
  const { isLoaded, memberships } = useOrganization({
    memberships: {
      pageSize: 5,
      keepPreviousData: true,
    },
  });

  if (!isLoaded) return <TableSkeleton columns={5} rows={5} />;

  const data = memberships?.data ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Organization Members</CardTitle>
          <CardDescription>Manage members and their roles.</CardDescription>
        </div>
        {data.length > 0 && (
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{data.length} members</span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <MembersTable data={data} memberships={memberships} orgRole={orgRole} />
      </CardContent>
    </Card>
  );
}
