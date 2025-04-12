import { NgModule } from '@angular/core';
import { GameOverComponent } from './GameOverComponent';
import { UIRouterModule } from '@uirouter/angular';



@NgModule({
    imports: [
    UIRouterModule.forChild(),
    GameOverComponent
],
    exports: [
        GameOverComponent
    ]
})
export class GameOverModule {
}
