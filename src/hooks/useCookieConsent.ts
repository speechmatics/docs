import { useSyncExternalStore } from "react";
import {
  type ConsentState,
  getCookieConsent,
  subscribeToCookieConsent,
} from "../utils/CookieConsent";

// Cache the server snapshot
const SERVER_SNAPSHOT: ConsentState = { statistics: false };

export function useCookieConsent(): ConsentState {
  const consentState = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsent,
    // Server-side snapshot
    () => SERVER_SNAPSHOT,
  );

  return consentState;
}
