import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LevelEditorFormClearEventService {
    public formClearEvent: EventEmitter<void> = new EventEmitter();
}
