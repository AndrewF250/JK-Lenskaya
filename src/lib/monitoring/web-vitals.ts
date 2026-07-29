import { onCLS, onFID, onLCP, onTTFB, onINP, Metric } from 'web-vitals';
import * as Sentry from '@sentry/nextjs';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed(): string {
  return 'connection' in navigator &&
    navigator['connection'] &&
    'effectiveType' in (navigator['connection'] as Record<string, unknown>)
    ? (navigator['connection'] as Record<string, unknown>)['effectiveType'] as string
    : '';
}

function sendToAnalytics(metric: Metric, options: { path?: string } = {}) {
  const page = Object.entries(options).length
    ? options
    : { path: window.location.pathname };

  const body = {
    dsn: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    id: metric.id,
    page: page.path,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else {
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
  }
}

export function reportWebVitals(options?: { path?: string }) {
  try {
    onFID((metric) => sendToAnalytics(metric, options));
    onTTFB((metric) => sendToAnalytics(metric, options));
    onLCP((metric) => sendToAnalytics(metric, options));
    onCLS((metric) => sendToAnalytics(metric, options));
    onINP((metric) => sendToAnalytics(metric, options));
  } catch (err) {
    console.error('[Web Vitals]', err);
  }
}

// Sentry custom metrics for Web Vitals
export function reportWebVitalsToSentry() {
  onLCP((metric) => {
    Sentry.metrics.distribution('web_vitals.lcp', metric.value, {
      unit: 'millisecond',
    });
  });

  onFID((metric) => {
    Sentry.metrics.distribution('web_vitals.fid', metric.value, {
      unit: 'millisecond',
    });
  });

  onCLS((metric) => {
    Sentry.metrics.distribution('web_vitals.cls', metric.value);
  });

  onTTFB((metric) => {
    Sentry.metrics.distribution('web_vitals.ttfb', metric.value, {
      unit: 'millisecond',
    });
  });

  onINP((metric) => {
    Sentry.metrics.distribution('web_vitals.inp', metric.value, {
      unit: 'millisecond',
    });
  });
}

// Custom performance marks for key pages
export function markPageLoad(pageName: string) {
  if (typeof window !== 'undefined' && window.performance) {
    const mark = `page-${pageName}-loaded`;
    performance.mark(mark);

    // Report to Sentry
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `Page loaded: ${pageName}`,
      level: 'info',
    });
  }
}

// Track API response times
export function trackApiPerformance(endpoint: string, duration: number, status: number) {
  Sentry.metrics.distribution('api.response_time', duration, {
    unit: 'millisecond',
    tags: { endpoint, status: status.toString() },
  });

  if (status >= 400) {
    Sentry.metrics.increment('api.errors', 1, {
      tags: { endpoint, status: status.toString() },
    });
  }
}
