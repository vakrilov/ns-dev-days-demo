import { ActionReducer, Action } from '@ngrx/store';
import { PLAY_O, PLAY_X, FINISH } from "../actions";
const initialState = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0];

interface PayloadAction extends Action {
  type: string;
  payload?: any;
}

export function boardReducer(state: Array<number> = initialState, action: PayloadAction): Array<number> {
  switch (action.type) {
    case PLAY_X:
      return setTile(state, action.payload, 1);
    case PLAY_O:
      return setTile(state, action.payload, -1);
    case FINISH:
      return initialState;
    default:
      return state;
  }
};

function setTile(board: Array<number>, pos: number, val: number): Array<number> {
  if (pos >= 9 || pos < 0) {
    throw new Error(`Invalid position ${pos}.`);
  }

  if (board[pos] !== 0) {
    throw new Error(`Position aready taken pos:${pos} current value:${board[pos]}.`);
  }

  return [
    ...board.slice(0, pos),
    val,
    ...board.slice(pos + 1, board.length)];
}

const winningPositions = [
  [0, 1, 2], // horizontals
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6], //verticals
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8], //diagonals
  [2, 4, 6]];

export function checkWinner(board: Array<number>): number {
  for (let winPos of winningPositions) {
    let res = winPos.reduce((sum, index) => sum + board[index], 0);

    if (res === 3 || res === -3) {
      return res / 3;
    }
  }
  return 0;
}