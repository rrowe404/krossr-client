import { Injectable } from '@angular/core';
import { TileSizeEventService } from './TileSizeEventService';

@Injectable({
    providedIn: 'root'
})
export class TileSizeService {
    private tileSize = 25;

    constructor(
        private tileSizeEventService: TileSizeEventService
    ) {
    }

    getTileSize() {
        return Math.floor(this.tileSize);
    }

    getTileSizePx() {
        return this.getTileSize()  + 'px';
    }

    setTileSize(gameWidth, widthInTiles) {
        this.tileSize = gameWidth / parseInt(widthInTiles, 10);
        this.tileSizeEventService.tileSizeChanged.emit(this.tileSize);
    }
}
