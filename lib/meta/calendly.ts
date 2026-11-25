/**
 * Calendly bookings → Meta "Schedule" event. Safe to import from both client
 * and server code.
 */

// e.g. https://api.calendly.com/scheduled_events/<event id>/invitees/<invitee id>
const INVITEE_URI_PATTERN =
  /^https:\/\/api\.calendly\.com\/scheduled_events\/[A-Za-z0-9-]+\/invitees\/([A-Za-z0-9-]+)$/;

/**
 * The Meta event ID for a booking. It's built from the Calendly invitee, so
 * the browser pixel and the Conversions API use the same ID (Meta counts the
 * booking once) and a resent booking gets the same ID too. Returns undefined
 * for anything that isn't a Calendly invitee URI.
 */
export function scheduleEventId(inviteeUri: unknown): string | undefined {
  if (typeof inviteeUri !== "string") return undefined;
  const match = INVITEE_URI_PATTERN.exec(inviteeUri);
  return match ? `calendly-${match[1]}` : undefined;
}
