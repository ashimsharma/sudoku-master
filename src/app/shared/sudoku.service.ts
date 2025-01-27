import { Injectable } from '@angular/core';
import sudoku from 'sudoku';
import {getSudoku} from 'sudoku-gen';

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
    this.mistakes * this.baseScore) > 10 ? this.baseScore +
    (Math.floor(
      (this.baseScore * 10) / this.timeElapsedBetweenTwoCorrectEntries
    ) -
    this.mistakes * this.baseScore) : this.baseScore;

  message: string = '';
  isPositiveMessage: boolean = true;
  isShow: boolean = false;
  
  modalTitle: string = ``;
  modalContentScore: string = ``;
  modalContentTime: string = ``;
  modalVisible: boolean = false;

  constructor() {}

  loadBoard(): void {
    const sudokuGameObj = getSudoku('easy');

    this.game = sudokuGameObj.puzzle.split('').map(value => !isNaN(Number(value)) ? +value : null);

    this.solution = sudokuGameObj.solution.split('').map(value => +value);

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

    if (this.isAlreadyMarked()) {
      if(this.isOnWrongPosition(this.selectedCell, pressedKey)){
        this.updateMistakes();
      }
      return;
    };

    if (!this.isOnWrongPosition(this.selectedCell, pressedKey)) {
      this.updateTimeElapsed();
      this.updateScoreValue();
      this.updateTimeOfLastCorrectEntry();

      this.alreadyMarkedCells[this.selectedCell] = true;

      this.updateScore();
      this.generateScorePopUp();
    }
    else{
      this.updateMistakes();
    }

    if (this.isBoardComplete()) {
      this.showWonModal();
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
    if(this.mistakes === 5){
      this.showLoseModal()
    }
  }

  startNewGame(): void{
    this.modalVisible = false;
    this.getToInitialState();
    this.loadBoard();
  }

  showWonModal(): void{
    this.modalVisible = true;
    this.modalTitle = 'Congratulations!! You Won';
    this.modalContentScore = `Your Score : ${this.currentScore}`;
    this.modalContentTime = `Time Taken: ${this.minutesPassed} minutes ${this.secondsPassed} seconds`;
  }

  showLoseModal(): void{
    this.modalVisible = true;
    this.modalTitle = 'Oops! You Lose';
    this.modalContentScore = `Your Score : ${this.currentScore}`;
    this.modalContentTime = `Time Taken: ${this.minutesPassed} minutes ${this.secondsPassed} seconds`;
  }

  getToInitialState(): void{
    this.secondsPassed = 0;
    this.minutesPassed = 0;
    this.currentScore = 0;
    this.mistakes = 0;
    this.scoreValue = this.baseScore +
    (Math.floor(
      (this.baseScore * 10) / this.timeElapsedBetweenTwoCorrectEntries
    ) -
    this.mistakes * this.baseScore) > 0 ? this.baseScore +
    (Math.floor(
      (this.baseScore * 10) / this.timeElapsedBetweenTwoCorrectEntries
    ) -
    this.mistakes * this.baseScore) : this.baseScore;
  }
}
