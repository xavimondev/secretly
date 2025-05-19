"use server";

import { cookies } from "next/headers";

export async function saveCurrentOrganizationUrl(
  organizationRedirectUrl: string
) {
  const cookieStore = await cookies();
  cookieStore.set(
    "selectedOrganizationUrl",
    encodeURIComponent(organizationRedirectUrl),
    {
      maxAge: 3600 * 24 * 7,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    }
  );
}
