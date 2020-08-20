import { AuthenticationService } from '../Authentication/AuthenticationService';
import { ILevel } from './Level';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { LevelService } from './LevelService';
import { ShiftService } from '../Shift/ShiftService';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { RatingService } from '../Rating/RatingService';
import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '@uirouter/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { Subscription } from 'rxjs';
import { LevelRoutes } from '../Routing/RouteNames';
import { LevelLayout } from './LevelLayout';
import { KrossrError, LevelViewModel, CreateLevelBodyViewModel, UpdateLevelBodyViewModel } from '@krossr/types';
import { LevelDecoder } from '../LevelDecoder/LevelDecoder';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';

@Component({
    selector: 'krossr-level',
    styleUrls: ['./LevelStyles.less'],
    templateUrl: './LevelView.html'
})
export class LevelComponent implements OnInit, OnDestroy {
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
        private shiftService: ShiftService,
        private tileSizeEventService: TileSizeEventService,
    ) {
    }

    public finalLayout: LevelLayout = {};
    @Input() public mode: string; // string for edit, new, etc.
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
        this.findOne(this.mode);

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

    createGameArray() {
        let sideLength = this.level ? Math.sqrt(this.level.size) : 5;

        let game = this.createNewGame({
            layout: new BooleanMatrix(sideLength, sideLength).getLayout()
        });

        this.finalLayout.tiles = game.gameMatrix.flatten().map(this.toTileLayout);

        this.gameMatrix = new GameMatrix(game.gameMatrix, false);

        return game;
    }

    // Create new level (load template)
    createNewLevel() {
        let name = '';

        if (this.level) {
            name = this.level.name;
        }

        this.level = undefined;

        this.createGameArray();

        this.level = {
            currentView: 'new',
            layout: '',
            ready: true,
            name,
            size: 25
        };
    }

    // Find existing Level
    findOne(mode) {
        this.finalLayout = {};
        this.level = null;

        // store the name of the controller so we can have the same functions do different things
        // depending on new, edit, etc.
        this.mode = mode;

        if (!this.levelId) {
            this.createNewLevel();
        }

        this.levelService.getLevel(this.levelId).then((data: LevelViewModel) => {
            this.level = Object.assign({}, data, { currentView: mode, ready: false });

            this.level.decodedLayout = this.levelDecoder.decodeLayout(data.layout);

            let game = this.createNewGame({
                layout: this.level.decodedLayout
            });

            let isEdit = mode === 'edit';
            let gameMatrix = isEdit ? game.goalMatrix : game.gameMatrix;
            this.gameMatrix = new GameMatrix(gameMatrix, isEdit);

            let goalLayout = game.goalMatrix;

            if (goalLayout) {
                this.goalMatrix = new GameMatrix(goalLayout, true);
            }

            this.finalLayout.tiles = gameMatrix.flatten().map(this.toTileLayout);
            this.level.currentView = mode;

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

    // Split out for easier testing
    submitCreate() {
        // Create new Level object
        let level = {
            name: this.level.name,
            decodedLayout: this.gameMatrix.horizontal.getLayout(),
        } as CreateLevelBodyViewModel;

        this.levelService.createLevel(level).then((response: LevelViewModel) => {
            this.$state.go(LevelRoutes.update, { levelId: response.id }, { reload: true });
        }).catch((response: KrossrError) => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = '';
            }, this.timeout);
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
