import { Injectable } from '@angular/core';
import { DragBoxService } from '../DragBox/DragBoxService';
import { Point } from '../Point/Point';

@Injectable({
    providedIn: 'root'
})
export class DragGestureService {
    constructor(
        private dragBoxService: DragBoxService
    ) {
    }

    beginDrag(coordinate: Point, initState: boolean) {
        this.dragBoxService.startCoord = coordinate;
        this.dragBoxService.initState = initState;
    }
}
