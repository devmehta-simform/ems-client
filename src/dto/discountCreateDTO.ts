import { DiscountSchema } from '../models';

const DiscountCreateSchema = DiscountSchema.omit({
  id: true,
});

export { DiscountCreateSchema };
