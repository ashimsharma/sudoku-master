import { Injectable } from '@angular/core';
import sudoku from 'sudoku';

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
  alreadyMarkedCells: boolean[] = Array(81).fill(false);

  timerInterval: ReturnType<typeof setInterval> | null = null;
  secondsPassed: number = 0;
  minutesPassed: number = 0;
  timeElapsedBetweenTwoCorrectEntries: number = 0;
  timeOfLastCorrectEntry: number = 0;

  mistakes: number = 0;

  baseScore: number = 10;
  currentScore: number = 0;
  scoreValue: number =
    this.baseScore +
    (Math.floor(
      (this.baseScore * 10) / this.timeElapsedBetweenTwoCorrectEntries
    ) -
    this.mistakes * this.baseScore) > 0 ? this.baseScore +
    (Math.floor(
      (this.baseScore * 10) / this.timeElapsedBetweenTwoCorrectEntries
    ) -
    this.mistakes * this.baseScore) : this.baseScore;

  message: string = '';
  isPositiveMessage: boolean = true;
  isShow: boolean = false;

  constructor() {}

  loadBoard(): void {
    this.game = sudoku.makepuzzle();
    this.solution = sudoku.solvepuzzle(this.game);

    this.game = this.game.map((cell) => (cell !== null ? cell + 1 : null));
    this.solution = this.solution.map((cell) => cell + 1);

    this.initialGameState = [...this.game];
  }

  pressKey(pressedKey: number): void {
    if (
      this.selectedCell === -1 ||
      this.initialGameState[this.selectedCell] !== null
    ) {
      return;
    }

    this.game[this.selectedCell] = pressedKey;

    if (this.isAlreadyMarked()) return;

    if (!this.isOnWrongPosition(this.selectedCell, pressedKey)) {
      this.updateTimeElapsed();
      this.updateScoreValue();
      this.updateTimeOfLastCorrectEntry();

      this.alreadyMarkedCells[this.selectedCell] = true;

      this.updateScore();
      this.generateScorePopUp();
    }

    if (this.isBoardComplete()) {
      alert('You Won!');
    }
  }

  isOnWrongPosition(i: number, valueAdded: number | null): boolean {
    return this.solution[i] !== valueAdded ? true : false;
  }

  isBoardComplete(): boolean {
    return JSON.stringify(this.game) === JSON.stringify(this.solution)
      ? true
      : false;
  }

  generateScorePopUp(): void {
    this.message = `+ ${this.scoreValue}`;
    this.isShow = true;

    setTimeout(() => {
      this.message = '';
      this.isShow = false;
    }, 2000);
  }

  isAlreadyMarked(): boolean {
    return this.alreadyMarkedCells[this.selectedCell];
  }

  updateScore(): void {
    this.currentScore += this.scoreValue;
  }

  updateTimeOfLastCorrectEntry(): void {
    this.timeOfLastCorrectEntry = this.minutesPassed * 60 + this.secondsPassed;
  }

  updateTimeElapsed(): void {
    this.timeElapsedBetweenTwoCorrectEntries =
      this.minutesPassed * 60 +
      this.secondsPassed -
      this.timeOfLastCorrectEntry;
  }

  updateScoreValue(): void {
    this.scoreValue =
    this.baseScore +
    (Math.floor(
      (this.baseScore * 10) / this.timeElapsedBetweenTwoCorrectEntries
    ) -
    this.mistakes * this.baseScore) > 0 ? this.baseScore +
    (Math.floor(
      (this.baseScore * 10) / this.timeElapsedBetweenTwoCorrectEntries
    ) -
    this.mistakes * this.baseScore) : this.baseScore;
  }

  updateMistakes(): void{
    this.mistakes += 1;
  }
}
