/**
 * Meta Conversions API (server side).
 *
 * Sends events from our server straight to Meta, alongside the browser pixel.
 * Each event carries the same event ID the browser pixel used, so Meta counts
 * it once ("deduplication").
 *
 * Needs META_CAPI_ACCESS_TOKEN in the environment. If it's missing, events are
 * skipped silently so the site keeps working.
 */
import { createHash, randomUUID } from "crypto";
import { company } from "@/lib/company";

const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";

export type MetaServerEvent =
  | "PageView"
  | "Lead"
  | "CompleteRegistration"
  | "SubmitApplication"
  | "Schedule";

/** Request details captured before the response is sent. */
export interface MetaRequestContext {
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  referer?: string;
}

export interface MetaUser {
  email?: string;
  phone?: string;
  /** Full name; split into first and last name before hashing. */
  name?: string;
}

interface SendMetaEventInput {
  eventName: MetaServerEvent;
  eventId?: string;
  /** Page the event happened on. Defaults to the request's Referer. */
  eventSourceUrl?: string;
  context: MetaRequestContext;
  user?: MetaUser;
  customData?: Record<string, string | number>;
}

const EVENT_ID_PATTERN = /^[A-Za-z0-9_-]{8,100}$/;

/** Returns the event ID if it looks valid, otherwise undefined. */
export function cleanEventId(value: unknown): string | undefined {
  return typeof value === "string" && EVENT_ID_PATTERN.test(value) ? value : undefined;
}

function parseCookies(header: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!header) return cookies;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    try {
      cookies[key] = decodeURIComponent(value);
    } catch {
      cookies[key] = value;
    }
  }
  return cookies;
}

/** Reads IP, user agent and Meta cookies from the incoming request. */
export function getMetaRequestContext(request: Request): MetaRequestContext {
  const headers = request.headers;
  const cookies = parseCookies(headers.get("cookie"));
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    undefined;

  return {
    ip,
    userAgent: headers.get("user-agent") || undefined,
    fbp: cookies._fbp,
    fbc: cookies._fbc,
    referer: headers.get("referer") || undefined,
  };
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

// Normalisation rules from Meta's customer information parameters docs.
const hashEmail = (email: string) => sha256(email.trim().toLowerCase());
const hashPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  return digits.length >= 7 ? sha256(digits) : undefined;
};
const hashName = (name: string) => {
  const cleaned = name.trim().toLowerCase().replace(/[\s\p{P}]/gu, "");
  return cleaned ? sha256(cleaned) : undefined;
};

function isHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Builds the click ID from ?fbclid= when the _fbc cookie isn't set yet. */
function clickIdFromUrl(url: string | undefined): string | undefined {
  if (!isHttpUrl(url)) return undefined;
  const fbclid = new URL(url).searchParams.get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

/**
 * Sends one event to the Conversions API. Never throws — failures are logged
 * so a Meta outage can't break a form submission.
 */
export async function sendMetaEvent({
  eventName,
  eventId,
  eventSourceUrl,
  context,
  user,
  customData,
}: SendMetaEventInput): Promise<boolean> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID || company.metaPixelId;
  if (!accessToken || !pixelId) return false;

  const sourceUrl = isHttpUrl(eventSourceUrl)
    ? eventSourceUrl
    : isHttpUrl(context.referer)
      ? context.referer
      : undefined;

  const [firstName, ...rest] = (user?.name || "").trim().split(/\s+/);
  const lastName = rest.join(" ");

  const userData: Record<string, string | string[]> = {};
  if (context.ip) userData.client_ip_address = context.ip;
  if (context.userAgent) userData.client_user_agent = context.userAgent;
  if (context.fbp) userData.fbp = context.fbp;
  const fbc = context.fbc || clickIdFromUrl(sourceUrl);
  if (fbc) userData.fbc = fbc;
  if (user?.email) userData.em = [hashEmail(user.email)];
  const phone = user?.phone ? hashPhone(user.phone) : undefined;
  if (phone) userData.ph = [phone];
  const fn = firstName ? hashName(firstName) : undefined;
  if (fn) userData.fn = [fn];
  const ln = lastName ? hashName(lastName) : undefined;
  if (ln) userData.ln = [ln];

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId || randomUUID(),
        action_source: "website",
        ...(sourceUrl ? { event_source_url: sourceUrl } : {}),
        user_data: userData,
        ...(customData ? { custom_data: customData } : {}),
      },
    ],
    access_token: accessToken,
  };
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      },
    );
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      console.error(`[Meta CAPI] ${eventName} failed:`, response.status, result?.error ?? result);
      return false;
    }
    if (process.env.NODE_ENV !== "production") {
      console.info(`[Meta CAPI] ${eventName} sent (events_received: ${result?.events_received})`);
    }
    return true;
  } catch (error) {
    console.error(`[Meta CAPI] ${eventName} request error:`, error);
    return false;
  }
}
