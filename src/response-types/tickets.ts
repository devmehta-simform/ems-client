import { z } from 'zod';
import { EventDetailsSchema } from './event';

const BookingStatus = {
  Purchased: 'Purchased',
  Expired: 'Expired',
  Used: 'Used',
  Cancelled: 'Cancelled',
};

const BookingStatusSchema = z.nativeEnum(BookingStatus);

export const TicketSchema = z.object({
  ticketId: z.string(),
  status: BookingStatusSchema,
  userId: z.string(),
  eventId: z.string(),
  bookingDate: z.string().datetime(),
  qrCode: z.string(),
  event: EventDetailsSchema.omit({ duration: true }),
});
