import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { GameSizeService } from '../GameSize/GameSizeService';
import { Injectable } from '@angular/core';
import { TileFillEventService } from '../Tile/TileFillEventService';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor(
        private gameSizeService: GameSizeService,
        private tileFillEventService: TileFillEventService
    ) {
    }

    private gameMatrix: BooleanMatrix;

    /** Clear everything, to start a new game */
    clearAll() {
        let currentGameMatrix = this.getGameMatrix();

        this.tileFillEventService.clearAll();

        if (currentGameMatrix) {
            currentGameMatrix.clear();
        }
    }

    /* Given a number of tiles, create an empty square matrix with that number */
    createEmptyMatrix(sideLength: number) {
        const finalMatrix = new BooleanMatrix(sideLength, sideLength);
        this.setGameMatrix(finalMatrix);
        return this.getGameMatrix();
    }

    /* Combine a lot of the other functions here to set up a new game */
    createNewGame(args: { layout: boolean[][] }) {
        let goalMatrix: BooleanMatrix;
        let layout = args.layout;

        goalMatrix = new BooleanMatrix(layout.length, layout.length);
        goalMatrix.initializeWith(layout);

        this.gameSizeService.calculatePlayableArea();
        let gameMatrix = this.createEmptyMatrix(args.layout.length);

        return {
            gameMatrix,
            goalMatrix
        };
    }

    /* Return the current game matrix */
    getGameMatrix(): BooleanMatrix {
        return this.gameMatrix;
    }

    /* Modify the current game matrix, setting a new side length and game size as a side effect  (used for changing size) */
    setGameMatrix(gameMatrix: BooleanMatrix) {
        this.gameMatrix = gameMatrix;
        this.gameSizeService.setGameSize(gameMatrix.length);
    }
}
