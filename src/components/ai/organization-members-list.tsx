"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Member, Role } from "@/types/auth";
import { RoleBadge } from "./role-badge";

interface OrganizationMembersListProps {
  members: Member[];
}

export function OrganizationMembersList({
  members,
}: OrganizationMembersListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter((member) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      member.firstName.toLowerCase().includes(searchTerm) ||
      member.lastName.toLowerCase().includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm) ||
      member.role.toLowerCase().includes(searchTerm)
    );
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="w-full space-y-4 max-w-[23.5rem]">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search members..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-6"
                >
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => {
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-4">
                          <AvatarImage
                            src={member.imageUrl || "/placeholder.svg"}
                            alt={`${member.firstName} ${member.lastName}`}
                          />
                          <AvatarFallback>
                            {getInitials(member.firstName, member.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{`${member.firstName} ${member.lastName}`}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs overflow-auto overflow-ellipsis">
                      {member.email}
                    </TableCell>
                    <TableCell>
                      <RoleBadge
                        role={member.role as Role}
                        includeDescription={false}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* <div className="md:hidden space-y-3">
        {filteredMembers.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">
            No members found
          </div>
        ) : (
          filteredMembers.map((member) => {
            const { label, color, icon: RoleIcon } = roleConfig[member.role];
            return (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="mt-1">
                      <AvatarImage
                        src={member.imageUrl || "/placeholder.svg"}
                        alt={`${member.firstName} ${member.lastName}`}
                      />
                      <AvatarFallback>
                        {getInitials(member.firstName, member.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div>
                        <p className="font-medium">{`${member.firstName} ${member.lastName}`}</p>
                        <p className="text-sm text-muted-foreground">
                          @{member.username}
                        </p>
                      </div>
                      <p className="text-sm font-mono">{member.email}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={`${color}`}>
                          <RoleIcon className="mr-1 h-3 w-3" />
                          {label}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">
                          ID: {member.id.substring(0, 8)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div> */}

      {filteredMembers.length > 0 && (
        <>
          <div className="text-sm text-muted-foreground">
            {filteredMembers.length}{" "}
            {filteredMembers.length === 1 ? "member" : "members"}
          </div>
        </>
      )}
    </div>
  );
}
