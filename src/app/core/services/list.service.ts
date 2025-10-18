import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

export interface Pokemon {
codigo: any;
  GrupoBatalha: boolean;
Favorito: any;
  id: number;
  nome: string;
  tipo: string;
  imagem: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListService {
  getPokemonDetail(id: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:8000/api/pokemons';

  constructor(private http: HttpClient) {}

  // Lista todos os pokémons do usuário
  getPokemons(): Observable<Pokemon[]> {
    const token = localStorage.getItem('access_token');

    console.warn('[ListService] Requisição GET /api/pokemons/');
    if (!token) console.error('[ListService] Nenhum token JWT encontrado no localStorage');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
    });

    return this.http.get<Pokemon[]>(`${this.apiUrl}/`, { headers }).pipe(
      tap(() => console.info('[ListService] Lista de Pokémons carregada com sucesso')),
      catchError((err) => {
        console.error('[ListService] Erro ao carregar lista:', err);
        return throwError(() => err);
      })
    );
  }

  // Adiciona um novo pokémon
  adicionarPokemon(nomePokemon: string): Observable<any> {
    const token = localStorage.getItem('access_token');

    console.warn(`[ListService] Tentando adicionar Pokémon: ${nomePokemon}`);
    if (!token) console.error('[ListService] Nenhum token JWT encontrado no localStorage');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
      'Content-Type': 'application/json',
    });

    console.debug('[ListService] Enviando POST para /api/pokemons/adicionar/ com payload:', {
      nome_pokemon: nomePokemon,
    });

    return this.http.post(`${this.apiUrl}/adicionar/`, { nome_pokemon: nomePokemon }, { headers }).pipe(
      tap((res) => {
        console.info(`[ListService] Pokémon "${nomePokemon}" adicionado com sucesso:`, res);
      }),
      catchError((err) => {
        if (err.status === 400 && err.error.detail === 'Este Pokémon já está na sua lista') {
          console.warn(`[ListService] O Pokémon "${nomePokemon}" já está na lista do usuário.`);
        } else {
          console.error('[ListService] Erro ao adicionar Pokémon:', err);
        }
        return throwError(() => err);
      })
    );
  }
}
