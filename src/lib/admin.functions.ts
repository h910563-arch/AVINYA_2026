import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  fetchContent,
  getAdminSession,
  isUnlocked,
  passwordMatches,
  persistContent,
  requireUnlocked,
} from "@/lib/admin.server";
import { mergeContent, type SiteContent } from "@/lib/site-content";

const contentSchema = z.object({
  events: z.array(
    z.object({
      title: z.string().max(120),
      category: z.string().max(80),
      date: z.string().max(40),
      venue: z.string().max(120),
      image: z.string().max(600),
      description: z.string().max(2000),
    }),
  ),
  timeline: z.array(
    z.object({
      phase: z.string().max(60),
      meta: z.string().max(80),
      title: z.string().max(120),
      description: z.string().max(1000),
    }),
  ),
  gallery: z.array(z.string().max(600)),
  teams: z.array(
    z.object({
      title: z.string().max(120),
      count: z.string().max(40),
      members: z.array(
        z.object({
          name: z.string().max(120),
          role: z.string().max(80).optional(),
          image: z.string().max(600),
        }),
      ),
    }),
  ),
  contact: z.object({
    email: z.string().max(200),
    campus: z.string().max(300),
    blurb: z.string().max(2000),
  }),
});

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => fetchContent());

export const getAdminStatus = createServerFn({ method: "GET" }).handler(async () => ({
  unlocked: await isUnlocked(),
}));

export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => z.object({ password: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) throw new Error("ADMIN_PASSWORD is not configured");
    if (!passwordMatches(data.password, expected)) return { ok: false as const };
    const session = await getAdminSession();
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator((data: { content: SiteContent }) =>
    z.object({ content: contentSchema }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireUnlocked();
    return persistContent(mergeContent(data.content));
  });
