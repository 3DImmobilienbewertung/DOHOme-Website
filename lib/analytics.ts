export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

// Datenschutzfreundliche Messpunkt-Schicht: ohne angeschlossenen Tag-Manager
// verlässt kein Ereignis den Browser. Sobald nach Einwilligung ein
// Analyseanbieter eingebunden wird, können dieselben Events übernommen werden.
export function trackEvent(event: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
