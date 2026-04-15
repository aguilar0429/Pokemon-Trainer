import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-bar.component.html',
  styleUrl: './stat-bar.component.scss'
})
export class StatBarComponent {
  @Input() label = '';
  @Input() value = 0;
  @Input() max = 100;
  @Input() color = '#4CAF50';

  get percentage(): number {
    return Math.min((this.value / this.max) * 100, 100);
  }
}
