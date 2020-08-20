import { AuthenticationService } from '../Authentication/AuthenticationService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { RatingService } from '../Rating/RatingService';
import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '@uirouter/core';
import { Subscription } from 'rxjs';
import { LevelRoutes } from '../Routing/RouteNames';
import { KrossrError, LevelViewModel, CreateLevelBodyViewModel, UpdateLevelBodyViewModel } from '@krossr/types';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { ILevel } from '../Level/Level';
import { LevelLayout } from '../Level/LevelLayout';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelService } from '../Level/LevelService';

@Component({
    selector: 'krossr-level-creator',
    templateUrl: './LevelCreatorView.html'
})
export class LevelCreatorComponent implements OnInit, OnDestroy {
    constructor(
        private $state: StateService,
        public Authentication: AuthenticationService,
        private gameSizeService: GameSizeService,
        private levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
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
        this.createNewLevel();

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
}