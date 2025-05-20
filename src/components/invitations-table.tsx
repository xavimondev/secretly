"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { type OrganizationInvitationResource } from "@clerk/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoleBadge } from "./ai/role-badge";
import { Role } from "@/types/auth";

type InvitationsTableProps = {
  data: OrganizationInvitationResource[];
  invitations: unknown;
  memberships: unknown;
};

export function InvitationsTable({
  data,
  invitations,
  memberships,
}: InvitationsTableProps) {
  return (
    <>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-muted-foreground">No pending invitations</p>
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Invited</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <div className="font-medium">{inv.emailAddress}</div>
                    </TableCell>
                    <TableCell>{inv.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <RoleBadge
                        role={inv.role as Role}
                        includeDescription={false}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={async () => {
                          await inv.revoke();
                          await Promise.all([
                            // @ts-expect-error check
                            memberships?.revalidate(),
                            // @ts-expect-error check
                            invitations?.revalidate(),
                          ]);
                        }}
                      >
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              disabled={
                // @ts-expect-error check
                !invitations?.hasPreviousPage || invitations?.isFetching
              }
              // @ts-expect-error check
              onClick={() => invitations?.fetchPrevious?.()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              // @ts-expect-error check
              disabled={!invitations?.hasNextPage || invitations?.isFetching}
              // @ts-expect-error check
              onClick={() => invitations?.fetchNext?.()}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </>
  );
}
