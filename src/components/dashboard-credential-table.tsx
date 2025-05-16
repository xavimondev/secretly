"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Edit2, Eye, EyeOff, MoreHorizontal, Trash2 } from "lucide-react";

import { credentialTypesList } from "@/credential-type-list";
import { Credential } from "@/types/credentials";
import { OrgPermissions } from "@/types/permissions";

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

type DashboardCredentialTableProps = {
  data: Credential[];
  permissions: OrgPermissions;
};

export function DashboardCredentialTable({
  data,
  permissions,
}: DashboardCredentialTableProps) {
  const [visibleValues, setVisibleValues] = useState<number[]>([]);
  const { canDelete, canUpdate } = permissions;
  const canSeeActions = canDelete || canUpdate;

  const toggleVisibility = (id: number) => {
    setVisibleValues((current) =>
      current.includes(id)
        ? current.filter((credId) => credId !== id)
        : [...current, id]
    );
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.info("Credential copied");
  };

  return (
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
              </TableCell>{" "}
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
                    className={`font-mono ${
                      visibleValues.includes(cre.id as number)
                        ? ""
                        : "filter blur-sm select-none"
                    }`}
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cre.credential}
                  </div>
                  <div className="flex items-center ml-2 space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleVisibility(cre.id!)}
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
                      onClick={() => copyToClipboard(cre.credential)}
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
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                      )}
                      {canDelete && (
                        <DropdownMenuItem className="text-destructive hover:bg-red-400 hover:text-red-700">
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
  );
}
