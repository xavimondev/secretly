"use server";

import { auth } from "@clerk/nextjs/server";

import { APP_URL } from "@/app/constants";
import { clerkClient } from "@/lib/clerkClient";

export type FormState = {
  ok: boolean;
  message?: string;
};

export async function invite(email: string, role: string) {
  const { userId, orgId } = await auth();

  try {
    if (!userId || !orgId) {
      throw new Error("You must be signed in to add a credential");
    }

    await clerkClient.organizations.createOrganizationInvitation({
      organizationId: orgId,
      emailAddress: email,
      role: role,
      redirectUrl: `${APP_URL}/login`,
    });

    return {
      ok: true,
      message: "Invitation sent successfully!",
    };
  } catch {
    return {
      ok: false,
      error: `Something went wrong`,
    };
  }
}
