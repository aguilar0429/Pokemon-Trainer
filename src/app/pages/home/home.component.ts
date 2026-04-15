import { Component, OnInit } from '@angular/core';
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TarjetaEntrenadorComponent } from '../../components/tarjeta-entrenador/tarjeta-entrenador.component';
import { StatBarComponent } from '../../components/stat-bar/stat-bar.component';
import { TrainerProfile } from '../../models/trainer.model';
import { Pokemon } from '../../models/pokemon.model';
import { Router } from '@angular/router';
import { TrainerService } from '../../services/trainer.service';
import { PokemonService } from '../../services/pokemon.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoadingScreenComponent, CommonModule, NavbarComponent, TarjetaEntrenadorComponent, StatBarComponent, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  profile: TrainerProfile | null = null;
  team: Pokemon[] = [];
  filteredTeam: Pokemon[] = [];
  showLoading = false;

  constructor(
    private router: Router,
    private trainerService: TrainerService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.profile = this.trainerService.profile;
    this.team = this.trainerService.team;
    this.filteredTeam = [...this.team];
  }

  // Get first name for greeting
  get firstName(): string {
    return this.profile?.nombre?.split(' ')[0] || '';
  }

  // Get stat bar color based on Pokemon primary type
  getColorBarra(pokemon: Pokemon): string {
    return this.pokemonService.getTypeColor(pokemon.tipos);
  }

  // Capitalize Pokemon name
  mayus(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  editProfile(): void {
    this.showLoading = true;
    setTimeout(() => this.router.navigate(['/profile'], { queryParams: { from: 'home' } }), 500);
  }

  editTeam(): void {
    this.showLoading = true;
    setTimeout(() => this.router.navigate(['/team'], { queryParams: { from: 'home' } }), 500);
  }

  formatId(id: number): string {
    return '#' + id.toString().padStart(3, '0');
  }

  onSearchChanged(query: string): void {
    const q = query.trim().toLowerCase();
    if (!q) {
      this.filteredTeam = [...this.team];
      return;
    }

    this.filteredTeam = this.team.filter(pokemon =>
      pokemon.nombre.toLowerCase().includes(q) ||
      pokemon.id.toString().includes(q) ||
      this.formatId(pokemon.id).toLowerCase().includes(q) ||
      pokemon.tipoSpanish.join(' ').toLowerCase().includes(q)
    );
  }
}
