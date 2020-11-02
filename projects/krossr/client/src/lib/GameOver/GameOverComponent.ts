import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StateService } from '@uirouter/core';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';
import { LevelRoutes } from '../Routing/RouteNames';
import { GameOverDialogData } from './GameOverDialogData';

@Component({
    selector: 'krossr-game-over',
    templateUrl: './GameOverView.html'
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
