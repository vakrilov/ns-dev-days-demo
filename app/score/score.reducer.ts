import { ActionReducer, Action } from "@ngrx/store";
import { RESET_SCORE, FINISH } from "../actions";
interface PayloadAction extends Action {
  type: string;
  payload?: any;
}

export interface Score {
  xWins: number;
  oWins: number;
  draws: number;
}

const initialState = {
  xWins: 0,
  oWins: 0,
  draws: 0
};

export function scoreReducer(score: Score = initialState, action: PayloadAction): Score {
  if (action.type === FINISH) {
    switch (action.payload.winner) {
      case 0:
        return Object.assign({}, score, { draws: score.draws + 1 });
      case 1:
        return Object.assign({}, score, { xWins: score.xWins + 1 });
      case -1:
        return Object.assign({}, score, { oWins: score.oWins + 1 });
    }
  } else if (action.type === RESET_SCORE) {
    return initialState;
  }

  return score;
}