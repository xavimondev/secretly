"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardCredentialTable } from "@/components/dashboard-credential-table";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AddCredentialForm } from "@/components/add-credential-form";

export default function Dashboard() {
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen size-full">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-4 md:p-6">
              <div className="space-y-7">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Credentials
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      Manage your credentials and secrets securely across all
                      your environments.
                    </p>
                  </div>
                  <Button
                    variant="default"
                    onClick={() => setIsAddCredentialOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Credential
                  </Button>
                </div>

                <DashboardCredentialTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
      <AddCredentialForm
        open={isAddCredentialOpen}
        onOpenChange={setIsAddCredentialOpen}
      />
    </>
  );
}
