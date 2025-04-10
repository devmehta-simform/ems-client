import { z } from 'zod';

const RolesSchema = z.union([z.literal('Guest'), z.literal('Host'), z.literal('Volunteer')]);

const UserSchema = z.object({
  name: z.string(),
  id: z.string(),
  email: z.string(),
  password: z.string(),
  role: RolesSchema,
  avatar: z.string().nullable(),
  passwordUpdatedAt: z.string().datetime(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export { UserSchema, RolesSchema };
