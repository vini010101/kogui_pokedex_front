import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    console.log('AuthInterceptor - Token encontrado:', token);

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('AuthInterceptor - Headers enviados:', cloned.headers);

      return next.handle(cloned);
    } else {
      console.log('AuthInterceptor - Nenhum token encontrado, enviando requisição sem Authorization');
    }

    return next.handle(req);
  }
}
