import * as Sentry from '@sentry/nextjs';

// Alert thresholds for critical metrics
const ALERT_THRESHOLDS = {
  LCP: 2500, // 2.5 seconds
  FID: 100, // 100ms
  CLS: 0.1, // 0.1
  TTFB: 800, // 800ms
  INP: 200, // 200ms
  API_ERROR_RATE: 0.05, // 5%
  API_RESPONSE_TIME: 1000, // 1 second
};

interface AlertConfig {
  metric: string;
  threshold: number;
  unit?: string;
  tags?: Record<string, string>;
}

export function checkMetricThreshold(
  metricName: keyof typeof ALERT_THRESHOLDS,
  value: number,
  tags?: Record<string, string>
): boolean {
  const threshold = ALERT_THRESHOLDS[metricName];
  if (!threshold) return false;

  if (value > threshold) {
    Sentry.captureMessage(
      `Performance alert: ${metricName} exceeded threshold (${value} > ${threshold})`,
      'warning'
    );

    Sentry.metrics.increment('alerts.performance', 1, {
      tags: {
        metric: metricName,
        ...tags,
      },
    });

    return true;
  }

  return false;
}

// Track error rate for an endpoint
export function trackErrorRate(endpoint: string, isError: boolean) {
  Sentry.metrics.increment('api.request', 1, {
    tags: { endpoint },
  });

  if (isError) {
    Sentry.metrics.increment('api.error', 1, {
      tags: { endpoint },
    });
  }
}

// Custom alert for critical errors
export function alertCriticalError(error: Error, context: Record<string, unknown>) {
  Sentry.withScope((scope) => {
    scope.setLevel('fatal');
    scope.setExtras(context);
    scope.setTag('alert_type', 'critical');
    Sentry.captureException(error);
  });
}

// Performance budget checker
export function checkPerformanceBudget(page: string, metrics: Record<string, number>) {
  const budgets: Record<string, Record<string, number>> = {
    '/': { LCP: 2500, CLS: 0.1 },
    '/catalog': { LCP: 3000, CLS: 0.15 },
    '/catalog/[id]': { LCP: 2500, CLS: 0.1 },
  };

  const budget = budgets[page];
  if (!budget) return;

  Object.entries(metrics).forEach(([metric, value]) => {
    const limit = budget[metric];
    if (limit && value > limit) {
      Sentry.captureMessage(
        `Performance budget exceeded for ${page}: ${metric} = ${value} (budget: ${limit})`,
        'warning'
      );
    }
  });
}
