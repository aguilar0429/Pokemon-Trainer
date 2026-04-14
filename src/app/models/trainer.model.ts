// Trainer profile data model
export interface TrainerProfile {
  nombre: string;
  hobby: string;
  cumple: string;
  documento: string;
  tipoDocumento: 'DUI' | 'Carnet de Minoridad';
  fotoUrl: string;
  fotoNombre: string;
}
