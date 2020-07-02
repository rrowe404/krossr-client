import { Point } from '../Point/Point';

export interface TileGroupEntry {
    coord: Point;
    currentValue: boolean;
    goalValue: boolean;
}
