// src/app/core/services/favorites.service.ts
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'favorites';

  getFavorites(): Pokemon[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addFavorite(pokemon: Pokemon): void {
    const favorites = this.getFavorites();
    if (!favorites.find(p => p.name === pokemon.name)) {
      favorites.push(pokemon);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(pokemonName: string): void {
    const favorites = this.getFavorites().filter(p => p.name !== pokemonName);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
