import { Component } from '@angular/core';
import { SudokuService } from '../../shared/sudoku.service';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  constructor(private sharedService: SudokuService){}
  get formattedTime(): string {
    return `${this.sharedService.minutesPassed > 9 ? this.sharedService.minutesPassed : `0${this.sharedService.minutesPassed}`} : ${this.sharedService.secondsPassed > 9 ? this.sharedService.secondsPassed : `0${this.sharedService.secondsPassed}`}`;
  }

  ngOnInit(): void{
    this.sharedService.timerInterval = setInterval(() => {
      if(this.sharedService.secondsPassed === 59){
        this.sharedService.minutesPassed += 1;
        this.sharedService.secondsPassed = 0;
        return;
      }
      this.sharedService.secondsPassed += 1;
    }, 1000)
  }
}
