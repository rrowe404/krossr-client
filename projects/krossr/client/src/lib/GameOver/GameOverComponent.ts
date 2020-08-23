import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';

@Component({
    selector: 'krossr-game-over',
    templateUrl: './GameOverView.html'
})
export class GameOverComponent extends KrossrDialogBase {
    constructor(
        protected matDialogRef: MatDialogRef<GameOverComponent>,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: { levelId: number }
    ) {
        super(matDialogRef);
    }

    newLevel() {
        this.close();
        this.matDialog.open(LevelSelectComponent);
    }
}
