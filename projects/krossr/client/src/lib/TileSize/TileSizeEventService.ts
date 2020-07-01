import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TileSizeEventService {
    public tileSizeChanged: EventEmitter<number> = new EventEmitter();
}
