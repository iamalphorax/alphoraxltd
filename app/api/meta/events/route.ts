import { NextResponse, after } from "next/server";
import { cleanEventId, getMetaRequestContext, sendMetaEvent } from "@/lib/meta/capi";

/**
 * Receives page views from the browser and forwards them to the Meta
 * Conversions API. Form conversions (Lead, CompleteRegistration,
 * SubmitApplication) are sent by their own API routes instead, so they can't
 * be faked through this endpoint.
 */
const ALLOWED_EVENTS = new Set(["PageView"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const eventName = body?.eventName;
  const eventId = cleanEventId(body?.eventId);
  const eventSourceUrl = typeof body?.eventSourceUrl === "string" ? body.eventSourceUrl : "";

  if (!ALLOWED_EVENTS.has(eventName) || !eventId) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  // Only accept page URLs on this site.
  const host = request.headers.get("host");
  let sameSite = false;
  try {
    sameSite = Boolean(host) && new URL(eventSourceUrl).host === host;
  } catch {
    sameSite = false;
  }
  if (!sameSite) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const context = getMetaRequestContext(request);
  after(() =>
    sendMetaEvent({ eventName: "PageView", eventId, eventSourceUrl, context }),
  );

  return new NextResponse(null, { status: 204 });
}
