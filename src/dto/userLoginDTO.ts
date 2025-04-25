import { z } from 'zod';
import { RolesSchema } from '../response-types';

const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: RolesSchema,
});

export { UserLoginSchema };
