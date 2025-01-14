import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();
  if (!accessToken) {
    return next(req);
  }
  const newReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) });
  return next(newReq);
};
