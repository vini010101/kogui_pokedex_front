import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListService, Pokemon } from '../core/services/list.service';
import { FavoritesService } from '../core/services/favorites.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  mensagem: string = '';
  erro: boolean = false;

  constructor(
    private listService: ListService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obterPokemons();
  }

  // Carrega todos os pokémons
  obterPokemons(): void {
    this.listService.getPokemons().subscribe({
      next: (data) => (this.pokemons = data),
      error: (err) => console.error('Erro ao obter pokémons:', err),
    });
  }

  // Navega para a página de detalhes
  verDetalhes(nome: string): void {
    this.router.navigate(['/details', nome]);
  }

  // Adiciona Pokémon à equipe do usuário autenticado
  adicionarEquipe(pokemon: Pokemon): void {
    this.listService.adicionarPokemon(pokemon.nome).subscribe({
      next: (res) => {
        this.mensagem = res.detail;
        this.erro = false;
        setTimeout(() => this.mensagem = '', 3000);
      },
      error: (err) => {
        this.mensagem = err.error?.detail || 'Erro desconhecido';
        this.erro = true;
        setTimeout(() => this.mensagem = '', 3000);
      }
    });
  }

  // Favorita ou remove dos favoritos
  favoritar(pokemon: Pokemon): void {
    this.favoritesService.toggleFavorite(pokemon.id).subscribe({
      next: (res) => {
        // Alterna o status local do favorito
        pokemon.Favorito = !pokemon.Favorito;

        // Mensagem de feedback
        this.mensagem = res.detail;
        this.erro = false;
        setTimeout(() => this.mensagem = '', 3000);
      },
      error: (err) => {
        console.error('Erro ao favoritar:', err);
        this.mensagem = err.error?.detail || 'Erro ao favoritar';
        this.erro = true;
        setTimeout(() => this.mensagem = '', 3000);
      }
    });
  }
}
