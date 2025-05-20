"use server";
import { Credential } from "@/types/credentials";
import { auth } from "@clerk/nextjs/server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type FormState = {
  ok: boolean;
  message?: string;
};

export async function editCredential(data: Credential) {
  const { userId, has, orgSlug } = await auth();

  try {
    if (!userId) {
      throw new Error("You must be signed in to edit a credential");
    }

    const canEdit = has({ permission: "org:credentials:update" });
    if (!canEdit) {
      throw new Error("You're not authorized to perform this action");
    }

    const { id, name, description, type, credential } = data;

    const { error } = await supabase.rpc("edit_credential", {
      p_id: id,
      p_name: name,
      p_type: type,
      p_description: description,
      p_credential: credential,
    });

    if (error) {
      throw error;
    }
    revalidatePath(`/organization/${orgSlug}`);

    return {
      ok: true,
      message: "Credential updated successfully!",
    };
  } catch {
    return {
      ok: false,
      errors: {
        server: `Something went wrong`,
      },
    };
  }
}
