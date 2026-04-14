import { Routes } from '@angular/router';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { TeamComponent } from './pages/team/team.component';
import { perfilCompletoGuard, equipoCompletoGuard } from './guards/perfil-completo.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'team', component: TeamComponent, canActivate: [perfilCompletoGuard] },
    { path: 'profile', component: ProfileFormComponent },
    { path: '**', redirectTo: 'profile' }
];
