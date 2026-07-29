import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { trackApiPerformance } from './web-vitals';

type ApiHandler = (req: NextRequest) => Promise<NextResponse>;

export function withMonitoring(handler: ApiHandler, endpoint: string): ApiHandler {
  return async (req: NextRequest) => {
    const startTime = performance.now();
    let status = 200;

    try {
      const response = await handler(req);
      status = response.status;
      return response;
    } catch (error) {
      status = 500;

      // Capture exception in Sentry
      Sentry.withScope((scope) => {
        scope.setTag('endpoint', endpoint);
        scope.setTag('method', req.method);
        scope.setExtra('url', req.url);
        scope.setExtra('searchParams', Object.fromEntries(req.nextUrl.searchParams));
        Sentry.captureException(error);
      });

      throw error;
    } finally {
      const duration = performance.now() - startTime;
      trackApiPerformance(endpoint, duration, status);
    }
  };
}

// Error boundary for API routes
export function apiErrorHandler(error: unknown, req: NextRequest): NextResponse {
  console.error(`API Error [${req.method} ${req.nextUrl.pathname}]:`, error);

  Sentry.withScope((scope) => {
    scope.setTag('endpoint', req.nextUrl.pathname);
    scope.setTag('method', req.method);
    scope.setExtra('url', req.url);
    scope.setExtra('searchParams', Object.fromEntries(req.nextUrl.searchParams));
    Sentry.captureException(error);
  });

  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
