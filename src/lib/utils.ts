import type { Role } from "@/types/auth";
import type { CoreAssistantMessage, CoreToolMessage } from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage;
type ResponseMessage = ResponseMessageWithoutId & { id: string };

export function getTrailingMessageId({
  messages,
}: {
  messages: Array<ResponseMessage>;
}): string | null {
  const trailingMessage = messages.at(-1);

  if (!trailingMessage) return null;

  return trailingMessage.id;
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function sanitizeText(text: string) {
  return text.replace("<has_function_call>", "");
}

export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getRoleKey(roleName: string): string | undefined {
  const normalized = roleName.toLowerCase().trim();

  if (
    normalized === "developer" ||
    normalized === "dev" ||
    normalized === "desarrollador" ||
    normalized === "programador"
  ) {
    return "org:developer";
  }

  if (
    normalized === "admin" ||
    normalized === "administrator" ||
    normalized === "administrador" ||
    normalized === "superadmin" ||
    normalized === "super administrador"
  ) {
    return;
  }

  if (
    normalized === "manager" ||
    normalized === "gestor" ||
    normalized === "encargado" ||
    normalized === "jefe de equipo" ||
    normalized === "team lead"
  ) {
    return "org:manager";
  }

  if (
    normalized === "guest" ||
    normalized === "invitado" ||
    normalized === "visitante"
  ) {
    return "org:guest";
  }

  if (
    normalized === "viewer" ||
    normalized === "lector" ||
    normalized === "solo lectura" ||
    normalized === "read-only"
  ) {
    return "org:viewer";
  }

  return;
}

export function keyToRoleName(key: Role) {
  const roleNames: Record<Role, string> = {
    "org:admin": "Admin",
    "org:developer": "Developer",
    "org:guest": "Guest",
    "org:manager": "Manager",
    "org:viewer": "Viewer",
  };

  return roleNames[key];
}
