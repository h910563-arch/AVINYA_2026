import { createFileRoute } from "@tanstack/react-router";
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
  const [registration, setRegistration] = useState<MyRegistration | null>(null);

  useEffect(() => {
    setRegistration(loadMyRegistration());
  }, []);

  return (
    <main className="min-h-screen px-5 py-20 sm:px-8">
      <Toaster />
      <div className="mx-auto max-w-4xl">
        <a
          href="/#events"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-cyan transition-colors mb-6"
        >
          <span>←</span>
          <span>Back to Fest Overview</span>
        </a>
        <p className="eyebrow mb-3">
          {registration?.name ? `Welcome, ${registration.name}` : FEST.name}
        </p>
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
