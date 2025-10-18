import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- IMPORTAR FormsModule
import { ListService, Pokemon } from '../core/services/list.service';
import { FavoritesService } from '../core/services/favorites.service';
import { TeamService } from '../core/services/team.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // <-- ADICIONAR FormsModule
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  mensagem: string = '';
  erro: boolean = false;

  busca: string = '';
  filtroTipo: string = '';
  tiposDisponiveis: string[] = [];

  private busca$ = new Subject<string>();

  constructor(
    private listService: ListService,
    private favoritesService: FavoritesService,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obterPokemons();
    this.busca$.pipe(debounceTime(300)).subscribe(term => this.busca = term);
  }

  obterPokemons(): void {
    this.listService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data;
        const tiposSet = new Set<string>();
        this.pokemons.forEach(p => {
          const tipos = Array.isArray(p.tipo)
            ? p.tipo
            : (p.tipo ? p.tipo.split(',').map(t => t.trim()).filter(Boolean) : []);
          tipos.forEach(t => tiposSet.add(t));
        });
        this.tiposDisponiveis = Array.from(tiposSet);
      },
      error: (err) => console.error('Erro ao obter pokémons:', err),
    });
  }

  verDetalhes(pokemon: Pokemon): void {
    this.router.navigate(['/details', pokemon.id]);
  }

  alterarEquipe(pokemon: Pokemon): void {
    this.teamService.toggleTeam(pokemon.id).subscribe({
      next: (res) => {
        pokemon.GrupoBatalha = !pokemon.GrupoBatalha;
        this.mensagem = res.detail;
        this.erro = false;
        setTimeout(() => (this.mensagem = ''), 3000);
      },
      error: (err) => {
        console.error('Erro ao alterar equipe:', err);
        this.mensagem = err.error?.detail || 'Erro desconhecido';
        this.erro = true;
        setTimeout(() => (this.mensagem = ''), 3000);
      }
    });
  }

  favoritar(pokemon: Pokemon): void {
    this.favoritesService.toggleFavorite(pokemon.id).subscribe({
      next: (res) => {
        pokemon.Favorito = !pokemon.Favorito;
        this.mensagem = res.detail;
        this.erro = false;
        setTimeout(() => (this.mensagem = ''), 3000);
      },
      error: (err) => {
        console.error('Erro ao favoritar:', err);
        this.mensagem = err.error?.detail || 'Erro ao favoritar';
        this.erro = true;
        setTimeout(() => (this.mensagem = ''), 3000);
      }
    });
  }

  pokemonsFiltrados(): Pokemon[] {
    return this.pokemons.filter(p =>
      (!this.busca || p.nome.toLowerCase().includes(this.busca.toLowerCase())) &&
      (!this.filtroTipo || p.tipo.includes(this.filtroTipo))
    );
  }

  onBuscaChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.busca$.next(target.value);
  }
}
