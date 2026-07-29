import { describe, it, expect } from 'vitest';
import { leadSchema, leadResponseSchema } from '@/lib/validations/lead';

describe('Lead Schema Validation', () => {
  describe('leadSchema', () => {
    it('should validate a complete lead object', () => {
      const validLead = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        email: 'ivan@example.com',
        source: 'consultation',
        apartmentId: '123e4567-e89b-12d3-a456-426614174000',
        utmParams: {
          utm_source: 'google',
          utm_medium: 'cpc',
          utm_campaign: 'test',
        },
        message: 'Хочу узнать подробнее',
        consent: true,
      };

      const result = leadSchema.safeParse(validLead);
      expect(result.success).toBe(true);
    });

    it('should validate lead with minimal required fields', () => {
      const minimalLead = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      };

      const result = leadSchema.safeParse(minimalLead);
      expect(result.success).toBe(true);
    });

    it('should reject lead with empty name', () => {
      const invalidLead = {
        name: '',
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should reject lead with name > 100 characters', () => {
      const invalidLead = {
        name: 'A'.repeat(101),
        phone: '+79991234567',
        source: 'consultation',
        consent: true,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should reject lead with short phone', () => {
      const invalidLead = {
        name: 'Иван Иванов',
        phone: '12345',
        source: 'consultation',
        consent: true,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should reject lead with phone > 20 characters', () => {
      const invalidLead = {
        name: 'Иван Иванов',
        phone: '1'.repeat(21),
        source: 'consultation',
        consent: true,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should reject lead with invalid email', () => {
      const invalidLead = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        email: 'invalid-email',
        source: 'consultation',
        consent: true,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should reject lead with invalid source', () => {
      const invalidLead = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'invalid_source',
        consent: true,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should validate all valid source types', () => {
      const validSources = ['consultation', 'office_booking', 'presentation', 'apartment_card', 'callback'];

      for (const source of validSources) {
        const lead = {
          name: 'Иван Иванов',
          phone: '+79991234567',
          source,
          consent: true,
        };

        const result = leadSchema.safeParse(lead);
        expect(result.success).toBe(true);
      }
    });

    it('should reject lead with invalid apartmentId', () => {
      const invalidLead = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        apartmentId: 'invalid-uuid',
        consent: true,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should reject lead with message > 1000 characters', () => {
      const invalidLead = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        message: 'A'.repeat(1001),
        consent: true,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should reject lead without consent', () => {
      const invalidLead = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
        consent: false,
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should reject lead with missing consent field', () => {
      const invalidLead = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        source: 'consultation',
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });
  });

  describe('leadResponseSchema', () => {
    it('should validate correct response format', () => {
      const response = {
        success: true,
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Иван Иванов',
          phone: '+79991234567',
          email: 'ivan@example.com',
          source: 'consultation',
          apartmentId: '123e4567-e89b-12d3-a456-426614174000',
          status: 'new',
          createdAt: '2024-01-01T00:00:00Z',
        },
      };

      const result = leadResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
    });

    it('should validate response with null email', () => {
      const response = {
        success: true,
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Иван Иванов',
          phone: '+79991234567',
          email: null,
          source: 'consultation',
          apartmentId: null,
          status: 'new',
          createdAt: '2024-01-01T00:00:00Z',
        },
      };

      const result = leadResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
    });

    it('should reject response with invalid id', () => {
      const response = {
        success: true,
        data: {
          id: 'invalid-uuid',
          name: 'Иван Иванов',
          phone: '+79991234567',
          email: 'ivan@example.com',
          source: 'consultation',
          apartmentId: '123e4567-e89b-12d3-a456-426614174000',
          status: 'new',
          createdAt: '2024-01-01T00:00:00Z',
        },
      };

      const result = leadResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });

    it('should reject response with invalid datetime', () => {
      const response = {
        success: true,
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Иван Иванов',
          phone: '+79991234567',
          email: 'ivan@example.com',
          source: 'consultation',
          apartmentId: '123e4567-e89b-12d3-a456-426614174000',
          status: 'new',
          createdAt: 'invalid-datetime',
        },
      };

      const result = leadResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });
  });
});