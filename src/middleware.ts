import { NextRequest, NextResponse } from 'next/server';
import { apiLimiter, formLimiter, checkRateLimit } from '@/lib/rate-limit';
import { getCSPHeader } from '@/lib/csp';
import { logError } from '@/lib/audit';

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.ip || '127.0.0.1';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIp = getClientIp(request);

  // Rate limiting для API эндпоинтов
  if (pathname.startsWith('/api/')) {
    const limiter = pathname.startsWith('/api/leads') ? formLimiter : apiLimiter;
    const { success, limit, remaining, reset } = await checkRateLimit(limiter, clientIp);

    if (!success) {
      logError(clientIp, 429, { path: pathname, reason: 'rate_limit_exceeded' });
      
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', reset.toString());
    
    // Добавляем CSP заголовки
    response.headers.set('Content-Security-Policy', getCSPHeader());

    return response;
  }

  // CSP заголовки для страниц
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', getCSPHeader());

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
