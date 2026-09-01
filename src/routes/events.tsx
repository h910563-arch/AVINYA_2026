import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { FEST, PARTICIPATION_EVENTS, getEventRegistrationUrl } from "@/lib/site-data";
import { loadMyRegistration, type MyRegistration } from "@/lib/my-registration";

const TITLE = `Events — ${FEST.name}`;
const DESC = `Register for ${FEST.name} events.`;

export const Route = createFileRoute("/events")({
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

function EventsPage() {
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<MyRegistration | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reg = loadMyRegistration();
    if (!reg) {
      navigate({ to: "/register" });
      return;
    }
    setRegistration(reg);
    setReady(true);
  }, [navigate]);

  if (!ready || !registration) {
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
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow mb-3">Welcome, {registration.name}</p>
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold">
          Choose your events
        </h1>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          Tap Register on an event to open its official registration page.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PARTICIPATION_EVENTS.map((eventTitle) => {
            const url = getEventRegistrationUrl(eventTitle);
            return (
              <div
                key={eventTitle}
                className="glass flex items-center justify-between gap-4 rounded-2xl px-6 py-5"
              >
                <span className="font-display text-lg font-semibold">{eventTitle}</span>
                {url ? (
                  <Button asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Register
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" disabled>
                    Registration opening soon
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
