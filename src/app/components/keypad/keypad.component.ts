import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SudokuService } from '../../shared/sudoku.service';

@Component({
  selector: 'app-keypad',
  imports: [NgFor],
  templateUrl: './keypad.component.html',
  styleUrl: './keypad.component.css'
})
export class KeypadComponent {
  constructor(private sharedService: SudokuService){}
  
  pressKey(pressedNum: number): void{
    this.sharedService.pressKey(pressedNum);
  }
}
