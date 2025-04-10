import { z } from 'zod';

const DiscountStatusSchema = z.union([z.literal('Active'), z.literal('InActive'), z.literal('UpComing')]);

const DiscountSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  status: DiscountStatusSchema,
  discountAmount: z.number(),
});

export { DiscountSchema, DiscountStatusSchema };
