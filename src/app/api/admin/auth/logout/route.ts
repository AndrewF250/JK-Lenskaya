import { NextRequest, NextResponse } from 'next/server';
import { clearTokens } from '@/lib/auth';
import { authenticateAdmin } from '@/lib/admin-auth';
import { logLogin } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateAdmin(request);

    if (auth.authenticated && auth.user) {
      logLogin(auth.user.userId, request.ip || '127.0.0.1', true);
    }

    await clearTokens();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
