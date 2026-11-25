"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMetaPageView } from "@/lib/meta/pixel";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Meta's standard base code (the snippet from Events Manager), written out so
 * it runs before our first PageView. It creates a queue that holds events
 * until fbevents.js has downloaded.
 */
function loadMetaPixel(pixelId: string) {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  // We send PageViews ourselves (with event IDs for the Conversions API), so
  // stop fbevents.js from also auto-tracking Next.js page changes, and let it
  // accept our PageView for each new page (it drops repeats by default).
  const flags = fbq as Fbq & { disablePushState?: boolean; allowDuplicatePageViews?: boolean };
  flags.disablePushState = true;
  flags.allowDuplicatePageViews = true;
  window.fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);

  fbq("init", pixelId);
}

/**
 * Meta (Facebook) Pixel + Conversions API page views.
 *
 * Next.js changes pages without a full reload, so a PageView is sent on the
 * first load and every time the path changes — through the browser pixel and
 * our server (/api/meta/events) with a shared event ID.
 */
const MetaPixel = ({ pixelId }: { pixelId: string }) => {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Guards against React running effects twice in development.
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
    loadMetaPixel(pixelId);
    trackMetaPageView();
  }, [pathname, pixelId]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
};

export default MetaPixel;
