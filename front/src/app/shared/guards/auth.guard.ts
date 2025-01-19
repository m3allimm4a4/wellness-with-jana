import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserRole } from '../interfaces/user.interface';

export const authGuard = (permissions: UserRole[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const homePath = router.parseUrl('/');
    return authService.hasPermissions(permissions) || homePath;
  };
};
