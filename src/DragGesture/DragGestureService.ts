import { Injectable } from '@angular/core';
import { DragBoxService } from '../DragBox/DragBoxService';
import { Point } from '../Point/Point';
import { TileFillEventService } from '../Tile/TileFillEventService';
import { TileEventService } from '../Tile/TileEventService';

@Injectable({
    providedIn: 'root'
})
export class DragGestureService {
    constructor(
        private dragBoxService: DragBoxService,
        private tileFillEventService: TileFillEventService,
        private tileEventService: TileEventService
    ) {
    }

    beginDrag(coordinate: Point, initState: boolean) {
        this.dragBoxService.startCoord = coordinate;
        this.dragBoxService.initState = initState;
    }

    continueDrag(coordinate: Point) {
        if (!this.dragBoxService.validateStart()) {
            return;
        }

        // save a snapshot of the previous dragbox for comparison purposes
        let oldCoords = this.dragBoxService.process();

        // set the current coordinate to the new dragbox end and compute the new dragbox
        this.dragBoxService.endCoord = coordinate;

        let allPendingCoords = this.dragBoxService.process();

        this.shrinkPendingArea(oldCoords, allPendingCoords);

        this.tileFillEventService.fillPending(allPendingCoords);
    }

    endDrag(coordinate: Point) {
        this.dragBoxService.endCoord = coordinate;
        this.tileEventService.tileDragEnd.emit();
    }

    private shrinkPendingArea(previous: Point[], current: Point[]) {
        // we should only clear the old coordinates off if the current selected area is
        // smaller than the previous selected area, for speed reasons
        let needsShrinkage = previous && current && current.length < previous.length;

        if (needsShrinkage) {
            let coordsToClear: Point[];
            // more speed -- only clear the values that are present in
            // oldCoords but not allPendingCoords
            coordsToClear = previous.filter((e) => !current.includes(e));

            this.tileFillEventService.clearPending(coordsToClear);
        }
    }
}
