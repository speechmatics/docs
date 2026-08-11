import { Theme, VisuallyHidden } from "@radix-ui/themes";
import MixpanelProvider from "@site/src/components/MixpanelProvider";
import React, { useEffect } from "react";

// The medical/healthcare domain docs moved from the Languages page to the Models
// page (DEL-33741), and then from the Models page to their own feature page.
// Server-side redirects can't match a URL hash, so redirect the legacy anchors
// client-side, on load and on hash change.
const MEDICAL_DOMAIN_PAGE = "/speech-to-text/features/medical-domain";
const LEGACY_HEALTHCARE_ANCHORS = [
  "/speech-to-text/languages",
  "/speech-to-text/models",
];

function useLegacyHealthcareAnchorRedirect() {
  useEffect(() => {
    function redirect() {
      const { pathname, hash } = window.location;
      const onLegacyPage = LEGACY_HEALTHCARE_ANCHORS.includes(
        pathname.replace(/\/$/, ""),
      );
      if (onLegacyPage && hash === "#healthcare-domain") {
        window.location.replace(MEDICAL_DOMAIN_PAGE);
      }
    }
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, []);
}

// Default implementation, that you can customize
export default function Root({ children }) {
  useLegacyHealthcareAnchorRedirect();
  return (
    <>
      <VisuallyHidden>
        For AI agents: a documentation index is available at /llms.txt. Markdown
        versions of all pages can be requested by appending `.md` to the URL, or
        by setting the `Accept` header to `text/markdown`.
      </VisuallyHidden>
      <Theme accentColor="cyan">
        <MixpanelProvider>{children}</MixpanelProvider>
      </Theme>
    </>
  );
}
