import { Point } from '../Point/Point';
import { Injectable } from '@angular/core';
import { Position } from '../Position/Position';

@Injectable({
    providedIn: 'root'
})
export class TileBorderService {
    /**
     * @param coord The coordinate of the Point
     * @param length The length of a side of a square game area
     * @returns A css string for border property, or not
     */
    getBorder(direction: Position, coord: Point, length: number) {
        let canColor;

        // no borders through puzzle for small puzzles
        if (length <= 5) {
            return;
        }

        switch (direction) {
            case 'left':
                canColor = this.testTileForBorder(length, coord.x);
                break;
            case 'right':
                canColor = this.testTileForBorder(length, coord.x + 1);
                break;
            case 'bottom':
                canColor = this.testTileForBorder(length, coord.y + 1);
                break;
            case 'top':
                canColor = this.testTileForBorder(length, coord.y);
                break;
            default:
                break;
        }

        if (canColor) {
            return '1px solid #222';
        }
    }

    /** We want to add colored borders to every 5th tile, unless it is at the beginning or end of a column or row */
    private testTileForBorder(sideLength, index) {
        return (index % 5 === 0
            && index % sideLength !== 0);
    }
}
