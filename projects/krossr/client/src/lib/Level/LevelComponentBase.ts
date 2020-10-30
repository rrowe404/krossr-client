import { ILevel } from './Level';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { AsyncLoadedComponent } from '../Async/AsyncLoadedComponent';
import { GameSize } from '../GameSize/GameSize';
import { GoalMatrixFactory } from '../GoalMatrix/GoalMatrixFactory';

@Component({
    template: ''
})
// tslint:disable-next-line component-class-suffix
export abstract class LevelComponentBase implements AsyncLoadedComponent, OnInit, OnDestroy {
    constructor(
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        protected gameSizeService: GameSizeService,
        protected goalMatrixFactory: GoalMatrixFactory,
        protected resizeEventService: ResizeEventService,
        protected tileSizeEventService: TileSizeEventService
    ) {
    }

    public isReady = false;
    public gameMatrix: GameMatrix;
    public goalMatrix: GameMatrix;
    public error: string;
    public level: ILevel;
    public margin: string;
    public gameSize: GameSize;

    protected timeout = 1000;

    protected subscriptions: Subscription[];

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    async ngOnInit() {
        this.subscriptions = [
            this.levelEditorFormClearEventService.formClearEvent.subscribe(() => {
                this.gameMatrix.clear();
            }),
            this.resizeEventService.windowResized.subscribe(() => {
                if (this.gameMatrix) {
                    this.gameSizeService.calculatePlayableArea();
                    this.gameSize = this.gameSizeService.setGameSize(this.gameMatrix.length);
                }
            }),
            this.tileSizeEventService.tileSizeChanged.subscribe(tileSize => {
                let newSize = Math.floor(tileSize);
                this.margin = newSize / 2 + 'px';
            })
        ];
    }

    /* Combine a lot of the other functions here to set up a new game */
    createNewGame(args: { layout: boolean[][] }) {
        let layout = args.layout;
        let goalMatrix = this.goalMatrixFactory.create(layout);

        this.gameSizeService.calculatePlayableArea();
        let gameMatrix = new BooleanMatrix(layout.length, layout.length);
        this.gameSize = this.gameSizeService.setGameSize(gameMatrix.length);

        return {
            gameMatrix,
            goalMatrix
        };
    }
}
