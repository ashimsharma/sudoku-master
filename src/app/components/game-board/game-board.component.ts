import { Component } from '@angular/core';
import sudoku from 'sudoku';
import { NgFor, NgClass } from '@angular/common';
import { SudokuService } from '../../shared/sudoku.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-game-board',
  imports: [NgFor, NgClass, PopupComponent],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})

export class GameBoardComponent {
  Math = Math;
  sharedService: SudokuService;

  constructor(sharedService: SudokuService) {
    this.sharedService = sharedService;
  }

  ngOnInit(): void {
    this.sharedService.loadBoard();
    window.addEventListener('keydown', this.handleKeyPress.bind(this))
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event: KeyboardEvent): void {
    event.preventDefault();
    if(this.sharedService.selectedCell !== null && event.key === "Backspace"){
      this.removeDigit();
      return;
    }

    const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if(this.sharedService.selectedCell !== null && arrowKeys.includes(event.key)){
      this.shiftCell(event);
      return;
    }

    const digit = Number(event.key);

    if (this.sharedService.selectedCell !== null && digit >= 1 && digit <= 9) {
      this.addDigit(digit);
    }
  }

  addDigit(digit: number): void {
    if (this.sharedService.selectedCell !== null && this.sharedService.initialGameState[this.sharedService.selectedCell] === null) {
      this.sharedService.game[this.sharedService.selectedCell] = digit; 

      if(this.sharedService.isAlreadyMarked()) {
        if(this.sharedService.isOnWrongPosition(this.sharedService.selectedCell, digit)){
          this.sharedService.updateMistakes();
        }
        return;
      };

      if(!this.sharedService.isOnWrongPosition(this.sharedService.selectedCell, digit)){
        this.sharedService.updateTimeElapsed();
        this.sharedService.updateScoreValue();
        this.sharedService.updateTimeOfLastCorrectEntry();

        this.sharedService.alreadyMarkedCells[this.sharedService.selectedCell] = true;

        this.sharedService.updateScore();
        this.sharedService.generateScorePopUp();
      }
      else{
        this.sharedService.updateMistakes();
      }

      if(this.sharedService.isBoardComplete()){
        this.sharedService.appComponentFunctionSubject.next();
        this.sharedService.showWonModal();
      }
    }
  }

  removeDigit(): void{
    if(this.sharedService.initialGameState[this.sharedService.selectedCell] !== null) return;

    this.sharedService.game[this.sharedService.selectedCell] = null;
  }

  shiftCell(event: KeyboardEvent): void{
    if(event.key === "ArrowLeft"){
      if(this.sharedService.selectedCell === 0) return;
      this.selectCell(this.sharedService.selectedCell - 1);
    }
    else if(event.key === "ArrowRight"){
      if(this.sharedService.selectedCell === 80) return;
      this.selectCell(this.sharedService.selectedCell + 1);
    }
    else if(event.key === "ArrowUp"){
      if(this.sharedService.selectedCell <= 8) return;
      this.selectCell(this.sharedService.selectedCell - 9);
    }
    else{
      if(this.sharedService.selectedCell >= 71) return;
      this.selectCell(this.sharedService.selectedCell + 9);
    }
  }

  selectRowAndColumn(i: number): void {
    const row = Math.floor(i / 9);
    const column = i % 9;
    const block = Math.floor(row / 3) * 3 + Math.floor(column / 3);

    this.sharedService.selectedRow = row;     
    this.sharedService.selectedColumn = column; 
    this.sharedService.selectedBlock = block;   
  }

  generateCellId(i: number): string {
    const row = Math.floor(i / 9);
    const column = i % 9;
    const block = Math.floor(Math.floor(i / 9) / 3) * 3 + Math.floor(column / 3);
    return `${row}-${column}-${block}`;
  }

  hasSameValue(value: (number | null)): boolean{
    if(value === null) return false;
    return this.sharedService.game[this.sharedService.selectedCell] === value ? true : false;
  }

  selectCell(i: number): void {
    const row = Math.floor(i / 9);
    const column = i % 9;
    const block = Math.floor(row / 3) * 3 + Math.floor(column / 3);

    this.sharedService.selectedCell = i;
    this.sharedService.selectedRow = row;       
    this.sharedService.selectedColumn = column; 
    this.sharedService.selectedBlock = block;
  }

  isRowSelected(i: number): boolean {
    const row = Math.floor(i / 9);
    return row === this.sharedService.selectedRow;
  }

  isColumnSelected(i: number): boolean {
    const column = i % 9;
    return column === this.sharedService.selectedColumn;
  }

  isTopEdge(i: number): boolean {
    const row = Math.floor(i / 9); 
    const col = i % 9; 
    return row % 3 === 0; 
  }

  // Function to check if the current cell is at the left edge of a 3x3 block
  isLeftEdge(i: number): boolean {
    const row = Math.floor(i / 9); // Zero-based row
    const col = i % 9; // Zero-based column
    return col % 3 === 0; // First column of the 3x3 block
  }

  // Function to check if the current cell is at the bottom edge of a 3x3 block
  isBottomEdge(i: number): boolean {
    const row = Math.floor(i / 9); // Zero-based row
    const col = i % 9; // Zero-based column
    const block = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    if([0, 3, 1, 4, 2, 5].includes(block)){
      return false;
    }
    return row % 3 === 2; // Last row of the 3x3 block
  }

  // Function to check if the current cell is at the right edge of a 3x3 block
  isRightEdge(i: number): boolean {
    const row = Math.floor(i / 9); // Zero-based row
    const col = i % 9; // Zero-based column
    const block = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    if([0, 1, 3, 4, 6, 7].includes(block)){
      return false;
    }

    return col % 3 === 2; // Last column of the 3x3 block
  }

  isBlockSelected(i: number): boolean {
    const row = Math.floor(i / 9);
    const column = i % 9;
    const block = Math.floor(row / 3) * 3 + Math.floor(column / 3);
    return block === this.sharedService.selectedBlock;
  }

  isTyped(i: number): boolean{
    return this.sharedService.initialGameState[i] === null ? true : false;
  }

  wrongCellReason(i: number): boolean{
    const row = Math.floor(i / 9);
    const column = i % 9;
    const block = Math.floor(Math.floor(i / 9) / 3) * 3 + Math.floor(column / 3);

    const selectedCellRow = Math.floor(this.sharedService.selectedCell / 9);
    const selectedCellColumn = this.sharedService.selectedCell % 9;
    const selectedCellBlock = Math.floor(Math.floor(this.sharedService.selectedCell / 9) / 3) * 3 + Math.floor(selectedCellColumn / 3);

    if((row === selectedCellRow) || (column === selectedCellColumn) || (block === selectedCellBlock)){
      return true;
    }

    return false;
  }
}
