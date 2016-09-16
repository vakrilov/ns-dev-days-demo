import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "tic-board",
  template: `
<wrap-layout itemWidth="50" itemHeight="50" width="150" height="150">
  <button class="tile"
    *ngFor="let val of board; let i = index" 
    [text]="val | player" 
    (tap)="!val && action.next(i)">
    </button>
</wrap-layout>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  @Input() board: Array<number>;
  @Output() action = new EventEmitter<number>();
}
