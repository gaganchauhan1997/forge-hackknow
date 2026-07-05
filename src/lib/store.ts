const KEYS_KEY = "forge-keys";
const PREFS_KEY = "forge-prefs";
const DRAFT_PREFIX = "forge-draft:";
const USER_KEY = "forge-user";
const RESUMES_KEY = "forge-resumes";

function jget<T>(k: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(k) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
function jset(k: string, v: unknown) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch { /* quota */ }
}

export interface UserProfile {
  name: string;
  email: string;
  photo: string;
  plan: "free" | "pro" | "premium" | "daypass";
  planExpiresAt?: string;
  loggedIn: boolean;
}

const DEFAULT_USER: UserProfile = {
  name: "",
  email: "",
  photo: "",
  plan: "free",
  loggedIn: false,
};

export function loadUser(): UserProfile {
  return { ...DEFAULT_USER, ...jget(USER_KEY, {}) };
}
export function saveUser(u: Partial<UserProfile>) {
  jset(USER_KEY, { ...loadUser(), ...u });
}
export function loginUser(name: string, email: string) {
  saveUser({ name, email, loggedIn: true });
}
export function logoutUser() {
  jset(USER_KEY, DEFAULT_USER);
}

export interface ApiKeys {
  groq?: string;
  gemini?: string;
  openrouter?: string;
  together?: string;
  mistral?: string;
  cohere?: string;
}

export function loadKeys(): ApiKeys {
  return jget(KEYS_KEY, {});
}
export function saveKeys(keys: ApiKeys) {
  jset(KEYS_KEY, keys);
}
export function setKey(provider: string, value: string) {
  const keys = loadKeys();
  if (value && value.trim()) (keys as Record<string, string>)[provider] = value.trim();
  else delete (keys as Record<string, string>)[provider];
  saveKeys(keys);
  return keys;
}
export function activeKeyCount(): number {
  return Object.values(loadKeys()).filter(Boolean).length;
}

export interface Preferences {
  preferredProvider: string;
  tone: string;
  roastPersona: string;
  gapTone: string;
  lastTool: string;
}

const DEFAULT_PREFS: Preferences = {
  preferredProvider: "auto",
  tone: "corporate",
  roastPersona: "recruiter",
  gapTone: "confident-honest",
  lastTool: "home",
};

export function loadPrefs(): Preferences {
  return { ...DEFAULT_PREFS, ...jget(PREFS_KEY, {}) };
}
export function savePrefs(prefs: Partial<Preferences>) {
  jset(PREFS_KEY, { ...loadPrefs(), ...prefs });
}

export function loadDraft(toolId: string): Record<string, string> {
  return jget(DRAFT_PREFIX + toolId, {});
}
export function saveDraft(toolId: string, inputs: Record<string, string>) {
  if (!inputs || Object.keys(inputs).length === 0)
    localStorage.removeItem(DRAFT_PREFIX + toolId);
  else jset(DRAFT_PREFIX + toolId, inputs);
}
export function clearDraft(toolId: string) {
  localStorage.removeItem(DRAFT_PREFIX + toolId);
}

export interface SavedResume {
  id: string;
  title: string;
  company: string;
  icon: string;
  atsScore: number;
  editedAt: string;
  content: string;
}

export function loadResumes(): SavedResume[] {
  return jget(RESUMES_KEY, []);
}
export function saveResumes(list: SavedResume[]) {
  jset(RESUMES_KEY, Array.isArray(list) ? list : []);
}
