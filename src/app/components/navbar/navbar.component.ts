import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { TrainerService } from '../../services/trainer.service';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule, MatIcon, LoadingScreenComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() trainerName = '';
  @Input() showSearch = false;
  @Output() searchChanged = new EventEmitter<string>();

  cerrarSesionVisible = false;
  showLoading = false;
  searchOpen = false;
  searchQuery = '';

  constructor(
    private router: Router,
    private trainerService: TrainerService
  ) {}

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.cerrarSesionVisible = !this.cerrarSesionVisible;
  }

  toggleSearch(event: MouseEvent): void {
    event.stopPropagation();
    this.searchOpen = !this.searchOpen;
    if (!this.searchOpen) {
      this.searchQuery = '';
      this.searchChanged.emit('');
    }
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery = value;
    this.searchChanged.emit(value);
  }

  @HostListener('document:click')
  closeDropdown(): void {
    this.cerrarSesionVisible = false;
  }

  cerrarSesion(): void {
    this.cerrarSesionVisible = false;
    this.trainerService.clearSession();
    this.showLoading = true;
    setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 500);
  }
}
