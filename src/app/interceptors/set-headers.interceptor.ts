import { HttpInterceptorFn } from '@angular/common/http';

export const setHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    withCredentials: true,
  });
  return next(newReq);
};
