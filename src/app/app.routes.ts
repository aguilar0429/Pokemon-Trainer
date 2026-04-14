import { Routes } from '@angular/router';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { TeamComponent } from './pages/team/team.component';
import { perfilCompletoGuard, equipoCompletoGuard } from './guards/perfil-completo.guard';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'team', component: TeamComponent, canActivate: [perfilCompletoGuard] },
    { path: 'profile', component: ProfileFormComponent },
    { path: 'home', component: HomeComponent, canActivate: [equipoCompletoGuard] },
    { path: '**', redirectTo: 'profile' }
];
