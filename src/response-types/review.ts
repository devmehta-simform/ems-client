import { z } from 'zod';

enum RatingEnum {
  VeryBad = 'VeryBad',
  Bad = 'Bad',
  Average = 'Average',
  Good = 'Good',
  VeryGood = 'VeryGood',
}

const RatingSchema = z.nativeEnum(RatingEnum);

const ReviewSchema = z.object({
  review: z.string(),
  rating: RatingSchema,
  ratingVal: z.number().min(1).max(5),
  id: z.string(),
  userId: z.string(),
  eventId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export { ReviewSchema, RatingSchema };
