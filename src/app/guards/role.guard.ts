import { CanActivateFn } from '@angular/router';
import { RolesSchema, UserLoginSchema } from '../../response-types';
import { inject } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';

export const roleGuard: CanActivateFn = route => {
  const dataStoreService = inject(DataStoreService);
  const reqRole = route.data['role'];
  const role = RolesSchema.safeParse(reqRole);
  if (role.success) {
    const user = UserLoginSchema.safeParse(dataStoreService.getData('user'));
    if (user.success) {
      return user.data.role === role.data;
    }
  }
  return false;
};
