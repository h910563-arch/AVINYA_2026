import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FEST } from "@/lib/site-data";

const TITLE = "Admin — अvinya'26";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: TITLE }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="glass w-full max-w-lg rounded-[2rem] p-8 text-center sm:p-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          System Notice
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Static Frontend Mode
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {FEST.name} is configured as a 100% frontend static application. Database updates are
          disabled. All event details, gallery pictures, and team rosters are maintained directly in
          the Git repository inside{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-foreground">
            src/lib/site-data.ts
          </code>
          .
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
