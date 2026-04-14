import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, map, catchError, retry, tap, shareReplay } from 'rxjs';
import { Pokemon, STAT_MAX, TYPE_TRANSLATIONS, TYPE_COLORS } from '../models/pokemon.model';


@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly API_BASE = 'https://pokeapi.co/api/v2';
  private cache = new Map<number, Pokemon>();
  private pokemon$: Observable<Pokemon[]> | null = null;

  constructor(private http: HttpClient) {}

  // Fetch all 151 Gen 1 pokemon
  getAllGen1Pokemon(): Observable<Pokemon[]> {
    
    if (this.pokemon$) return this.pokemon$;
    
    this.pokemon$ = this.http
      .get<{ results: { name: string; url: string }[] }>(`${this.API_BASE}/pokemon?limit=151`)
      .pipe(
        map((res) => res.results.map((_, i) => i + 1)),
        map((ids) => ids.map((id) => this.fetchPokemon(id))),
        map((observables) => forkJoin(observables)),
        (obs) => new Observable<Pokemon[]>((subscriber) => {
          obs.subscribe({
            next: (innerObs) => {
              innerObs.subscribe({
                next: (pokemon) => subscriber.next(pokemon),
                error: (err) => subscriber.error(err),
              });
            },
            error: (err) => subscriber.error(err),
          });
        }),
        retry(2),
        shareReplay(1)
      );
      
    return this.pokemon$;
  }

  // Fetch a single pokemon
  private fetchPokemon(id: number): Observable<Pokemon> {
    if (this.cache.has(id)) return of(this.cache.get(id)!);

    return this.http.get<any>(`${this.API_BASE}/pokemon/${id}`).pipe(
      map((data) => this.mapToPokemon(data)),
      tap((pokemon) => this.cache.set(pokemon.id, pokemon)),
      catchError(() =>
        of({
          id,
          nombre: `Pokemon #${id}`,
          sprite: '',
          tipos: [],
          tipoSpanish: [],
          stats: [],
        })
      )
    );
  }

  // Map API response to our pokemon model
  private mapToPokemon(data: any): Pokemon {
    const tipos = data.types.map((t: any) => t.type.nombre);
    return {
      id: data.id,
      nombre: data.name,
      sprite: data.sprites?.other?.home?.front_default || data.sprites?.front_default || '',
      tipos,
      tipoSpanish: tipos.map((t: string) => TYPE_TRANSLATIONS[t] || t),
      stats: data.stats.map((s: any) => {
        const statInfo = STAT_MAX[s.stat.name] || { max: 100, label: s.stat.name };
        return {
          nombre: s.stat.name,
          baseStat: s.base_stat,
          maxStat: statInfo.max,
          label: statInfo.label,
        };
      }),
    };
  }

  // Get stat bar color based on primary type
  getTypeColor(types: string[]): string {
    if (!types.length) return '#9E9E9E';
    return TYPE_COLORS[types[0]] || '#9E9E9E';
  }
}