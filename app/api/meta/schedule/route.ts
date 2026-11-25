import { NextResponse, after } from "next/server";
import { getMetaRequestContext, sendMetaEvent } from "@/lib/meta/capi";
import { scheduleEventId } from "@/lib/meta/calendly";

/**
 * Called by the contact page when someone books a call in the Calendly
 * scheduler. Reports the booking to the Meta Conversions API as a Schedule
 * event.
 *
 * The browser only tells us which booking was made. We look it up in Calendly
 * first, so this endpoint can't be used to report fake bookings, and so we can
 * include the booker's hashed email and name.
 *
 * Needs CALENDLY_API_TOKEN (a Calendly personal access token). Without it the
 * browser pixel still records the booking, but the server sends nothing.
 */

// Only report bookings made in the last 30 minutes, so an old booking link
// can't be replayed later.
const MAX_BOOKING_AGE_MS = 30 * 60 * 1000;

interface CalendlyInvitee {
  email?: string;
  name?: string;
  status?: string;
  created_at?: string;
  text_reminder_number?: string | null;
}

async function fetchInvitee(uri: string, token: string): Promise<CalendlyInvitee | null> {
  try {
    const response = await fetch(uri, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("[Calendly] invitee lookup failed:", response.status);
      return null;
    }
    const data = await response.json();
    return data?.resource ?? null;
  } catch (error) {
    console.error("[Calendly] invitee lookup error:", error);
    return null;
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const inviteeUri: unknown = body?.inviteeUri;
  const eventId = scheduleEventId(inviteeUri);
  if (!eventId) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const token = process.env.CALENDLY_API_TOKEN;
  if (!token) return new NextResponse(null, { status: 204 });

  const context = getMetaRequestContext(request);
  after(async () => {
    const invitee = await fetchInvitee(inviteeUri as string, token);
    if (!invitee || invitee.status !== "active") return;

    const bookedAt = Date.parse(invitee.created_at ?? "");
    if (!(Date.now() - bookedAt <= MAX_BOOKING_AGE_MS)) return;

    await sendMetaEvent({
      eventName: "Schedule",
      eventId,
      context,
      user: {
        email: invitee.email,
        name: invitee.name,
        phone: invitee.text_reminder_number ?? undefined,
      },
      customData: { content_name: "Discovery call" },
    });
  });

  return new NextResponse(null, { status: 204 });
}
