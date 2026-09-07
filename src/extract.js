/**
 * Turning a pasted URL into structured fields.
 *
 * Lifted out of App.jsx so the Three Oaks planner and the bucket list share one
 * implementation: same CORS proxies, same page-text extraction, same lenient
 * JSON parsing. Only the schema asked of Claude differs between the two.
 */

/** Claude sometimes wraps JSON in prose; take the outermost object. */
export function parseJsonLoose(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) throw new Error("No JSON found in response");
  return JSON.parse(text.slice(start, end + 1));
}

/** Structured data and meta tags first — they are already clean. */
export function extractPageContent(html) {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const parts = [];

    doc.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
      try { parts.push("STRUCTURED DATA: " + s.textContent.trim()); } catch { /* ignore */ }
    });

    const meta = {};
    doc.querySelectorAll("meta[property], meta[name]").forEach(m => {
      const k = m.getAttribute("property") || m.getAttribute("name");
      const v = m.getAttribute("content");
      if (k && v && (k.startsWith("og:") || ["description", "keywords"].includes(k))) meta[k] = v;
    });
    if (Object.keys(meta).length) parts.push("META: " + JSON.stringify(meta));

    const title = doc.querySelector("title")?.textContent?.trim();
    if (title) parts.push("TITLE: " + title);

    const body = (doc.body?.textContent || "").replace(/\s+/g, " ").trim();
    if (body) parts.push(body);

    return parts.join("\n\n").slice(0, 8000);
  } catch {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").slice(0, 8000);
  }
}

/** The browser cannot fetch most sites directly, so go through a CORS proxy. */
export async function fetchPageHtml(target) {
  const timeout = ms => AbortSignal.timeout(ms);

  // Proxy 1: allorigins (returns JSON wrapper)
  try {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(target)}`, { signal: timeout(8000) });
    if (res.ok) {
      const json = await res.json();
      if (json?.contents) return json.contents;
    }
  } catch { /* try next */ }

  // Proxy 2: corsproxy.io (returns raw HTML)
  try {
    const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(target)}`, { signal: timeout(8000) });
    if (res.ok) return await res.text();
  } catch { /* try next */ }

  throw new Error("PROXY");
}

/**
 * Ask Claude to fill a schema from page text. Throws with code "AUTH" when the
 * key is missing or rejected, so callers can prompt for one.
 */
export async function extractWithClaude({ system, prompt, apiKey, model = "claude-sonnet-4-6", maxTokens = 1024 }) {
  const headers = {
    "content-type": "application/json",
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true",
  };
  if (apiKey) headers["x-api-key"] = apiKey;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (res.status === 401 || res.status === 403) {
    const err = new Error("auth");
    err.code = "AUTH";
    throw err;
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}. ${body.slice(0, 160)}`);
  }

  const data = await res.json();
  return parseJsonLoose(data?.content?.[0]?.text || "");
}

/** Where the page keeps the user's own Anthropic key, when they supply one. */
export const API_KEY_STORAGE = "anthropic_api_key";

export function loadApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE) || import.meta.env.VITE_ANTHROPIC_API_KEY || "";
  } catch {
    return import.meta.env.VITE_ANTHROPIC_API_KEY || "";
  }
}

export function saveApiKey(value) {
  try {
    if (value) localStorage.setItem(API_KEY_STORAGE, value);
    else localStorage.removeItem(API_KEY_STORAGE);
  } catch { /* ignore */ }
}
