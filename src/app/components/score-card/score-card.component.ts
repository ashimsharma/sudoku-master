import { Component } from '@angular/core';

@Component({
  selector: 'app-score-card',
  imports: [],
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.css'
})
export class ScoreCardComponent {
  currentScore: number = 0;
  highScore: number = 0;

  ngOnInit(): void{

  }
}
