import { loadKeys, loadPrefs } from "./store";

export interface ProviderConfig {
  name: string;
  url: string;
  model: string;
  fallbackModel?: string;
  fallbackUrl?: string;
  type: "openai" | "gemini" | "cohere";
  keyHint: string;
  keyUrl: string;
  note: string;
}

export const PROVIDERS: Record<string, ProviderConfig> = {
  groq: {
    name: "Groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
    fallbackModel: "llama-3.1-8b-instant",
    type: "openai",
    keyHint: "gsk_...",
    keyUrl: "https://console.groq.com/keys",
    note: "Fastest free tier · 14,400 req/day",
  },
  gemini: {
    name: "Google Gemini",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    fallbackUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    model: "gemini-2.0-flash",
    type: "gemini",
    keyHint: "AIza...",
    keyUrl: "https://aistudio.google.com/apikey",
    note: "Free · 1,500 req/day · 1M context",
  },
  openrouter: {
    name: "OpenRouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    model: "meta-llama/llama-3.3-70b-instruct:free",
    fallbackModel: "google/gemini-2.0-flash-exp:free",
    type: "openai",
    keyHint: "sk-or-...",
    keyUrl: "https://openrouter.ai/keys",
    note: "Free tier across 100+ models",
  },
  together: {
    name: "Together AI",
    url: "https://api.together.xyz/v1/chat/completions",
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    type: "openai",
    keyHint: "API key",
    keyUrl: "https://api.together.xyz/settings/api-keys",
    note: "Free tier · $5 signup credit",
  },
  mistral: {
    name: "Mistral",
    url: "https://api.mistral.ai/v1/chat/completions",
    model: "mistral-small-latest",
    type: "openai",
    keyHint: "API key",
    keyUrl: "https://console.mistral.ai/api-keys",
    note: "Free tier · La Plateforme",
  },
  cohere: {
    name: "Cohere",
    url: "https://api.cohere.com/v2/chat",
    model: "command-r-08-2024",
    type: "cohere",
    keyHint: "API key",
    keyUrl: "https://dashboard.cohere.com/api-keys",
    note: "Free trial · 1,000 req/month",
  },
};

export const PROVIDER_ORDER = ["groq", "gemini", "openrouter", "together", "mistral", "cohere"];

interface AiMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AiOptions {
  temperature?: number;
  max_tokens?: number;
  json_mode?: boolean;
  model?: string;
}

async function callProvider(id: string, key: string, messages: AiMessage[], options: AiOptions): Promise<string> {
  const p = PROVIDERS[id];
  const temperature = options.temperature ?? 0.7;
  const maxTokens = options.max_tokens ?? 2048;

  if (p.type === "openai") {
    const body: Record<string, unknown> = {
      model: options.model || p.model,
      messages,
      temperature,
      max_tokens: maxTokens,
    };
    if (options.json_mode) body.response_format = { type: "json_object" };
    const res = await fetch(p.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      const err: Error & { status?: number } = new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
      err.status = res.status;
      throw err;
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  }

  if (p.type === "gemini") {
    const sys = messages.find((m) => m.role === "system");
    const turns = messages.filter((m) => m.role !== "system");
    const body: Record<string, unknown> = {
      contents: turns.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature, maxOutputTokens: maxTokens },
    };
    if (options.json_mode) (body.generationConfig as Record<string, unknown>).responseMimeType = "application/json";
    if (sys) body.systemInstruction = { parts: [{ text: sys.content }] };

    const tryUrl = async (url: string) =>
      fetch(`${url}?key=${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    let res = await tryUrl(p.url);
    if (!res.ok && p.fallbackUrl) {
      const res2 = await tryUrl(p.fallbackUrl);
      if (res2.ok) {
        const d2 = await res2.json();
        return d2.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    }
    if (!res.ok) {
      const text = await res.text();
      const err: Error & { status?: number } = new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
      err.status = res.status;
      throw err;
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  }

  if (p.type === "cohere") {
    const body = {
      model: options.model || p.model,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : m.role === "system" ? "system" : "user",
        content: m.content,
      })),
      temperature,
    };
    const res = await fetch(p.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      const err: Error & { status?: number } = new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
      err.status = res.status;
      throw err;
    }
    const data = await res.json();
    return data.message?.content?.[0]?.text || "";
  }

  throw new Error(`Unknown provider type: ${p.type}`);
}

export async function aiCall(
  messages: AiMessage[],
  options: AiOptions = {}
): Promise<{ result: string; provider: string }> {
  const keys = loadKeys();
  const prefs = loadPrefs();
  const order =
    prefs.preferredProvider && prefs.preferredProvider !== "auto" && (keys as Record<string, string>)[prefs.preferredProvider]
      ? [prefs.preferredProvider, ...PROVIDER_ORDER.filter((p) => p !== prefs.preferredProvider)]
      : PROVIDER_ORDER;

  const errors: { id: string; msg: string; status?: number }[] = [];
  for (const id of order) {
    const key = (keys as Record<string, string>)[id];
    if (!key) continue;
    try {
      const result = await callProvider(id, key, messages, options);
      return { result, provider: id };
    } catch (e: unknown) {
      const err = e as Error & { status?: number };
      errors.push({ id, msg: err.message || String(e), status: err.status });
    }
  }

  if (errors.length === 0) {
    throw new Error(
      "NO API KEYS CONFIGURED\n\nOpen Settings → API Keys and paste at least one free key.\nFastest: Groq (60-second signup) — https://console.groq.com/keys"
    );
  }

  const summary = errors
    .map((e) => {
      const name = PROVIDERS[e.id]?.name || e.id;
      if (e.status === 401) return `▸ ${name}: API key INVALID — regenerate at ${PROVIDERS[e.id]?.keyUrl}`;
      if (e.status === 429) return `▸ ${name}: RATE LIMITED — wait or add another provider`;
      if (e.status === 403) return `▸ ${name}: ACCESS DENIED — key may need billing`;
      return `▸ ${name}: ${e.msg.slice(0, 200)}`;
    })
    .join("\n");
  throw new Error(summary + "\n\nFix above OR add another provider in Settings → API Keys.");
}

export function mdToHtml(text: string): string {
  if (!text) return "";
  let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/^### +(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## +(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# +(.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/^[\-*_]{3,}\s*$/gm, "<hr>");
  html = html.replace(/^[ \t]*[-*+•] +(.+)$/gm, "<li>$1</li>");
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (/^<(h\d|ul|ol|li|hr|p|pre|blockquote|div)/.test(t)) return block;
      return "<p>" + block.replace(/\n/g, "<br>") + "</p>";
    })
    .join("\n");
  return html;
}
