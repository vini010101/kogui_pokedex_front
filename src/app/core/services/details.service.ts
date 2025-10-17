// src/app/core/services/details.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class DetailsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api';

  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name}`);
  }
}
