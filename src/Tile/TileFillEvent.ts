import { Point } from '../Point/Point';
import { TileComponent } from './TileComponent';
import { TileState } from './TileState';

export interface TileFillEvent {
    coords?: Point[];
    initState: boolean;
    override: TileState;
    validate?: (tile: TileComponent) => boolean;
}
