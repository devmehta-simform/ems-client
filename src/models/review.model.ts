import { z } from 'zod';

const RatingSchema = z.union([z.literal('VeryBad'), z.literal('Bad'), z.literal('Average'), z.literal('Good'), z.literal('VeryGood')]);

const ReviewSchema = z.object({
  review: z.string(),
  rating: RatingSchema,
  id: z.string(),
  userId: z.string(),
  eventId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export { ReviewSchema, RatingSchema };
