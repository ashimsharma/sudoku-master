import { Component } from '@angular/core';
import { SudokuService } from '../../shared/sudoku.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(public sharedService: SudokuService){}
}
