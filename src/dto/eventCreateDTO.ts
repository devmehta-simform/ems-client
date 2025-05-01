import { z } from 'zod';

const EventCreateDTO = z.object({
  name: z.string(),
  coverImage: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  ticketPrice: z.number().positive(),
  numberOfTickets: z.number().positive(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  dateOfEvent: z.string().datetime(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

export { EventCreateDTO };
