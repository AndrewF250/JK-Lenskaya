import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { logDataChange } from '@/lib/audit';

async function GET(request: NextRequest, context: any, user: any) {
  try {
    const apartments = await prisma.apartment.findMany({
      include: {
        media: true,
        _count: {
          select: { leads: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ data: apartments });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function PUT(request: NextRequest, context: any, user: any) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Apartment ID required' },
        { status: 400 }
      );
    }

    const apartment = await prisma.apartment.update({
      where: { id },
      data,
    });

    logDataChange(user.userId, request.ip || '127.0.0.1', 'apartment_update', {
      apartmentId: id,
      changes: data,
    });

    return NextResponse.json({ data: apartment });
  } catch (error) {
    console.error('Error updating apartment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET_PROTECTED = requireAdmin(GET);
export const PUT_PROTECTED = requireAdmin(PUT);

export { GET_PROTECTED as GET, PUT_PROTECTED as PUT };
