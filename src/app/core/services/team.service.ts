// src/app/core/services/team.service.ts
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private storageKey = 'team';

  getTeam(): Pokemon[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addToTeam(pokemon: Pokemon): void {
    const team = this.getTeam();
    if (team.length < 6 && !team.find(p => p.name === pokemon.name)) {
      team.push(pokemon);
      localStorage.setItem(this.storageKey, JSON.stringify(team));
    }
  }

  removeFromTeam(pokemonName: string): void {
    const team = this.getTeam().filter(p => p.name !== pokemonName);
    localStorage.setItem(this.storageKey, JSON.stringify(team));
  }
}
