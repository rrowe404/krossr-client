import { Point } from './Point';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PointService {
    /** Convert an index into a 2D coordinate */
    indexToPoint(index: number, sideLength: number): Point {
        let x = index % sideLength;
        let y = (index - x) / sideLength;

        let coord = {
            y,
            x
        };

        return coord;
    }
}
