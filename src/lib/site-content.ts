import {
  CONTACT_BLURB,
  EVENTS,
  FEST,
  GALLERY,
  TEAMS,
  TIMELINE,
  type TeamGroup,
} from "@/lib/site-data";

export type EventItem = {
  title: string;
  category: string;
  date: string;
  venue: string;
  image: string;
  description: string;
};

export type TimelineItem = {
  phase: string;
  meta: string;
  title: string;
  description: string;
};

export type ContactInfo = {
  email: string;
  campus: string;
  blurb: string;
};

export type SiteContent = {
  events: EventItem[];
  timeline: TimelineItem[];
  gallery: string[];
  teams: TeamGroup[];
  contact: ContactInfo;
};

export const DEFAULT_CONTENT: SiteContent = {
  events: EVENTS.map((e) => ({ ...e })),
  timeline: TIMELINE.map((t) => ({ ...t })),
  gallery: [...GALLERY],
  teams: TEAMS.map((g) => ({ ...g, members: g.members.map((m) => ({ ...m })) })),
  contact: {
    email: FEST.email,
    campus: FEST.campus,
    blurb: CONTACT_BLURB,
  },
};

/** Merge a partial record coming from the database over the built-in defaults. */
export function mergeContent(raw: unknown): SiteContent {
  const data = (raw ?? {}) as Partial<SiteContent>;
  return {
    events: Array.isArray(data.events) ? data.events : DEFAULT_CONTENT.events,
    timeline: Array.isArray(data.timeline) ? data.timeline : DEFAULT_CONTENT.timeline,
    gallery: Array.isArray(data.gallery) ? data.gallery : DEFAULT_CONTENT.gallery,
    teams: Array.isArray(data.teams) ? data.teams : DEFAULT_CONTENT.teams,
    contact: { ...DEFAULT_CONTENT.contact, ...(data.contact ?? {}) },
  };
}
