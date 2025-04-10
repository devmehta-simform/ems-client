import { EventSchema } from '../models';

const EventCreateSchema = EventSchema.pick({
  dateOfEvent: true,
  name: true,
  numberOfTickets: true,
  description: true,
  ticketPrice: true,
  venue: true,
  images: true,
});

export { EventCreateSchema };
