import { z } from 'zod';

const DiscountStatus = z.union([z.literal('Active'), z.literal('InActive'), z.literal('UpComing')]);

const Discount = z.object({
  id: z.string(),
  eventId: z.string(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  status: DiscountStatus,
  discountAmount: z.number(),
});

export { Discount, DiscountStatus };
