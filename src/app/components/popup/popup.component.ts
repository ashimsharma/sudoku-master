import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { SudokuService } from '../../shared/sudoku.service';

@Component({
  selector: 'app-popup',
  imports: [NgClass],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(public sharedService: SudokuService){}
}
