const STORAGE_KEY = "avinya26:registration";

export type MyRegistration = {
  id: string;
  name: string;
  email: string;
};

export function saveMyRegistration(registration: MyRegistration) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(registration));
}

export function loadMyRegistration(): MyRegistration | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.id === "string" && typeof parsed.email === "string") {
      return parsed as MyRegistration;
    }
    return null;
  } catch {
    return null;
  }
}
