import {Component, OnDestroy} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import "rxjs/add/operator/map";
import {Store} from '@ngrx/store';

import {Score} from './score/score.reducer';
import {PLAY_O, PLAY_X, RESET, checkWinner} from './board/board.reducer';
import {UNDO, REDO, UndoableState} from './undoable.metareducer';

interface AppState {
    board: UndoableState<Array<number>>;
    score: Score;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnDestroy {
  board$: Observable<Array<number>>;
  score$: Observable<Score>;
  canUndo$: Observable<boolean>;
  canRedo$: Observable<boolean>;

  currentPlayer: boolean; // ture:X, false:O
  currentPlayerSubscription: Subscription;
  winner: number; // 1:X, -1:O
  winnerSubscription: Subscription;

  constructor(public store: Store<AppState>) {
    this.board$ = store.select(s => s.board.present);
    this.score$ = store.select(s => s.score);

    this.canUndo$ = store.select(s => s.board.past.length > 0);
    this.canRedo$ = store.select(s => s.board.future.length > 0);

    this.currentPlayerSubscription = this.board$
      .map(b => b.reduce((a, b) => a + b, 0) <= 0)
      .subscribe((val) => this.currentPlayer = val);

    this.winnerSubscription = this.board$
      .map(checkWinner)
      .subscribe((val) => this.winner = val);
  }

  ngOnDestroy() {
    this.currentPlayerSubscription.unsubscribe();
    this.winnerSubscription.unsubscribe();
  }

  positionSelected(payload: { row: number, col: number }, player: boolean) {
    if (this.winner) {
      return;
    }

    this.store.dispatch({
      type: player ? PLAY_X : PLAY_O,
      payload: payload
    });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
  undo() {
    this.store.dispatch({ type: UNDO });
  }
  redo() {
    this.store.dispatch({ type: REDO });
  }
}
