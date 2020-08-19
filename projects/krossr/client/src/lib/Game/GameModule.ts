import { NgModule } from '@angular/core';
import { GameComponent } from './GameComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
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
