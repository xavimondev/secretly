export type UserId = string;
export type OrganizationId = string;
export type Role =
  | "org:manager"
  | "org:guest"
  | "org:developer"
  | "org:viewer"
  | "org:admin";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  role: string;
}

export interface OrganizationResource {
  id: string;
  name: string;
  slug: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  organizations: Organization[];
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  role: string;
}

export interface Invitation {
  emailAddress: string;
  role: string;
}

export interface UpdateResource {
  userName: string;
  userImage: string;
  previousRole: string;
  newRole: string;
}
