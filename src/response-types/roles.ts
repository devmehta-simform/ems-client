import { z } from 'zod';

const RolesEnum = {
  Guest: 'Guest',
  Host: 'Host',
  Volunteer: 'Volunteer',
} as const;

const RolesSchema = z.nativeEnum(RolesEnum);

export { RolesSchema, RolesEnum };
