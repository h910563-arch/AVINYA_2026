import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FEST, PARTICIPATION_EVENTS } from "@/lib/site-data";
import {
  cancelParticipation,
  getMyEvents,
  participateInEvent,
  submitRegistration,
} from "@/lib/registration.functions";
import { loadMyRegistration, saveMyRegistration, type MyRegistration } from "@/lib/my-registration";

const TITLE = `Events — ${FEST.name}`;
const DESC = `Pick the ${FEST.name} events you want to take part in.`;

export const Route = createFileRoute("/events")({
  validateSearch: z.object({
    event: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: EventsPage,
});

/** Match a title from anywhere on the site (e.g. the homepage event cards) to a canonical event, ignoring case. */
function resolveEvent(raw: string | undefined): string | null {
  if (!raw) return null;
  const match = PARTICIPATION_EVENTS.find((e) => e.toLowerCase() === raw.toLowerCase());
  return match ?? null;
}

function EventsPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const fetchMyEvents = useServerFn(getMyEvents);
  const register = useServerFn(submitRegistration);
  const participate = useServerFn(participateInEvent);
  const cancel = useServerFn(cancelParticipation);

  const [registration, setRegistration] = useState<MyRegistration | null>(null);
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  const [modalEvent, setModalEvent] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [leavingEvent, setLeavingEvent] = useState<string | null>(null);

  useEffect(() => {
    const reg = loadMyRegistration();
    const focusEvent = resolveEvent(search.event);

    if (!reg) {
      if (focusEvent) {
        // Came straight from an event's own "Register" link — collect
        // name + email for that specific event instead of bouncing to
        // the generic registration page.
        openModal(focusEvent, "", "");
        setReady(true);
      } else {
        navigate({ to: "/register" });
      }
      return;
    }

    setRegistration(reg);
    (async () => {
      try {
        const mine = await fetchMyEvents({ data: { registrationId: reg.id } });
        setJoined(new Set(mine));
        if (focusEvent && !mine.includes(focusEvent)) {
          openModal(focusEvent, reg.name, reg.email);
        }
      } finally {
        setReady(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })();
  }, [navigate, fetchMyEvents]);

  function openModal(eventTitle: string, prefillName: string, prefillEmail: string) {
    setModalEvent(eventTitle);
    setName(prefillName);
    setEmail(prefillEmail);
  }

  function closeModal() {
    setModalEvent(null);
    if (search.event) navigate({ to: "/events", replace: true });
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!modalEvent) return;
    setBusy(true);
    try {
      const reg = await register({ data: { name, email } });
      saveMyRegistration(reg);
      setRegistration(reg);
      await participate({ data: { registrationId: reg.id, eventTitle: modalEvent } });
      setJoined((prev) => new Set(prev).add(modalEvent));
      toast.success(`You're in for ${modalEvent}`);
      setModalEvent(null);
      if (search.event) navigate({ to: "/events", replace: true });
    } catch {
      toast.error("Could not save that. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLeave(eventTitle: string) {
    if (!registration) return;
    setLeavingEvent(eventTitle);
    try {
      await cancel({ data: { registrationId: registration.id, eventTitle } });
      setJoined((prev) => {
        const next = new Set(prev);
        next.delete(eventTitle);
        return next;
      });
      toast.success(`Removed from ${eventTitle}`);
    } catch {
      toast.error("Could not remove that. Please try again.");
    } finally {
      setLeavingEvent(null);
    }
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

  return (
    <main className="min-h-screen px-5 py-20 sm:px-8">
      <Toaster />

      <Dialog open={modalEvent !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="glass rounded-[1.5rem] border-white/10 bg-background/95">
          <form onSubmit={handleConfirm}>
            <DialogHeader>
              <DialogTitle className="font-display">Confirm participation</DialogTitle>
              <DialogDescription>
                Participating in <span className="text-foreground">{modalEvent}</span>. Please
                confirm your details.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-name">Name</Label>
                <Input
                  id="modal-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-email">Email</Label>
                <Input
                  id="modal-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={closeModal} disabled={busy}>
                Cancel
              </Button>
              <Button type="submit" disabled={busy}>
                {busy ? "Saving…" : "Confirm participate"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mx-auto max-w-4xl">
        <p className="eyebrow mb-3">
          {registration ? `Welcome, ${registration.name}` : FEST.name}
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold">
          Choose your events
        </h1>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          Pick as many {FEST.name} events as you'd like to take part in. Tap an event you've
          already joined to remove it.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PARTICIPATION_EVENTS.map((eventTitle) => {
            const isJoined = joined.has(eventTitle);
            const isLeaving = leavingEvent === eventTitle;
            return (
              <div
                key={eventTitle}
                className="glass flex items-center justify-between gap-4 rounded-2xl px-6 py-5"
              >
                <span className="font-display text-lg font-semibold">{eventTitle}</span>
                {isJoined ? (
                  <Button
                    variant="outline"
                    disabled={isLeaving}
                    onClick={() => handleLeave(eventTitle)}
                  >
                    {isLeaving ? "Removing…" : "Participating ✓ — remove"}
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      openModal(eventTitle, registration?.name ?? "", registration?.email ?? "")
                    }
                  >
                    Participate
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
