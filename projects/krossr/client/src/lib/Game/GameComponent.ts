import { DragBoxService } from '../DragBox/DragBoxService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { GameOverService } from '../GameOver/GameOverService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { ILevel } from '../Level/Level';
import { TileSizeService } from '../TileSize/TileSizeService';
import { TileState } from '../Tile/TileState';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { TileEventService } from '../Tile/TileEventService';
import { Input, Component, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShiftService } from '../Shift/ShiftService';
import { TileLayout } from '../TileLayout/TileLayout';
import { TouchService } from '../Touch/TouchService';
import { GameSize } from '../GameSize/GameSize';

@Component({
    selector: 'krossr-game',
    styleUrls: ['./GameStyles.less'],
    templateUrl: './GameView.html'
})
export class GameComponent implements OnInit, OnDestroy {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private gameOverService: GameOverService,
        private tileEventService: TileEventService,
        private tileSizeEventService: TileSizeEventService,
        private tileSizeService: TileSizeService,
        private touchService: TouchService,
        private dragBoxService: DragBoxService,
        private shiftService: ShiftService
    ) {
        this.$element = this.elementRef.nativeElement;
    }

    @Input() public isEditMode = false;
    @Input() public gameMatrix: GameMatrix;
    @Input() public goalMatrix: GameMatrix;
    @Input() public level: ILevel;
    @Input() public tiles: TileLayout[];
    @Input() public gameSize: GameSize;
    public margin: string;

    private $element: HTMLElement;

    private listeners: Array<() => void> = [];
    private subscriptions: Subscription[];

    ngOnDestroy() {
        this.listeners.forEach(listener => listener());
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this.dragBoxService.clearDragBox();

        this.setMargin(this.tileSizeService.getTileSize());

        this.listeners = [
            // focus the game when the mouse enters it so that the first click will register
            this.renderer.listen(this.$element, 'mouseenter', () => this.setFocus()),
            // If the user goes too far away from the game area, clear the dragbox and empty the tiles.
            this.renderer.listen(this.$element, 'mouseleave', (e) => {
                e.preventDefault();
                this.applyFillDragBox(TileState.empty);
            }),
            this.renderer.listen(this.$element, 'touchmove', (e: TouchEvent) => {
                let target = this.touchService.getRealTarget(e);
                let inBounds = !!target.closest(this.$element.tagName);

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

        if (this.checkForWin()) {
            this.gameOverService.openDialog(this.level);
        }
    }

    /**
     * Compare the current state of the game to the correct state
     */
    checkForWin() {
        return this.gameMatrix && this.gameMatrix.equals(this.goalMatrix);
    }

    setMargin(tileSize: number) {
        this.margin = Math.floor(tileSize) / 2 + 'px';
    }

    private setFocus() {
        let elements = this.$element.querySelectorAll('.inner') as NodeListOf<HTMLElement>;

        elements.forEach(ele => ele.focus());
    }
}
