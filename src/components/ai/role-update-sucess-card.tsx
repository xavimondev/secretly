"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import type { Role, UpdateResource } from "@/types/auth";
import { RoleBadge } from "./role-badge";

interface RoleUpdateSuccessCardProps {
  update: UpdateResource;
}

export function RoleUpdateSuccessCard({ update }: RoleUpdateSuccessCardProps) {
  const { userName, userImage, newRole } = update;
  const { organization } = useOrganization();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card
      className={`w-full max-w-md mx-auto overflow-hidden border border-green-200 shadow-md transition-all duration-500`}
    >
      <CardContent className="pt-6 pb-6 px-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="font-semibold mb-1">Role Updated Successfully!</h2>
          <p className="text-muted-foreground text-sm">
            The user role has been updated in{" "}
            <span className="font-medium text-foreground">
              {organization?.name}
            </span>
          </p>
        </div>
        <div className="bg-slate-300 rounded-lg p-3.5 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <Avatar>
              <AvatarImage
                src={userImage || "/placeholder.svg"}
                alt={userName}
              />
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-700">{userName}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            {/* <div className="flex flex-col gap-1 items-center">
              <RoleBadge
                role={previousRole as Role}
                includeDescription={false}
              />
              <span className="text-xs text-muted-foreground">
                Previous role
              </span>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" /> */}

            <div className="flex flex-col gap-1 items-center">
              <RoleBadge role={newRole as Role} includeDescription={false} />
              <span className="text-xs text-muted-foreground">New role</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Permission changes will take effect the next time the user logs in.
        </p>
      </CardContent>
    </Card>
  );
}
