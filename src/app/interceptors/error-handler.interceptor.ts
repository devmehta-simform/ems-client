import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((res: HttpErrorResponse) => {
      console.error(res);
      if (res.status === 401) {
        router.navigate(['auth']);
      }
      alertService.show(res.error.error.message, 'error');
      return throwError(() => res.error);
    })
  );
};
