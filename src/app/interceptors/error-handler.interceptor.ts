import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const alertService = inject(AlertService);
  const router = inject(Router);
  loaderService.show();
  return next(req).pipe(
    catchError((res: HttpErrorResponse) => {
      if (res.status >= 400) {
        console.error(res);
        if (res.status === 401) {
          router.navigate(['auth']);
        }
        alertService.show(res.error.error.message, 'error');
      }
      return [];
    }),
    finalize(() => loaderService.hide())
  );
};
