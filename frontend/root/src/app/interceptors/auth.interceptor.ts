import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Don't attach token for login/register
  const isAuthRequest =
    req.url.includes('/api/users/login') ||
    req.url.includes('/api/users/register');

  if (token && !isAuthRequest) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
