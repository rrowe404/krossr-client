import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { DragBoxService } from '../DragBox/DragBoxService';
import { ILevel } from '../Level/Level';
import { ShiftService } from '../Shift/ShiftService';
import { Point } from '../Point/Point';
import { SideLengthService } from '../SideLength/SideLengthService';
import { TileService } from './TileService';
import { TileSizeService } from '../TileSize/TileSizeService';
import { TileState } from './TileState';
import { TouchService } from '../Touch/TouchService';
import { Utils } from '../Utils/Utils';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Component, Input, OnInit, AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { TileEventService } from './TileEventService';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TileBorderService } from '../TileBorder/TileBorderService';
import { PointService } from '../Point/PointService';

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
    @Input() public tiles;
    @Input() public editable: boolean;

    public marked: boolean;
    public pending: boolean;
    public selected: boolean;
    public height: string;
    public width: string;

    private goalMatrix;

    private $element: HTMLElement;

    private listeners: Array<() => void> = [];
    private subscriptions: Subscription[];

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private utils: Utils,
        private dragBoxService: DragBoxService,
        private pointService: PointService,
        private shiftService: ShiftService,
        private sideLengthService: SideLengthService,
        private tileBorderService: TileBorderService,
        private tileEventService: TileEventService,
        private tileService: TileService,
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

        this.goalMatrix = this.utils.getGoalMatrix();

        this.initializeFill();
        this.setTileSize(this.tileSizeService.getTileSize());
    }

    ngAfterViewInit() {
        this.tileService.addTile({ tile: this });

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
                this.setTileSize(this.tileSizeService.getTileSize());
            }),
            this.touchService.tileTouched.subscribe(tile => {
                if (this.$element === tile) {
                    this.tryFillPending();
                }
            }),
            this.touchService.tileTouchEnd.subscribe(tile => {
                if (this.$element === tile ) {
                    this.tryEndDragbox();
                }
            })
        ];
    }

    private clearPending(coords: Point[]) {
        this.tileService.fillTiles(coords, true, TileState.empty, 'isPendingAndNotSelected');
    }

    /** If the override value (which will be the value of the tile that a dragstart is activated on)
     *  is present, use that for all tiles being considered.
     *  This is so you don't unselect previously selected tiles if your drags overlap
     */
    private checkForOverride(override, value) {
        if (typeof override !== 'undefined') {
            return !override;
        } else {
            return !value;
        }
    }

    /**
     * Determine the initial state of the tile fills
     */
    private initializeFill() {
        if (this.isEditMode && this.tiles && this.tiles[this.index] && this.tiles[this.index].selected) {
            this.fill(TileState.selected);
        } else {
            this.fill(TileState.empty);
        }
    }

    private fillPending(index) {
        let coord = this.pointService.indexToPoint(index);
        let coordsToClear;

        // save a snapshot of the previous dragbox for comparison purposes
        let oldCoords = this.dragBoxService.process();

        // set the current coordinate to the new dragbox end and compute the new dragbox
        this.dragBoxService.endCoord = coord;

        let allPendingCoords = this.dragBoxService.process();

        // we should only clear the old coordinates off if the current selected area is
        // smaller than the previous selected area, for speed reasons
        if (allPendingCoords &&
            oldCoords &&
            allPendingCoords.length < oldCoords.length) {

            // more speed -- only clear the values that are present in
            // oldCoords but not allPendingCoords
            coordsToClear = oldCoords.filter((e) => {
                if (_.findIndex(allPendingCoords, e) === -1) {
                    return true;
                }
            });

            this.clearPending(coordsToClear);
        }

        this.tileService.fillTiles(allPendingCoords, true, TileState.pending, 'isNotPending');
    }

    private mouseDownEvent() {
        let coord = this.pointService.indexToPoint(this.index);

        this.dragBoxService.startCoord = coord;
        this.dragBoxService.initState = this.selected;
    }

    private mouseMoveEvent() {
        this.tryFillPending();
    }

    private touchMoveEvent(e: TouchEvent) {
        let actualTile = this.getActualTileFromTouchEvent(e);
        this.touchService.tileTouched.emit(actualTile);
        this.touchService.lastTouchedTile = actualTile;
    }

    private tryFillPending() {
        if (this.dragBoxService.validateStart())  {
            this.fillPending(this.index);
        }
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
        let coord = this.pointService.indexToPoint(this.index);
        this.dragBoxService.endCoord = coord;
        this.tileEventService.tileDragEnd.emit();
    }

    private getActualTileFromTouchEvent(e: TouchEvent) {
        let actualTile = this.touchService.getRealTarget(e).closest('tile');

        return actualTile as HTMLElement;
    }

    change(index, initState, changeTo) {
        if (this.editable) {
            this.changeTile(index, initState, changeTo, this.goalMatrix);
        }
    }

    changeTile(index, initState, changeTo, goalMatrix) {
        let coord;

        if (typeof index === 'number') {
            coord = this.pointService.indexToPoint(index);
        } else {
            coord = index;
        }

        if (changeTo in TileState) {
            this.fill(changeTo);
        } else {
            if (this.shiftService.shiftOn === true) {
                this.fill(this.marked ? TileState.empty : TileState.marked);

                this.gameMatrix.setValueAt(coord.y, coord.x, this.selected);
            } else {
                this.fill(this.selected ? TileState.empty : TileState.selected, initState);
                this.gameMatrix.setValueAt(coord.y, coord.x, this.selected);
            }
        }
    }

    fill(fillType, override?) {
        switch (fillType) {
            case TileState.pending:
                this.pending = true;
                break;
            case TileState.marked:
                this.marked = true;
                this.selected = false;
                this.pending = false;
                break;
            case TileState.selected:
                this.selected = this.checkForOverride(override, this.selected);
                this.marked = false;
                this.pending = false;
                break;
            case TileState.empty:
                this.selected = false;
                this.marked = false;
                this.pending = false;
                break;
            default:
                console.log('you done goofed');
                break;
        }
    }

    fillBorders(direction, index) {
      return this.getBorderColors(direction, index);
    }

    /* Determine which tiles to add colored borders to */
    getBorderColors(direction, index) {
        let coord = this.pointService.indexToPoint(index);
        let sideLength = this.sideLengthService.sideLength;

        return this.tileBorderService.getBorder(direction, coord, sideLength);
    }

    /** used with the validationFn in tileService.fillTiles */
    isPendingAndNotSelected() {
        return this.pending && !this.selected;
    }

    /** used with the validationFn in tileService.fillTiles */
    isNotPending() {
        return !this.pending;
    }

    setTileSize(tileSize) {
        tileSize = Math.floor(tileSize);
        this.width = tileSize + 'px';
        this.height = tileSize + 'px';
    }
}
