/**
 * Matomo analytics integration for AICTiG SPA.
 *
 * In production, tracking requests are proxied through /m/ on the
 * main domain (see server.cjs) to bypass ad-blockers.
 * In development, calls are logged to the console only.
 */

/* ── Global type for the Matomo push queue ─────────────────────── */
declare global {
  interface Window {
    _paq: Array<unknown[]>;
  }
}

const isDev = import.meta.env.DEV;
const SITE_ID = '1';

// In production, use the proxied path; in dev, point directly at Matomo
const TRACKER_URL = isDev ? '' : '/m/matomo.php';
const SCRIPT_URL = isDev ? '' : '/m/matomo.js';

/**
 * Bootstrap the Matomo tracker.  Called once from main.tsx / App.tsx.
 * Injects the async script and configures the tracker endpoint + site ID.
 */
export function initAnalytics(): void {
  if (isDev) return;

  window._paq = window._paq || [];
  window._paq.push(['setTrackerUrl', TRACKER_URL]);
  window._paq.push(['setSiteId', SITE_ID]);
  window._paq.push(['enableLinkTracking']);      // auto-track outbound links
  window._paq.push(['enableHeartBeatTimer', 15]); // accurate time-on-page

  const d = document;
  const g = d.createElement('script');
  const s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = SCRIPT_URL;
  s.parentNode?.insertBefore(g, s);
}

/* ── Helpers ───────────────────────────────────────────────────── */
function push(...args: unknown[]): void {
  if (isDev) return;
  window._paq = window._paq || [];
  window._paq.push(args);
}

/* ── Page views (SPA-aware) ────────────────────────────────────── */
export function trackPageView(title: string, path: string): void {
  if (isDev) {
    console.log(`[Analytics] Page View: ${title} — ${path}`);
    return;
  }
  push('setCustomUrl', window.location.origin + path);
  push('setDocumentTitle', title);
  push('trackPageView');
}

/* ── Events ────────────────────────────────────────────────────── */
export function trackEvent(
  category: string,
  action: string,
  name?: string,
  value?: number,
): void {
  if (isDev) {
    console.log(`[Analytics] Event: ${category} / ${action}`, { name, value });
    return;
  }
  push('trackEvent', category, action, name, value);
}

/* ── Download tracking ─────────────────────────────────────────── */
export function trackDownload(fileName: string, fileUrl: string): void {
  trackEvent('Download', 'PDF', fileName);
  if (!isDev) push('trackLink', fileUrl, 'download');
}

/* ── Document preview ──────────────────────────────────────────── */
export function trackPreview(fileName: string): void {
  trackEvent('Document', 'Preview', fileName);
}

/* ── Site search ───────────────────────────────────────────────── */
export function trackSearch(query: string, resultsCount: number): void {
  if (isDev) {
    console.log(`[Analytics] Search: "${query}" → ${resultsCount} results`);
    return;
  }
  push('trackSiteSearch', query, false, resultsCount);
}

/* ── Filter usage ──────────────────────────────────────────────── */
export function trackFilter(filterName: string, filterValue: string): void {
  trackEvent('Filter', filterName, filterValue);
}

/* ── Web Vitals ────────────────────────────────────────────────── */
export function trackWebVital(name: string, value: number): void {
  trackEvent('Web Vitals', name, window.location.pathname, Math.round(value));
}
