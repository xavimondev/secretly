"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useAuth, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddOrganizationForm } from "./add-organization-form";

export function OrganizationSwitcher() {
  // TODO: handle infinite
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
    userInvitations: {
      infinite: true,
    },
  });
  const { orgId } = useAuth();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  function handleSelect(slug: string, orgId: string) {
    if (!setActive) return;

    setOpenPopover(false);
    setActive({ organization: orgId });
    router.push(`/organization/${slug}`);
  }

  function handleCreateNew() {
    setOpenModal(true);
  }

  // TODO: update loading
  if (!isLoaded) return null;

  const organizationList = userMemberships?.data ?? [];
  const defaultOrganization =
    orgId == null
      ? organizationList.at(0)
        ? organizationList.at(0)?.organization.name
        : null
      : organizationList.find((org) => org.organization.id === orgId)
          ?.organization.name;

  return (
    <>
      {defaultOrganization == null ? (
        <Button variant="default" onClick={handleCreateNew}>
          <Plus className="mr-2 size-4" />
          Add Organization
        </Button>
      ) : (
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPopover}
              aria-label="Select organization"
              className="w-[250px] justify-between bg-background border-muted-foreground/20"
            >
              <span className="truncate">{defaultOrganization}</span>
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search organization..." />
              <CommandList>
                <CommandEmpty>No organization found.</CommandEmpty>
                <CommandGroup>
                  {organizationList.map(({ organization }) => (
                    <CommandItem
                      key={organization.id}
                      value={organization.name}
                      onSelect={() =>
                        handleSelect(
                          organization.slug as string,
                          organization.id
                        )
                      }
                      className="flex items-center"
                    >
                      {orgId === organization.id && (
                        <Check className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          "flex-1",
                          orgId === organization.id ? "font-medium" : ""
                        )}
                      >
                        {organization.name}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleCreateNew}
                    className="text-primary cursor-pointer"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add organization
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}

      <AddOrganizationForm open={openModal} onOpenChange={setOpenModal} />
    </>
  );
}
