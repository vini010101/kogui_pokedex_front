import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api/pokemons/';

  private getToken(): string {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('[TeamService] Nenhum token JWT encontrado. Usuário não autenticado.');
      throw new Error('Usuário não autenticado');
    }
    return token;
  }

  /** GET - Busca os Pokémons da equipe do usuário */
  getTeam(): Observable<Pokemon[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    console.warn('[TeamService] Buscando equipe de batalha...');
    return this.http.get<Pokemon[]>(`${this.baseUrl}equipe/`, { headers }).pipe(
      tap(() => console.info('[TeamService] Equipe carregada com sucesso.')),
      catchError((err) => {
        console.error('[TeamService] Erro ao carregar equipe:', err);
        return throwError(() => err);
      })
    );
  }

  /** PATCH - Alterna Pokémon na equipe de batalha */
  toggleTeam(pokemonId: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.patch(`${this.baseUrl}${pokemonId}/equipe/`, {}, { headers }).pipe(
      tap(() => console.info(`[TeamService] Toggle equipe id=${pokemonId}.`)),
      catchError((err) => {
        console.error('[TeamService] Erro ao atualizar equipe:', err);
        return throwError(() => err);
      })
    );
  }

  /** Remove Pokémon da equipe chamando toggleTeam */
  removeFromTeam(pokemonId: number): Observable<any> {
    return this.toggleTeam(pokemonId);
  }
}
