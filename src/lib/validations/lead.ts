import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(1, 'Имя обязательно').max(100),
  phone: z.string().min(10, 'Некорректный номер телефона').max(20),
  email: z.string().email('Некорректный email').optional(),
  source: z.enum(['consultation', 'office_booking', 'presentation', 'apartment_card', 'callback']),
  apartmentId: z.string().uuid().optional(),
  utmParams: z.record(z.string()).optional(),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие на обработку персональных данных' }),
  }),
});

export const leadResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.string().uuid(),
    name: z.string(),
    phone: z.string(),
    email: z.string().nullable().optional(),
    source: z.string(),
    apartmentId: z.string().nullable().optional(),
    status: z.string(),
    createdAt: z.string().datetime(),
  }),
});

export type ILead = z.infer<typeof leadSchema>;
export type ILeadResponse = z.infer<typeof leadResponseSchema>;
