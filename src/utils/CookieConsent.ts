/**
 * Cookie consent utilities for tracking consent state changes
 */

export interface ConsentState {
  statistics: boolean;
}

/**
 * Parse the CookieConsent cookie value to extract consent preferences
 */
export function parseCookieConsent(cookieValue: string): ConsentState {
  try {
    // Look for statistics:true or statistics:false in the cookie string
    const statisticsMatch = cookieValue.match(/statistics:(true|false)/);
    const statistics = statisticsMatch ? statisticsMatch[1] === "true" : false;

    return { statistics };
  } catch (error) {
    // If parsing fails, default to opt-out
    return { statistics: false };
  }
}

/**
 * Get the current consent state from the CookieConsent cookie
 * Returns a cached result to avoid creating new objects on each call
 */
export function getCookieConsent(): ConsentState {
  if (typeof document === "undefined") {
    // Server-side: return cached default
    return cachedSnapshot;
  }

  const cookies = document.cookie.split(";");
  const consentCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("CookieConsent="),
  );

  if (!consentCookie) {
    // No consent cookie found: check if we need to update cache
    if (lastCookieValue !== null) {
      lastCookieValue = null;
      cachedSnapshot = { statistics: false };
    }
    return cachedSnapshot;
  }

  // Extract the cookie value (everything after the first =)
  const cookieValue = consentCookie.substring(consentCookie.indexOf("=") + 1);
  const decodedValue = decodeURIComponent(cookieValue);

  // Only parse and update cache if cookie value changed
  if (lastCookieValue !== decodedValue) {
    lastCookieValue = decodedValue;
    cachedSnapshot = parseCookieConsent(decodedValue);
  }

  return cachedSnapshot;
}

// Store subscribers to avoid creating new functions on each call
const subscribers = new Set<() => void>();
let isListening = false;
let lastConsentState: ConsentState | null = null;

// Cache the current snapshot to avoid creating new objects
let cachedSnapshot: ConsentState = { statistics: false };
let lastCookieValue: string | null = null;

/**
 * Check if browser supports CookieChangeEvent API
 */
// Extend the Window interface to include cookieStore
declare global {
  interface Window {
    cookieStore?: {
      addEventListener: (
        event: string,
        callback: (event: CookieChangeEvent) => void,
      ) => void;
      removeEventListener: (
        event: string,
        callback: (event: CookieChangeEvent) => void,
      ) => void;
    };
    __cookieConsentCleanup?: () => void;
  }

  interface CookieChangeEvent extends Event {
    changed?: Array<{ name: string }>;
    deleted?: Array<{ name: string }>;
  }
}

function supportsCookieChangeEvent(): boolean {
  return (
    typeof window !== "undefined" &&
    window.cookieStore !== undefined &&
    typeof window.cookieStore.addEventListener === "function"
  );
}

/**
 * Notify all subscribers of consent changes
 */
function notifySubscribers() {
  const currentConsentState = getCookieConsent();
  if (
    lastConsentState &&
    currentConsentState.statistics !== lastConsentState.statistics
  ) {
    lastConsentState = currentConsentState;
    for (const callback of subscribers) {
      callback();
    }
  }
}

/**
 * Start listening for cookie changes if not already listening
 */
function startListening() {
  if (isListening || typeof document === "undefined") {
    return;
  }

  isListening = true;
  lastConsentState = getCookieConsent();

  let cleanup: () => void;

  if (supportsCookieChangeEvent()) {
    // Use modern CookieChangeEvent API
    const handleCookieChange = (event: {
      changed?: Array<{ name: string }>;
      deleted?: Array<{ name: string }>;
    }) => {
      // Check if the changed cookie is our CookieConsent cookie
      const changedCookies = event.changed || [];
      const deletedCookies = event.deleted || [];

      const cookieConsentChanged = [...changedCookies, ...deletedCookies].some(
        (cookie: { name: string }) => cookie.name === "CookieConsent",
      );

      if (cookieConsentChanged) {
        notifySubscribers();
      }
    };

    window.cookieStore?.addEventListener("change", handleCookieChange);

    cleanup = () => {
      window.cookieStore?.removeEventListener("change", handleCookieChange);
    };
  } else {
    // Fallback to polling for browsers without CookieChangeEvent support
    const interval = setInterval(() => {
      notifySubscribers();
    }, 1000); // Check every second

    // Also listen for storage events (in case cookies are modified by other tabs)
    const handleStorageChange = () => {
      notifySubscribers();
    };

    window.addEventListener("storage", handleStorageChange);

    cleanup = () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }

  // Store cleanup function
  window.__cookieConsentCleanup = () => {
    cleanup();
    isListening = false;
    lastConsentState = null;
  };
}

/**
 * Subscribe to cookie consent changes
 * This will detect when the cookie changes and notify subscribers
 */
export function subscribeToCookieConsent(callback: () => void): () => void {
  if (typeof document === "undefined") {
    // Server-side: return no-op unsubscribe
    return () => {};
  }

  // Add subscriber and start listening if needed
  subscribers.add(callback);
  startListening();

  // Return cleanup function
  return () => {
    subscribers.delete(callback);
    // If no more subscribers, stop listening
    if (subscribers.size === 0 && window.__cookieConsentCleanup) {
      window.__cookieConsentCleanup();
    }
  };
}
