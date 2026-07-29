import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
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
];

const handlers = [
  http.get(`${API_BASE}/api/apartments`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');
    const rooms = url.searchParams.get('rooms')?.split(',').map(Number);

    let filtered = [...mockApartments];

    if (rooms) {
      filtered = filtered.filter(apt => rooms.includes(apt.rooms));
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
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('GET /api/apartments', () => {
  it('returns paginated results', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?page=1&limit=12`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toBeInstanceOf(Array);
    expect(data.meta).toHaveProperty('total');
    expect(data.meta).toHaveProperty('page', 1);
    expect(data.meta).toHaveProperty('limit', 12);
  });

  it('filters by rooms', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?rooms=1`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => apt.rooms === 1)).toBe(true);
  });

  it('returns empty array for non-matching filter', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?rooms=4`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveLength(0);
    expect(data.meta.total).toBe(0);
  });
});

describe('GET /api/apartments/:id', () => {
  it('returns apartment by id', async () => {
    const response = await fetch(`${API_BASE}/api/apartments/1`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveProperty('id', '1');
    expect(data.data).toHaveProperty('rooms', 1);
  });

  it('returns 404 for non-existent apartment', async () => {
    const response = await fetch(`${API_BASE}/api/apartments/non-existent`);

    expect(response.status).toBe(404);
  });
});
