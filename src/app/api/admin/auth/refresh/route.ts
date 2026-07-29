import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken, setTokensInCookies, getRefreshToken, verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 401 }
      );
    }

    const payload = await verifyToken(refreshToken);

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      return NextResponse.json(
        { error: 'Failed to refresh token' },
        { status: 500 }
      );
    }

    // Генерируем новый refresh token
    const { signRefreshToken } = await import('@/lib/auth');
    const newRefreshToken = await signRefreshToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    await setTokensInCookies(newAccessToken, newRefreshToken);

    return NextResponse.json({
      success: true,
      message: 'Token refreshed successfully',
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
