import { User } from '../models';

const UserRegisterSchema = User.pick({
  email: true,
  name: true,
  password: true,
  role: true,
});

export { UserRegisterSchema };
