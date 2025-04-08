import { Discount } from '../models';

const DiscountUpdateStatusSchema = Discount.pick({
  status: true,
});

export { DiscountUpdateStatusSchema };
