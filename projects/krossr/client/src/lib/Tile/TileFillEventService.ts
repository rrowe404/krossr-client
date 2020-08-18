import { EventEmitter, Injectable } from '@angular/core';
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
        }

        this.fill.emit(tileFillEvent);
    }
}
