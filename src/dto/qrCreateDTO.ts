import { z } from 'zod';
import { EventDetailsSchema } from '../response-types';

export const QrCreateSchema = z.object({
  userId: z.string(),
  userEmail: z.string().email(),
  event: EventDetailsSchema,
  qty: z.number().positive(),
  userName: z.string(),
});
