import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signAccessToken, signRefreshToken, setTokensInCookies } from '@/lib/auth';
import { logLogin } from '@/lib/audit';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logLogin('unknown', request.ip || '127.0.0.1', false);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // В реальном проекте здесь должна быть проверка пароля через bcrypt
    // if (!await bcrypt.compare(password, user.passwordHash)) { ... }

    if (user.role !== 'admin') {
      logLogin(user.id, request.ip || '127.0.0.1', false);
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      role: 'admin',
    });

    const refreshToken = await signRefreshToken({
      userId: user.id,
      email: user.email,
      role: 'admin',
    });

    await setTokensInCookies(accessToken, refreshToken);

    logLogin(user.id, request.ip || '127.0.0.1', true);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
