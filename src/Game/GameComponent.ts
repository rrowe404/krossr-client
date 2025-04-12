import { DragBoxService } from '../DragBox/DragBoxService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeService } from '../TileSize/TileSizeService';
import { TileState } from '../Tile/TileState';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { TileEventService } from '../Tile/TileEventService';
import { Input, Component, OnInit, ElementRef, Renderer2, OnDestroy, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShiftService } from '../Shift/ShiftService';
import { TileLayout } from '../TileLayout/TileLayout';
import { TouchService } from '../Touch/TouchService';
import { GameSize } from '../GameSize/GameSize';
import { NgIf, NgStyle, NgFor } from '@angular/common';
import { TileComponent } from '../Tile/TileComponent';

@Component({
    selector: 'krossr-game',
    styleUrls: ['./GameStyles.less'],
    templateUrl: './GameView.html',
    imports: [NgIf, NgStyle, NgFor, TileComponent]
})
export class GameComponent implements OnInit, OnChanges, OnDestroy {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private tileEventService: TileEventService,
        private tileSizeEventService: TileSizeEventService,
        private tileSizeService: TileSizeService,
        private touchService: TouchService,
        private dragBoxService: DragBoxService,
        private shiftService: ShiftService
    ) {
        this.$element = this.elementRef.nativeElement;
    }

    @Input() public prefill = false;
    @Input() public previewMode = false;
    @Input() public gameMatrix: GameMatrix;
    @Input() public gameSize: GameSize;
    @Output() public check: EventEmitter<void> = new EventEmitter();

    public margin: string;
    public tiles: TileLayout[] = [];

    private $element: HTMLElement;

    private listeners: Array<() => void> = [];
    private subscriptions: Subscription[];

    ngOnDestroy() {
        this.listeners.forEach(listener => listener());
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnChanges() {
        this.tiles = this.gameMatrix.toTileLayout();
    }

    ngOnInit() {
        this.tiles = this.gameMatrix.toTileLayout();
        this.dragBoxService.clearDragBox();

        this.setMargin(this.tileSizeService.getTileSize());

        this.listeners = [
            // If the user goes too far away from the game area, clear the dragbox and empty the tiles.
            this.renderer.listen(this.$element, 'mouseleave', (e) => {
                e.preventDefault();
                this.applyFillDragBox(TileState.empty);
            }),
            this.renderer.listen(this.$element, 'touchmove', (e: TouchEvent) => {
                let target = this.touchService.getRealTarget(e);
                let inBounds = target && !!target.closest(this.$element.tagName);

                if (!inBounds) {
                    e.preventDefault();
                    this.applyFillDragBox(TileState.empty);
                }
            })
        ];

        this.subscriptions = [
            this.tileEventService.tileDragEnd.subscribe(() => {
                this.mouseUpEvent();
            }),
            this.tileSizeEventService.tileSizeChanged.subscribe((tileSize) => {
                this.setMargin(tileSize);
            })
        ];
    }

    /**
     * Change the tiles inside the dragbox to the specified state
     * (pending if being dragged over, selected if mouse released normally,
     * marked if shift was held)
     */
    private applyFillDragBox(override: TileState) {
        this.dragBoxService.fill(override);
    }

    /**
     * If a user starts dragging a tile and their mouse pointer leaves the game area,
     * the area that was highlighted before should stay highlighted,
     * and should activate when the user lets go of the mouse button.
     * When the mouse is released in the game, attempt to process a dragbox and check if the game is won.
     * This event works with the mouseup event in TileController and
     * should always run after that event.
     */
    private mouseUpEvent() {
        let fill = this.shiftService.shiftOn ? TileState.marked : TileState.selected;

        this.applyFillDragBox(fill);
        this.check.emit();
    }

    setMargin(tileSize: number) {
        this.margin = Math.floor(tileSize) / 2 + 'px';
    }
}
