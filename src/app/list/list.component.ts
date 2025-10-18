import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListService, Pokemon } from '../core/services/list.service';

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
    console.log('Tentando adicionar Pokémon:', pokemon.nome);

    // debug adicional do token e headers
    const token = localStorage.getItem('access_token');
    console.log('Token JWT:', token);

    this.listService.adicionarPokemon(pokemon.nome).subscribe({
      next: (res) => {
        console.log('Resposta do backend:', res);
        this.mensagem = res.detail;
        this.erro = false;
        setTimeout(() => this.mensagem = '', 3000);
      },
      error: (err) => {
        console.error('Erro ao adicionar Pokémon:', err);
        if (err.error) {
          console.error('Detalhes do erro:', err.error);
        }
        this.mensagem = err.error?.detail || 'Erro desconhecido';
        this.erro = true;
        setTimeout(() => this.mensagem = '', 3000);
      }
    });
  }
}
