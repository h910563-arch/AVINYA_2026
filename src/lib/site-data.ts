export const FEST = {
  name: "अvinya'26",
  tagline: "Infinity Unleashed · 2026",
  glyph: "अ",
  targetDate: "2026-03-04T09:00:00+05:30",
  bannerUrl: "https://avinya-26.vercel.app/assets/banner-u2Q6ufGC.webp",
  registerUrl: "/register",
  eventsUrl: "/events",
  email: "societytheempirical@gmail.com",
  campus: "Guru Tegh Bahadur 4th Centenary College",
};

export const ABOUT_PARAGRAPHS = [
  "अVINYA, The Annual Tech Fest organised by The Empirical Society, the first technical society of Guru Tegh Bahadur 4th Centenary Engineering College, is a distinguished event celebrating innovation, knowledge, and creativity. अVINYA means \u201cInnovation,\u201d embodying the fest's mission to offer a platform for students to engage with emerging technologies through a range of exciting events.",
  "Guided by our college motto, 'Fostering Dreams, Forging Futures,' अVINYA focuses on developing technical, communication, and presentation skills. This year marks the fourth edition, now an inter-college event, welcoming participants from various institutions to collaborate and showcase their abilities.",
];

export const HERO_INTRO =
  "अVINYA, The Annual Tech Fest organised by The Empirical Society, the first technical society of Guru Tegh Bahadur 4th Centenary Engineering College, is a distinguished event celebrating innovation, knowledge, and creativity.";

const EVENT_IMG = "https://avinya-26.vercel.app/assets/event-hack-CaEbIHq0.jpg";

export const EVENTS = [
  {
    title: "TURING TRIAL",
    category: "AI & Research",
    date: "04 MAR",
    venue: "Cyber Lab 01",
    image: EVENT_IMG,
    description:
      "An evaluation matrix pitting complex intelligence networks against human parsing protocols. Dive deep into prompt engine\u2026",
  },
  {
    title: "KILL CODE",
    category: "Coding",
    date: "04 MAR",
    venue: "Cyber Lab 01",
    image: EVENT_IMG,
    description:
      "A high-stress tactical offensive and defensive speed coding infrastructure. Build automated scripts, hunt computational \u2026",
  },
  {
    title: "SYNTHORA",
    category: "Development",
    date: "04 MAR",
    venue: "Cyber Lab 01",
    image: EVENT_IMG,
    description:
      "Amalgamate multiple open-source technologies to architect full-stack structural engines. Projects address machine virtua\u2026",
  },
];

export const TIMELINE = [
  {
    phase: "Phase 01",
    meta: "JAN 20 · 00:00",
    title: "Registrations Open",
    description: "Portal opens for all flagship events with early-bird access to workshops.",
  },
  {
    phase: "Phase 02",
    meta: "FEB 12 · 10:00",
    title: "Selection & Mentorship",
    description: "Shortlisted teams are paired with industry mentors to refine proposals.",
  },
  {
    phase: "Phase 03",
    meta: "MAR 04 · 09:00",
    title: "System Activation",
    description: "Opening ceremony and keynote from industry titans in the Grand Auditorium.",
  },
  {
    phase: "Phase 04",
    meta: "MAR 05 · 09:00",
    title: "Competitions & Expo",
    description: "Two full days of tracks, panels, and interactive student showcases.",
  },
  {
    phase: "Phase 05",
    meta: "MAR 06 · 18:00",
    title: "The Grand Finale",
    description: "Award ceremony followed by our signature cultural night.",
  },
];

const G = "https://ivpzuptfcwezgqjnsrgs.supabase.co/storage/v1/object/public/site-media/gallery/";
export const GALLERY = [
  "1784914006018-94k0w0.jpeg",
  "1784913991937-qv0416.jpeg",
  "1784913975158-7e0nlg.jpeg",
  "1784913950100-vm2xnp.jpeg",
  "1784913916865-8ikuw4.jpeg",
  "1784913904589-mnjhp2.jpeg",
  "1784913894699-ehtd8d.jpeg",
  "1784913883898-vm94nn.jpeg",
  "1784913858289-v9ogi3.jpeg",
  "1784913848381-uh81kb.jpeg",
  "1784913838332-0apxq9.jpeg",
  "1784913825172-o77jax.jpeg",
  "1784913813435-21bpip.jpeg",
  "1784913798409-9tif5o.jpeg",
].map((f) => G + f);

const A = "https://ivpzuptfcwezgqjnsrgs.supabase.co/storage/v1/object/public/site-images/";
const B = "https://ivpzuptfcwezgqjnsrgs.supabase.co/storage/v1/object/public/site-media/team/";

export type Member = { name: string; role?: string; image: string };
export type TeamGroup = { title: string; count: string; members: Member[] };

export const TEAMS: TeamGroup[] = [
  {
    title: "Faculty Coordinators",
    count: "02 members",
    members: [
      { name: "VIBHA JAIN", image: A + "1782323871501-u7gihb6owg.jpg" },
      { name: "HARPREET KAUR SODHI", image: A + "1782323889769-ixx1g3q1pwn.jpg" },
    ],
  },
  {
    title: "Mentors",
    count: "03 members",
    members: [
      { name: "ISHIKA GOYAL", image: A + "1782408334670-5ygsab3t609.jpg" },
      { name: "KRITIKA", image: A + "1782408356519-wi248133zy.jpg" },
      { name: "HARSH RAJ SINGH", image: A + "1782408409567-19z8hvkg26j.jpg" },
    ],
  },
  {
    title: "Heads: The Empirical Society",
    count: "02 members",
    members: [
      { name: "SAANVI SATISH", image: A + "1782326876253-ls27w3ruweq.jpg" },
      { name: "KSHITIZ PATEL", image: A + "1782323642630-nsy0puhq1m.jpg" },
    ],
  },
  {
    title: "Turing Trial",
    count: "06 members",
    members: [
      { name: "SWETA", role: "Team Lead", image: A + "1782323422043-dpruy0qsdic.jpg" },
      { name: "SHUBH", role: "MEMBER", image: B + "1784958105391-00eq40.jpeg" },
      { name: "UNNATI", role: "MEMBER", image: A + "1782407991743-3509nzxqwl4.jpg" },
      { name: "SAKSHAM BATRA", role: "MEMBER", image: A + "1782321638508-eowaji5eerb.jpg" },
      { name: "YASHIKA", role: "MEMBER", image: A + "1782408179347-vcq3xjq4fu.jpg" },
      { name: "AYAN JOSHI", role: "MEMBER", image: A + "1782321735072-qugmfom5jm.jpg" },
    ],
  },
  {
    title: "Kill Code",
    count: "08 members",
    members: [
      { name: "YAKSHITA", role: "Team Lead", image: A + "1782407652098-ydim0q9bew.jpg" },
      { name: "CHHAVISHKA", role: "MEMBER", image: A + "1782322747507-ogedqu86y4.jpg" },
      { name: "JATIN SINGH", role: "MEMBER", image: A + "1782321896627-qw0b96x55od.jpg" },
      { name: "HARMAN", role: "MEMBER", image: A + "1782504594223-3ya001sl15.jpg" },
      { name: "ADITYA SHARMA", role: "MEMBER", image: A + "1782322728450-t488ekzfkx.jpg" },
      { name: "MUSKAN", role: "MEMBER", image: A + "1782321932865-6vc02ewasnu.jpg" },
      { name: "KHUSHBOO", role: "MEMBER", image: A + "1782321907017-c7f5pfaoel.jpg" },
      { name: "MDALSA", role: "MEMBER", image: A + "1782503937198-jkaaflrymw.jpg" },
    ],
  },
  {
    title: "Synthora",
    count: "05 members",
    members: [
      { name: "RIDHIMA MITTAL", role: "TEAM LEAD", image: A + "1782503385148-57qlnqm1uk.jpg" },
      { name: "MEHUL", role: "MEMBER", image: A + "1782321566642-7m9j0vkalwt.jpg" },
      { name: "JAGRIT SOOD", role: "MEMBER", image: A + "1782322408103-w1h29ie1j1.jpg" },
      { name: "ABHINAV KUMAR", role: "Member", image: A + "1782283058442-73cpgss8y6c.jpg" },
      { name: "DIVYA", role: "MEMBER", image: A + "1782321772678-m0850i0i5z.jpg" },
    ],
  },
  {
    title: "Binary Blitz",
    count: "07 members",
    members: [
      { name: "KARTIK BHARDWAJ", role: "Team Lead", image: A + "1782323391057-frxxzn9oqat.jpg" },
      { name: "DAKSHA SINGH", role: "MEMBER", image: A + "1782321531661-p72ubv0bxvq.jpg" },
      { name: "RAUNAK", role: "MEMBER", image: A + "1782322299983-950puyto8p.jpg" },
      { name: "SUMIT", role: "MEMBER", image: A + "1782321842191-i0ataso3hv.jpg" },
      { name: "NIRDESH KHANNA", role: "MEMBER", image: A + "1782321818105-tffbymjmk48.jpg" },
      { name: "PARIDHI GARG", role: "MEMBER", image: B + "1784956604057-4xk93o.jpeg" },
      { name: "SAVITRI DUTTA", role: "MEMBER", image: B + "1784956629249-dadih9.jpeg" },
    ],
  },
  {
    title: "Thinkverse",
    count: "07 members",
    members: [
      { name: "MUDITA", role: "Team Lead", image: A + "1782323377506-07saej8teqyg.jpg" },
      { name: "PRAGYA", role: "MEMBER", image: B + "1784956677075-7efybp.jpeg" },
      { name: "ARCHITA", role: "Member", image: B + "1785003913652-x9kt02.jpeg" },
      { name: "YUG SHARMA", role: "MEMBER", image: A + "1782322631074-vezcvlxo5ll.jpg" },
      { name: "CHIRAG", role: "MEMBER", image: A + "1782322394059-laqnnuttl3s.jpg" },
      { name: "AKSHIT RAJPUT", role: "MEMBER", image: A + "1782321711571-k9522ddcov.jpg" },
      { name: "ABHAY", role: "MEMBER", image: A + "1782321870646-x8t4sufqvrl.jpg" },
    ],
  },
  {
    title: "Case Tactix",
    count: "06 members",
    members: [
      { name: "KASHISH", role: "Team Lead", image: A + "1782323495528-h183fkoqgie.jpg" },
      { name: "HARMAN", role: "MEMBER", image: A + "1782504594223-3ya001sl15.jpg" },
      { name: "SAANVI", role: "MEMBER", image: A + "1782322465221-d164npmgclh.jpg" },
      { name: "SAKSHAM SHARMA", role: "MEMBER", image: A + "1782322478557-jmkia3pq3c.jpg" },
      { name: "SUDHANSHU", role: "MEMBER", image: A + "1782322940411-p4jxrjftr1.jpg" },
      { name: "JAYANT ARORA", role: "MEMBER", image: B + "1784956712301-63v1mo.jpeg" },
    ],
  },
  {
    title: "Code Whirl",
    count: "07 members",
    members: [
      { name: "KHUSHI", role: "Team Lead", image: A + "1782322723182-77h6ctyqvgw.jpg" },
      { name: "RIDHIMA SHARMA", role: "MEMBER", image: A + "1782322906498-hts8tm0c0lo.jpg" },
      { name: "DISHIKA RUSTAGI", role: "MEMBER", image: A + "1782502582757-jtxx7f7nu3.jpg" },
      { name: "PRAGATI", role: "MEMBER", image: A + "1782503855300-55k602erkl.jpg" },
      { name: "NAITIK", role: "MEMBER", image: A + "1782322771650-upqlb7vt9h.jpg" },
      { name: "TANISHQ MADHWANI", role: "MEMBER", image: A + "1782322311604-6z9xobttqzg.jpg" },
      { name: "LUCKEY DAHIYA", role: "MEMBER", image: A + "1782504258186-maae9tro8hp.jpg" },
    ],
  },
  {
    title: "Cuisine Cosmos",
    count: "08 members",
    members: [
      { name: "VANSH", role: "Team Lead", image: A + "1782323505204-fk89jz7o50g.jpg" },
      { name: "SAINA", role: "MEMBER", image: A + "1782321590185-aumrq8vt9s4.jpg" },
      { name: "PARTH", role: "MEMBER", image: A + "1782407737173-6com79bs1mk.jpg" },
      { name: "LAVANYA", role: "MEMBER", image: A + "1782321803790-44au0kkcxg.jpg" },
      { name: "SANJANA SHARMA", role: "MEMBER", image: A + "1782322921355-zooo571c73d.jpg" },
      { name: "JATIN TYAGI", role: "MEMBER", image: A + "1782322418754-90utf03jy1l.jpg" },
      { name: "AMAN", role: "MEMBER", image: A + "1782322335702-r55dou44lx.jpg" },
      { name: "ADITYA RAI", role: "MEMBER", image: A + "1782407877225-oifde9yfhxc.jpg" },
    ],
  },
  {
    title: "DesignOps",
    count: "07 members",
    members: [
      { name: "BHAVYA", role: "Team Lead", image: A + "1782323111404-dn1fudpa92k.jpg" },
      { name: "HARSH", role: "MEMBER", image: B + "1784956824803-18k9n3.jpeg" },
      { name: "ABHINAV KUMAR", role: "MEMBER", image: B + "1784956855775-5x1pio.jpeg" },
      { name: "TARUN KUMAR", role: "MEMBER", image: A + "1782322553108-s58ln381a1e.jpg" },
      { name: "ARYAN TIWARI", role: "MEMBER", image: B + "1785004003513-dtc82p.jpeg" },
      { name: "SAKSHI AGGARWAL", role: "MEMBER", image: A + "1782322495936-npe2580aix.jpg" },
      { name: "SONA KUMARI", role: "MEMBER", image: A + "1782322542163-5qddpb8cqqj.jpg" },
    ],
  },
  {
    title: "Colossal-A-Pitch",
    count: "07 members",
    members: [
      { name: "AAKASH", role: "Team Lead", image: A + "1782323100229-5qfrg2i08so.jpg" },
      { name: "PRIYANSHI", role: "MEMBER", image: A + "1782321579131-1qyvjun5clp.jpg" },
      { name: "YASHVARDHAN GOYAL", role: "MEMBER", image: A + "1782322611113-jao7myh94oq.jpg" },
      { name: "RITYA KAPOOR", role: "MEMBER", image: A + "1782504109871-mn8kzdya66.jpg" },
      { name: "VISHU GARG", role: "MEMBER", image: A + "1782322595273-jtohvfhl0y.jpg" },
      { name: "VIRANG", role: "MEMBER", image: A + "1782504067519-aktzp2c70f5.jpg" },
      { name: "ARPIT", role: "MEMBER", image: B + "1784956950724-dnsotf.jpeg" },
    ],
  },
];

const NON_EVENT_TEAM_GROUPS = new Set([
  "Faculty Coordinators",
  "Mentors",
  "Heads: The Empirical Society",
]);

/** The fest's competition events, derived from the team roster above so this list never drifts from it. */
export const PARTICIPATION_EVENTS = TEAMS.filter((g) => !NON_EVENT_TEAM_GROUPS.has(g.title)).map(
  (g) => g.title,
);

/**
 * Each event's own external registration site — the same destination its
 * poster's QR code opens. "Register" for an event redirects here directly;
 * there is no on-site Name + Email form for individual events anymore.
 */
export const EVENT_REGISTRATION_URLS: Record<string, string> = {
  "Turing Trial": "https://www.unievent.in/events/turing-trial-1784814346333",
  "Kill Code": "https://www.unievent.in/events/kill-code-1784810712638",
  Synthora: "https://www.unievent.in/events/synthora-1784811045061",
  "Binary Blitz": "https://www.canvaqr.com/RGQr4_xbr-",
  Thinkverse: "https://www.unievent.in/events/think-verse-1784812334649",
  "Case Tactix": "https://www.unievent.in/events/case-tactix-1784744873849",
  "Code Whirl": "https://www.unievent.in/events/codewhirl-1784808405446",
  "Cuisine Cosmos": "https://www.unievent.in/events/cuisine-cosmos-1784809529603",
  DesignOps: "https://www.unievent.in/events/design-ops-1784809988495",
  "Colossal-A-Pitch": "https://q.me-qr.com/ebj58x6e",
};

/** Looks up an event's external registration URL, ignoring case (poster titles and team titles don't always match case). */
export function getEventRegistrationUrl(eventTitle: string): string | null {
  if (EVENT_REGISTRATION_URLS[eventTitle]) return EVENT_REGISTRATION_URLS[eventTitle];
  const key = Object.keys(EVENT_REGISTRATION_URLS).find(
    (k) => k.toLowerCase() === eventTitle.toLowerCase(),
  );
  return key ? EVENT_REGISTRATION_URLS[key] : null;
}

export const SPONSORS = [
  "NEBULA LABS",
  "QUANTUM FORGE",
  "BINARY SOUL",
  "NEON CIRCUIT",
  "AXIOM VENTURES",
  "HELIOS COMPUTE",
  "ORBIT DYNAMICS",
  "PRISM WORKS",
];

export const CONTACT_BLURB =
  "Sponsorship, collaboration, or a question about the fest — drop us a message and someone from the crew will get back to you.";
