import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api/pokemons/';

  private getToken(): string {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('[FavoritesService] Nenhum token JWT encontrado.');
      throw new Error('Usuário não autenticado');
    }
    return token;
  }

  /** GET - Buscar todos os favoritos do usuário */
  getFavorites(): Observable<Pokemon[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http.get<Pokemon[]>(`${this.baseUrl}favoritos/`, { headers }).pipe(
      tap(() => console.info('[FavoritesService] Favoritos carregados.')),
      catchError((err) => {
        console.error('[FavoritesService] Erro ao carregar favoritos:', err);
        return throwError(() => err);
      })
    );
  }

  /** PATCH - Alterna favorito de um Pokémon */
  toggleFavorite(pokemonId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http.patch(`${this.baseUrl}${pokemonId}/favorito/`, {}, { headers }).pipe(
      tap(() => console.info(`[FavoritesService] Toggle favorito id=${pokemonId}.`)),
      catchError((err) => {
        console.error('[FavoritesService] Erro ao atualizar favorito:', err);
        return throwError(() => err);
      })
    );
  }
}
