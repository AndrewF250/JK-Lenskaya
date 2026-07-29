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
  {
    id: '3',
    number: 303,
    floor: 3,
    rooms: 3,
    areaTotal: 85.0,
    building: 'A',
    section: '1',
    hasBalcony: true,
    hasTerrace: true,
    status: 'free',
    price: 18000000,
    currency: 'RUB',
    images: [],
    floorPlanUrl: '',
    seoSlug: '3-komnatnaya-85m2-a-1',
  },
  {
    id: '4',
    number: 404,
    floor: 4,
    rooms: 0,
    areaTotal: 35.0,
    building: 'C',
    section: '3',
    hasBalcony: false,
    hasTerrace: false,
    status: 'unpublished',
    price: 6000000,
    currency: 'RUB',
    images: [],
    floorPlanUrl: '',
    seoSlug: 'studio-35m2-c-3',
  },
];

const handlers = [
  http.get(`${API_BASE}/api/apartments`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');
    const rooms = url.searchParams.get('rooms')?.split(',').map(Number);
    const floorMin = url.searchParams.get('floorMin') ? parseInt(url.searchParams.get('floorMin')!) : undefined;
    const floorMax = url.searchParams.get('floorMax') ? parseInt(url.searchParams.get('floorMax')!) : undefined;
    const priceMin = url.searchParams.get('priceMin') ? parseFloat(url.searchParams.get('priceMin')!) : undefined;
    const priceMax = url.searchParams.get('priceMax') ? parseFloat(url.searchParams.get('priceMax')!) : undefined;
    const status = url.searchParams.get('status')?.split(',');
    const building = url.searchParams.get('building')?.split(',');

    let filtered = [...mockApartments];

    // Filter by rooms
    if (rooms) {
      filtered = filtered.filter(apt => rooms.includes(apt.rooms));
    }

    // Filter by floor
    if (floorMin) {
      filtered = filtered.filter(apt => apt.floor >= floorMin);
    }
    if (floorMax) {
      filtered = filtered.filter(apt => apt.floor <= floorMax);
    }

    // Filter by price
    if (priceMin) {
      filtered = filtered.filter(apt => apt.price >= priceMin);
    }
    if (priceMax) {
      filtered = filtered.filter(apt => apt.price <= priceMax);
    }

    // Filter by status (exclude unpublished by default)
    if (status) {
      filtered = filtered.filter(apt => status.includes(apt.status));
    } else {
      filtered = filtered.filter(apt => apt.status !== 'unpublished');
    }

    // Filter by building
    if (building) {
      filtered = filtered.filter(apt => building.includes(apt.building));
    }

    const total = filtered.length;
    const pageCount = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    return HttpResponse.json({
      data,
      meta: {
        total,
        page,
        pageCount,
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

describe('GET /api/apartments - Extended Tests', () => {
  it('returns paginated results with default parameters', async () => {
    const response = await fetch(`${API_BASE}/api/apartments`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toBeInstanceOf(Array);
    expect(data.meta).toHaveProperty('total');
    expect(data.meta).toHaveProperty('page', 1);
    expect(data.meta).toHaveProperty('limit', 12);
    expect(data.meta).toHaveProperty('pageCount');
  });

  it('filters by rooms', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?rooms=1`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => apt.rooms === 1)).toBe(true);
  });

  it('filters by multiple rooms', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?rooms=1,2`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => [1, 2].includes(apt.rooms))).toBe(true);
  });

  it('returns empty array for non-matching filter', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?rooms=4`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveLength(0);
    expect(data.meta.total).toBe(0);
  });

  it('filters by floor range', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?floorMin=2&floorMax=3`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => apt.floor >= 2 && apt.floor <= 3)).toBe(true);
  });

  it('filters by price range', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?priceMin=10000000&priceMax=20000000`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => apt.price >= 10000000 && apt.price <= 20000000)).toBe(true);
  });

  it('filters by status', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?status=free`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => apt.status === 'free')).toBe(true);
  });

  it('filters by building', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?building=A`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => apt.building === 'A')).toBe(true);
  });

  it('excludes unpublished apartments by default', async () => {
    const response = await fetch(`${API_BASE}/api/apartments`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => apt.status !== 'unpublished')).toBe(true);
  });

  it('includes unpublished apartments when explicitly requested', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?status=unpublished`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.some((apt: any) => apt.status === 'unpublished')).toBe(true);
  });

  it('handles pagination correctly', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?page=1&limit=2`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveLength(2);
    expect(data.meta.page).toBe(1);
    expect(data.meta.limit).toBe(2);
    expect(data.meta.pageCount).toBeGreaterThan(0);
  });

  it('returns correct page count', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?limit=2`);
    const data = await response.json();

    expect(response.status).toBe(200);
    const expectedPageCount = Math.ceil(data.meta.total / 2);
    expect(data.meta.pageCount).toBe(expectedPageCount);
  });

  it('combines multiple filters', async () => {
    const response = await fetch(`${API_BASE}/api/apartments?rooms=2&building=B&status=booked`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((apt: any) => 
      apt.rooms === 2 && apt.building === 'B' && apt.status === 'booked'
    )).toBe(true);
  });

  it('returns 404 for non-existent apartment', async () => {
    const response = await fetch(`${API_BASE}/api/apartments/non-existent`);

    expect(response.status).toBe(404);
  });

  it('returns apartment by id', async () => {
    const response = await fetch(`${API_BASE}/api/apartments/1`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveProperty('id', '1');
    expect(data.data).toHaveProperty('rooms', 1);
    expect(data.data).toHaveProperty('building', 'A');
  });
});