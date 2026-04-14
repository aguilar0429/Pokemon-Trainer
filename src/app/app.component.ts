import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatIconModule],
  standalone: true,
  template: `
   <router-outlet></router-outlet>
  `,
  styles:[':host { display: block; }'],
})
export class AppComponent {

}
