import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackPageView, trackEvent } from '../utils/analytics';

describe('Analytics Utility Functions', () => {
  let consoleLogSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('trackPageView', () => {
    it('logs page view in development', () => {
      trackPageView('Home', '/');
      expect(consoleLogSpy).toHaveBeenCalledWith('[Analytics] Page View: Home - /');
    });

    it('handles page names with special characters', () => {
      trackPageView('Repository - Filters', '/repository?filters=active');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[Analytics] Page View: Repository - Filters - /repository?filters=active'
      );
    });

    it('handles empty page name', () => {
      trackPageView('', '/');
      expect(consoleLogSpy).toHaveBeenCalledWith('[Analytics] Page View:  - /');
    });
  });

  describe('trackEvent', () => {
    it('logs event without optional parameters in development', () => {
      trackEvent('Download', 'Click');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[Analytics] Event: Download - Click',
        { label: undefined, value: undefined }
      );
    });

    it('logs event with label in development', () => {
      trackEvent('Navigation', 'Menu Open', 'Main Menu');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[Analytics] Event: Navigation - Menu Open',
        { label: 'Main Menu', value: undefined }
      );
    });

    it('handles events with all parameters', () => {
      trackEvent('Search', 'Query', 'cybersecurity', 42);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[Analytics] Event: Search - Query',
        { label: 'cybersecurity', value: 42 }
      );
    });
  });
});
