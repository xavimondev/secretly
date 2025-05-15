"use client";

import { useOrganization } from "@clerk/nextjs";

export function OrganizationHeader() {
  const { organization } = useOrganization();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold tracking-tight">
        {organization?.name}
      </h1>
      <p className="text-muted-foreground text-sm">
        Manage organization members and settings
      </p>
    </div>
  );
}
