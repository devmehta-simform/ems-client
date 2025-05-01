import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const setHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.API_BASE_URL)) {
    const newReq = req.clone({
      withCredentials: true,
    });
    return next(newReq);
  }
  return next(req);
};
