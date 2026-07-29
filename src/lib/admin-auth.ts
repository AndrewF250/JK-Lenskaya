import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, type TokenPayload } from './auth';

export interface AuthResult {
  authenticated: boolean;
  user?: TokenPayload;
  error?: string;
}

export async function authenticateAdmin(request: NextRequest): Promise<AuthResult> {
  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken) {
    return {
      authenticated: false,
      error: 'Access token required',
    };
  }

  const payload = await verifyToken(accessToken);

  if (!payload) {
    return {
      authenticated: false,
      error: 'Invalid or expired token',
    };
  }

  if (payload.role !== 'admin') {
    return {
      authenticated: false,
      error: 'Insufficient permissions',
    };
  }

  return {
    authenticated: true,
    user: payload,
  };
}

export function requireAdmin(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    const auth = await authenticateAdmin(request);

    if (!auth.authenticated) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    return handler(request, context, auth.user);
  };
}
