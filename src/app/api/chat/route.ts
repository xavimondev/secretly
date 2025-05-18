import { createDataStream, smoothStream, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { regularPrompt } from "@/ai/prompts";
import { generateUUID, getTrailingMessageId } from "@/lib/utils";
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from "resumable-stream";
import { after } from "next/server";
import { ChatSDKError } from "@/errors";
import { auth } from "@clerk/nextjs/server";
import { getProfile } from "@/ai/tools/show-my-profile";
import { addOrganization } from "@/ai/tools/create-organization";
import { getAllMyOrganizations } from "@/ai/tools/list-my-organizations";
import { updateUserRoleOrProfile } from "@/ai/tools/change-user-role";
import { getOrganizationMembers } from "@/ai/tools/list-organizations-members";
import { inviteUserTool } from "@/ai/tools/invite-user";

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("REDIS_URL")) {
          console.log(
            " > Resumable streams are disabled due to missing REDIS_URL"
          );
        } else {
          console.error(error);
        }
      }
    }
  }

  return globalStreamContext;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const { userId } = await auth();

    if (!userId) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    // TODO: ADD RATELIMIT
    // const userType: UserType = session.user.type;

    // const messageCount = await getMessageCountByUserId({
    //   id: session.user.id,
    //   differenceInHours: 24,
    // });

    // if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
    //   return new ChatSDKError("rate_limit:chat").toResponse();
    // }

    const streamId = generateUUID();
    // await createStreamId({ streamId, chatId: id });

    const stream = createDataStream({
      execute: (dataStream) => {
        const result = streamText({
          model: openai("gpt-4o-mini"),
          system: regularPrompt,
          messages,
          experimental_activeTools: [
            "addOrganization",
            "getProfile",
            "getAllMyOrganizations",
            "updateUserRoleOrProfile",
            "getOrganizationMembers",
            "inviteUserTool",
          ],
          experimental_transform: smoothStream({ chunking: "word" }),
          experimental_generateMessageId: generateUUID,
          tools: {
            getProfile,
            addOrganization,
            getAllMyOrganizations,
            updateUserRoleOrProfile,
            getOrganizationMembers,
            inviteUserTool,
          },
          onFinish: async ({ response }) => {
            if (userId) {
              try {
                const assistantId = getTrailingMessageId({
                  messages: response.messages.filter(
                    (message) => message.role === "assistant"
                  ),
                });

                if (!assistantId) {
                  throw new Error("No assistant message found!");
                }

                // const [, assistantMessage] = appendResponseMessages({
                //   messages: [message],
                //   responseMessages: response.messages,
                // });
              } catch {
                console.error("Failed to save chat");
              }
            }
          },
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: () => {
        return "Oops, an error occurred!";
      },
    });

    const streamContext = getStreamContext();

    if (streamContext) {
      return new Response(
        await streamContext.resumableStream(streamId, () => stream)
      );
    } else {
      return new Response(stream);
    }
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
  }
}
