import { z } from 'zod';

const Rating = z.union([z.literal('VeryBad'), z.literal('Bad'), z.literal('Average'), z.literal('Good'), z.literal('VeryGood')]);

const Review = z.object({
  review: z.string(),
  rating: Rating,
  id: z.string(),
  userId: z.string(),
  eventId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export { Review, Rating };
