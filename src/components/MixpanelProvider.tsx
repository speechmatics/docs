import React, { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useCookieConsent } from "../hooks/useCookieConsent";

export default function MixpanelProvider({ children }) {
  const { siteConfig } = useDocusaurusContext();

  // Extract the token that is made available from an env variable
  // through a custom field in 'docusaurus.config.ts'
  const token = siteConfig.customFields.mixpanelToken as string;

  const { statistics } = useCookieConsent();

  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      mixpanel.init(token, {
        track_pageview: true,
        api_host: "https://api-eu.mixpanel.com",
        opt_out_tracking_by_default: true,
        persistence: "localStorage",
        autocapture: {
          pageview: "full-url",
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
    }
  }, [token]);

  useEffect(() => {
    // Only run on client-side and if Mixpanel is initialized
    if (typeof window === "undefined" || !mixpanel) {
      return;
    }

    if (statistics) {
      // User has consented to statistics tracking
      mixpanel.opt_in_tracking();
    } else {
      // User has not consented or opted out of statistics tracking
      mixpanel.opt_out_tracking();
    }
  }, [statistics]);

  return <>{children}</>;
}
