import { APP_URL } from "@/app/constants";
import { clerkClient } from "@/lib/clerkClient";
import { getRoleKey } from "@/lib/utils";
import { Invitation } from "@/types/auth";
import { auth } from "@clerk/nextjs/server";
import { tool } from "ai";
import { z } from "zod";

export const inviteUserTool = tool({
  description: "Invite user to an organization",
  parameters: z.object({
    emailAddress: z.string(),
    role: z.string().nullish(),
  }),
  execute: async ({ emailAddress, role }) => {
    return await inviteUser({
      emailAddress,
      role,
    });
  },
});

async function inviteUser(args: {
  emailAddress: string;
  role: string | null | undefined;
}): Promise<{ invitation: Invitation }> {
  try {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) throw new Error("User not authenticated");

    const roleKey = getRoleKey(args.role ?? "developer");
    if (!roleKey)
      throw new Error(
        "Role does not exists or you can not request admin rights"
      );

    const invitation =
      await clerkClient.organizations.createOrganizationInvitation({
        organizationId: orgId,
        emailAddress: args.emailAddress,
        role: roleKey,
        redirectUrl: `${APP_URL}/login`,
      });

    return {
      invitation: {
        emailAddress: invitation.emailAddress,
        role: invitation.role,
      },
    };
  } catch (error) {
    console.error("Error user invite:", error);
    throw new Error(
      `Error user invite: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
