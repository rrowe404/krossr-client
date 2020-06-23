import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShiftService {
    static $name = 'shiftService';
    private _shiftLock = false;
    private _shiftOn = false;

    get shiftOn(): boolean {
        return this._shiftLock || this._shiftOn;
    }

    set shiftOn(value: boolean) {
        this._shiftOn = value;
    }

    set shiftLock(value: boolean) {
        this._shiftLock = value;
    }
}
