"use server";
import { Credential } from "@/types/credentials";
import { auth } from "@clerk/nextjs/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type FormState = {
  ok: boolean;
  message?: string;
};

export async function createCredential(data: Credential) {
  const { userId } = await auth();

  try {
    if (!userId) {
      throw new Error("You must be signed in to add a credential");
    }

    // console.log(`User id: ${userId}`);
    const { name, description, type, credential: credentialValue } = data;

    const { error } = await supabase.rpc("save_credential", {
      p_name: name,
      p_type: type,
      p_description: description,
      p_credential: credentialValue ?? "",
    });

    if (error) {
      // console.error(error);
      throw error;
    }

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
