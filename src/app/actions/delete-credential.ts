"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function deleteCredential(credentialId: number) {
  const { userId, has, orgId } = await auth();

  try {
    if (!userId) {
      throw new Error("You must be signed in to delete a credential");
    }

    const canDelete = has({ permission: "org:credentials:delete" });
    if (!canDelete) {
      throw new Error("You're not authorized to perform this action");
    }

    const { error } = await supabase
      .from("credentials")
      .delete()
      .eq("id", credentialId);

    if (error) {
      throw error;
    }

    revalidatePath(`/organization/${orgId}`);

    return {
      ok: true,
      message: "Credential Deleted",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: "Something went wrong. Try again.",
    };
  }
}
