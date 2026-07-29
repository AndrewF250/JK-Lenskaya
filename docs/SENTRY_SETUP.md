# Sentry Configuration Guide for ЖК «Ленская»

## 1. Create Sentry Account

1. Go to [sentry.io](https://sentry.io) and create an account
2. Create a new project: "lenskaya-frontend"
3. Select "Next.js" as the platform

## 2. Get DSN

After creating the project, you'll get a DSN like:
```
https://examplePublicKey@o0.ingest.sentry.io/0
```

## 3. Update Environment Variables

Add to `.env.local`:
```env
SENTRY_DSN="https://your-dsn@sentry.io/project-id"
NEXT_PUBLIC_SENTRY_DSN="https://your-dsn@sentry.io/project-id"
SENTRY_ORG="your-org-slug"
SENTRY_PROJECT="lenskaya-frontend"
SENTRY_AUTH_TOKEN="your-auth-token"
```

## 4. Create Auth Token

1. Go to Sentry → Settings → Auth Tokens
2. Create a new token with permissions:
   - `org:read`
   - `project:releases`
   - `project:write`

## 5. Alert Rules

### Performance Alerts
- LCP > 2.5s → Warning
- FID > 100ms → Warning
- CLS > 0.1 → Warning
- TTFB > 800ms → Warning

### Error Alerts
- Any 500 error → Critical
- API error rate > 5% → Critical
- Unhandled exception → Critical

## 6. Custom Metrics

The following custom metrics are tracked:
- `web_vitals.lcp` - Largest Contentful Paint
- `web_vitals.fid` - First Input Delay
- `web_vitals.cls` - Cumulative Layout Shift
- `web_vitals.ttfb` - Time to First Byte
- `web_vitals.inp` - Interaction to Next Paint
- `api.response_time` - API response time
- `api.errors` - API error count

## 7. Source Maps

To upload source maps for better stack traces:
```bash
npm run sentry:upload-sourcemaps
```

## 8. Testing

Test Sentry integration:
```typescript
import * as Sentry from '@sentry/nextjs';

// Test error
Sentry.captureException(new Error('Test error'));

// Test message
Sentry.captureMessage('Test message', 'info');

// Test custom metric
Sentry.metrics.distribution('test.metric', 42);
```

## 9. Dashboard

Access your Sentry dashboard at:
```
https://sentry.io/organizations/your-org/projects/lenskaya-frontend/
```

## 10. Web Vitals Monitoring

Web Vitals are automatically reported to:
1. Sentry (custom metrics)
2. Vercel Analytics (if deployed on Vercel)
3. Console (in development mode)
