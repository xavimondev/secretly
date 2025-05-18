import { tool } from "ai";
import { z } from "zod";
import { clerkClient } from "@/lib/clerkClient";
import { auth } from "@clerk/nextjs/server";
import { getRoleKey } from "@/lib/utils";
import type { UpdateResource } from "@/types/auth";

export const updateUserRoleOrProfile = tool({
  description: "Update or change specific user role or profile",
  parameters: z.object({
    email: z.string(),
    roleOrProfile: z.string(),
  }),
  execute: async ({ email, roleOrProfile }) => {
    return await changeUserRole({
      email,
      roleOrProfile,
    });
  },
});

async function changeUserRole(args: {
  email: string;
  roleOrProfile: string;
}): Promise<{ update: UpdateResource }> {
  try {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) throw new Error("User not authenticated");

    const roleKey = getRoleKey(args.roleOrProfile);

    // https://clerk.com/docs/references/backend/user/get-user-list
    const { data } = await clerkClient.users.getUserList({
      query: args.email,
      limit: 1,
    });

    const userTargetId = data.at(0)?.id;

    if (!userTargetId) throw new Error("User not found");

    const result = await clerkClient.organizations.updateOrganizationMembership(
      {
        organizationId: orgId,
        userId: userTargetId,
        role: roleKey ?? "org:developer",
      }
    );

    return {
      update: {
        userName: `${result.publicUserData?.firstName ?? ""} ${
          result.publicUserData?.lastName ?? ""
        }`,
        userImage: result.publicUserData?.imageUrl ?? "",
        previousRole: "",
        newRole: result.role,
      },
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error(
      `Error updating user role: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
