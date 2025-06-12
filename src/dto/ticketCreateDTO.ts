import { z } from 'zod';

export const TicketCreateSchema = z.object({
  userId: z.string(),
  eventId: z.string(),
  qrCode: z.string(),
});
