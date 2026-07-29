import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { catalogFilterSchema, apartmentResponseSchema } from '@/lib/validations/apartment';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filter = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
      rooms: searchParams.get('rooms')?.split(',').map(Number),
      floorMin: searchParams.get('floorMin') ? parseInt(searchParams.get('floorMin')!) : undefined,
      floorMax: searchParams.get('floorMax') ? parseInt(searchParams.get('floorMax')!) : undefined,
      priceMin: searchParams.get('priceMin') ? parseFloat(searchParams.get('priceMin')!) : undefined,
      priceMax: searchParams.get('priceMax') ? parseFloat(searchParams.get('priceMax')!) : undefined,
      areaMin: searchParams.get('areaMin') ? parseFloat(searchParams.get('areaMin')!) : undefined,
      areaMax: searchParams.get('areaMax') ? parseFloat(searchParams.get('areaMax')!) : undefined,
      status: searchParams.get('status')?.split(','),
      building: searchParams.get('building')?.split(','),
    };

    const validatedFilter = catalogFilterSchema.parse(filter);

    const where: any = {};

    if (validatedFilter.rooms && validatedFilter.rooms.length > 0) {
      where.rooms = { in: validatedFilter.rooms };
    }

    if (validatedFilter.floorMin || validatedFilter.floorMax) {
      where.floor = {};
      if (validatedFilter.floorMin) where.floor.gte = validatedFilter.floorMin;
      if (validatedFilter.floorMax) where.floor.lte = validatedFilter.floorMax;
    }

    if (validatedFilter.priceMin || validatedFilter.priceMax) {
      where.price = {};
      if (validatedFilter.priceMin) where.price.gte = validatedFilter.priceMin;
      if (validatedFilter.priceMax) where.price.lte = validatedFilter.priceMax;
    }

    if (validatedFilter.areaMin || validatedFilter.areaMax) {
      where.areaTotal = {};
      if (validatedFilter.areaMin) where.areaTotal.gte = validatedFilter.areaMin;
      if (validatedFilter.areaMax) where.areaTotal.lte = validatedFilter.areaMax;
    }

    if (validatedFilter.status && validatedFilter.status.length > 0) {
      where.status = { in: validatedFilter.status };
    } else {
      where.status = { not: 'unpublished' };
    }

    if (validatedFilter.building && validatedFilter.building.length > 0) {
      where.building = { in: validatedFilter.building };
    }

    const skip = (validatedFilter.page - 1) * validatedFilter.limit;

    const [apartments, total] = await Promise.all([
      prisma.apartment.findMany({
        where,
        skip,
        take: validatedFilter.limit,
        orderBy: [
          { building: 'asc' },
          { floor: 'asc' },
          { number: 'asc' },
        ],
        include: {
          media: {
            select: {
              url: true,
              type: true,
            },
          },
        },
      }),
      prisma.apartment.count({ where }),
    ]);

    const pageCount = Math.ceil(total / validatedFilter.limit);

    const response = {
      data: apartments.map(apt => ({
        ...apt,
        images: apt.media.filter(m => m.type === 'image').map(m => m.url),
        floorPlanUrl: apt.media.find(m => m.type === 'image')?.url || '',
        seoSlug: (apt.seoData as any)?.slug || `${apt.building}-${apt.floor}-${apt.number}`,
      })),
      meta: {
        total,
        page: validatedFilter.page,
        pageCount,
        limit: validatedFilter.limit,
      },
    };

    const validatedResponse = apartmentResponseSchema.parse(response);

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
