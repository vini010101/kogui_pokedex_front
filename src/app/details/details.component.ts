import { NgOptimizedImage, TitleCasePipe, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DetailsService } from '../core/services/details.service';
import { Pokemon } from '../core/models/pokemon.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'poke-details',
  standalone: true,
  imports: [TitleCasePipe, NgOptimizedImage, RouterLink, NgIf, NgFor, AsyncPipe],
  template: `
    <ng-container *ngIf="pokemon$ | async as pokemon; else loading">
      <div class="poke-details">
        <img
          width="200"
          height="200"
          [ngSrc]="pokemon.sprites.front_default"
          [alt]="name"
        />

        <h1 class="title">{{ name | titlecase }}</h1>

        <div>
          <span *ngFor="let type of pokemon.types" class="type-badge">
            {{ type.type.name | titlecase }}
          </span>
        </div>

        <a routerLink="/" class="back-link">← Back to Pokémon List</a>
      </div>
    </ng-container>

    <ng-template #loading>
      <p>Loading...</p>
    </ng-template>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  @Input() name!: string;

  private readonly detailsService = inject(DetailsService);

  pokemon$: Observable<Pokemon> = this.detailsService.getPokemon(this.name);
}
