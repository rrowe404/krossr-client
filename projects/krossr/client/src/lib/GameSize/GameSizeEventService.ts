import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameSizeEventService {
    public gameSizeChanged: EventEmitter<void> = new EventEmitter();
}
