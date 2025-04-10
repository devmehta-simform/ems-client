import { DiscountSchema } from '../models';

const DiscountUpdateStatusSchema = DiscountSchema.pick({
  status: true,
});

export { DiscountUpdateStatusSchema };
