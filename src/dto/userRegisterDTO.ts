import { z } from 'zod';
import { RolesSchema } from '../response-types/roles';

const UserRegisterSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: RolesSchema,
});

export { UserRegisterSchema };
