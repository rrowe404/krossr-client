import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { GameSizeService } from '../GameSize/GameSizeService';
import { SideLengthService } from '../SideLength/SideLengthService';
import { Injectable } from '@angular/core';
import { TileFillEventService } from '../Tile/TileFillEventService';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor(
        private gameSizeService: GameSizeService,
        private sideLengthService: SideLengthService,
        private tileFillEventService: TileFillEventService
    ) {
    }

    private gameMatrix: BooleanMatrix;
    private goalMatrix: BooleanMatrix;

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
    }

    /* Combine a lot of the other functions here to set up a new game */
    createNewGame(args: { controller: 'edit' | 'view' | 'new', layout: boolean[][] }) {
        let goalMatrix;

        if (args.layout) {
            this.setGoalMatrix(args.layout);
        }

        this.gameSizeService.calculatePlayableArea();
        this.createEmptyMatrix(args.layout.length);

        /* When editing the level, we'll prepopulate the game matrix (revealed tiles) with the goal matrix,
        then get rid of the goal matrix (since we don't want to be able to win while editing) */
        switch (args.controller) {
            case 'edit':
                goalMatrix = this.getGoalMatrix();

                if (goalMatrix) {
                    this.setGameMatrix(goalMatrix);
                }

                this.setGoalMatrix();
                break;
            case 'new':
                this.setGoalMatrix();
                break;
            default:
                break;
        }
    }

    /* Convert a Matrix into an array (for ng-repeat to hit all of them) */
    flatten(matrix) {
        return Array.prototype.concat.apply([], matrix);
    }

    /* Return the current game matrix */
    getGameMatrix(): BooleanMatrix {
        return this.gameMatrix;
    }

    /* Return the current goal matrix (matrix for game matrix to be compared to to determine a win) */
    getGoalMatrix() {
        return this.goalMatrix;
    }

    /* Modify the current goal matrix (loading level from layout) */
    setGoalMatrix(layout?) {
        if (layout) {
            this.goalMatrix = new BooleanMatrix(layout.length, layout.length);
            this.goalMatrix.initializeWith(layout);
        } else {
            this.goalMatrix = null;
        }
    }

    /* Modify the current game matrix, setting a new side length and game size as a side effect  (used for changing size) */
    setGameMatrix(gameMatrix: BooleanMatrix) {
        this.gameMatrix = gameMatrix;
        this.sideLengthService.sideLength = gameMatrix.length;
        this.gameSizeService.setGameSize(gameMatrix.length);
    }
}
