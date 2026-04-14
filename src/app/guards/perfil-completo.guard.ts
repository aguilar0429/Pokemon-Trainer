import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TrainerService } from '../services/trainer.service';

export const perfilCompletoGuard: CanActivateFn = (route, state) => {
  const trainer = inject(TrainerService);
  const router = inject(Router);
  if (!trainer.isProfileComplete) {
    router.navigate(['/profile']);
    return false;
  }
  return true;
};

export const equipoCompletoGuard: CanActivateFn = () => {
  const trainer = inject(TrainerService);
  const router = inject(Router);
  if (!trainer.isProfileComplete) {
    router.navigate(['/profile']);
    return false;
  }
  if (!trainer.isTeamComplete) {
    router.navigate(['/team']);
    return false;
  }
  return true;
};
