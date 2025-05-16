"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Credential } from "@/types/credentials";

import { Button } from "@/components/ui/button";
import { DashboardCredentialTable } from "./dashboard-credential-table";
import { AddCredentialForm } from "./add-credential-form";

type CredentialsSectionProps = {
  data: Credential[];
};

export function CredentialsSection({ data }: CredentialsSectionProps) {
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);

  return (
    <>
      <div className="flex-1 p-4 md:p-6">
        <div className="space-y-7">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Credentials
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage your credentials and secrets securely across all your
                environments.
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => setIsAddCredentialOpen(true)}
            >
              <Plus className="mr-2 size-4" />
              Add Credential
            </Button>
          </div>

          <DashboardCredentialTable data={data} />
        </div>
      </div>
      <AddCredentialForm
        open={isAddCredentialOpen}
        onOpenChange={setIsAddCredentialOpen}
      />
    </>
  );
}
