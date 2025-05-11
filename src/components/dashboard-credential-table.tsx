"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Eye,
  EyeOff,
  MoreHorizontal,
  RefreshCw,
  Trash2,
} from "lucide-react";

const credentials = [
  {
    id: "1",
    name: "API_KEY_PRODUCTION",
    type: "API Key",
    value: "sk_live_51NZWh2CYpV7vQPWU3YsAuMzZsYvY9Xm",
    expiresIn: "23 days",
    status: "active",
  },
  {
    id: "2",
    name: "DATABASE_PASSWORD",
    type: "Password",
    value: "p@ssw0rd_complex_123!",
    expiresIn: "28 days",
    status: "active",
  },
  {
    id: "3",
    name: "AWS_ACCESS_KEY",
    type: "Access Key",
    value: "AKIAIOSFODNN7EXAMPLE",
    expiresIn: "16 days",
    status: "rotating-soon",
  },
  {
    id: "4",
    name: "STRIPE_SECRET_KEY",
    type: "Secret Key",
    value: "sk_test_51NZWh2CYpV7vQPWU3YsAuMzZsYvY9Xm",
    expiresIn: "0 days",
    status: "expired",
  },
  {
    id: "5",
    name: "JWT_SECRET",
    type: "Secret",
    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    expiresIn: "25 days",
    status: "active",
  },
];

export function DashboardCredentialTable() {
  const [visibleValues, setVisibleValues] = useState<string[]>([]);

  const toggleVisibility = (id: string) => {
    setVisibleValues((current) =>
      current.includes(id)
        ? current.filter((credId) => credId !== id)
        : [...current, id]
    );
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    // toast({
    //   title: "Credential copied",
    //   description: "The credential has been copied to your clipboard.",
    // })
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20"
          >
            Active
          </Badge>
        );
      case "rotating-soon":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          >
            Rotating Soon
          </Badge>
        );
      case "expired":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-500 border-red-500/20"
          >
            Expired
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Expires In</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentials.map((credential) => (
            <TableRow key={credential.id}>
              <TableCell>
                <div className="font-medium font-mono">{credential.name}</div>
              </TableCell>
              <TableCell>{credential.type}</TableCell>
              <TableCell>
                <div className="flex items-center justify-between">
                  <div
                    className={`font-mono ${
                      visibleValues.includes(credential.id)
                        ? ""
                        : "filter blur-sm select-none"
                    }`}
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {credential.value}
                  </div>
                  <div className="flex items-center ml-2 space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleVisibility(credential.id)}
                      aria-label={
                        visibleValues.includes(credential.id)
                          ? "Hide value"
                          : "Show value"
                      }
                    >
                      {visibleValues.includes(credential.id) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(credential.value)}
                      aria-label="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TableCell>
              <TableCell>{credential.expiresIn}</TableCell>
              <TableCell>{getStatusBadge(credential.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Rotate Now</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
