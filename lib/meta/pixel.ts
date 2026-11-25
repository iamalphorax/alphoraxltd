/**
 * Browser-side helpers for the Meta Pixel. Safe to import from client
 * components only (uses window).
 */

/** A unique ID shared by the browser pixel and the Conversions API event. */
export function newMetaEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Sends an event through the browser pixel only. */
export function trackPixelEvent(
  eventName: string,
  eventId: string,
  customData: Record<string, string | number> = {},
) {
  window.fbq?.("track", eventName, customData, { eventID: eventId });
}

/**
 * Sends an event through the browser pixel AND our Conversions API endpoint,
 * with the same event ID so Meta counts it once. Used for page views; form
 * conversions are sent to the Conversions API by their own API routes.
 */
export function trackMetaPageView() {
  const eventId = newMetaEventId();
  trackPixelEvent("PageView", eventId);
  fetch("/api/meta/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName: "PageView",
      eventId,
      eventSourceUrl: window.location.href,
    }),
    keepalive: true,
  }).catch(() => {
    // Tracking must never break the page.
  });
}
