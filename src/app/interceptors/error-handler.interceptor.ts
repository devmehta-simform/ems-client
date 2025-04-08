import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  return next(req).pipe(
    catchError((res: HttpErrorResponse) => {
      console.error(res);
      alertService.show(res.error.error.message);
      return throwError(() => res.error);
    })
  );
};
