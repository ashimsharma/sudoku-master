import { Component } from '@angular/core';
import sudoku from 'sudoku';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-game-board',
  imports: [NgFor, NgClass],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent {
  Math = Math;
  game: (Number | null)[];
  solution: Number[];
  selectedRow: Number = -1;
  selectedColumn: Number = -1;
  selectedBlock: Number = -1;

  constructor() {
    this.game = [];
    this.solution = [];
  }
  ngOnInit(): void {
    this.loadBoard();
  }

  loadBoard(): void {
    this.game = sudoku.makepuzzle();
    this.solution = sudoku.solvepuzzle(this.game);
  }

  selectRowAndColumn(i: number): void {
    const row = Math.floor(i / 9);
    const column = i % 9;
    const block = Math.floor(row / 3) * 3 + Math.floor(column / 3);

    this.selectedRow = row;      // Store the selected row
    this.selectedColumn = column; // Store the selected column
    this.selectedBlock = block;   // Store the selected block
  }

  generateCellId(i: number): string {
    const row = Math.floor(i / 9);
    const column = i % 9;
    const block = Math.floor(Math.floor(i / 9) / 3) * 3 + Math.floor(column / 3);
    return `${row}-${column}-${block}`;
  }

  selectCell(i: number): void {
    const row = Math.floor(i / 9);
    const column = i % 9;
    const block = Math.floor(row / 3) * 3 + Math.floor(column / 3);

    this.selectedRow = row;       // Store the selected row
    this.selectedColumn = column; // Store the selected column
    this.selectedBlock = block;   // Store the selected block
  }

  isRowSelected(i: number): boolean {
    const row = Math.floor(i / 9);
    return row === this.selectedRow;
  }

  isColumnSelected(i: number): boolean {
    const column = i % 9;
    return column === this.selectedColumn;
  }

  isTopEdge(i: number): boolean {
    const row = Math.floor(i / 9); // Zero-based row
    const col = i % 9; // Zero-based column
    return row % 3 === 0; // First row of the 3x3 block
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
      console.log(`Row: ${row}, Column: ${col}, Block: ${block}`);
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
    return block === this.selectedBlock;
  }
}
