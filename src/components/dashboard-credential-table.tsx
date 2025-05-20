"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Edit2, Eye, EyeOff, MoreHorizontal, Trash2 } from "lucide-react";

import { credentialTypesList } from "@/credential-type-list";
import { Credential } from "@/types/credentials";
import { OrgPermissions } from "@/types/permissions";
import { revealCredential } from "@/app/actions/reveal-credential";
import { deleteCredential } from "@/app/actions/delete-credential";

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
import { EditCredentialForm } from "./edit-credential-form";
import { EditCredentialResource } from "@/app/schemas/edit-credential";

type DashboardCredentialTableProps = {
  data: Credential[];
  permissions: OrgPermissions;
};

type VaultStore = Record<string, string>;

const DEFAULT_PLACEHOLDER = "********-****-****-************";

export function DashboardCredentialTable({
  data,
  permissions,
}: DashboardCredentialTableProps) {
  const [visibleValues, setVisibleValues] = useState<number[]>([]);
  const [vaultStore, setVaultStore] = useState<VaultStore>({});
  const { canDelete, canUpdate } = permissions;
  const canSeeActions = canDelete || canUpdate;
  const [open, setOpen] = useState(false);
  const [credentialSelected, setCredentialSelected] = useState<
    EditCredentialResource | undefined
  >();

  function updateState(id: number) {
    setVisibleValues((current) =>
      current.includes(id)
        ? current.filter((credId) => credId !== id)
        : [...current, id]
    );
  }

  async function toggleVisibility(id: number, vaultId: string) {
    const hasCurrentSecret =
      vaultStore[vaultId] && vaultStore[vaultId] !== DEFAULT_PLACEHOLDER;

    if (hasCurrentSecret) {
      setVaultStore((vaultStore) => ({
        ...vaultStore,
        [vaultId]: DEFAULT_PLACEHOLDER,
      }));
      updateState(id);
      return;
    }

    const { ok, data, error } = await revealCredential(vaultId);
    if (!ok) {
      toast.error(error);
      return;
    }

    setVaultStore((vaultStore) => ({
      ...vaultStore,
      [vaultId]: data,
    }));
    updateState(id);
  }

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    toast.info("Credential copied");
  }

  async function deleteRow(credentialId: number) {
    toast.promise(deleteCredential(credentialId), {
      loading: "Deleting credential",
      success: (data) => {
        const { ok, error } = data;
        if (!ok) {
          return error;
        }
        return "Credential deleted";
      },
      error: "Something went wrong",
    });
  }

  return (
    <>
      <div className="rounded-md border">
        {/* TODO: add pagination */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Description</TableHead>
              {canSeeActions && (
                <TableHead className="w-[100px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && (
              <TableRow className="text-center">
                <TableCell colSpan={4}>
                  No credentials found in this organization
                </TableCell>
              </TableRow>
            )}
            {data.map((cre) => (
              <TableRow key={cre.id}>
                <TableCell>
                  <div className="font-medium font-mono">{cre.name}</div>
                </TableCell>
                <TableCell>
                  {credentialTypesList.find((type) => type.value === cre.type)
                    ?.label ?? ""}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <div
                      className={`font-mono max-w-[300px] overflow-hidden text-ellipsis ${
                        visibleValues.includes(cre.id as number)
                          ? ""
                          : "filter blur-sm select-none"
                      }`}
                    >
                      {vaultStore[cre.vaultid as string] || DEFAULT_PLACEHOLDER}
                    </div>
                    <div className="flex items-center ml-2 space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          toggleVisibility(cre.id!, cre.vaultid as string)
                        }
                        aria-label={
                          visibleValues.includes(cre.id!)
                            ? "Hide value"
                            : "Show value"
                        }
                      >
                        {visibleValues.includes(cre.id!) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          copyToClipboard(
                            vaultStore[cre.vaultid as string] ||
                              DEFAULT_PLACEHOLDER
                          )
                        }
                        aria-label="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="overflow-hidden text-ellipsis">
                    {cre.description}
                  </p>
                </TableCell>
                {canSeeActions && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {canUpdate && (
                          <DropdownMenuItem
                            onClick={() => {
                              setOpen(true);
                              setCredentialSelected({
                                id: cre.id as number,
                                name: cre.name,
                                type: cre.type,
                                description: cre.description ?? "",
                                credential: "TEMP_NONE_VALUE",
                              });
                            }}
                          >
                            <Edit2 className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                        )}
                        {canDelete && (
                          <DropdownMenuItem
                            className="text-destructive hover:bg-red-400 hover:text-red-700"
                            onClick={() => deleteRow(cre.id as number)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {credentialSelected && (
        <EditCredentialForm
          open={open}
          onOpenChange={setOpen}
          credential={credentialSelected}
        />
      )}
    </>
  );
}
