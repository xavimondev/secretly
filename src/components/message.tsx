"use client";

import { memo } from "react";
import type { UIMessage } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import equal from "fast-deep-equal";
import { cn, sanitizeText } from "@/lib/utils";
import { Markdown } from "@/components/markdown";
import { MessageReasoning } from "@/components/message-reasoning";
import { UserProfileCard } from "./ai/user-profile";
import { OrganizationsList } from "./ai/organizations-list";
import { OrganizationMembersList } from "./ai/organization-members-list";
import { OrganizationDetails } from "./ai/organization-details";
import { OrganizationInvitation } from "./ai/organization-invitation";
import { RoleUpdateSuccessCard } from "./ai/role-update-sucess-card";

const PurePreviewMessage = ({
  message,
  isLoading,
  requiresScrollPadding,
  organizationName,
}: {
  message: UIMessage;
  isLoading: boolean;
  requiresScrollPadding: boolean;
  organizationName: string;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        data-testid={`message-${message.role}`}
        className="w-full mx-auto max-w-3xl px-4 group/message"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        <div className="flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:w-fit">
          {message.role === "assistant" && (
            <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
              <div className="translate-y-px">
                <SparklesIcon size={14} />
              </div>
            </div>
          )}

          <div
            className={cn("flex flex-col gap-4 w-full", {
              "min-h-96": message.role === "assistant" && requiresScrollPadding,
            })}
          >
            {message.parts?.map((part, index) => {
              const { type } = part;
              const key = `message-${message.id}-part-${index}`;

              if (type === "reasoning") {
                return (
                  <MessageReasoning
                    key={key}
                    isLoading={isLoading}
                    reasoning={part.reasoning}
                  />
                );
              }

              if (type === "text") {
                return (
                  <div key={key} className="flex flex-row gap-2 items-start">
                    <div
                      className={cn("flex flex-col gap-4", {
                        "bg-primary text-primary-foreground px-3 py-2 rounded-xl text-sm":
                          message.role === "user",
                      })}
                    >
                      <Markdown>{sanitizeText(part.text)}</Markdown>
                    </div>
                  </div>
                );
              }

              if (type === "tool-invocation") {
                const { toolInvocation } = part;
                const { toolName, toolCallId, state, args } = toolInvocation;

                if (state === "call") {
                  return (
                    <div
                      key={toolCallId}
                      className={cn("text-sm", {
                        skeleton: ["getProfile"].includes(toolName),
                      })}
                    >
                      {toolName === "getProfile" ? (
                        <span>Retrieving your profile...</span>
                      ) : toolName === "addOrganization" ? (
                        <span>Creating organization...</span>
                      ) : toolName === "getAllMyOrganizations" ? (
                        <span>Listing my organizations...</span>
                      ) : toolName === "getOrganizationMembers" ? (
                        <span>Listing {organizationName} members...</span>
                      ) : toolName === "inviteUserTool" ? (
                        <span>
                          Sending invitation to {args.emailAddress}...
                        </span>
                      ) : toolName === "updateUserRoleOrProfile" ? (
                        <span>Updating user role</span>
                      ) : null}
                    </div>
                  );
                }

                if (state === "result") {
                  const { result } = toolInvocation;
                  return (
                    <div key={toolCallId}>
                      {toolName === "getProfile" ? (
                        <UserProfileCard user={result.profile} />
                      ) : toolName === "getAllMyOrganizations" ? (
                        <OrganizationsList data={result.organizations} />
                      ) : toolName === "getOrganizationMembers" ? (
                        <OrganizationMembersList members={result.members} />
                      ) : toolName === "addOrganization" ? (
                        <OrganizationDetails
                          organization={result.organization}
                        />
                      ) : toolName === "inviteUserTool" ? (
                        <OrganizationInvitation
                          invitation={result.invitation}
                        />
                      ) : toolName === "updateUserRoleOrProfile" ? (
                        <RoleUpdateSuccessCard update={result.update} />
                      ) : (
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                      )}
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.message.id !== nextProps.message.id) return false;
    if (prevProps.organizationName !== nextProps.organizationName) return false;
    if (prevProps.requiresScrollPadding !== nextProps.requiresScrollPadding)
      return false;
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;

    return true;
  }
);

export function ThinkingMessage() {
  const role = "assistant";

  return (
    <motion.div
      data-testid="message-assistant-loading"
      className="w-full mx-auto max-w-3xl px-4 group/message min-h-96"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div
        className={cn(
          "flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": true,
          }
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <SparklesIcon size={14} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <span className="text-muted-foreground text-sm">Hmm...</span>
        </div>
      </div>
    </motion.div>
  );
}
