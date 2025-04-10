import { UserSchema } from '../models';

const UserRegisterSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
  role: true,
});

export { UserRegisterSchema };
