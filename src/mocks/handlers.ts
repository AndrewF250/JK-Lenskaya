import { http, HttpResponse } from 'msw';

const API_BASE = 'http://localhost:3000';

const mockApartments = [
  {
    id: '1',
    number: 101,
    floor: 1,
    rooms: 1,
    areaTotal: 45.5,
    building: 'A',
    section: '1',
    hasBalcony: true,
    hasTerrace: false,
    status: 'free',
    price: 8500000,
    currency: 'RUB',
    images: [],
    floorPlanUrl: '',
    seoSlug: '1-komnatnaya-45m2-a-1',
  },
  {
    id: '2',
    number: 202,
    floor: 2,
    rooms: 2,
    areaTotal: 65.2,
    building: 'B',
    section: '2',
    hasBalcony: false,
    hasTerrace: true,
    status: 'booked',
    price: 12000000,
    currency: 'RUB',
    images: [],
    floorPlanUrl: '',
    seoSlug: '2-komnatnaya-65m2-b-2',
  },
  {
    id: '3',
    number: 303,
    floor: 3,
    rooms: 0,
    areaTotal: 32.0,
    building: 'A',
    section: '3',
    hasBalcony: false,
    hasTerrace: false,
    status: 'sold',
    price: 5500000,
    currency: 'RUB',
    images: [],
    floorPlanUrl: '',
    seoSlug: 'studiya-32m2-a-3',
  },
];

export const handlers = [
  http.get(`${API_BASE}/api/apartments`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');
    const rooms = url.searchParams.get('rooms')?.split(',').map(Number);
    const status = url.searchParams.get('status')?.split(',');

    let filtered = [...mockApartments];

    if (rooms) {
      filtered = filtered.filter(apt => rooms.includes(apt.rooms));
    }

    if (status) {
      filtered = filtered.filter(apt => status.includes(apt.status));
    }

    return HttpResponse.json({
      data: filtered.slice(0, limit),
      meta: {
        total: filtered.length,
        page,
        pageCount: Math.ceil(filtered.length / limit),
        limit,
      },
    });
  }),

  http.get(`${API_BASE}/api/apartments/:id`, ({ params }) => {
    const { id } = params;
    const apartment = mockApartments.find(apt => apt.id === id);

    if (!apartment) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ data: apartment });
  }),

  http.post(`${API_BASE}/api/leads`, async ({ request }) => {
    const body = await request.json() as any;

    if (!body.name || !body.phone || !body.source || !body.consent) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Missing required fields' },
        { status: 400 }
      );
    }

    const validSources = ['consultation', 'office_booking', 'presentation', 'apartment_card', 'callback'];
    if (!validSources.includes(body.source)) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Invalid source type' },
        { status: 400 }
      );
    }

    if (body.phone.length < 10) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Invalid phone number' },
        { status: 400 }
      );
    }

    if (body.consent !== true) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Consent required' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        success: true,
        data: {
          id: '1',
          name: body.name,
          phone: body.phone,
          email: body.email,
          source: body.source,
          apartmentId: body.apartmentId,
          status: 'new',
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  }),
];
