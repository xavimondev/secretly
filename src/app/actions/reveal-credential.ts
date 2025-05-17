"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function revealCredential(vaultId: string) {
  const { userId, has } = await auth();

  if (!userId) {
    throw new Error("You must be signed in and have an active organization");
  }

  try {
    const canView = has({ permission: "org:credentials:read" });
    if (!canView) {
      throw new Error("You're not authorized to perform this action");
    }

    const { data, error } = await supabase.rpc("get_credential", {
      secret_id: vaultId,
    });

    if (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }

    return {
      ok: true,
      data,
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
