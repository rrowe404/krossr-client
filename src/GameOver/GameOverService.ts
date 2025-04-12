import { ILevel } from '../Level/Level';
import { Injectable } from '@angular/core';
import { GameOverComponent } from './GameOverComponent';
import { KrossrDialogService } from 'src/KrossrDialog/KrossrDialogService';

/** Open the Game Over popup */

@Injectable({
    providedIn: 'root'
})
export class GameOverService {
    constructor(
        private dialogService: KrossrDialogService
    ) {
    }

    openDialog(): void {
        this.dialogService.open(GameOverComponent, {
            disableClose: true
        });
    }
}
