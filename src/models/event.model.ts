import { z } from 'zod';
import { DiscountSchema } from './discount.model';
import { ReviewSchema } from './review.model';
import { PurchaseHistorySchema } from './purchaseHistory.model';

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
  discount: DiscountSchema.optional(),
  review: ReviewSchema.optional(),
  purchaseHistory: PurchaseHistorySchema.optional(),
});

export { EventSchema };
