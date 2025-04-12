import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StateService } from '@uirouter/core';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';
import { LevelRoutes } from '../Routing/RouteNames';
import { GameOverDialogData } from './GameOverDialogData';
import { PopupContentComponent } from '../PopupContent/PopupContentComponent';
import { KrossrButtonComponent } from '../KrossrButton/KrossrButtonComponent';
import { UIRouterModule } from '@uirouter/angular';

@Component({
    selector: 'krossr-game-over',
    templateUrl: './GameOverView.html',
    imports: [PopupContentComponent, KrossrButtonComponent, UIRouterModule]
})
export class GameOverComponent extends KrossrDialogBase {
    constructor(
        protected matDialogRef: MatDialogRef<GameOverComponent>,
        @Inject(MAT_DIALOG_DATA) public data: GameOverDialogData,
        private stateService: StateService
    ) {
        super(matDialogRef);
    }

    newLevel() {
        this.close();
        this.stateService.go(LevelRoutes.list);
    }
}
