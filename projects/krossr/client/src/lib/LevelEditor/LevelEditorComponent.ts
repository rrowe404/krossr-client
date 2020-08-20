import { AuthenticationService } from '../Authentication/AuthenticationService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { RatingService } from '../Rating/RatingService';
import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '@uirouter/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { Subscription } from 'rxjs';
import { LevelRoutes } from '../Routing/RouteNames';
import { KrossrError, LevelViewModel, CreateLevelBodyViewModel, UpdateLevelBodyViewModel } from '@krossr/types';
import { LevelDecoder } from '../LevelDecoder/LevelDecoder';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelService } from '../Level/LevelService';
import { ILevel } from '../Level/Level';
import { LevelLayout } from '../Level/LevelLayout';

@Component({
    selector: 'krossr-level-editor',
    templateUrl: './LevelEditorView.html'
})
export class LevelEditorComponent {
    constructor(
        private $state: StateService,
        public Authentication: AuthenticationService,
        private gameSizeService: GameSizeService,
        private levelDecoder: LevelDecoder,
        private levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
        private matDialog: MatDialog,
        private ratingService: RatingService,
        private resizeEventService: ResizeEventService,
        private tileSizeEventService: TileSizeEventService,
    ) {
    }

    public finalLayout: LevelLayout = {};
    public margin: string;
    public level: ILevel;
    @Input() public levelId;

    public gameMatrix: GameMatrix;
    public goalMatrix: GameMatrix;
    public error: string;

    private timeout = 1000;
    private subscriptions: Subscription[];

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

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this.findOne();

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
    }

    confirmUpdate(level: UpdateLevelBodyViewModel) {
        this.matDialog.open(ConfirmationComponent, {
            data: {
                submitText: 'Update',
                submitAction: () => this.updateLevel(level)
            } as ConfirmationOptions,
            disableClose: true
        });
    }

    findOne() {
        this.finalLayout = {};
        this.level = null;

        this.levelService.getLevel(this.levelId).then((data: LevelViewModel) => {
            this.level = Object.assign({}, data, { ready: false });

            this.level.decodedLayout = this.levelDecoder.decodeLayout(data.layout);

            let game = this.createNewGame({
                layout: this.level.decodedLayout
            });

            let gameMatrix = game.goalMatrix;
            this.gameMatrix = new GameMatrix(gameMatrix, true);

            let goalLayout = game.goalMatrix;

            if (goalLayout) {
                this.goalMatrix = new GameMatrix(goalLayout, true);
            }

            this.finalLayout.tiles = gameMatrix.flatten().map(this.toTileLayout);

            this.level.ready = true;
        });
    }

    toTileLayout(value: boolean) {
        return { selected: value };
    }

    rate(rating) {
        setTimeout(() => {
            this.ratingService.rate(this.level.id, rating);
        });
    }

    updateLevel(level: UpdateLevelBodyViewModel) {
        this.levelService.updateLevel(level).then(() => {
            this.$state.go(LevelRoutes.update, { levelId: level.id }, { reload: true });
        }).catch((response: KrossrError) => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        });
    }
}