import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss']
})
export class StatBarComponent {
  @Input() label = '';
  @Input() value = 0;
  @Input() max = 100;
  @Input() color = '#4CAF50';

  get percentage(): number {
    if (!this.max || this.max <= 0) {
      return 0;
    }

    const percent = (this.value / this.max) * 100;
    return Math.min(Math.max(Number(percent.toFixed(2)), 0), 100);
  }
}
