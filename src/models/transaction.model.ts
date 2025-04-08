import { z } from 'zod';

const TransactionStatus = z.union([z.literal('Completed'), z.literal('Pending'), z.literal('Failed')]);

const Transaction = z.object({
  id: z.string(),
  ticketId: z.string(),
  dateOfTransaction: z.string().datetime(),
  amount: z.number(),
  status: TransactionStatus,
  paymentMethod: z.string(),
});

export { Transaction, TransactionStatus };
