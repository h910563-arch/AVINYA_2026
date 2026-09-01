export type Registration = {
  id: string;
  name: string;
  email: string;
};

/**
 * Insert (or reuse) a registration for this email. Registering again with
 * the same email updates the stored name and returns the same record,
 * so the "register" step is idempotent per email address.
 *
 * This is used for the site-wide Register flow only (navbar → name/email
 * → Events page). Individual events link straight to their own external
 * registration site, so there is no per-event participation tracking here.
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
