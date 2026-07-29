import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apartmentSchema } from '@/lib/validations/apartment';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const apartment = await prisma.apartment.findUnique({
      where: { id },
      include: {
        media: {
          select: {
            id: true,
            url: true,
            altText: true,
            type: true,
          },
        },
      },
    });

    if (!apartment) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    const response = {
      ...apartment,
      images: apartment.media.filter(m => m.type === 'image').map(m => m.url),
      floorPlanUrl: apartment.media.find(m => m.type === 'image')?.url || '',
      seoSlug: (apartment.seoData as any)?.slug || `${apartment.building}-${apartment.floor}-${apartment.number}`,
    };

    const validatedApartment = apartmentSchema.parse(response);

    return NextResponse.json({ data: validatedApartment });
  } catch (error) {
    console.error('Error fetching apartment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
