import { z } from 'zod';
import { ReviewSchema } from './review';

const EventSchema = z.object({
  name: z.string(),
  createdAt: z.string().datetime(),
  images: z.array(z.string()),
  ticketPrice: z.number().positive(),
  venue: z.string(),
  dateOfEvent: z.string().datetime(),
  id: z.string(),
});

const EventDetailsSchema = z.object({
  name: z.string(),
  id: z.string(),
  userId: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  ticketPrice: z.number().positive(),
  numberOfTickets: z.number().positive(),
  numberOfTicketsSold: z.number().nullable(),
  venue: z.string(),
  dateOfEvent: z.string().datetime(),
  review: ReviewSchema.optional(),
});

export { EventDetailsSchema, EventSchema };
