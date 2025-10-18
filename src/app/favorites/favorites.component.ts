import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../core/services/favorites.service';

interface Pokemon {
  id: number;
  nome: string;
  codigo: string;
  imagem: string;
  tipo: string[];
  GrupoBatalha: boolean;
  Favorito: boolean;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
removerEquipe(arg0: number) {
throw new Error('Method not implemented.');
}
  favoritos: Pokemon[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  carregarFavoritos(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (data: any[]) => {
        this.favoritos = (data || []).map(p => ({
          id: p.id,
          nome: p.nome,
          codigo: p.codigo,
          imagem: p.imagem || 'assets/default-pokemon.png',
          tipo: Array.isArray(p.tipo) ? p.tipo : (p.tipo ? [p.tipo] : []),
          GrupoBatalha: p.GrupoBatalha,
          Favorito: p.Favorito
        }));
      },
      error: err => console.error('Erro ao carregar favoritos:', err)
    });
  }

  toggleFavorito(id: number): void {
    this.favoritesService.toggleFavorite(id).subscribe({
      next: () => {
        this.favoritos = this.favoritos.filter(p => p.id !== id); // some saiu da lista
      },
      error: err => console.error('Erro ao alterar favorito:', err)
    });
  }
}
