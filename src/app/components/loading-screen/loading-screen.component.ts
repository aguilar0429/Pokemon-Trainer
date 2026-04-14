import { Component,Input } from '@angular/core';

//loading screen with gif
@Component({
  selector: 'app-loading-screen',
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent {
  @Input() visible = false;
  @Input() message = '';
}
