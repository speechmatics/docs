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

    // Track page views with a delay to ensure the title is updated
    useEffect(() => {
      if (typeof window === "undefined" || !token || !hasConsent) return;

      // Set a timeout to track the page view after a delay
      const timer = setTimeout(() => {
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
          console.log("Tracking page view with title: ", pageTitle);
          mixpanel.track("Page View", {
            "Page Title": pageTitle,
            URL: url,
            "URL Path": path,
            Referrer: document.referrer,
            event_source: "docs",
          });
        }
      }, 1000); // 1 second delay

      // Cleanup function to clear the timeout if the component unmounts or dependencies change
      return () => clearTimeout(timer);
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
