import { HttpInterceptorFn } from '@angular/common/http';

export const fakeAuthInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
