import { Component } from '@angular/core';
import { Card } from '../card/card';
import { NgIf, NgFor } from '@angular/common'; // <- necessário

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [Card, NgIf, NgFor], // <- adicionado aqui
  template: `
    <h1 class="title">Equipe de Batalha</h1>
    <div *ngIf="team.length === 0">
      Nenhum Pokémon adicionado à equipe.
    </div>
    <div class="poke-container">
      <poke-card *ngFor="let poke of team" [pokeResult]="poke"></poke-card>
    </div>
  `,
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  team = JSON.parse(localStorage.getItem('team') || '[]');
}
