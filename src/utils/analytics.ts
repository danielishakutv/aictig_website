/**
 * Analytics utility for tracking page views and events
 * This is a placeholder for future integration with analytics services
 */

const isDev = import.meta.env.DEV;

export function trackPageView(pageName: string, path: string) {
  // Placeholder for analytics integration (e.g., Google Analytics, Matomo)
  if (isDev) {
    console.log(`[Analytics] Page View: ${pageName} - ${path}`);
  }
  
  // Future implementation:
  // window.gtag?.('config', 'GA_MEASUREMENT_ID', { page_path: path });
}

export function trackEvent(category: string, action: string, label?: string, value?: number) {
  // Placeholder for event tracking
  if (isDev) {
    console.log(`[Analytics] Event: ${category} - ${action}`, { label, value });
  }
  
  // Future implementation:
  // window.gtag?.('event', action, {
  //   event_category: category,
  //   event_label: label,
  //   value: value,
  // });
}

export function trackDownload(fileName: string, fileType: string) {
  trackEvent('Download', 'Click', `${fileType}: ${fileName}`);
}

export function trackSearch(query: string, resultsCount: number) {
  trackEvent('Search', 'Query', query, resultsCount);
}
