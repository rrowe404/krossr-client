import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModeService {
    private _select = true;

    get selectMode(): boolean {
        return this._select;
    }

    set selectMode(value: boolean) {
        this._select = value;
    }
}
