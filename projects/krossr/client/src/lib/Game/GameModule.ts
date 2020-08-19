import { NgModule } from '@angular/core';
import { GameComponent } from './GameComponent';
import { CommonModule } from '@angular/common';
import { TileModule } from '../Tile/TileModule';
import { GameOverModule } from '../GameOver/GameOverModule';

@NgModule({
    imports: [
        CommonModule,
        GameOverModule,
        TileModule
    ],
    declarations: [
        GameComponent
    ],
    entryComponents: [
        GameComponent
    ],
    exports: [
        GameComponent
    ]
})
export class GameModule {
}
