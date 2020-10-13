import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { Point } from '../Point/Point';
import { TileSizeService } from '../TileSize/TileSizeService';
import { TileState } from './TileState';
import { TouchService } from '../Touch/TouchService';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Component, Input, OnInit, AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TileBorderService } from '../TileBorder/TileBorderService';
import { PointService } from '../Point/PointService';
import { TileFillEventService } from './TileFillEventService';
import { TileFillEvent } from './TileFillEvent';
import { TileLayout } from '../TileLayout/TileLayout';
import { DragGestureService } from '../DragGesture/DragGestureService';
import { TileStateOptions } from './TileStateOptions';

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

    public coordinate: Point;
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
        private dragGestureService: DragGestureService,
        private pointService: PointService,
        private tileBorderService: TileBorderService,
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
        this.coordinate = this.pointService.indexToPoint(this.index, this.gameMatrix.length);
        this.$element = this.elementRef.nativeElement as HTMLElement;

        this.initializeFill();
        this.setTileSize();
    }

    ngAfterViewInit() {
        this.listeners = [
            this.renderer.listen(this.$element, 'mousedown', () => this.beginDrag()),
            this.renderer.listen(this.$element, 'mousemove', () => this.continueDrag()),
            this.renderer.listen(this.$element, 'mouseup', () => this.endDrag()),
            this.renderer.listen(this.$element, 'touchstart', (e) => {
                e.preventDefault();
                this.beginDrag();
                this.touchMoveEvent(e);
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
                    this.continueDrag();
                }
            }),
            this.touchService.tileTouchEnd.subscribe(tile => {
                if (this.$element === tile) {
                    this.endDrag();
                }
            }),
            this.tileFillEventService.fill.subscribe((event: TileFillEvent) => {
                let hasCoord = !event.coords || _.findIndex(event.coords, this.coordinate) > -1;
                let isValid = !event.validate || event.validate(this);

                if (hasCoord && isValid) {
                    this.changeTile(event.initState, event.override);
                }
            })
        ];
    }

    private applyState(state: TileStateOptions) {
        this.selected = state.selected;
        this.marked = state.marked;
        this.pending = state.pending;
    }

    private beginDrag() {
        this.dragGestureService.beginDrag(this.coordinate, this.selected || this.marked);
    }

    private continueDrag() {
        this.dragGestureService.continueDrag(this.coordinate);
    }

    private endDrag() {
        this.dragGestureService.endDrag(this.coordinate);
    }

    /**
     * Determine the initial state of the tile fills
     */
    private initializeFill() {
        let fill = this.isEditMode && this.tile && this.tile.selected;

        fill ? this.select() : this.empty();
    }

    private touchMoveEvent(e: TouchEvent) {
        let actualTile = this.getActualTileFromTouchEvent(e);
        this.touchService.tileTouched.emit(actualTile);
        this.touchService.lastTouchedTile = actualTile;
    }

    private touchEndEvent() {
        this.touchService.tileTouchEnd.emit(this.touchService.lastTouchedTile);
        this.touchService.lastTouchedTile = null;
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

    changeTile(initState, changeTo: TileState) {
        if (!this.editable) {
            return;
        }

        this.fill(changeTo, initState);
        this.gameMatrix.setValueAtByCoord(this.coordinate, this.selected);
    }

    empty() {
        this.applyState({
            selected: false,
            marked: false,
            pending: false
        });
    }

    mark(override?: boolean) {
        let marked = this.processTileState(this.marked, override);

        this.applyState({
            marked,
            selected: false,
            pending: false
        });
    }

    select(override?: boolean) {
        let selected = this.processTileState(this.selected, override);

        this.applyState({
            selected,
            marked: false,
            pending: false
        });
    }

    fill(fillType, override?: boolean) {
        switch (fillType) {
            case TileState.pending:
                this.applyState({
                    pending: true,
                    selected: false,
                    marked: false
                });
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
        let sideLength = this.gameMatrix.length;

        return this.tileBorderService.getBorder(direction, this.coordinate, sideLength);
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
