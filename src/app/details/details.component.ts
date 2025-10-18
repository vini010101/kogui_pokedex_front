// src/app/details/details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailsService } from '../core/services/details.service';
import { Pokemon } from '../core/models/pokemon.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pokemon?: Pokemon;
  mensagem: string = '';
  erro: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.carregarPokemon(name);
    } else {
      this.erro = true;
      this.mensagem = 'Pokémon não especificado.';
    }
  }

  carregarPokemon(name: string): void {
    const id = Number(name);
    if (Number.isNaN(id)) {
      this.erro = true;
      this.mensagem = 'ID de Pokémon inválido.';
      console.error('[DetailsComponent] ID inválido:', name);
      return;
    }

    this.detailsService.getPokemon(id).subscribe({
      next: (data) => this.pokemon = data,
      error: (err) => {
        this.erro = true;
        this.mensagem = 'Erro ao carregar Pokémon.';
        console.error(err);
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/list']);
  }
}
