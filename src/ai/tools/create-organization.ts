import { clerkClient } from "@/lib/clerkClient";
import { generateSlug } from "@/lib/utils";
import { OrganizationResource } from "@/types/auth";
import { auth } from "@clerk/nextjs/server";
import { tool } from "ai";
import { z } from "zod";

export const addOrganization = tool({
  description: "Add or create a new organization",
  parameters: z.object({
    name: z.string(),
    slug: z.string().nullish(),
  }),
  execute: async ({ name, slug }) => {
    return await createOrganization({
      name,
      slug,
    });
  },
});

async function createOrganization(args: {
  name: string;
  slug: string | undefined | null;
}): Promise<{ organization: OrganizationResource }> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const tempSlug = args.slug ?? generateSlug(args.name);

    const organization = await clerkClient.organizations.createOrganization({
      name: args.name,
      slug: tempSlug,
      createdBy: userId,
    });

    return {
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug || "",
      },
    };
  } catch (error) {
    console.error("An error has ocurred while creating organization:", error);
    throw new Error(
      `An error has ocurred while creating organization: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
