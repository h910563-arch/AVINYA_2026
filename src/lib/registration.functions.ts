import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { upsertRegistration } from "@/lib/registrations.server";

/**
 * Used by the site-wide Register flow (navbar → name/email → Events page).
 * Individual events now register their own participants on their external
 * pages, so this is the only registration-related server function left.
 */
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
