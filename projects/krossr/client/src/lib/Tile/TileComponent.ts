import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { DragBoxService } from '../DragBox/DragBoxService';
import { Point } from '../Point/Point';
import { TileSizeService } from '../TileSize/TileSizeService';
import { TileState } from './TileState';
import { TouchService } from '../Touch/TouchService';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Component, Input, OnInit, AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { TileEventService } from './TileEventService';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TileBorderService } from '../TileBorder/TileBorderService';
import { PointService } from '../Point/PointService';
import { TileFillEventService } from './TileFillEventService';
import { TileFillEvent } from './TileFillEvent';
import { TileLayout } from '../TileLayout/TileLayout';

@Component({
    selector: 'krossr-tile',
    styleUrls: ['./TileStyles.less'],
    templateUrl: './TileView.html'
})
export class TileComponent implements OnInit, AfterViewInit, OnDestroy {
    /* At this level, work with the horizontal version only */
    @Input() public gameMatrix: BooleanMatrix;
    @Input() public index;
    @Input() public isEditMode: boolean;
    @Input() public tile: TileLayout;
    @Input() public editable: boolean;

    public marked: boolean;
    public pending: boolean;
    public selected: boolean;
    public height: string;
    public width: string;

    private $element: HTMLElement;

    private listeners: Array<() => void> = [];
    private subscriptions: Subscription[];

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private dragBoxService: DragBoxService,
        private pointService: PointService,
        private tileBorderService: TileBorderService,
        private tileEventService: TileEventService,
        private tileFillEventService: TileFillEventService,
        private tileSizeEventService: TileSizeEventService,
        private tileSizeService: TileSizeService,
        private touchService: TouchService
    ) {
    }

    ngOnDestroy() {
        this.listeners.forEach(listener => listener());
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this.$element = this.elementRef.nativeElement as HTMLElement;

        this.initializeFill();
        this.setTileSize();
    }

    ngAfterViewInit() {
        this.listeners = [
            this.renderer.listen(this.$element, 'mousedown', () => this.mouseDownEvent()),
            this.renderer.listen(this.$element, 'mousemove', () => this.mouseMoveEvent()),
            this.renderer.listen(this.$element, 'mouseup', () => this.mouseUpEvent()),
            this.renderer.listen(this.$element, 'touchstart', (e) => {
                e.preventDefault();
                this.mouseDownEvent();
            }),
            this.renderer.listen(this.$element, 'touchmove', (e) => {
                e.preventDefault();
                this.touchMoveEvent(e);
            }),
            this.renderer.listen(this.$element, 'touchend', (e) => {
                e.preventDefault();
                this.touchEndEvent();
            }),
        ];

        this.subscriptions = [
            this.tileSizeEventService.tileSizeChanged.subscribe(() => {
                this.setTileSize();
            }),
            this.touchService.tileTouched.subscribe(tile => {
                if (this.$element === tile) {
                    this.fillPending();
                }
            }),
            this.touchService.tileTouchEnd.subscribe(tile => {
                if (this.$element === tile) {
                    this.tryEndDragbox();
                }
            }),
            this.tileFillEventService.fill.subscribe((event: TileFillEvent) => {
                let thisCoord = this.pointService.indexToPoint(this.index, this.gameMatrix.length);
                let hasCoord = !event.coords || _.findIndex(event.coords, thisCoord) > -1;
                let isValid = !event.validate || event.validate(this);

                if (hasCoord && isValid) {
                    this.changeTile(thisCoord, event.initState, event.override);
                }
            })
        ];
    }

    /**
     * Determine the initial state of the tile fills
     */
    private initializeFill() {
        let fill = this.isEditMode && this.tile && this.tile.selected;

        fill ? this.select() : this.empty();
    }

    private fillPending() {
        if (!this.dragBoxService.validateStart()) {
            return;
        }

        let coord = this.pointService.indexToPoint(this.index, this.gameMatrix.length);

        // save a snapshot of the previous dragbox for comparison purposes
        let oldCoords = this.dragBoxService.process();

        // set the current coordinate to the new dragbox end and compute the new dragbox
        this.dragBoxService.endCoord = coord;

        let allPendingCoords = this.dragBoxService.process();

        this.shrinkPendingArea(oldCoords, allPendingCoords);

        this.tileFillEventService.fillPending(allPendingCoords);
    }

    private shrinkPendingArea(previous: Point[], current: Point[]) {
        // we should only clear the old coordinates off if the current selected area is
        // smaller than the previous selected area, for speed reasons
        let needsShrinkage = previous && current && current.length < previous.length;

        if (needsShrinkage) {
            let coordsToClear: Point[];
            // more speed -- only clear the values that are present in
            // oldCoords but not allPendingCoords
            coordsToClear = previous.filter((e) => {
                if (_.findIndex(current, e) === -1) {
                    return true;
                }
            });

            this.tileFillEventService.clearPending(coordsToClear);
        }
    }

    private mouseDownEvent() {
        let coord = this.pointService.indexToPoint(this.index, this.gameMatrix.length);

        this.dragBoxService.startCoord = coord;
        this.dragBoxService.initState = this.selected || this.marked;
    }

    private mouseMoveEvent() {
        this.fillPending();
    }

    private touchMoveEvent(e: TouchEvent) {
        let actualTile = this.getActualTileFromTouchEvent(e);
        this.touchService.tileTouched.emit(actualTile);
        this.touchService.lastTouchedTile = actualTile;
    }

    /*
    * This event bubbles up to GameController, which completes the job
    */
    private mouseUpEvent() {
        this.tryEndDragbox();
    }

    private touchEndEvent() {
        this.touchService.tileTouchEnd.emit(this.touchService.lastTouchedTile);
        this.touchService.lastTouchedTile = null;
    }

    private tryEndDragbox() {
        let coord = this.pointService.indexToPoint(this.index, this.gameMatrix.length);
        this.dragBoxService.endCoord = coord;
        this.tileEventService.tileDragEnd.emit();
    }

    private getActualTileFromTouchEvent(e: TouchEvent) {
        let actualTile = this.touchService.getRealTarget(e).closest(this.$element.tagName);

        return actualTile as HTMLElement;
    }

    private processTileState(active: boolean, override?: boolean) {
        let temp = !_.isUndefined(override) ? override : active;
        this.empty();
        return !temp;
    }

    changeTile(coord: Point, initState, changeTo: TileState) {
        if (!this.editable) {
            return;
        }

        this.fill(changeTo, initState);
        this.gameMatrix.setValueAt(coord.y, coord.x, this.selected);
    }

    empty() {
        this.selected = false;
        this.marked = false;
        this.pending = false;
    }

    mark(override?: boolean) {
        this.marked = this.processTileState(this.marked, override);
    }

    select(override?: boolean) {
        this.selected = this.processTileState(this.selected, override);
    }

    fill(fillType, override?: boolean) {
        switch (fillType) {
            case TileState.pending:
                this.pending = true;
                break;
            case TileState.marked:
                this.mark(override);
                break;
            case TileState.selected:
                this.select(override);
                break;
            case TileState.empty:
                this.empty();
                break;
            default:
                console.log('you done goofed');
                break;
        }
    }

    /* Determine which tiles to add colored borders to */
    getBorderColors(direction) {
        let coord = this.pointService.indexToPoint(this.index, this.gameMatrix.length);
        let sideLength = this.gameMatrix.length;

        return this.tileBorderService.getBorder(direction, coord, sideLength);
    }

    isPendingAndNotSelected() {
        return this.pending && !this.selected;
    }

    isNotPending() {
        return !this.pending;
    }

    setTileSize() {
        this.width = this.height = this.tileSizeService.getTileSizePx();
    }
}
