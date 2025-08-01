import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import mixpanel from "mixpanel-browser";
import React, { useEffect } from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";

// Memoize the provider component to prevent unnecessary re-renders
const MixpanelTracker = React.memo(
  ({ token, hasConsent }: { token: string; hasConsent: boolean }) => {
    const location = useLocation();

    // Initialize Mixpanel - only runs once when token changes
    useEffect(() => {
      if (typeof window === "undefined" || !token) return;

      mixpanel.init(token, {
        // We're disabling automatic pageview tracking because we want to manually track page views
        // to ensure consistency between the URL and document.title. Automatic tracking might fire
        // before the document title is updated, especially in client-side rendered apps.
        track_pageview: false,
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

      mixpanel.register({
        event_source: "docs",
      });
    }, [token]);

    // Handle user consent - only runs when consent changes
    useEffect(() => {
      if (typeof window === "undefined" || !token) return;

      if (hasConsent) {
        mixpanel.opt_in_tracking();
      } else {
        mixpanel.opt_out_tracking();
      }
    }, [hasConsent, token]);

    const routerLocation = useLocation();

    // Track page views using MutationObserver to detect title changes
    useEffect(() => {
      if (typeof window === "undefined" || !token || !hasConsent) return;

      const trackPageView = () => {
        const pageTitle = document.title;
        const url =
          window.location.origin +
          routerLocation.pathname +
          routerLocation.search;
        const path = routerLocation.pathname;

        // Only track if we have a valid title (not the default or empty)
        if (
          pageTitle &&
          pageTitle !== "Loading..." &&
          !pageTitle.includes("undefined")
        ) {
          mixpanel.track("Page View", {
            "Page Title": pageTitle,
            URL: url,
            "URL Path": path,
            Referrer: document.referrer,
            event_source: "docs",
          });
        }
      };

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

            // Title has changed, now we can use document.title
            trackPageView();
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
          trackPageView();
        }, 500); // 500ms delay to allow for any title changes to happen first
      }

      return () => {
        if (initialPageViewTimer) {
          clearTimeout(initialPageViewTimer);
        }
        observer.disconnect();
      };
    }, [routerLocation.pathname, routerLocation.search, hasConsent, token]);

    return null;
  },
);

// Main provider component
export default function MixpanelProvider({
  children,
}: { children: React.ReactNode }) {
  const { siteConfig } = useDocusaurusContext();
  const { statistics } = useCookieConsent();
  const token = siteConfig.customFields.mixpanelToken as string;

  if (!token) return <>{children}</>;

  return (
    <>
      <MixpanelTracker token={token} hasConsent={!!statistics} />
      {children}
    </>
  );
}
