import { ActionReducer, Action } from "@ngrx/store";
import { RESET_SCORE, FINISH_GAME} from "../actions";

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

export const scoreReducer: ActionReducer<Score> =
  (score: Score = initialState, action: Action) => {

    if (action.type === FINISH_GAME) {
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