import { useEffect, useRef, useState } from "react";
import { OrganizationCustomRoleKey } from "@clerk/types";
import { useOrganization } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SelectRoleProps = {
  fieldName?: string;
  isDisabled?: boolean;
  onChange?: (role: OrganizationCustomRoleKey) => void;
  defaultRole?: string;
};

type Role = {
  roleKey: OrganizationCustomRoleKey;
  name: string;
};

export const SelectRole = ({
  fieldName,
  isDisabled = false,
  onChange,
  defaultRole,
}: SelectRoleProps) => {
  const { organization } = useOrganization();
  const [fetchedRoles, setRoles] = useState<Role[]>([]);
  const isPopulated = useRef(false);

  useEffect(() => {
    if (isPopulated.current) return;
    organization
      ?.getRoles({
        pageSize: 20,
        initialPage: 1,
      })
      .then((res) => {
        isPopulated.current = true;
        setRoles(
          res.data.map((roles) => ({
            roleKey: roles.key as OrganizationCustomRoleKey,
            name: roles.name,
          }))
        );
      });
  }, [organization?.id]);

  if (fetchedRoles.length === 0) return null;

  return (
    <Select
      name={fieldName}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      defaultValue={defaultRole}
      onValueChange={(value) => {
        onChange?.(value as OrganizationCustomRoleKey);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        {fetchedRoles?.map(({ roleKey, name }) => (
          <SelectItem key={roleKey} value={roleKey}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
