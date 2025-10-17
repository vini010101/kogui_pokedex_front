import { Component } from '@angular/core';
import { Card } from '../card/card';
import { NgIf, NgFor } from '@angular/common'; // <- importe aqui

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [Card, NgIf, NgFor], // <- adicione aqui
  template: `
    <h1 class="title">Pokémon Favoritos</h1>
    <div *ngIf="favorites.length === 0">
      Nenhum Pokémon favoritado.
    </div>
    <div class="poke-container">
      <poke-card *ngFor="let poke of favorites" [pokeResult]="poke"></poke-card>
    </div>
  `,
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
}
