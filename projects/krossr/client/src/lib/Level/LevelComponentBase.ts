import { ILevel } from './Level';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LevelLayout } from './LevelLayout';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';

@Component({
    template: ''
})
// tslint:disable-next-line component-class-suffix
export abstract class LevelComponentBase implements OnInit, OnDestroy {
    constructor(
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        protected gameSizeService: GameSizeService,
        protected resizeEventService: ResizeEventService,
        protected tileSizeEventService: TileSizeEventService
    ) {
    }
    public finalLayout: LevelLayout = {};
    public gameMatrix: GameMatrix;
    public goalMatrix: GameMatrix;
    public error: string;
    public level: ILevel;
    public margin: string;

    protected timeout = 1000;

    private subscriptions: Subscription[];

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this.subscriptions = [
            this.levelEditorFormClearEventService.formClearEvent.subscribe(() => {
                this.gameMatrix.clear();
            }),
            this.resizeEventService.windowResized.subscribe(() => {
                if (this.gameMatrix) {
                    this.gameSizeService.calculatePlayableArea();
                    this.gameSizeService.setGameSize(this.gameMatrix.length);
                }
            }),
            this.tileSizeEventService.tileSizeChanged.subscribe(tileSize => {
                let newSize = Math.floor(tileSize);
                this.margin = newSize / 2 + 'px';
            })
        ];

        return Promise.resolve();
    }

    /* Combine a lot of the other functions here to set up a new game */
    createNewGame(args: { layout: boolean[][] }) {
        let goalMatrix: BooleanMatrix;
        let layout = args.layout;

        goalMatrix = new BooleanMatrix(layout.length, layout.length);
        goalMatrix.initializeWith(layout);

        this.gameSizeService.calculatePlayableArea();
        let gameMatrix = new BooleanMatrix(layout.length, layout.length);
        this.gameSizeService.setGameSize(gameMatrix.length);

        return {
            gameMatrix,
            goalMatrix
        };
    }

    toTileLayout(value: boolean) {
        return { selected: value };
    }
}
