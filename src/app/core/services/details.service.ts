// src/app/core/services/details.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class DetailsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api/pokemons';

  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getPokemon(id: number): Observable<Pokemon> {
    const headers = this.getToken()
      ? new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` })
      : undefined;

    return this.http.get<Pokemon>(`${this.baseUrl}/${id}/`, { headers }).pipe(
      tap(() => console.info(`[DetailsService] Pokémon ${id} carregado.`)),
      catchError(err => {
        console.error('[DetailsService] Erro ao carregar Pokémon:', err);
        return throwError(() => err);
      })
    );
  }
}
