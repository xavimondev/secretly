import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationsList } from "./organizations-list";
import { UserProfile } from "@/types/auth";

interface UserProfileProps {
  user: UserProfile;
}

export function UserProfileCard({ user }: UserProfileProps) {
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <Card className="w-full max-w-2xl mx-auto space-y-3">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-2">
        <Avatar className="size-14 border">
          <AvatarImage
            src={user.imageUrl || "/placeholder.svg"}
            alt={fullName}
          />
          <AvatarFallback>
            {user.firstName}
            {user.lastName}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <CardTitle>{fullName}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {user.email || "No email"}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <OrganizationsList data={user.organizations} />
      </CardContent>
    </Card>
  );
}
