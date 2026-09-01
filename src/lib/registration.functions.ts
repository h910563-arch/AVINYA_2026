import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUnlocked } from "@/lib/admin.server";
import {
  deleteParticipant,
  joinEvent,
  leaveEvent,
  listMyEvents,
  listParticipantsByEvent,
  upsertRegistration,
} from "@/lib/registrations.server";

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; email: string }) =>
    z
      .object({
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().email().max(200),
      })
      .parse(data),
  )
  .handler(async ({ data }) => upsertRegistration(data));

export const participateInEvent = createServerFn({ method: "POST" })
  .inputValidator((data: { registrationId: string; eventTitle: string }) =>
    z
      .object({
        registrationId: z.string().uuid(),
        eventTitle: z.string().min(1).max(120),
      })
      .parse(data),
  )
  .handler(async ({ data }) =>
    joinEvent({ registrationId: data.registrationId, eventTitle: data.eventTitle }),
  );

export const cancelParticipation = createServerFn({ method: "POST" })
  .inputValidator((data: { registrationId: string; eventTitle: string }) =>
    z
      .object({
        registrationId: z.string().uuid(),
        eventTitle: z.string().min(1).max(120),
      })
      .parse(data),
  )
  .handler(async ({ data }) =>
    leaveEvent({ registrationId: data.registrationId, eventTitle: data.eventTitle }),
  );

export const getMyEvents = createServerFn({ method: "GET" })
  .inputValidator((data: { registrationId: string }) =>
    z.object({ registrationId: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => listMyEvents(data.registrationId));

export const getParticipants = createServerFn({ method: "GET" }).handler(async () => {
  await requireUnlocked();
  return listParticipantsByEvent();
});

export const adminDeleteParticipant = createServerFn({ method: "POST" })
  .inputValidator((data: { participantId: string }) =>
    z.object({ participantId: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireUnlocked();
    await deleteParticipant(data.participantId);
    return { ok: true as const };
  });
