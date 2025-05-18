import { tool } from "ai";
import { z } from "zod";
import { clerkClient } from "@/lib/clerkClient";
import { UserProfile } from "@/types/auth";
import { auth } from "@clerk/nextjs/server";

export const getProfile = tool({
  description: "Get, show or print the current user's profile",
  parameters: z.object({}),
  execute: async () => {
    return await showMyProfile();
  },
});

async function showMyProfile(): Promise<{ profile: UserProfile }> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const user = await clerkClient.users.getUser(userId);
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

    return {
      profile: {
        id: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        imageUrl: user.imageUrl,
        organizations,
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error(
      `Error fetching user: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
