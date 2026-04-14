import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TarjetaEntrenadorComponent } from '../../components/tarjeta-entrenador/tarjeta-entrenador.component';
import { Router } from '@angular/router';
import { TrainerService } from '../../services/trainer.service';
import { PokemonService } from '../../services/pokemon.service';
import { TrainerProfile } from '../../models/trainer.model';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingScreenComponent, NavbarComponent, LoadingScreenComponent, TarjetaEntrenadorComponent,MatIconModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  perfil : TrainerProfile | null = null;
  pokemons: Pokemon[] = [];
  pokemonFiltrados: Pokemon[] = [];
  equipoSeleccionado: Pokemon[] = [];
  busqueda = '';
  loading = true;
  error = false;
  showLoading = false;

  constructor(
    private router: Router,
    private trainerService: TrainerService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.perfil = this.trainerService.profile;

    // Restore previously selected team if editing
    const existingTeam = this.trainerService.team;
    if (existingTeam.length > 0) {
      this.equipoSeleccionado = [...existingTeam];
    }
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.loading = true;
    this.error = false;
    this.pokemonService.getAllGen1Pokemon().subscribe({
      next: (pokemon) => {
        this.pokemons = pokemon;
        this.pokemonFiltrados = pokemon;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    const q = this.busqueda.trim().toLowerCase();
    if (!q) {
      this.pokemonFiltrados = this.pokemons;
      return;
    }
    this.pokemonFiltrados = this.pokemons.filter(p =>
      p.nombre.toLowerCase().includes(q) || p.id.toString() === q || this.formatId(p.id).includes(q) 
    );
  }

  isSelected(pokemon: Pokemon): boolean {
    return this.equipoSeleccionado.some(p => p.id === pokemon.id);
  }

  toggleSelect(pokemon: Pokemon): void {
    const idx = this.equipoSeleccionado.findIndex(p => p.id === pokemon.id);
    if (idx >= 0) {
      this.equipoSeleccionado.splice(idx, 1);
    } else if (this.equipoSeleccionado.length < 3) {
      this.equipoSeleccionado.push(pokemon);
    }
  }

  // Format Pokemon ID with leading zeros
  formatId(id: number): string {
    return '#' + id.toString().padStart(3, '0');
  }

  // Capitalize first letter of name
  mayus(nombre: string): string {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }

  onSave(): void {
    if (this.equipoSeleccionado.length !== 3) return;
    this.trainerService.setEquipo(this.equipoSeleccionado);
    this.showLoading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 500);
  }

  regresar(): void {
    this.showLoading = true;
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 500);
  }
}
