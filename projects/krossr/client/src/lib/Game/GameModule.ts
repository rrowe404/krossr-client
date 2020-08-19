import { NgModule } from '@angular/core';
import { GameComponent } from './GameComponent';

@NgModule({
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
