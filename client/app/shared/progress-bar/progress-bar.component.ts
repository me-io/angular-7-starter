import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],

})

export class ProgressBarComponent {
  @Input() curr = 0;
  @Input() len = 100;
  @Input() h = 15;
}
