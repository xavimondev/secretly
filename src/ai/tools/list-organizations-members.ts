import { tool } from "ai";
import { z } from "zod";
import { clerkClient } from "@/lib/clerkClient";
import { Member } from "@/types/auth";
import { auth } from "@clerk/nextjs/server";

export const getOrganizationMembers = tool({
  description: "List current organization members",
  parameters: z.object({}),
  execute: async () => {
    return await listOrganizationMembers();
  },
});

async function listOrganizationMembers(): Promise<{ members: Member[] }> {
  try {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) throw new Error("User not authenticated");

    const { data } =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: orgId,
        limit: 10,
      });
    const members = data.map((member) => {
      const { publicUserData } = member;
      const { firstName, lastName, identifier, imageUrl } =
        publicUserData ?? {};
      return {
        id: member.id,
        firstName: firstName || "",
        lastName: lastName || "",
        email: identifier || "",
        imageUrl: imageUrl || "",
        role: member.role,
      };
    });

    return { members };
  } catch (error) {
    console.error("Error al listar los miembros de la organización:", error);
    throw new Error(
      `Error al listar miembros: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
