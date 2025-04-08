import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { filter, tap } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    filter(e => e.type !== 0),
    tap({
      next: event => {
        if (event.type === HttpEventType.Response) {
          console.log('Response received:', event);
        }
      },
      error: error => {
        console.error('HTTP Error occurred:', error);
      },
    })
  );
};
