import { Component, ElementRef, Renderer2 } from '@angular/core';
import confetti from 'canvas-confetti';

import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { KeypadComponent } from './components/keypad/keypad.component';
import { ButtonPalletComponent } from './components/button-pallet/button-pallet.component';
import { TimerComponent } from './components/timer/timer.component';
import { ScoreCardComponent } from './components/score-card/score-card.component';
import { MistakeBoardComponent } from './components/mistake-board/mistake-board.component';
import { ModalComponent } from './components/modal/modal.component';
import { SudokuService } from './shared/sudoku.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoardComponent, KeypadComponent, ButtonPalletComponent, TimerComponent, ScoreCardComponent, MistakeBoardComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private subscription!: Subscription;
  year = (new Date()).getFullYear();
  title = "Sudoku";
  
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    public sharedService: SudokuService
  ) {
  }

  ngOnInit(): void{
    this.subscription = this.sharedService.appComponentFunction$.pipe(skip(1)).subscribe(() => {
      this.showConfetti();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public showConfetti(): void {
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(document.body, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true
    });

    myConfetti({
      particleCount: 600,
      spread: 720,
    })?.then(() => {
      this.renderer2.removeChild(document.body, canvas);
    });
  }
}
