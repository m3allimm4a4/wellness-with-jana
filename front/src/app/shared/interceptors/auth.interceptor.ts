import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { switchMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (req.withCredentials) {
    return next(req);
  }
  return authService.getAccessToken().pipe(
    take(1),
    switchMap(accessToken => {
      if (!accessToken) {
        return next(req);
      }
      const newReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) });
      return next(newReq);
    }),
  );
};
