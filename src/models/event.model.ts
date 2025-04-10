import { z } from 'zod';

const EventSchema = z.object({
  name: z.string(),
  id: z.string(),
  userId: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  ticketPrice: z.number(),
  numberOfTickets: z.number(),
  numberOfTicketsSold: z.number().nullable(),
  venue: z.string(),
  dateOfEvent: z.string().datetime(),
});

export { EventSchema };
