import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://127.0.0.1:8000/api/register/';

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string) {
    return this.http.post(this.apiUrl, { username, email, password });
  }
}
