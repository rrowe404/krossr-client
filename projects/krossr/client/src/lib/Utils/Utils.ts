import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { GameSizeService } from '../GameSize/GameSizeService';
import { Injectable } from '@angular/core';
import { TileFillEventService } from '../Tile/TileFillEventService';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor(
        private gameSizeService: GameSizeService
    ) {
    }

    /* Combine a lot of the other functions here to set up a new game */
    createNewGame(args: { layout: boolean[][] }) {
        let goalMatrix: BooleanMatrix;
        let layout = args.layout;

        goalMatrix = new BooleanMatrix(layout.length, layout.length);
        goalMatrix.initializeWith(layout);

        this.gameSizeService.calculatePlayableArea();
        let gameMatrix = new BooleanMatrix(layout.length, layout.length);
        this.gameSizeService.setGameSize(gameMatrix.length);

        return {
            gameMatrix,
            goalMatrix
        };
    }
}
