import { Component, EventEmitter, Input, Output } from "@angular/core";

interface AppState {
  board: Array<number>;
}

@Component({
  selector: "tic-board",
  template: `
<wrap-layout itemWidth="50" itemHeight="50" width="150" height="150">
  <button 
    *ngFor="let val of data; let i = index" 
    [text]="val | player" 
    (tap)="positionTap(i, val)"
    class="tile"></button>
</wrap-layout>`
})
export class BoardComponent {
  @Input() data: Array<number>;
  @Output() action = new EventEmitter<{ row: number, col: number }>();

  positionTap(pos: number, val: number) {
    if (val === 0) {
      const col = pos % 3;
      const row = (pos - col) / 3;

      this.action.next({ row, col });
    }
  }
}
