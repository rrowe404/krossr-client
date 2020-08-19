import { NgModule } from '@angular/core';
import { GameOverComponent } from './GameOverComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { UIRouterModule } from '@uirouter/angular';
import { PopupContentModule } from '../PopupContent/PopupContentModule';

@NgModule({
    imports: [
        KrossrButtonModule,
        UIRouterModule.forChild(),
        PopupContentModule
    ],
    declarations: [
        GameOverComponent
    ],
    entryComponents: [
        GameOverComponent
    ],
    exports: [
        GameOverComponent
    ]
})
export class GameOverModule {
}