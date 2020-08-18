import { Point } from '../Point/Point';
import { TileState } from './TileState';
import { Injectable } from '@angular/core';
import { TileComponent } from './TileComponent';
import { PointService } from '../Point/PointService';

/**
 * Keeps a cache of the tiles on the screen for faster access (smooth animation for dragging & selecting),
 * as well as methods for accessing it
 */

@Injectable({
    providedIn: 'root'
})
export class TileService {
    private tileIndex: Array<{ tile: TileComponent }> = [];

    constructor(
        private pointService: PointService
    ) {
    }

    /** Append the current tile index */
    addTile(obj): void {
        this.tileIndex.push(obj);
    }

    /** Make sure the index is clean before we add to it, to avoid bugs with switching between screens */
    clearTileIndex(): void {
        this.tileIndex = [];
    }

    /** Empty out all of the tiles, but keep them on-screen */
    eraseTiles(): void {
        let len = this.tileIndex.length;

        for (let i = 0; i < len; i++) {
            this.tileIndex[i].tile.fill(TileState.empty);
        }
    }

     /**
      * Fill all of the tiles in the specified coordinate array
      * @params {Array} array of coordinate objects
      * @params {function} a function to run on each tile controller before changing it to determine whether or not to change.
      * must be defined in TileController
      */
    fillTiles(coords: Point[], initState, override, validationFn?: (tile: TileComponent) => boolean) {
        let len = coords.length;

        for (let i = 0; i < len; i++) {
            let currentCoord = coords[i];
            let currentTileController = this.findTileCtrlByCoord(currentCoord);

            if (!validationFn || validationFn(currentTileController)) {
                currentTileController.change(currentCoord, initState, override);
            }
        }
    }

    /** Grab a tile controller out of the tile index from a given 2D coordinate */
    findTileCtrlByCoord(coord: Point): TileComponent {
        let index = this.pointService.pointToIndex(coord);
        return this.findTileCtrlByIndex(index);
    }

    /** Grab a tile controller out of the tile index from a given 1D index */
    findTileCtrlByIndex(index: number): TileComponent {
        return this.tileIndex[index].tile;
    }
}
