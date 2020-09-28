import { EventEmitter, Injectable } from '@angular/core';
import { Point } from '../Point/Point';
import { TileFillEvent } from './TileFillEvent';
import { TileState } from './TileState';

@Injectable({
    providedIn: 'root'
})
export class TileFillEventService {
    public fill: EventEmitter<TileFillEvent> = new EventEmitter();

    public clearAll() {
        let tileFillEvent: TileFillEvent = {
            initState: true,
            override: TileState.empty
        };

        this.fill.emit(tileFillEvent);
    }

    public clearPending(coords: Point[]) {
        let tileFillEvent: TileFillEvent = {
            coords,
            initState: true,
            override: TileState.empty,
            validate: (tile) => tile.isPendingAndNotSelected()
        };

        this.fill.emit(tileFillEvent);
    }

    public fillPending(coords: Point[]) {
        let tileFillEvent: TileFillEvent = {
            coords,
            initState: true,
            override: TileState.pending,
            validate: (tile) => tile.isNotPending()
        };

        this.fill.emit(tileFillEvent);
    }
}
