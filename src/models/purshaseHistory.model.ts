import { z } from 'zod';

const BookingStatus = z.union([z.literal('Purchased'), z.literal('Expired'), z.literal('Used'), z.literal('Cancelled')]);

const PurchaseHistory = z.object({
  ticketId: z.string(),
  status: BookingStatus,
  userId: z.string(),
  eventId: z.string(),
  bookingDate: z.string().datetime(),
  qrCode: z.string(),
});

export { PurchaseHistory, BookingStatus };
