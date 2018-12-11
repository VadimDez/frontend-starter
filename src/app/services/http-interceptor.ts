import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let r = req.clone();
    const authToken = localStorage.getItem('token');

    if (authToken) {
      r = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    return next.handle(r).pipe(
      catchError(e => {
        // Ypu could implement something like this to always redirect to login page on 401;
        /*
        if (e instanceof HttpErrorResponse && e.status === 401) {
          MainService.goToLogin();
        }
        */
        return of(e);
      })
    );
  }
}
