"use client";

import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import {
  OrganizationCustomRoleKey,
  type OrganizationMembershipResource,
} from "@clerk/types";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectRole } from "./select-role";
import { RoleBadge } from "./ai/role-badge";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/types/auth";

type MembersTableProps = {
  data: OrganizationMembershipResource[];
  memberships: unknown;
  orgRole: string;
};

export function MembersTable({
  data,
  memberships,
  orgRole,
}: MembersTableProps) {
  const { user } = useUser();

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((mem) => (
              <TableRow key={mem.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={mem.publicUserData.imageUrl || "/placeholder.svg"}
                        alt={mem.publicUserData.firstName ?? "Profile picture"}
                      />
                      <AvatarFallback>
                        {mem.publicUserData.firstName}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {mem.publicUserData.identifier}{" "}
                        {mem.publicUserData.userId === user?.id && "(You)"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{mem.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  {orgRole === "org:admin" || orgRole === "org:manager" ? (
                    <SelectRole
                      defaultRole={mem.role}
                      onChange={async (role: OrganizationCustomRoleKey) => {
                        try {
                          await mem.update({
                            role,
                          });
                          // @ts-expect-error revalidate
                          await memberships?.revalidate();
                        } catch {
                          toast.error("Something went wrong");
                        }
                      }}
                    />
                  ) : (
                    <RoleBadge
                      role={mem.role as Role}
                      includeDescription={false}
                    />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {orgRole === "org:admin" || orgRole === "org:manager" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={async () => {
                            try {
                              await mem.destroy();
                              // @ts-expect-error revalidate
                              await memberships?.revalidate();
                            } catch {
                              toast.error(
                                "There has to be at least one organization member"
                              );
                            }
                          }}
                        >
                          Remove member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Badge
                      className={`bg-red-100 text-red-700 border-red-200 hover:bg-yellow-200 font-medium`}
                    >
                      Not Allowed
                    </Badge>
                  )}
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
          // @ts-expect-error ignore
          disabled={!memberships?.hasPreviousPage || memberships?.isFetching}
          // @ts-expect-error ignore
          onClick={() => memberships?.fetchPrevious?.()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          // @ts-expect-error ignore
          disabled={!memberships?.hasNextPage || memberships?.isFetching}
          // @ts-expect-error ignore
          onClick={() => memberships?.fetchNext?.()}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </>
  );
}
