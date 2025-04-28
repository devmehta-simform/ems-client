import { z } from 'zod';
import { RolesSchema } from './roles';

const UserLoginSchema = z.object({
  name: z.string(),
  id: z.string(),
  email: z.string(),
  role: RolesSchema,
  avatar: z.string().nullable(),
});

export { UserLoginSchema };
