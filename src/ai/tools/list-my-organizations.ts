import { tool } from "ai";
import { z } from "zod";
import { clerkClient } from "@/lib/clerkClient";
import { Organization } from "@/types/auth";
import { auth } from "@clerk/nextjs/server";

export const getAllMyOrganizations = tool({
  description: "List all my organizations I belong to",
  parameters: z.object({}),
  execute: async () => {
    return await listMyOrganizations();
  },
});

async function listMyOrganizations(): Promise<{
  organizations: Organization[];
}> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const organizationMemberships =
      await clerkClient.users.getOrganizationMembershipList({ userId });

    const organizations = await Promise.all(
      organizationMemberships.data.map(async (membership) => {
        const org = await clerkClient.organizations.getOrganization({
          organizationId: membership.organization.id,
        });

        return {
          id: org.id,
          name: org.name,
          slug: org.slug || "",
          role: membership.role,
        };
      })
    );

    return { organizations };
  } catch (error) {
    console.error("Error fetching user organizations:", error);
    throw new Error(
      `Error fetching user organizations: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
