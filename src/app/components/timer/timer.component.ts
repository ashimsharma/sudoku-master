import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  secondsPassed: number = 0;
  minutesPassed: number = 0;

  get formattedTime(): string {
    return `${this.minutesPassed > 9 ? this.minutesPassed : `0${this.minutesPassed}`} : ${this.secondsPassed > 9 ? this.secondsPassed : `0${this.secondsPassed}`}`;
  }
}
