/// <reference path="../../typings/index.d.ts" />
import { assert } from "chai";
import { scoreReducer, Score } from './score.reducer';
import { RESET_SCORE, FINISH } from "../actions";

describe('CoutnerReducer', () => {
  describe('RESET_SCORE', () => {
    it('RESET_SCORE should reset the score', () => {
      const oldState: Score = { xWins: 5, oWins: 3, draws: 10 };
      const newState: Score = { xWins: 0, oWins: 0, draws: 0 };
      assert.deepEqual(newState, scoreReducer(oldState, { type: RESET_SCORE }));
    });
  });

  describe('FINISH', () => {
    it('X wins should increase X score', () => {
      const oldState: Score = { xWins: 10, oWins: 10, draws: 10 };
      const newState: Score = { xWins: 11, oWins: 10, draws: 10 };
      assert.deepEqual(newState, scoreReducer(oldState, { type: FINISH, payload: { winner: 1 } }));
    });
    it('O wins should increase O score', () => {
      const oldState: Score = { xWins: 10, oWins: 10, draws: 10 };
      const newState: Score = { xWins: 10, oWins: 11, draws: 10 };
      assert.deepEqual(newState, scoreReducer(oldState, { type: FINISH, payload: { winner: -1 } }));
    });
    it('Draw should increase draws', () => {
      const oldState: Score = { xWins: 10, oWins: 10, draws: 10 };
      const newState: Score = { xWins: 10, oWins: 10, draws: 11 };
      assert.deepEqual(newState, scoreReducer(oldState, { type: FINISH, payload: { winner: 0 } }));
    });
  });
});