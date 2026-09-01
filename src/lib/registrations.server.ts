import { PARTICIPATION_EVENTS } from "@/lib/site-data";

export type Registration = {
  id: string;
  name: string;
  email: string;
};

export type ParticipantsByEvent = {
  event: string;
  participants: { id: string; name: string; email: string }[];
}[];

/**
 * Insert (or reuse) a registration for this email. Registering again with
 * the same email updates the stored name and returns the same record,
 * so the "register" step is idempotent per email address.
 */
export async function upsertRegistration(input: {
  name: string;
  email: string;
}): Promise<Registration> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("registrations")
    .upsert({ name: input.name, email: input.email }, { onConflict: "email" })
    .select("id, name, email")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Record that a registration is participating in an event. Safe to call
 * more than once for the same registration + event: duplicates are ignored.
 */
export async function joinEvent(input: {
  registrationId: string;
  eventTitle: string;
}): Promise<{ alreadyJoined: boolean }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("event_participants")
    .upsert(
      { registration_id: input.registrationId, event_title: input.eventTitle },
      { onConflict: "registration_id,event_title", ignoreDuplicates: true },
    )
    .select("id");
  if (error) throw new Error(error.message);
  return { alreadyJoined: !data || data.length === 0 };
}

/** Undo a participation (e.g. the user clicked Participate by mistake). */
export async function leaveEvent(input: {
  registrationId: string;
  eventTitle: string;
}): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("event_participants")
    .delete()
    .eq("registration_id", input.registrationId)
    .eq("event_title", input.eventTitle);
  if (error) throw new Error(error.message);
}

/** Which of the known events this registration has already joined. */
export async function listMyEvents(registrationId: string): Promise<string[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("event_participants")
    .select("event_title")
    .eq("registration_id", registrationId);
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => row.event_title);
}

/** All participants, grouped by event, for the admin Participants page. */
export async function listParticipantsByEvent(): Promise<ParticipantsByEvent> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("event_participants")
    .select("id, event_title, registrations(name, email)")
    .order("event_title", { ascending: true });
  if (error) throw new Error(error.message);

  const grouped = new Map<string, { id: string; name: string; email: string }[]>();
  for (const title of PARTICIPATION_EVENTS) grouped.set(title, []);

  for (const row of data ?? []) {
    const reg = row.registrations as unknown as { name: string; email: string } | null;
    if (!reg) continue;
    const list = grouped.get(row.event_title) ?? [];
    list.push({ id: row.id, name: reg.name, email: reg.email });
    grouped.set(row.event_title, list);
  }

  return Array.from(grouped.entries()).map(([event, participants]) => ({
    event,
    participants,
  }));
}

/** Admin-only: remove a single participant row (by its own id) from an event. */
export async function deleteParticipant(participantId: string): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("event_participants").delete().eq("id", participantId);
  if (error) throw new Error(error.message);
}
