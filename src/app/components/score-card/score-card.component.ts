import { Component } from '@angular/core';
import { SudokuService } from '../../shared/sudoku.service';

@Component({
  selector: 'app-score-card',
  imports: [],
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.css'
})
export class ScoreCardComponent {
  constructor(public sharedService: SudokuService){}
}
