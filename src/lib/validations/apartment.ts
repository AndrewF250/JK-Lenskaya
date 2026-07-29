import { z } from 'zod';

export const apartmentSchema = z.object({
  id: z.string().uuid(),
  number: z.number().int().positive(),
  floor: z.number().int().min(1).max(100),
  rooms: z.number().int().min(0).max(4), // 0 = studio
  areaTotal: z.number().positive(),
  areaLiving: z.number().positive().optional(),
  areaKitchen: z.number().positive().optional(),
  building: z.string().min(1),
  section: z.string().min(1),
  hasBalcony: z.boolean(),
  hasTerrace: z.boolean(),
  status: z.enum(['free', 'booked', 'sold', 'unpublished']),
  price: z.number().positive().optional(),
  currency: z.string().default('RUB'),
  images: z.array(z.string().url()).optional(),
  floorPlanUrl: z.string().url().optional(),
  seoSlug: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const catalogFilterSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(12),
  rooms: z.array(z.number().int().min(0).max(4)).optional(),
  floorMin: z.number().int().min(1).optional(),
  floorMax: z.number().int().min(1).optional(),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
  areaMin: z.number().positive().optional(),
  areaMax: z.number().positive().optional(),
  status: z.array(z.enum(['free', 'booked', 'sold', 'unpublished'])).optional(),
  building: z.array(z.string()).optional(),
});

export const apartmentResponseSchema = z.object({
  data: z.array(apartmentSchema),
  meta: z.object({
    total: z.number().int().min(0),
    page: z.number().int().min(1),
    pageCount: z.number().int().min(0),
    limit: z.number().int().min(1),
  }),
});

export type IApartment = z.infer<typeof apartmentSchema>;
export type ICatalogFilter = z.infer<typeof catalogFilterSchema>;
export type IApartmentResponse = z.infer<typeof apartmentResponseSchema>;
