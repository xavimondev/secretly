import { Shield, Users, Code2, Eye, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/types/auth";

const roleConfig: Record<Role, unknown> = {
  "org:admin": {
    label: "Admin",
    icon: Crown,
    color:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200",
    description: "Full access to manage the organization",
  },
  "org:manager": {
    label: "Manager",
    icon: Shield,
    color:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
    description: "Full access to manage the organization",
  },
  "org:developer": {
    label: "Developer",
    icon: Code2,
    color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
    description: "Access to develop and contribute to the project",
  },
  "org:guest": {
    label: "Guest",
    icon: Users,
    color: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
    description: "Limited access as a guest",
  },
  "org:viewer": {
    label: "Viewer",
    icon: Eye,
    color: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
    description: "Read-only access",
  },
};

export function RoleBadge({
  role,
  includeDescription,
}: {
  role: Role;
  includeDescription: boolean;
}) {
  // @ts-expect-error fix
  const { label, icon: RoleIcon, color, description } = roleConfig[role];

  return (
    <div className="flex items-start gap-3">
      {includeDescription && (
        <div className="mt-0.5">
          <RoleIcon className="h-4 w-4 text-slate-400" />
        </div>
      )}
      <div>
        {includeDescription && <p className="text-sm font-medium">Role</p>}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
          <Badge className={`${color} font-medium`}>{label}</Badge>
          {includeDescription && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
