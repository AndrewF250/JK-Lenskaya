'use client';

import { useReportWebVitals } from 'next/web-vitals';
import * as Sentry from '@sentry/nextjs';

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Send to Sentry
    switch (metric.name) {
      case 'LCP':
        Sentry.metrics.distribution('web_vitals.lcp', metric.value, {
          unit: 'millisecond',
        });
        break;
      case 'FID':
        Sentry.metrics.distribution('web_vitals.fid', metric.value, {
          unit: 'millisecond',
        });
        break;
      case 'CLS':
        Sentry.metrics.distribution('web_vitals.cls', metric.value);
        break;
      case 'TTFB':
        Sentry.metrics.distribution('web_vitals.ttfb', metric.value, {
          unit: 'millisecond',
        });
        break;
      case 'INP':
        Sentry.metrics.distribution('web_vitals.inp', metric.value, {
          unit: 'millisecond',
        });
        break;
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value);
    }
  });

  return null;
}
