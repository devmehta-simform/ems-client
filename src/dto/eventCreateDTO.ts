import { Event } from '../models';

const EventCreateSchema = Event.pick({
  dateOfEvent: true,
  name: true,
  numberOfTickets: true,
  description: true,
  ticketPrice: true,
  venue: true,
  images: true,
});

export { EventCreateSchema };
