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
  timerInterval: (ReturnType<typeof setInterval> | null) = null;

  get formattedTime(): string {
    return `${this.minutesPassed > 9 ? this.minutesPassed : `0${this.minutesPassed}`} : ${this.secondsPassed > 9 ? this.secondsPassed : `0${this.secondsPassed}`}`;
  }

  ngOnInit(): void{
    this.timerInterval = setInterval(() => {
      if(this.secondsPassed === 59){
        this.minutesPassed += 1;
        this.secondsPassed = 0;
        return;
      }
      this.secondsPassed += 1;
    }, 1000)
  }
}
