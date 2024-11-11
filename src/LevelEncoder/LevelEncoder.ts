import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class LevelEncoder {
    encodeLayout(layout: boolean[][]): string {
        let converted = Array.prototype.concat.apply([], layout) // flatten
            .map((value: boolean) => value ? '1' : '0')
            .join('');

        return btoa(converted);
    }
}