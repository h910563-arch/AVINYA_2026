import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FEST } from "@/lib/site-data";
import { submitRegistration } from "@/lib/registration.functions";
import { saveMyRegistration } from "@/lib/my-registration";

const TITLE = `Register — ${FEST.name}`;
const DESC = `Register for ${FEST.name} to pick your events.`;

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const register = useServerFn(submitRegistration);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const registration = await register({ data: { name, email } });
      saveMyRegistration(registration);
      toast.success("You're registered!");
      navigate({ to: "/events" });
    } catch {
      toast.error("Could not register. Check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="glass w-full max-w-sm rounded-[1.75rem] p-8"
      >
        <p className="eyebrow mb-3">{FEST.name}</p>
        <h1 className="font-display text-3xl font-semibold">Register</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Enter your details to register — you'll pick your events next.
        </p>

        <div className="mt-7 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={busy} className="mt-7 w-full">
          {busy ? "Registering…" : "Register"}
        </Button>
      </form>
    </main>
  );
}
