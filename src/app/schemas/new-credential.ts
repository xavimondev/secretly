import { credentialTypesList } from "@/credential-type-list";
import { z } from "zod";

const credentialTypes = credentialTypesList.map((item) => item.value) as [
  string,
  ...string[]
];

export const credentialSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[A-Z0-9_]+$/, {
      message:
        "Name must contain only uppercase letters, numbers, and underscores",
    }),
  credential: z.string().min(1, { message: "Value is required" }),
  type: z.enum(credentialTypes, {
    required_error: "Please select a credential type",
  }),
  description: z.string(),
});

export type CredentialResource = z.infer<typeof credentialSchema>;
