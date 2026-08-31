import { createClient } from "@supabase/supabase-js";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";
import type { Database } from "@/integrations/supabase/types";
import { mergeContent, type SiteContent } from "@/lib/site-content";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  return {
 password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "avinya-admin",
    maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

export function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function getAdminSession() {
  return useSession<AdminSession>(sessionConfig());
}

export async function isUnlocked(): Promise<boolean> {
  const session = await getAdminSession();
  return session.data.unlocked === true;
}

export async function requireUnlocked() {
  if (!(await isUnlocked())) throw new Error("Unauthorized");
}

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export async function fetchContent(): Promise<SiteContent> {
  const { data, error } = await publicClient()
    .from("site_content")
    .select("data")
    .eq("id", "site")
    .maybeSingle();
  if (error) {
    console.error("[site_content] read failed", error.message);
    return mergeContent(null);
  }
  return mergeContent(data?.data ?? null);
}

export async function persistContent(content: SiteContent): Promise<SiteContent> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("site_content")
    .upsert({ id: "site", data: content as never, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  return content;
}
