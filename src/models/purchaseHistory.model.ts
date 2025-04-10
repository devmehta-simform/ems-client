import { z } from 'zod';

const BookingStatusSchema = z.union([z.literal('Purchased'), z.literal('Expired'), z.literal('Used'), z.literal('Cancelled')]);

const PurchaseHistorySchema = z.object({
  ticketId: z.string(),
  status: BookingStatusSchema,
  userId: z.string(),
  eventId: z.string(),
  bookingDate: z.string().datetime(),
  qrCode: z.string(),
});

export { PurchaseHistorySchema, BookingStatusSchema };
