// src/app/core/services/login.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api/login/';

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { username, password })
      .pipe(
        tap(res => {
          // Armazena o access token e refresh token no localStorage
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
