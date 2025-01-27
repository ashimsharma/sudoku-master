import { Component } from '@angular/core';
import { SudokuService } from '../../shared/sudoku.service';

@Component({
  selector: 'app-button-pallet',
  imports: [],
  templateUrl: './button-pallet.component.html',
  styleUrl: './button-pallet.component.css'
})
export class ButtonPalletComponent {
  gamePaused: boolean = false;
  constructor(private sharedService: SudokuService){}

  eraseCell(): void{
    if(this.sharedService.initialGameState[this.sharedService.selectedCell] !== null) return;
    
    this.sharedService.game[this.sharedService.selectedCell] = null;
  }

  clearBoard(): void{
    this.sharedService.game = [...this.sharedService.initialGameState];
    this.sharedService.secondsPassed = 0;
    this.sharedService.minutesPassed = 0;
    this.sharedService.currentScore = 0;
    this.sharedService.mistakes = 0;
  }

  regenerateBoard(): void{
    this.sharedService.loadBoard();
    this.restartGame();
  }

  pauseGame(): void{
    if(this.sharedService.timerInterval === null) return;

    clearInterval((this.sharedService.timerInterval as ReturnType<typeof setInterval>));
    this.sharedService.timerInterval = null;
    this.gamePaused = true;
  }

  resumeGame(): void{
    this.sharedService.timerInterval = setInterval(() => {
      if(this.sharedService.secondsPassed === 59){
        this.sharedService.minutesPassed += 1;
        this.sharedService.secondsPassed = 0;
        return;
      }
      this.sharedService.secondsPassed += 1;
    }, 1000);
    
    this.gamePaused = false;
  }

  restartGame(): void{
    this.clearBoard();
    if(this.gamePaused){
      this.resumeGame();
    }
  }
}
