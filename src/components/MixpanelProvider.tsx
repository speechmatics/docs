import React, { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function MixpanelProvider({ children }) {
  const { siteConfig } = useDocusaurusContext();

  // Extract the token that is made available from an env variable
  // through a custom field in 'docusaurus.config.ts'
  const token = siteConfig.customFields.mixpanelToken as string;

  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      mixpanel.init(token, {
        track_pageview: true,
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

  return <>{children}</>;
}
