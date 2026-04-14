// Pokemon data models
export interface PokemonListItem {
  nombre: string;
  url: string;
}

export interface PokemonStat {
  nombre: string;
  statBase: number;
  maxStat: number;
  label: string;
}

export interface Pokemon {
  id: number;
  nombre: string;
  sprite: string;
  tipos: string[];
  tipoSpanish: string[];
  stats: PokemonStat[];
}

// Stat max values per the requirements
export const STAT_MAX: Record<string, { max: number; label: string }> = {
  hp: { max: 255, label: 'HP' },
  attack: { max: 190, label: 'Ataque' },
  defense: { max: 230, label: 'Defensa' },
  'special-attack': { max: 194, label: 'Ataque Especial' },
  'special-defense': { max: 230, label: 'Defensa Especial' },
  speed: { max: 180, label: 'Velocidad' },
};

// Pokemon type translations to Spanish
export const TYPE_TRANSLATIONS: Record<string, string> = {
  grass: 'Planta',
  fire: 'Fuego',
  water: 'Agua',
  poison: 'Veneno',
  electric: 'Eléctrico',
  bug: 'Bicho',
  normal: 'Normal',
  flying: 'Volador',
  ground: 'Tierra',
  rock: 'Roca',
  fighting: 'Lucha',
  psychic: 'Psíquico',
  ice: 'Hielo',
  dragon: 'Dragón',
  ghost: 'Fantasma',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

// Color mapping for stat bars based on primary type
export const TYPE_COLORS: Record<string, string> = {
  grass: '#4CAF50',
  poison: '#4CAF50',
  fire: '#FFB300',
  water: '#2196F3',
  electric: '#FFC107',
  bug: '#8BC34A',
  normal: '#9E9E9E',
  flying: '#90CAF9',
  ground: '#D2B48C',
  rock: '#A1887F',
  fighting: '#E53935',
  psychic: '#CE93D8',
  ice: '#80DEEA',
  dragon: '#7C4DFF',
  ghost: '#7E57C2',
  dark: '#616161',
  steel: '#90A4AE',
  fairy: '#F48FB1',
};
