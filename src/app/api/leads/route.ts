import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { leadSchema, leadResponseSchema } from '@/lib/validations/lead';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedLead = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        name: validatedLead.name,
        phone: validatedLead.phone,
        email: validatedLead.email,
        source: validatedLead.source,
        apartmentId: validatedLead.apartmentId,
        utmSource: validatedLead.utmParams?.utm_source,
        utmMedium: validatedLead.utmParams?.utm_medium,
        utmCampaign: validatedLead.utmParams?.utm_campaign,
        message: validatedLead.message,
        consent: validatedLead.consent,
      },
    });

    const response = {
      success: true,
      data: {
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        source: lead.source,
        apartmentId: lead.apartmentId,
        status: lead.status,
        createdAt: lead.createdAt.toISOString(),
      },
    };

    const validatedResponse = leadResponseSchema.parse(response);

    return NextResponse.json(validatedResponse, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
