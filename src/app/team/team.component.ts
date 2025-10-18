import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamService } from '../core/services/team.service';

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
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  equipe: Pokemon[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.carregarEquipe();
  }

  carregarEquipe(): void {
    this.teamService.getTeam().subscribe({
      next: (data: any[]) => {
        this.equipe = (data || []).map(p => ({
          id: p.id,
          nome: p.nome,
          codigo: p.codigo,
          imagem: p.imagem || 'assets/default-pokemon.png',
          tipo: Array.isArray(p.tipo) ? p.tipo : (p.tipo ? [p.tipo] : []),
          GrupoBatalha: p.GrupoBatalha,
          Favorito: p.Favorito
        }));
      },
      error: err => console.error('Erro ao carregar equipe:', err)
    });
  }

  removerEquipe(id: number): void {
    try {
      const result: any = this.teamService.removeFromTeam(id);
      // If the service returns an Observable, subscribe to it; otherwise treat it as synchronous/void.
      if (result && typeof result.subscribe === 'function') {
        result.subscribe({
          next: () => {
            this.equipe = this.equipe.filter(p => p.id !== id);
          },
          error: (err: any) => console.error('Erro ao remover da equipe:', err)
        });
      } else {
        // removeFromTeam returned void or handled removal synchronously; update local state.
        this.equipe = this.equipe.filter(p => p.id !== id);
      }
    } catch (err) {
      console.error('Erro ao remover da equipe:', err);
    }
  }
}
