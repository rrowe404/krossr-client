import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TileEventService {
    public tileDragEnd: EventEmitter<void> = new EventEmitter();
}
