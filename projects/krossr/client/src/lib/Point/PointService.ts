import { Point } from './Point';
import { Injectable } from '@angular/core';
import { SideLengthService } from '../SideLength/SideLengthService';

@Injectable({
    providedIn: 'root'
})
export class PointService {
    constructor(
        private sideLengthService: SideLengthService
    ) {
    }

    /** Convert an index into a 2D coordinate */
    indexToPoint(index: number): Point {
        let x = index % this.sideLengthService.sideLength;
        let y = (index - x) / this.sideLengthService.sideLength;

        let coord = {
            y,
            x
        };

        return coord;
    }

    pointToIndex(point: Point): number {
        return (point.y * this.sideLengthService.sideLength) + point.x;
    }
}
