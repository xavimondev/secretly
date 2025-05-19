"use client";

import { Building2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrganizationResource } from "@/types/auth";
import { useOrganizationList } from "@clerk/nextjs";
import { saveCurrentOrganizationUrl } from "@/app/actions/save-current-organization";

interface OrganizationCardProps {
  organization: OrganizationResource;
}

export function OrganizationDetails({ organization }: OrganizationCardProps) {
  const { setActive } = useOrganizationList();
  const { id, name, slug } = organization;

  async function goTo(slug: string) {
    setActive?.({ organization: id });

    const redirectUrl = `/organization/${slug}`;
    await saveCurrentOrganizationUrl(redirectUrl);
    window.location.href = redirectUrl;
  }

  return (
    <Card className="w-full max-w-[23rem] mx-auto overflow-hidden border border-green-200 shadow-sm">
      <CardHeader className="bg-green-100 p-3.5">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-full">
            <Building2 className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-sm text-green-600 font-medium">
            Organization Created
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm">Name</p>
            <span className="text-xs">{name}</span>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Slug</p>
            <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
              {slug}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pb-4">
        <Button className="w-full sm:w-auto text-sm" onClick={() => goTo(slug)}>
          Go to organization
        </Button>
      </CardFooter>
    </Card>
  );
}
