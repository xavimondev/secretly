"use client";

import { saveCurrentOrganizationUrl } from "@/app/actions/save-current-organization";
import { OrganizationList, useOrganizationList } from "@clerk/nextjs";
import { OrganizationListSkeleton } from "./organization-list-skeleton";

function goToOrganization(slug: string) {
  const redirectUrl = `/organization/${slug}`;
  saveCurrentOrganizationUrl(redirectUrl);
  return redirectUrl;
}

export function OnboardingOrganizationList() {
  const { setActive } = useOrganizationList();

  return (
    <OrganizationList
      hidePersonal
      hideSlug
      skipInvitationScreen
      afterCreateOrganizationUrl={(org) => {
        setActive?.({ organization: org.id });
        return goToOrganization(org.slug as string);
      }}
      afterSelectOrganizationUrl={(org) => {
        setActive?.({ organization: org.id });
        return goToOrganization(org.slug as string);
      }}
      fallback={<OrganizationListSkeleton />}
    />
  );
}
