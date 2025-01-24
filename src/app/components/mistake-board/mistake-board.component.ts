import { Component } from '@angular/core';
import { SudokuService } from '../../shared/sudoku.service';

@Component({
  selector: 'app-mistake-board',
  imports: [],
  templateUrl: './mistake-board.component.html',
  styleUrl: './mistake-board.component.css'
})
export class MistakeBoardComponent {
  constructor(public sharedService: SudokuService){}
}
