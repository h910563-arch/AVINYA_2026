import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAdminStatus,
  getSiteContent,
  lockAdmin,
  saveSiteContent,
  unlockAdmin,
} from "@/lib/admin.functions";
import type { SiteContent } from "@/lib/site-content";

const TITLE = "Admin Panel — अvinya'26";
const DESC =
  "Password-protected control room to edit अvinya'26 events, timeline, gallery, crew and contact details.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const status = useServerFn(getAdminStatus);
  const fetchContent = useServerFn(getSiteContent);
  const unlock = useServerFn(unlockAdmin);
  const lock = useServerFn(lockAdmin);
  const save = useServerFn(saveSiteContent);

  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    (async () => {
      const s = await status();
      setUnlocked(s.unlocked);
      setReady(true);
      if (s.unlocked) {
        setContent(await fetchContent());
      }
    })().catch(() => setReady(true));
  }, [status, fetchContent]);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await unlock({ data: { password } });
      if (!res.ok) {
        toast.error("Wrong password");
        return;
      }
      setUnlocked(true);
      setPassword("");
      setContent(await fetchContent());
      toast.success("Welcome back, admin");
    } finally {
      setBusy(false);
    }
  }

  async function handleSave() {
    if (!content) return;
    setBusy(true);
    try {
      await save({ data: { content } });
      toast.success("Saved to the database");
    } catch {
      toast.error("Could not save. Try signing in again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLock() {
    await lock();
    setUnlocked(false);
    setContent(null);
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Loading…
        </p>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <Toaster />
        <form onSubmit={handleUnlock} className="glass w-full max-w-sm rounded-[1.75rem] p-8">
          <p className="eyebrow mb-3">Restricted</p>
          <h1 className="font-display text-3xl font-semibold">Admin access</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter the admin password to edit the website content.
          </p>
          <div className="mt-7 space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={busy} className="mt-6 w-full">
            {busy ? "Checking…" : "Unlock"}
          </Button>
        </form>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Loading content…
        </p>
      </main>
    );
  }

  const set = (patch: Partial<SiteContent>) => setContent({ ...content, ...patch });

  return (
    <main className="min-h-screen px-5 py-12 sm:px-8">
      <Toaster />
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Control room</p>
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold">Admin Panel</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleLock}>
              Lock
            </Button>
            <Button onClick={handleSave} disabled={busy}>
              {busy ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </header>

        <Tabs defaultValue="events">
          <TabsList className="mb-8 flex-wrap">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            {content.events.map((ev, i) => (
              <Card
                key={i}
                title={ev.title || `Event ${i + 1}`}
                onRemove={() => set({ events: content.events.filter((_, j) => j !== i) })}
              >
                <Grid>
                  {(
                    [
                      ["Title", "title"],
                      ["Category", "category"],
                      ["Date", "date"],
                      ["Venue", "venue"],
                      ["Image URL", "image"],
                    ] as const
                  ).map(([label, key]) => (
                    <Field
                      key={key}
                      label={label}
                      value={ev[key]}
                      onChange={(v) =>
                        set({
                          events: content.events.map((x, j) => (j === i ? { ...x, [key]: v } : x)),
                        })
                      }
                    />
                  ))}
                </Grid>
                <Area
                  label="Description"
                  value={ev.description}
                  onChange={(v) =>
                    set({
                      events: content.events.map((x, j) =>
                        j === i ? { ...x, description: v } : x,
                      ),
                    })
                  }
                />
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                set({
                  events: [
                    ...content.events,
                    {
                      title: "",
                      category: "",
                      date: "",
                      venue: "",
                      image: "",
                      description: "",
                    },
                  ],
                })
              }
            >
              + Add event
            </Button>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            {content.timeline.map((it, i) => (
              <Card
                key={i}
                title={it.title || `Phase ${i + 1}`}
                onRemove={() => set({ timeline: content.timeline.filter((_, j) => j !== i) })}
              >
                <Grid>
                  {(
                    [
                      ["Phase", "phase"],
                      ["Meta (date · time)", "meta"],
                      ["Title", "title"],
                    ] as const
                  ).map(([label, key]) => (
                    <Field
                      key={key}
                      label={label}
                      value={it[key]}
                      onChange={(v) =>
                        set({
                          timeline: content.timeline.map((x, j) =>
                            j === i ? { ...x, [key]: v } : x,
                          ),
                        })
                      }
                    />
                  ))}
                </Grid>
                <Area
                  label="Description"
                  value={it.description}
                  onChange={(v) =>
                    set({
                      timeline: content.timeline.map((x, j) =>
                        j === i ? { ...x, description: v } : x,
                      ),
                    })
                  }
                />
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                set({
                  timeline: [
                    ...content.timeline,
                    { phase: "", meta: "", title: "", description: "" },
                  ],
                })
              }
            >
              + Add phase
            </Button>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            {content.gallery.map((src, i) => (
              <div key={i} className="flex items-end gap-3">
                <div className="flex-1">
                  <Field
                    label={`Image ${i + 1} URL`}
                    value={src}
                    onChange={(v) =>
                      set({ gallery: content.gallery.map((x, j) => (j === i ? v : x)) })
                    }
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => set({ gallery: content.gallery.filter((_, j) => j !== i) })}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={() => set({ gallery: [...content.gallery, ""] })}>
              + Add image
            </Button>
          </TabsContent>

          <TabsContent value="team" className="space-y-8">
            {content.teams.map((group, gi) => (
              <Card
                key={gi}
                title={group.title || `Group ${gi + 1}`}
                onRemove={() => set({ teams: content.teams.filter((_, j) => j !== gi) })}
              >
                <Grid>
                  <Field
                    label="Group title"
                    value={group.title}
                    onChange={(v) =>
                      set({
                        teams: content.teams.map((x, j) => (j === gi ? { ...x, title: v } : x)),
                      })
                    }
                  />
                  <Field
                    label="Label (e.g. 06 members)"
                    value={group.count}
                    onChange={(v) =>
                      set({
                        teams: content.teams.map((x, j) => (j === gi ? { ...x, count: v } : x)),
                      })
                    }
                  />
                </Grid>

                <div className="mt-6 space-y-4">
                  {group.members.map((m, mi) => {
                    const updateMember = (patch: Partial<typeof m>) =>
                      set({
                        teams: content.teams.map((g, j) =>
                          j === gi
                            ? {
                                ...g,
                                members: g.members.map((x, k) =>
                                  k === mi ? { ...x, ...patch } : x,
                                ),
                              }
                            : g,
                        ),
                      });
                    return (
                      <div
                        key={mi}
                        className="grid gap-3 rounded-2xl border border-white/8 p-4 sm:grid-cols-[1fr_1fr_2fr_auto]"
                      >
                        <Field
                          label="Name"
                          value={m.name}
                          onChange={(v) => updateMember({ name: v })}
                        />
                        <Field
                          label="Role"
                          value={m.role ?? ""}
                          onChange={(v) => updateMember({ role: v })}
                        />
                        <Field
                          label="Photo URL"
                          value={m.image}
                          onChange={(v) => updateMember({ image: v })}
                        />
                        <div className="flex items-end">
                          <Button
                            variant="outline"
                            onClick={() =>
                              set({
                                teams: content.teams.map((g, j) =>
                                  j === gi
                                    ? { ...g, members: g.members.filter((_, k) => k !== mi) }
                                    : g,
                                ),
                              })
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    variant="outline"
                    onClick={() =>
                      set({
                        teams: content.teams.map((g, j) =>
                          j === gi
                            ? { ...g, members: [...g.members, { name: "", role: "", image: "" }] }
                            : g,
                        ),
                      })
                    }
                  >
                    + Add member
                  </Button>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                set({ teams: [...content.teams, { title: "", count: "", members: [] }] })
              }
            >
              + Add group
            </Button>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card title="Contact details">
              <Grid>
                <Field
                  label="Email"
                  value={content.contact.email}
                  onChange={(v) => set({ contact: { ...content.contact, email: v } })}
                />
                <Field
                  label="Campus"
                  value={content.contact.campus}
                  onChange={(v) => set({ contact: { ...content.contact, campus: v } })}
                />
              </Grid>
              <Area
                label="Footer blurb"
                value={content.contact.blurb}
                onChange={(v) => set({ contact: { ...content.contact, blurb: v } })}
              />
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex justify-end">
          <Button onClick={handleSave} disabled={busy}>
            {busy ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </main>
  );
}

function Card({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-[1.5rem] p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {onRemove ? (
          <Button variant="ghost" onClick={onRemove}>
            Delete
          </Button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-4 space-y-2">
      <Label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </Label>
      <Textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
