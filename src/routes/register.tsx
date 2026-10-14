import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FEST, THEME_WEB } from "@/lib/site-data";
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setBusy(true);
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    saveMyRegistration({ id, name: name.trim(), email: email.trim().toLowerCase() });
    toast.success("Welcome aboard!");
    setTimeout(() => {
      navigate({ to: "/events" });
    }, 300);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className={`${
          THEME_WEB
            ? "glass-web border-[#2f6bff]/35 shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(47,107,255,0.15)]"
            : "glass"
        } w-full max-w-sm rounded-[1.75rem] p-8`}
      >
        <p className="eyebrow mb-3">{FEST.name}</p>
        <h1
          className={`font-display text-3xl font-semibold ${
            THEME_WEB ? "section-heading-spider" : ""
          }`}
        >
          Register
        </h1>
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

        <Button
          type="submit"
          disabled={busy}
          className={`mt-7 w-full ${
            THEME_WEB
              ? "bg-[#e62429] text-white hover:bg-[#ff3344] shadow-[0_0_16px_rgba(230,36,41,0.55)]"
              : ""
          }`}
        >
          {busy ? "Registering…" : "Register"}
        </Button>
      </form>
    </main>
  );
}
