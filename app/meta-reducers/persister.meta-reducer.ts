import * as localStorage from "application-settings"

const KEY = "__APP_STATE";

function saveState(state: any) {
  localStorage.setString(KEY, JSON.stringify(state));
}

function loadState() {
  if (localStorage.hasKey(KEY)) {
    return JSON.parse(localStorage.getString(KEY));
  }
}

export const persister = (reducer, initialLoad: boolean) => {
  const loadedState = initialLoad ? loadState() : undefined;
  return function (state = loadedState, action: any) {
    const nextState = reducer(state, action);
    saveState(nextState);
    return nextState;
  };
};