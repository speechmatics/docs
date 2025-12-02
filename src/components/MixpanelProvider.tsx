import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type Mixpanel from "mixpanel-browser";
import React, { useEffect, useState } from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";

function useMixPanel() {
  const [mixPanel, setMixPanel] = useState<typeof Mixpanel | undefined>();

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("mixpanel-browser").then((mixpanel) => {
      setMixPanel(mixpanel.default);
    });
  }, []);

  return mixPanel;
}

// Memoize the provider component to prevent unnecessary re-renders
const MixpanelTracker = React.memo(
  ({ token, hasConsent }: { token: string; hasConsent: boolean }) => {
    const mixpanel = useMixPanel();

    // Initialize Mixpanel - only runs once when token changes
    useEffect(() => {
      if (typeof window === "undefined" || !token) return;

      mixpanel?.init(token, {
        // We're disabling automatic pageview tracking because we want to manually track page views
        // to ensure consistency between the URL and document.title. Automatic tracking might fire
        // before the document title is updated, especially in client-side rendered apps.
        track_pageview: false,
        ip: false,
        api_host: "https://api-eu.mixpanel.com",
        opt_out_tracking_by_default: true,
        autocapture: {
          // Disable automatic pageview tracking in favor of our manual implementation
          // to have better control over when and how page views are tracked
          pageview: false,
          click: true,
          input: true,
          scroll: true,
          submit: true,
          capture_text_content: false,
        },
      });
    }, [token, mixpanel]);

    // Handle user consent - only runs when consent changes
    useEffect(() => {
      if (typeof window === "undefined" || !token) return;

      if (hasConsent) {
        mixpanel?.opt_in_tracking();
      } else {
        mixpanel?.opt_out_tracking();
      }
    }, [hasConsent, token, mixpanel]);

    // Track page views using MutationObserver to detect title changes
    useEffect(() => {
      if (typeof window === "undefined" || !token || !hasConsent) return;

      let initialPageViewTimer: ReturnType<typeof setTimeout> | undefined;

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === "childList" &&
            mutation.target.nodeName === "TITLE"
          ) {
            // Clear any pending initial page view timer since we have a title change
            if (initialPageViewTimer) {
              clearTimeout(initialPageViewTimer);
              initialPageViewTimer = undefined;
            }
            mixpanel?.track_pageview();
          }
        }
      });

      // Observe changes to the title element
      const titleElement = document.querySelector("title");

      if (titleElement) {
        observer.observe(titleElement, { childList: true });

        // Set a timeout to track the initial page view if the title doesn't change
        // This handles direct URL visits where the title doesn't change dynamically
        initialPageViewTimer = setTimeout(() => {
          initialPageViewTimer = undefined;
          mixpanel?.track_pageview();
        }, 500); // 500ms delay to allow for any title changes to happen first
      }

      return () => {
        if (initialPageViewTimer) {
          clearTimeout(initialPageViewTimer);
        }
        observer.disconnect();
      };
    }, [hasConsent, token, mixpanel]);

    return null;
  },
);

// Main provider component
export default function MixpanelProvider({
  children,
}: { children: React.ReactNode }) {
  const { siteConfig } = useDocusaurusContext();
  const { statistics } = useCookieConsent();
  const token = siteConfig?.customFields?.mixpanelToken as string | undefined;

  if (!token) return <>{children}</>;

  return (
    <>
      <MixpanelTracker token={token} hasConsent={!!statistics} />
      {children}
    </>
  );
}
