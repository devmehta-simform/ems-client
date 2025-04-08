import { UserRegisterSchema } from './userRegisterDTO';

const UserLoginSchema = UserRegisterSchema.pick({
  email: true,
  password: true,
  role: true,
});

export { UserLoginSchema };
