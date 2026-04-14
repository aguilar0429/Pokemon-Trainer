import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainerProfile } from '../models/trainer.model';
import { Pokemon } from '../models/pokemon.model';

// Manages trainer profile state and selected Pokemon team
@Injectable({ providedIn: 'root' })
export class TrainerService {
  private readonly PROFILE_KEY = 'pokemon_trainer_profile';
  private readonly TEAM_KEY = 'pokemon_trainer_team';

  private profileSubject = new BehaviorSubject<TrainerProfile | null>(this.loadPerfil());
  private teamSubject = new BehaviorSubject<Pokemon[]>(this.loadEquipo());

  profile$ = this.profileSubject.asObservable();
  team$ = this.teamSubject.asObservable();

  get profile(): TrainerProfile | null {
    return this.profileSubject.value;
  }

  get team(): Pokemon[] {
    return this.teamSubject.value;
  }

  get isProfileComplete(): boolean {
    const p = this.profile;
    if (!p) return false;
    return !!(p.nombre && p.cumple && p.fotoUrl);
  }

  get isTeamComplete(): boolean {
    return this.team.length === 3;
  }

  // Calculate age from birthday string
  getEdad(birthday?: string): number {
    const bday = birthday || this.profile?.cumple;
    if (!bday) return 0;
    const birth = new Date(bday);
    const today = new Date();
    let edad = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      edad--;
    }
    return edad;
  }

  setPerfil(profile: TrainerProfile): void {
    this.profileSubject.next(profile);
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
  }

  setEquipo(team: Pokemon[]): void {
    this.teamSubject.next(team);
    console.log(team);
    localStorage.setItem(this.TEAM_KEY, JSON.stringify(team));
  }

  private loadPerfil(): TrainerProfile | null {
    try {
      const data = localStorage.getItem(this.PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private loadEquipo(): Pokemon[] {
    try {
      const data = localStorage.getItem(this.TEAM_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
