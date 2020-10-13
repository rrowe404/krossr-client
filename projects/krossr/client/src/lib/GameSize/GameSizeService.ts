import { TileSizeService } from '../TileSize/TileSizeService';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameSizeService {
    private playableAreaSize: number;

    constructor(
        private tileSizeService: TileSizeService
    ) {
    }

     /* Take a given game width and subtract border widths. I either have to do this
        or remove border-box and add them instead... doesn't really matter */
    private adjustForBorders(width, sideLength: number) {
        let borderWidth = 1;

        /* 18 is a bit of a magic number, I worked backwards from determining how much extra space
            the game had based on sideLength */
        return width - ((borderWidth * sideLength) + (18 - sideLength));
    }


    /** Return the width of the main section of the game so we can calculate game and tile sizes off of it */
    calculatePlayableArea() {
        let pHeight = window.innerHeight;
        let pWidth = window.innerWidth;

        this.playableAreaSize = Math.min(pHeight, pWidth);

        return Math.floor(this.playableAreaSize);
    }

     /* Modify the current game size. */
    setGameSize(widthInTiles) {
        let finalWidth = Math.floor(this.playableAreaSize / 1.6);
        let finalHeight;

        finalWidth = this.adjustForBorders(finalWidth, widthInTiles);

        finalHeight = finalWidth;
        let width = finalWidth + 'px';
        let height = finalHeight + 'px';

        this.tileSizeService.setTileSize(finalWidth, widthInTiles);

        return {
            height,
            width
        };
    }
}
