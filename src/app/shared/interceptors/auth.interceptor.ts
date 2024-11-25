import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  console.log("test interceptor");

  const authToken = localStorage.getItem('token');
  console.log(authToken);
  

  const authReq = authToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    : req;
      
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Handle unauthorized error
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
