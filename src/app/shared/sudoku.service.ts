import { Injectable } from '@angular/core';
import sudoku from "sudoku";

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  initialGameState: (number | null)[] = [];
  game: (number | null)[] = [];
  solution: number[] = [];
  selectedRow: number = -1;
  selectedColumn: number = -1;
  selectedBlock: number = -1;
  selectedCell: number = -1;
  timerInterval: (ReturnType<typeof setInterval> | null) = null;
  secondsPassed: number = 0;
  minutesPassed: number = 0;
  currentScore: number = 0;

  constructor() {}

  loadBoard(): void {
    this.game = sudoku.makepuzzle();
    this.solution = sudoku.solvepuzzle(this.game);

    this.game = this.game.map((cell) => (cell !== null ? cell + 1 : null));
    this.solution = this.solution.map((cell) => cell + 1);

    this.initialGameState = [...this.game];
  }

  pressKey(pressedKey: number): void{
    if(this.selectedCell === -1 || this.initialGameState[this.selectedCell] !== null){
      return;
    }

    this.game[this.selectedCell] = pressedKey;
    if(!this.isOnWrongPosition(this.selectedCell, pressedKey)){
      this.currentScore += 5;
    }

    if(this.isBoardComplete()){
      alert("You Won!");
    }
  }

  isOnWrongPosition(i: number, valueAdded: (number | null)): boolean {
    return this.solution[i] !== valueAdded ? true : false;
  }

  isBoardComplete(): boolean{
    return JSON.stringify(this.game) === JSON.stringify(this.solution) ? true : false;
  }
}
