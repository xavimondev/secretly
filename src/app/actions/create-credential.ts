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

export async function createCredential(data: Credential, slug: string) {
  const { userId } = await auth();

  try {
    if (!userId) {
      throw new Error("You must be signed in to add a credential");
    }

    const {
      name,
      description,
      type,
      credential: credentialValue,
      organizationId,
    } = data;

    const { error } = await supabase.rpc("save_credential", {
      p_organization_id: organizationId,
      p_name: name,
      p_type: type,
      p_description: description,
      p_credential: credentialValue,
    });

    if (error) {
      throw error;
    }
    // TODO: change this to const { orgId } = await auth() because orgId returns active organization
    revalidatePath(`/organization/${slug}`);

    return {
      ok: true,
      message: "Credential stored successfully!",
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
