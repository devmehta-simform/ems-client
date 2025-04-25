import { z } from 'zod';

enum DiscountStatusEnum {
  Active = 'Active',
  InActive = 'InActive',
  UpComing = 'UpComing',
}

const DiscountStatusSchema = z.nativeEnum(DiscountStatusEnum);

const DiscountSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  status: DiscountStatusSchema,
  discountAmount: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

type DiscountStatus = z.infer<typeof DiscountStatusSchema>;

type Discount = z.infer<typeof DiscountSchema>;

export { DiscountStatusSchema, DiscountSchema, type Discount, type DiscountStatus };
