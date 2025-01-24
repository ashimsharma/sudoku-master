import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { KeypadComponent } from './components/keypad/keypad.component';
import { ButtonPalletComponent } from './components/button-pallet/button-pallet.component';
import { TimerComponent } from './components/timer/timer.component';
import { ScoreCardComponent } from './components/score-card/score-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoardComponent, KeypadComponent, ButtonPalletComponent, TimerComponent, ScoreCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sudoku';
  year = (new Date()).getFullYear()
}
