import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShiftService {
    private _shiftOn = false;

    get shiftOn(): boolean {
        return this._shiftOn;
    }

    set shiftOn(value: boolean) {
        this._shiftOn = value;
    }
}
