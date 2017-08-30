// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";

// NGRX store
import { StoreModule, combineReducers } from '@ngrx/store';

// Reducers
import { scoreReducer } from './score/score.reducer';
import { boardReducer } from './board/board.reducer';
import { logger, undoable, persister } from './meta-reducers';

// Components
import { AppComponent } from "./app.component";
import { ScoreComponent } from './score/score.component';
import { BoardComponent } from './board/board.component';
import { PlayerPipe } from './board/player.pipe';

// NGRX devtools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";


let rootReducer = {
  board: undoable(boardReducer),
  score: scoreReducer
};
// rootReducer = persister(rootReducer, true);

@NgModule({
  declarations: [AppComponent, BoardComponent, PlayerPipe, ScoreComponent],
  imports: [
    NativeScriptModule,
    NativeScriptDevToolsMonitors,
    StoreModule.forRoot({
      board: undoable(boardReducer),
      score: scoreReducer
    }, logger),
    StoreDevtoolsModule.instrument()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
