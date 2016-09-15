import {Component, OnDestroy} from "@angular/core";
import {Observable, Subscription, BehaviorSubject} from "rxjs";
import "rxjs/add/operator/map";
import {Store} from '@ngrx/store';

import {FINISH_GAME, PLAY_O, PLAY_X, UNDO, REDO} from "./actions";
import {Score} from './score/score.reducer';
import {checkWinner} from './board/board.reducer';
import {UndoableState} from './undoable.metareducer';

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
  winner: number; // 1:X, -1:O
  finished: boolean;

  subs: Array<Subscription> = [];

  constructor(public store: Store<AppState>) {
    this.board$ = store.select(s => s.board.present);
    this.score$ = store.select(s => s.score);

    this.canUndo$ = store.select(s => s.board.past.length > 0);
    this.canRedo$ = store.select(s => s.board.future.length > 0);

    this.subs.push(
      this.board$
        .map(b => b.reduce((a, b) => a + b, 0) <= 0)
        .subscribe((val) => this.currentPlayer = val));

    const winner$ = this.board$.map(checkWinner);
    const boardFull$ = this.board$.map(b => !b.some(v => v === 0));
    const finished$ = Observable.combineLatest(boardFull$, winner$, (full, winner) => {
      return full || winner !== 0;
    })

    this.subs.push(winner$.subscribe((val) => this.winner = val));
    this.subs.push(finished$.subscribe((val) => this.finished = val));
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

  undo() {
    this.store.dispatch({ type: UNDO });
  }

  redo() {
    this.store.dispatch({ type: REDO });
  }

  finishGame() {
    this.store.dispatch({ type: FINISH_GAME, payload: { winner: this.winner} });
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    this.subs = [];
  }
}
