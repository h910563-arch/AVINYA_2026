-- Registration + event participation for अvinya'26.
-- Both tables are only ever read/written from server functions using the
-- service-role client (see src/lib/registrations.server.ts), so RLS is left
-- fully locked down for anon/authenticated: no public policies are created.

CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.registrations TO service_role;

CREATE TABLE public.event_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid NOT NULL REFERENCES public.registrations (id) ON DELETE CASCADE,
  event_title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (registration_id, event_title)
);

ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.event_participants TO service_role;

CREATE INDEX event_participants_event_title_idx ON public.event_participants (event_title);
