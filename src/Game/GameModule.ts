import { NgModule } from '@angular/core';
import { GameComponent } from './GameComponent';
import { CommonModule } from '@angular/common';

import { GameOverModule } from '../GameOver/GameOverModule';

@NgModule({
    imports: [
    CommonModule,
    GameOverModule,
    GameComponent
],
    exports: [
        GameComponent
    ]
})
export class GameModule {
}
