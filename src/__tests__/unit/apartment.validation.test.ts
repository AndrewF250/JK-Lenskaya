import { describe, it, expect } from 'vitest';
import { apartmentSchema, catalogFilterSchema, apartmentResponseSchema } from '@/lib/validations/apartment';

describe('Apartment Schema Validation', () => {
  describe('apartmentSchema', () => {
    it('should validate a complete apartment object', () => {
      const validApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: 101,
        floor: 1,
        rooms: 2,
        areaTotal: 65.5,
        areaLiving: 45.0,
        areaKitchen: 12.0,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
        price: 12000000,
        currency: 'RUB',
        images: ['https://example.com/image1.jpg'],
        floorPlanUrl: 'https://example.com/plan.jpg',
        seoSlug: '2-komnatnaya-65m2-a-1',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      const result = apartmentSchema.safeParse(validApartment);
      expect(result.success).toBe(true);
    });

    it('should validate apartment with minimal required fields', () => {
      const minimalApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: 101,
        floor: 1,
        rooms: 2,
        areaTotal: 65.5,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
      };

      const result = apartmentSchema.safeParse(minimalApartment);
      expect(result.success).toBe(true);
    });

    it('should reject apartment with invalid id', () => {
      const invalidApartment = {
        id: 'invalid-uuid',
        number: 101,
        floor: 1,
        rooms: 2,
        areaTotal: 65.5,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
      };

      const result = apartmentSchema.safeParse(invalidApartment);
      expect(result.success).toBe(false);
    });

    it('should reject apartment with negative number', () => {
      const invalidApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: -1,
        floor: 1,
        rooms: 2,
        areaTotal: 65.5,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
      };

      const result = apartmentSchema.safeParse(invalidApartment);
      expect(result.success).toBe(false);
    });

    it('should reject apartment with floor > 100', () => {
      const invalidApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: 101,
        floor: 101,
        rooms: 2,
        areaTotal: 65.5,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
      };

      const result = apartmentSchema.safeParse(invalidApartment);
      expect(result.success).toBe(false);
    });

    it('should reject apartment with rooms > 4', () => {
      const invalidApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: 101,
        floor: 1,
        rooms: 5,
        areaTotal: 65.5,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
      };

      const result = apartmentSchema.safeParse(invalidApartment);
      expect(result.success).toBe(false);
    });

    it('should reject apartment with invalid status', () => {
      const invalidApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: 101,
        floor: 1,
        rooms: 2,
        areaTotal: 65.5,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'invalid_status',
      };

      const result = apartmentSchema.safeParse(invalidApartment);
      expect(result.success).toBe(false);
    });

    it('should reject apartment with negative area', () => {
      const invalidApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: 101,
        floor: 1,
        rooms: 2,
        areaTotal: -10,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
      };

      const result = apartmentSchema.safeParse(invalidApartment);
      expect(result.success).toBe(false);
    });

    it('should reject apartment with empty building', () => {
      const invalidApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: 101,
        floor: 1,
        rooms: 2,
        areaTotal: 65.5,
        building: '',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
      };

      const result = apartmentSchema.safeParse(invalidApartment);
      expect(result.success).toBe(false);
    });

    it('should reject apartment with invalid image URL', () => {
      const invalidApartment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        number: 101,
        floor: 1,
        rooms: 2,
        areaTotal: 65.5,
        building: 'A',
        section: '1',
        hasBalcony: true,
        hasTerrace: false,
        status: 'free',
        images: ['not-a-url'],
      };

      const result = apartmentSchema.safeParse(invalidApartment);
      expect(result.success).toBe(false);
    });
  });

  describe('catalogFilterSchema', () => {
    it('should validate filter with default values', () => {
      const filter = {};
      const result = catalogFilterSchema.safeParse(filter);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(12);
      }
    });

    it('should validate filter with all parameters', () => {
      const filter = {
        page: 2,
        limit: 24,
        rooms: [1, 2, 3],
        floorMin: 1,
        floorMax: 10,
        priceMin: 5000000,
        priceMax: 20000000,
        areaMin: 30,
        areaMax: 100,
        status: ['free', 'booked'],
        building: ['A', 'B'],
      };

      const result = catalogFilterSchema.safeParse(filter);
      expect(result.success).toBe(true);
    });

    it('should reject filter with page < 1', () => {
      const filter = { page: 0 };
      const result = catalogFilterSchema.safeParse(filter);
      expect(result.success).toBe(false);
    });

    it('should reject filter with limit > 100', () => {
      const filter = { limit: 101 };
      const result = catalogFilterSchema.safeParse(filter);
      expect(result.success).toBe(false);
    });

    it('should reject filter with invalid room number', () => {
      const filter = { rooms: [5] };
      const result = catalogFilterSchema.safeParse(filter);
      expect(result.success).toBe(false);
    });

    it('should reject filter with negative price', () => {
      const filter = { priceMin: -1000 };
      const result = catalogFilterSchema.safeParse(filter);
      expect(result.success).toBe(false);
    });

    it('should reject filter with invalid status', () => {
      const filter = { status: ['invalid'] };
      const result = catalogFilterSchema.safeParse(filter);
      expect(result.success).toBe(false);
    });
  });

  describe('apartmentResponseSchema', () => {
    it('should validate correct response format', () => {
      const response = {
        data: [{
          id: '123e4567-e89b-12d3-a456-426614174000',
          number: 101,
          floor: 1,
          rooms: 2,
          areaTotal: 65.5,
          building: 'A',
          section: '1',
          hasBalcony: true,
          hasTerrace: false,
          status: 'free',
          price: 12000000,
          currency: 'RUB',
          images: [],
          floorPlanUrl: '',
          seoSlug: 'test-slug',
        }],
        meta: {
          total: 1,
          page: 1,
          pageCount: 1,
          limit: 12,
        },
      };

      const result = apartmentResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
    });

    it('should reject response with negative total', () => {
      const response = {
        data: [],
        meta: {
          total: -1,
          page: 1,
          pageCount: 0,
          limit: 12,
        },
      };

      const result = apartmentResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });

    it('should reject response with page < 1', () => {
      const response = {
        data: [],
        meta: {
          total: 0,
          page: 0,
          pageCount: 0,
          limit: 12,
        },
      };

      const result = apartmentResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });
  });
});