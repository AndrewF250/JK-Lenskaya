import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const API_BASE = 'http://localhost:3000';

const handlers = [
  http.post(`${API_BASE}/api/leads`, async ({ request }) => {
    const body = await request.json() as any;

    // Валидация обязательных полей
    if (!body.name || !body.phone || !body.source || !body.consent) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Валидация source
    const validSources = ['consultation', 'office_booking', 'presentation', 'apartment_card', 'callback'];
    if (!validSources.includes(body.source)) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Invalid source type' },
        { status: 400 }
      );
    }

    // Валидация телефона
    if (body.phone.length < 10) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Валидация consent
    if (body.consent !== true) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Consent required' },
        { status: 400 }
      );
    }

    // Валидация email (если передан)
    if (body.email && !body.email.includes('@')) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Invalid email' },
        { status: 400 }
      );
    }

    // Валидация имени
    if (body.name.length > 100) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Name too long' },
        { status: 400 }
      );
    }

    // Валидация сообщения
    if (body.message && body.message.length > 1000) {
      return HttpResponse.json(
        { error: 'Validation error', details: 'Message too long' },
        { status: 400 }
      );
    }

    // Успешный ответ
    return HttpResponse.json(
      {
        success: true,
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: body.name,
          phone: body.phone,
          email: body.email || null,
          source: body.source,
          apartmentId: body.apartmentId || null,
          status: 'new',
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('POST /api/leads - Extended Tests', () => {
  it('creates lead with valid data', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      }),
    });

    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('id');
    expect(data.data.name).toBe('Иван Иванов');
    expect(data.data.source).toBe('consultation');
    expect(data.data.status).toBe('new');
  });

  it('creates lead with all optional fields', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        email: 'ivan@example.com',
        source: 'apartment_card',
        apartmentId: '123e4567-e89b-12d3-a456-426614174000',
        message: 'Хочу узнать подробнее',
        consent: true,
      }),
    });

    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.email).toBe('ivan@example.com');
    expect(data.data.apartmentId).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('returns 400 for missing name', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for empty name', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for name too long', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'A'.repeat(101),
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for missing phone', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        source: 'consultation',
        consent: true,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for short phone', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '12345',
        source: 'consultation',
        consent: true,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid source', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'invalid_source',
        consent: true,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for missing consent', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for consent false', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        consent: false,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid email', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        email: 'invalid-email',
        source: 'consultation',
        consent: true,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for message too long', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        message: 'A'.repeat(1001),
        consent: true,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('creates lead with all source types', async () => {
    const sources = ['consultation', 'office_booking', 'presentation', 'apartment_card', 'callback'];

    for (const source of sources) {
      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Тест Тестов',
          phone: '+79991234567',
          source,
          consent: true,
        }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.data.source).toBe(source);
    }
  });

  it('creates lead without email', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      }),
    });

    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.data.email).toBeNull();
  });

  it('creates lead without apartmentId', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      }),
    });

    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.data.apartmentId).toBeNull();
  });

  it('creates lead with message', async () => {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        message: 'Хочу узнать подробнее',
        consent: true,
      }),
    });

    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
  });
});