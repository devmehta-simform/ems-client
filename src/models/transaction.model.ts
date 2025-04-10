import { z } from 'zod';

const TransactionStatusSchema = z.union([z.literal('Completed'), z.literal('Pending'), z.literal('Failed')]);

const TransactionSchema = z.object({
  id: z.string(),
  ticketId: z.string(),
  dateOfTransaction: z.string().datetime(),
  amount: z.number(),
  status: TransactionStatusSchema,
  paymentMethod: z.string(),
});

export { TransactionSchema, TransactionStatusSchema };
