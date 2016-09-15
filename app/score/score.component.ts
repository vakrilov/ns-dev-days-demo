import { Component, Input } from '@angular/core';
import { Score } from './score.reducer';

@Component({
  selector: 'tic-score',
  template: `
<GridLayout rows="auto auto" columns="auto auto auto">
    <Label col="0" class="score-header" text="PALYER(X)"></Label>
    <Label col="1" class="score-header" text="TIES"></Label>
    <Label col="2" class="score-header" text="PLAYER(O)"></Label>

    <Label row="1" col="0" [text]="score.xWins" class="score"></Label>
    <Label row="1" col="1" [text]="score.draws" class="score"></Label>
    <Label row="1" col="2" [text]="score.oWins" class="score"></Label>
</GridLayout>
  `
})
export class ScoreComponent {
  @Input() score: Score;
  
}
