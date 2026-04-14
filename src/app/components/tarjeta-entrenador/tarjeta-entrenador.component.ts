import { Component,Input } from '@angular/core';
import { TrainerProfile } from '../../models/trainer.model';
import { TrainerService } from '../../services/trainer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-entrenador',
  imports: [CommonModule],
  templateUrl: './tarjeta-entrenador.component.html',
  styleUrl: './tarjeta-entrenador.component.scss'
})
export class TarjetaEntrenadorComponent {
  @Input() profile: TrainerProfile | null = null;
  @Input() showBadge = false;
  @Input() showInfo = true;
  @Input() showNameTop = false;

  constructor(private trainerService: TrainerService) {}

  get age(): number {
    return this.trainerService.getEdad(this.profile?.cumple);
  }
}
