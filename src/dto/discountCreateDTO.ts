import { Discount } from '../models';

const DiscountCreateSchema = Discount.omit({
  id: true,
});

export { DiscountCreateSchema };
