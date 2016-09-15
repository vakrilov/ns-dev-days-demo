// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { NativeScriptModule, platformNativeScriptDynamic } from "nativescript-angular/platform";
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';

import { AppComponent } from "./app.component";
import { logger } from './logger.metareducer';
import { undoable } from './undoable.metareducer';

import { scoreReducer } from './score/score.reducer';
import { ScoreComponent } from './score/score.component';

import { boardReducer } from './board/board.reducer';
import { BoardComponent } from './board/board.component';
import { PlayerPipe } from './board/player.pipe';


const reducers = {
  board: logger(undoable(boardReducer)),
  score: logger(scoreReducer)
};

@NgModule({
  declarations: [AppComponent, BoardComponent, PlayerPipe, ScoreComponent],
  imports: [
    NativeScriptModule,
    NativeScriptDevToolsMonitors,
    StoreModule.provideStore(reducers),
    StoreDevtoolsModule.instrumentStore()
  ],
  bootstrap: [AppComponent]
})
class AppModule { };

platformNativeScriptDynamic().bootstrapModule(AppModule);